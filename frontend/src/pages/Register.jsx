import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

import { register } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(form);

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-[#faf8ff]">

      {/* LEFT PANEL */}

      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-700 p-16 items-center">

        <div className="absolute top-[-5%] left-[-5%] h-[300px] w-[300px] rounded-full bg-blue-400/20 blur-[100px]" />

        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-[120px]" />

        <div className="relative z-10 max-w-lg">

          <div className="flex items-center gap-3 mb-10">
            <Brain
              size={40}
              className="text-white fill-white"
            />
            <h1 className="text-white text-2xl font-bold">
              DocMind AI
            </h1>
          </div>

          <h2 className="text-white text-6xl font-bold leading-tight">
            Unlock knowledge from every document.
          </h2>

          <p className="mt-6 text-blue-100 text-lg leading-8">
            Upload PDFs, research papers,
            contracts, reports and chat
            with them instantly using AI.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-14">

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5">
              <h3 className="text-white font-semibold">
                AI Summaries
              </h3>

              <div className="w-full h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
                <div className="w-3/4 h-full bg-white rounded-full" />
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5">
              <h3 className="text-white font-semibold">
                Secure Storage
              </h3>

              <p className="text-xs text-blue-100 mt-2">
                Enterprise-grade protection
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* RIGHT PANEL */}

      <section className="flex flex-1 items-center justify-center px-6">

        <div className="w-full max-w-md">

          <div className="lg:hidden flex justify-center gap-2 mb-8">
            <Brain
              size={32}
              className="text-blue-700"
            />
            <h1 className="font-bold text-xl">
              DocMind
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Start using DocMind today
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="John Doe"
                />

              </div>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="name@example.com"
                />

              </div>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className="absolute right-4 top-3"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="relative my-8">
            <div className="border-t"></div>

            <span className="absolute bg-[#faf8ff] px-3 text-sm text-gray-500 left-1/2 -translate-x-1/2 -top-3">
              Or continue with
            </span>
          </div>

          <button className="w-full border rounded-xl py-3 font-medium hover:bg-gray-50">
            Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-blue-700 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>

      </section>

    </main>
  );
}