import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <img src="/neon-logo.png" alt="Neon" className="header-logo" />
        <h1>Neon Agent Pump</h1>
      </div>
      <WalletMultiButton />
    </header>
  );
}
