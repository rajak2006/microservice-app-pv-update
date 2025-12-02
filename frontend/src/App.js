import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Catalogue from "./components/Catalogue";

export default function App() {
  return (
    <div>
      <h1>Microservices Demo App</h1>
      <Register />
      <Login />
      <Catalogue />
    </div>
  );
}
