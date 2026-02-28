import { Link } from "react-router-dom";
import type { ProductionCapacityResponse } from "../../domain/ProductionCapacity";
import { formatMoney2 } from "../../utils/formatMoney";
import { useProductionCapacity } from "../../hooks/useProductionCapacity";

const mock: ProductionCapacityResponse = {
  grandTotalValue: 55246.88,
  items: [
    {
      id: 49,
      name: "Stainless Steel Screw (box 500)",
      maxUnits: 66,
      value: 120,
      totalValue: 7920,
      rawMaterials: [
        { rawMaterialId: 23, rawMaterialName: "Steel Bar (kg)", requiredQuantity: 6 },
        { rawMaterialId: 35, rawMaterialName: "Chrome Plating (L)", requiredQuantity: 3 },
      ],
    },
    {
      id: 64,
      name: 'Anchor Bolt 5/8" (box 50)',
      maxUnits: 5,
      value: 95,
      totalValue: 475,
      rawMaterials: [
        { rawMaterialId: 26, rawMaterialName: "Zinc (kg)", requiredQuantity: 4 },
        { rawMaterialId: 23, rawMaterialName: "Steel Bar (kg)", requiredQuantity: 10 },
      ],
    },
  ],
};

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

            <tbody>
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                    No results yet. Click <span className="font-medium">Refresh</span>.
                  </td>
                </tr>
              ) : (
                data.items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="hidden px-4 py-3 sm:table-cell">{item.id}</td>

                    <td className="px-4 py-3">
                      <div className="max-w-55 wrap-break-word sm:max-w-none">{item.name}</div>
                      <div className="mt-1 text-xs text-slate-500 sm:hidden">ID: {item.id}</div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        {item.maxUnits}
                      </span>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">{formatMoney2(item.value)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatMoney2(item.totalValue)}</td>

                    <td className="px-4 py-3">
                      {item.rawMaterials.length === 0 ? (
                        <span className="text-slate-500">No raw materials</span>
                      ) : (
                        <ul className="space-y-1">
                          {item.rawMaterials.map((rm) => (
                            <li key={`${item.id}-${rm.rawMaterialId}`} className="text-slate-700">
                              <span className="font-medium">{rm.rawMaterialName}</span>
                              <span className="text-slate-500"> — Qty: {rm.requiredQuantity}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
