import { Link } from "react-router-dom";
import { formatMoney2 } from "../../utils/formatMoney";
import { useProductionCapacity } from "../../hooks/useProductionCapacity";
import { ProductionCapacityTableBody } from "./table/ProductionCapacityTableBody";

export function ProductionCapacityPage() {
  // Static MVP: using mock to match backend shape.
  const { data, refresh } = useProductionCapacity();

  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Production Capacity</h1>
            <p className="text-sm text-slate-600">
              Products and max producible units based on current raw material stock.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={refresh}
              className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 sm:w-auto"
            >
              Refresh
            </button>
            <Link
              to="/raw-materials"
              className="inline-flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:w-auto"
            >
              Raw materials
            </Link>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border bg-slate-50 p-3">
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Grand total value
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {formatMoney2(data.grandTotalValue)}
            </p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-3">
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Items</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{data.items.length}</p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-3">
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Note</p>
            <p className="mt-1 text-sm text-slate-700">Values are based on producible max units.</p>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-sm">
            <thead className="border-b bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">ID</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Max Units</th>
                <th className="px-4 py-3 font-medium">Unit Value</th>
                <th className="px-4 py-3 font-medium">Total Value</th>
                <th className="px-4 py-3 font-medium">Raw Materials</th>
              </tr>
            </thead>

            <ProductionCapacityTableBody />
          </table>
        </div>
      </section>
    </div>
  );
}
