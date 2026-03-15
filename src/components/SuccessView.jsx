export default function SuccessView({ inviteLink }) {
  return (
    <div className="card success-card">
      <div className="success-icon">✅</div>
      <h2>Payment Confirmed!</h2>
      <p>Your subscription is active for 30 days.</p>
      <p>Join the private Telegram channel to receive trading signals:</p>
      <a
        href={inviteLink}
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-btn"
      >
        Join Telegram Channel
      </a>
      <p className="note">
        This is a one-time invite link. It will expire after you join.
      </p>
    </div>
  );
}
