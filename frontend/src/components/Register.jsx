import React, { useState } from "react";
import api, { API_AUTH } from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post(`${API_AUTH}/register`, { email, password });
      alert("Registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
