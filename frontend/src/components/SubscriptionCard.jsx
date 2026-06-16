import { CreditCard, Download, Crown } from "lucide-react";

export default function SubscriptionCard() {
  const invoices = [
    {
      date: "Oct 12, 2025",
      invoice: "INV-2025-0892",
      amount: "$199.00",
    },
    {
      date: "Oct 12, 2024",
      invoice: "INV-2024-0412",
      amount: "$199.00",
    },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Subscription & Billing</h2>

      {/* Current Plan */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Current Plan
            </p>

            <div className="flex items-center gap-2 mt-2">
              <Crown size={18} className="text-blue-600" />

              <h3 className="text-xl font-bold text-blue-600">
                DocMind Pro Yearly
              </h3>
            </div>
          </div>

          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Active
          </span>
        </div>

        <p className="mt-5 text-gray-600 leading-relaxed">
          Your next billing date is{" "}
          <span className="font-semibold">October 12, 2026</span> for{" "}
          <span className="font-semibold">$199.00</span>.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            className="
              flex-1
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-medium
              transition-all
            "
          >
            Upgrade Plan
          </button>

          <button
            className="
              px-5
              py-3
              border
              border-slate-300
              rounded-xl
              hover:bg-slate-50
              transition-all
            "
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Billing History */}

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">
          Recent Billing History
        </h3>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {invoices.map((invoice) => (
            <div
              key={invoice.invoice}
              className="
                flex
                justify-between
                items-center
                p-5
                border-b
                last:border-b-0
              "
            >
              <div>
                <p className="font-semibold">{invoice.date}</p>

                <p className="text-sm text-gray-500">{invoice.invoice}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">{invoice.amount}</p>

                <button
                  className="
                    text-blue-600
                    text-sm
                    flex
                    items-center
                    gap-1
                    hover:underline
                  "
                >
                  <Download size={14} />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <CreditCard size={22} className="text-blue-600" />

          <div>
            <h4 className="font-semibold">Payment Method</h4>

            <p className="text-sm text-gray-500">Visa ending in 4242</p>
          </div>
        </div>
      </div>
    </section>
  );
}
