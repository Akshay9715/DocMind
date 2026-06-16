import { FileText, Sparkles, Database } from "lucide-react";

export default function AnalyticsCards() {
  // Placeholder values until backend provides analytics

  const stats = [
    {
      title: "Documents Uploaded",
      value: "128",
      icon: FileText,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "AI Queries Used",
      value: "2.4k",
      icon: Sparkles,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      title: "Storage Consumed",
      value: "8.2 GB",
      icon: Database,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Usage Analytics</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                bg-white/70
                backdrop-blur-md
                border
                border-slate-200
                rounded-2xl
                p-8
                shadow-sm
                hover:shadow-lg
                transition-all
                text-center
              "
            >
              <div
                className={`
                  w-14
                  h-14
                  mx-auto
                  mb-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                  ${item.bg}
                `}
              >
                <Icon size={26} className={item.color} />
              </div>

              <h3
                className={`
                  text-5xl
                  font-bold
                  ${item.color}
                `}
              >
                {item.value}
              </h3>

              <p className="mt-3 text-gray-500 text-sm">{item.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
