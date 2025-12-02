import React, { useState } from "react";
import api, { API_AUTH } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post(`${API_AUTH}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

