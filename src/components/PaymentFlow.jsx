import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import SuccessView from "./SuccessView.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "";

const STAGES = {
  IDLE: "idle",
  CREATING: "creating",
  SIGNING: "signing",
  VERIFYING: "verifying",
  SUCCESS: "success",
  ERROR: "error",
};

export default function PaymentFlow() {
  const { publicKey, signTransaction, connected } = useWallet();
  const { connection } = useConnection();
  const [stage, setStage] = useState(STAGES.IDLE);
  const [error, setError] = useState(null);
  const [inviteLink, setInviteLink] = useState(null);

  if (!connected) {
    return (
      <div className="card">
        <h2>Connect Your Wallet</h2>
        <p>Connect your Solana wallet to subscribe to premium trading signals.</p>
      </div>
    );
  }

  async function handleSubscribe() {
    setError(null);

    try {
      // Step 1: Create invoice
      setStage(STAGES.CREATING);
      const invoiceRes = await fetch(`${API_BASE}/api/payment/create-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPublicKey: publicKey.toBase58() }),
      });
      const invoiceData = await invoiceRes.json();
      if (!invoiceRes.ok) throw new Error(invoiceData.error || "Invoice creation failed");

      // Step 2: Sign transaction
      setStage(STAGES.SIGNING);
      const tx = Transaction.from(
        Buffer.from(invoiceData.transaction, "base64")
      );
      const signedTx = await signTransaction(tx);

      // Send transaction
      const signature = await connection.sendRawTransaction(
        signedTx.serialize(),
        { skipPreflight: false, preflightCommitment: "confirmed" }
      );

      // Wait for confirmation
      const latestBlockhash = await connection.getLatestBlockhash("confirmed");
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed"
      );

      // Step 3: Verify payment
      setStage(STAGES.VERIFYING);
      const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPublicKey: publicKey.toBase58(),
          memo: invoiceData.memo,
          startTime: invoiceData.startTime,
          endTime: invoiceData.endTime,
        }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData.verified) {
        setInviteLink(verifyData.inviteLink);
        setStage(STAGES.SUCCESS);
      } else {
        throw new Error("Payment verification failed. Please try again.");
      }
    } catch (e) {
      console.error("Payment error:", e);
      setError(e.message || "Something went wrong");
      setStage(STAGES.ERROR);
    }
  }

  if (stage === STAGES.SUCCESS && inviteLink) {
    return <SuccessView inviteLink={inviteLink} />;
  }

  const isLoading =
    stage === STAGES.CREATING ||
    stage === STAGES.SIGNING ||
    stage === STAGES.VERIFYING;

  const statusMessages = {
    [STAGES.CREATING]: "Creating invoice...",
    [STAGES.SIGNING]: "Please approve the transaction in your wallet...",
    [STAGES.VERIFYING]: "Verifying payment on-chain...",
  };

  return (
    <div className="card">
      <h2>Subscribe to Signals</h2>
      <div className="price-tag">
        <span className="price-amount">0.5 SOL</span>
        <span className="price-period">/ month</span>
      </div>
      <ul className="features">
        <li>AI-powered trading signals for BTC, ETH, SOL</li>
        <li>Real-time analysis every 5 minutes</li>
        <li>Only A+ and B grade setups shared</li>
        <li>Private Telegram channel access</li>
        <li>Liquidity hunting strategy signals</li>
      </ul>

      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="status-box">
          <div className="spinner" />
          <p>{statusMessages[stage]}</p>
        </div>
      )}

      <button
        className="subscribe-btn"
        onClick={handleSubscribe}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Subscribe Now"}
      </button>
    </div>
  );
}
