import { Link } from "react-router-dom";

type QuickLink = {
  title: string;
  description: string;
  to: string;
  cta: string;
};

const quickLinks: QuickLink[] = [
  {
    title: "Products",
    description: "Create, edit, delete, and list products.",
    to: "/products",
    cta: "Go to products",
  },
  {
    title: "Raw Materials",
    description: "Create, edit, delete, and manage stock.",
    to: "/raw-materials",
    cta: "Go to raw materials",
  },
  {
    title: "Production Capacity",
    description: "Check which products can be produced with the current stock.",
    to: "/production-capacity",
    cta: "Check production",
  },
];

export function HomePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">AutoFlex</h1>
            <p className="mt-1 text-sm text-slate-600">
              MVP for product and raw material management, plus production capacity lookup.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/products/create"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Create product
            </Link>
            <Link
              to="/raw-materials/create"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Create raw material
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Quick Links</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            >
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
                <span className="inline-flex text-sm font-medium text-slate-900 underline-offset-2 group-hover:underline">
                  {item.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
