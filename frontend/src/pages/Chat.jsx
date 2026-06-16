import { useState } from "react";
import { Send, Brain } from "lucide-react";
import { sendMessage } from "../api/chat";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSend = async () => {
    if (!prompt.trim() || loading) return;

    const currentPrompt = prompt;

    const userMessage = {
      role: "user",
      content: currentPrompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    setPrompt("");

    try {
      setLoading(true);

      const res = await sendMessage(currentPrompt);

      console.log("Backend Response:", res.data);

      let aiContent = "";

      if (typeof res.data === "string") {
        aiContent = res.data;
      } else if (res.data?.answer) {
        aiContent = res.data.answer;
      } else if (res.data?.response) {
        aiContent = res.data.response;
      } else {
        aiContent = JSON.stringify(res.data, null, 2);
      }

      const aiMessage = {
        role: "assistant",
        content: aiContent,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong while contacting the server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-[#faf8ff]">
      {/* SIDEBAR */}

      <aside className="w-[280px] border-r bg-white p-4">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="text-blue-700" />

          <h1 className="font-bold text-xl">DocMind</h1>
        </div>

        <button className="w-full bg-blue-700 text-white rounded-xl p-3 mb-6">
          + New Chat
        </button>

        <div className="space-y-2">
          <button
            onClick={() => navigate("/documents")}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-100"
          >
            Documents
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-100"
          >
            Profile
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="flex-1 flex flex-col">
        {/* HEADER */}

        <div className="h-16 border-b bg-white flex items-center px-6">
          <h2 className="font-semibold">New Chat</h2>
        </div>

        {/* MESSAGES */}

        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Brain size={60} className="mx-auto text-blue-700" />

                <h2 className="text-3xl font-bold mt-4">Welcome to DocMind</h2>

                <p className="text-gray-500 mt-2">
                  Ask questions about your uploaded documents
                </p>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] rounded-2xl px-5 py-3 whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-700 text-white"
                      : "bg-white border border-gray-200 shadow-sm"
                  }`}
                >
                  {String(msg.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="mb-6">
                <div className="inline-block bg-white border border-gray-200 rounded-2xl px-5 py-3">
                  DocMind is thinking...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* INPUT */}

        <div className="border-t bg-white p-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask DocMind anything..."
              className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-700 text-white px-5 rounded-xl disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
