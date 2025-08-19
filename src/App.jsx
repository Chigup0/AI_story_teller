import { useState , useRef} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Chat.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

export default function App() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [userText, setUserText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);


  const handleSend = async () => {
    if (!prompt.trim()) return;

    try {
      
      const response = await fetch('http://localhost:8000/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          story: "Your story content here" 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate video');
      }

      
      const videoBlob = await response.blob();
      
      
      const videoObjectUrl = URL.createObjectURL(videoBlob);
      
      
      setVideoUrl(videoObjectUrl);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Story Video Generation
      </h1>

      
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl space-y-6">
       
        <div className="flex gap-2">
          <div className="input-area">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your story prompt..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none height:100"
          />
          <button onClick={handleSend}>Send</button>
</div>
        </div>

        
        

        
        {videoUrl && (
          <div className="relative w-fit mx-auto">
            <video
              src={videoUrl}
              controls
              width="600"
              className="rounded-xl shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  return (
   <Routes>
  <Route path="/" element={<Login />} />      {/* default route is login */}
  <Route path="/chat" element={<Chat />} />   {/* move chat to /chat */}
  <Route path="/signup" element={<Signup />} />
</Routes>
  );
}
