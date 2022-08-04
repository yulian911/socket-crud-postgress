function LoginDialog({ nicknameChange, nicknameSubmit }) {
  return (
    <div className="dialog-container">
      <div className="dialog">
        <form className="dialog-form" onSubmit={nicknameSubmit}>
          <label className="username-label" htmlFor="username">
            Nickname:
          </label>
          <input
            id="username"
            className="username-input"
            autoFocus
            onChange={nicknameChange}
            type="text"
            name="userId"
            placeholder="Enter your nickname to continue"
          />
          <button type="submit" className="submit-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
 }
 
 export default LoginDialog;