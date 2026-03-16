import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <img src="/neon-logo.png" alt="Yuko" className="header-logo" />
        <h1>Yuko Agent Pump</h1>
      </div>
      <WalletMultiButton />
    </header>
  );
}
