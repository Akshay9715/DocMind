import { useEffect, useState } from "react";
import { getProfile } from "../api/auth";

import ProfileHeader from "../components/ProfileHeader";
import AnalyticsCards from "../components/AnalyticsCards";
import SubscriptionCard from "../components/SubscriptionCard";
import SecuritySettings from "../components/SecuritySettings";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff]">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <ProfileHeader user={user} />

        <div className="mt-10">
          <AnalyticsCards />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <SubscriptionCard />

          <SecuritySettings />
        </div>
      </main>
    </div>
  );
}
