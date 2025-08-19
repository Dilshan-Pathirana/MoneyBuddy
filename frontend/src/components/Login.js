import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login">
      <h2>MoneyBuddy Login</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
