import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Chat.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

export default function App() {
  return (
   <Routes>
  <Route path="/" element={<Login />} />      {/* default route is login */}
  <Route path="/chat" element={<Chat />} />   {/* move chat to /chat */}
  <Route path="/signup" element={<Signup />} />
</Routes>

  );
}
