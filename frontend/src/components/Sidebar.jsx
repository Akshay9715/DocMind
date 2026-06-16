import {
  Brain,
  FileText,
  User,
  LogOut,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Sidebar({
  documents,
  onNewChat,
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-[280px] border-r bg-white p-4 flex flex-col">

      <div className="flex items-center gap-2 mb-6">

        <Brain className="text-blue-700" />

        <h1 className="font-bold text-xl">
          DocMind
        </h1>

      </div>

      <button
        onClick={onNewChat}
        className="bg-blue-700 text-white rounded-xl p-3 mb-6 flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        New Chat
      </button>

      <div className="flex-1 overflow-y-auto">

        <h3 className="text-xs uppercase text-gray-400 mb-3">
          Documents
        </h3>

        <div className="space-y-1 mb-6">

          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <FileText size={16} />

              <span className="truncate text-sm">
                {doc.filename}
              </span>
            </div>
          ))}

        </div>

        <h3 className="text-xs uppercase text-gray-400 mb-3">
          Chat History
        </h3>

        <div className="space-y-1">

          <div className="p-2 rounded-lg hover:bg-gray-100 text-sm">
            Current Chat
          </div>

        </div>

      </div>

      <div className="border-t pt-4 space-y-2">

        <button
          onClick={() =>
            navigate("/profile")
          }
          className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100"
        >
          <User size={18} />
          Profile
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-red-50 text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}