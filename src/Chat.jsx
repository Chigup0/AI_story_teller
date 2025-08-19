import { useState } from "react";
import "./App.css";

export default function Chat() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();

      setVideoUrl(data.url);
      setInput("");
    } catch (err) {
      console.error("Error fetching video:", err);
    }
  };

  return (
    <div className="app">
      {/* Show video if available */}
      <div className="chat-area">
        {videoUrl && (
          <div className="video-box">
            <video src={videoUrl} controls />
          </div>
        )}
      </div>

      {/* Input + send button */}
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a request..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
