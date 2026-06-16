import { useState } from "react";

import {
  Lock,
  ShieldCheck,
  Moon,
  Languages,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

export default function SecuritySettings() {
  const [twoFA, setTwoFA] =
    useState(true);

  return (
    <section className="space-y-6">

      <h2 className="text-2xl font-bold">
        Security & Preferences
      </h2>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

        {/* PASSWORD */}

        <div className="flex items-center justify-between p-5 border-b hover:bg-slate-50 cursor-pointer transition">

          <div className="flex items-center gap-4">

            <Lock
              size={20}
              className="text-slate-500"
            />

            <div>

              <h3 className="font-semibold">
                Password
              </h3>

              <p className="text-sm text-gray-500">
                Last changed 4 months ago
              </p>

            </div>

          </div>

          <ChevronRight
            size={18}
            className="text-gray-400"
          />

        </div>

        {/* 2FA */}

        <div className="flex items-center justify-between p-5 border-b">

          <div className="flex items-center gap-4">

            <ShieldCheck
              size={20}
              className="text-slate-500"
            />

            <div>

              <h3 className="font-semibold">
                Two-Factor Authentication
              </h3>

              <p className="text-sm text-gray-500">
                Enhanced account security
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setTwoFA(!twoFA)
            }
            className={`
              w-12 h-6 rounded-full relative transition
              ${
                twoFA
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }
            `}
          >
            <div
              className={`
                absolute top-1
                w-4 h-4 bg-white rounded-full transition-all
                ${
                  twoFA
                    ? "right-1"
                    : "left-1"
                }
              `}
            />
          </button>

        </div>

        {/* APPEARANCE */}

        <div className="flex items-center justify-between p-5 border-b">

          <div className="flex items-center gap-4">

            <Moon
              size={20}
              className="text-slate-500"
            />

            <div>

              <h3 className="font-semibold">
                Appearance
              </h3>

              <p className="text-sm text-gray-500">
                Customize theme
              </p>

            </div>

          </div>

          <select className="border rounded-lg px-3 py-2">
            <option>
              Light Mode
            </option>

            <option>
              Dark Mode
            </option>

            <option>
              System
            </option>
          </select>

        </div>

        {/* LANGUAGE */}

        <div className="flex items-center justify-between p-5">

          <div className="flex items-center gap-4">

            <Languages
              size={20}
              className="text-slate-500"
            />

            <div>

              <h3 className="font-semibold">
                Language
              </h3>

              <p className="text-sm text-gray-500">
                Interface language
              </p>

            </div>

          </div>

          <select className="border rounded-lg px-3 py-2">
            <option>
              English
            </option>

            <option>
              Hindi
            </option>

            <option>
              Spanish
            </option>
          </select>

        </div>

      </div>

      {/* DANGER ZONE */}

      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

        <div className="flex items-center gap-2 text-red-600">

          <AlertTriangle size={20} />

          <h3 className="font-bold">
            Danger Zone
          </h3>

        </div>

        <p className="mt-3 text-red-700 text-sm leading-relaxed">
          Deleting your account will
          permanently remove all
          uploaded documents,
          conversations and profile
          information.
        </p>

        <button className="mt-4 text-red-600 font-semibold hover:underline">
          Delete Account
        </button>

      </div>

    </section>
  );
}