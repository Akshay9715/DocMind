import {
  Camera,
  Edit,
  Crown,
} from "lucide-react";

export default function ProfileHeader({ user }) {
  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  const joinedDate = new Date(
    user.created_at
  ).toLocaleDateString();

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">

      <div className="flex items-center gap-6">

        {/* Avatar */}

        <div className="relative group">

          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white">
            {initials}
          </div>

          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">
            <Camera size={16} />
          </button>

        </div>

        {/* User Info */}

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            {user.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {user.email}
          </p>

          <div className="flex items-center gap-2 mt-3">

            <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              <Crown size={14} />
              Premium Member
            </span>

            <span className="text-sm text-gray-400">
              Joined {joinedDate}
            </span>

          </div>

        </div>

      </div>

      {/* Action Button */}

      <button className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 px-5 py-3 rounded-xl font-medium transition-all shadow-sm">
        <Edit size={18} />
        Edit Profile
      </button>

    </header>
  );
}