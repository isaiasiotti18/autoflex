import { Link } from "react-router-dom";

export function RawMaterialsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Raw Materials</h1>
            <p className="text-sm text-slate-600">
              Manage raw material records and stock quantities.
            </p>
          </div>

          <Link
            to="/raw-materials/new"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Create raw material
          </Link>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Stock Quantity</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* Static empty state row (MVP) */}
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  No raw materials found.
                </td>
              </tr>

              {/* Example static row (optional preview)
              <tr className="border-t">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Flour</td>
                <td className="px-4 py-3">120</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      to="/raw-materials/1/edit"
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              */}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
