import { useState } from 'react';
import ChatMessage from '../../components/admin/ChatMessage';
import ModelOutput from '../../components/admin/ModelOutput';
import LogDataPanel from '../../components/admin/LogDataPanel';
import './AIAnalystChat.css';

function AIAnalystChat() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'ai' as const,
      content: 'Hello, how can I assist you with incident analysis today?',
    },
    {
      id: '2',
      role: 'user' as const,
      content: 'What caused the recent pressure drop in DMA 3?',
    },
    {
      id: '3',
      role: 'ai' as const,
      content:
        'Analyzing sensor data from J14 and Model Output, the pressure drop in DMA 3 was initiated by a sudden valve closure at node V7 at 14:35 UTC, likely due to an automated response to a detected leak. Logs from SCADA confirm the valve operation. Further forensics indicate a transient pressure wave affecting downstream sensors.',
    },
    {
      id: '4',
      role: 'user' as const,
      content: 'Recommend steps to isolate Tank 4 safely.',
    },
    {
      id: '5',
      role: 'ai' as const,
      content:
        'To safely isolate Tank 4: First, verify current flow rates and levels. Close inlet valve V12 and outlet valve V13. Monitor pressure changes in connected pipelines. Alert maintenance for physical inspection. Confirm isolation via SCADA. Always follow standard operating procedures for critical asset isolation.',
    },
  ]);

  const [inputValue, setInputValue] = useState('');

  const suggestedPrompts = [
    'Explain current alert in simple terms',
    'Find root cause of pressure drop in DMA 3',
    'Recommend steps to isolate Tank 4',
    'Summarize recent network anomalies',
    'Predict impact of system restart',
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        role: 'user' as const,
        content: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          role: 'ai' as const,
          content: 'I understand your query. Let me analyze the data and provide you with insights...',
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleGenerateSummary = () => {
    console.log('Generating incident summary...');
  };

  return (
    <div className="ai-analyst-page">
      <div className="ai-chat-section">
        <div className="chat-header">
          <h2 className="chat-title">AI Analyst</h2>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <ChatMessage key={message.id} role={message.role} content={message.content} />
          ))}
        </div>

        <div className="suggested-prompts">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              className="prompt-button"
              onClick={() => handleSuggestedPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Message AI Analyst..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-button" onClick={handleSendMessage} aria-label="Send message">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="ai-right-panel">
        <button className="generate-summary-btn" onClick={handleGenerateSummary}>
          Generate Incident Summary
        </button>

        <ModelOutput
          anomalyScore={0.85}
          severityLevel="High"
          predictedFailurePoint="Pump PU1"
          confidence={92}
          lastUpdated="2024-07-26 10:15:30 UTC"
        />

        <LogDataPanel />
      </div>
    </div>
  );
}

export default AIAnalystChat;

