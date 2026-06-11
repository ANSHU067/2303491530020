import { useEffect, useState } from "react";
import { Log } from "./api/logger";
import "./App.css";

const DEFAULT_MESSAGES = [
  "Open the browser console for full request details.",
  "Make sure the backend is running on http://localhost:3001.",
];

function App() {
  const [logStatus, setLogStatus] = useState("Waiting to send log...");

  const [messages, setMessages] = useState(DEFAULT_MESSAGES);

  const addMessage = (text) => {
    setMessages((current) => [text, ...current].slice(0, 8));
  };

  const sendLog = async (message) => {
    setLogStatus("Sending log...");
    try {
      const result = await Log("frontend", "info", "component", message);
      if (result?.status === "ok") {
        const success = `Log sent: ${message}`;
        setLogStatus(success);
        addMessage(success);
      } else {
        const unexpected = `Unexpected response: ${JSON.stringify(result)}`;
        setLogStatus(unexpected);
        addMessage(unexpected);
      }
    } catch (error) {
      const failure = `Log failed: ${error?.message || error}`;
      setLogStatus(failure);
      addMessage(failure);
    }
  };

  useEffect(() => {
    sendLog("App component loaded");
  }, []);

  return (
    <div className="app-shell">
      <div className="header">
        <h1>Affordmed Frontend Logger</h1>
        <p className="subtitle">Logging status and errors are shown below.</p>
      </div>

      <div className="controls">
        <button onClick={() => sendLog("Button clicked")}>Generate Log</button>
        <div className="status-box">
          <strong>Status:</strong>
          <span>{logStatus}</span>
        </div>
      </div>

      <div className="messages-panel">
        <h2>Recent messages</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;