import { useProductRawMaterialsSection } from "../../../hooks/useProductRawMaterialsSection";

type Props = { productId: number };

export function ProductRawMaterialsSection({ productId }: Props) {
  const {
    associations,
    availableOptions,
    selectedRawMaterialId,
    setRawMaterialId,
    requiredQuantity,
    setRequiredQuantity,
    add,
    remove,
    updateQty,
    isBusy,
  } = useProductRawMaterialsSection(productId);

  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Raw Materials</h2>
      <p className="text-sm text-slate-600">Manage required quantities.</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <label className="mb-1 block text-sm font-medium text-slate-700">Raw material</label>
          <select
            value={selectedRawMaterialId}
            onChange={(e) => setRawMaterialId(Number(e.target.value))}
            disabled={isBusy || availableOptions.length === 0}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50"
          >
            {availableOptions.length === 0 ? (
              <option value={0}>No available raw materials</option>
            ) : (
              availableOptions.map((rm) => (
                <option key={rm.id} value={rm.id}>
                  {rm.name} (stock: {rm.quantity})
                </option>
              ))
            )}
          </select>
        </div>

        <div className="sm:col-span-3">
          <label className="mb-1 block text-sm font-medium text-slate-700">Required qty</label>
          <input
            type="number"
            min={1}
            value={requiredQuantity}
            onChange={(e) => setRequiredQuantity(Number(e.target.value))}
            disabled={isBusy}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50"
          />
        </div>

        <div className="sm:col-span-2 sm:flex sm:items-end">
          <button
            type="button"
            onClick={() => add().catch(() => alert("Failed to add raw material."))}
            disabled={isBusy || !selectedRawMaterialId || availableOptions.length === 0}
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Required qty</th>
              <th className="px-3 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {associations.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-6 text-center text-slate-500">
                  No raw materials associated.
                </td>
              </tr>
            ) : (
              associations.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="px-3 py-2">
                    <span className="font-medium text-slate-900">{a.rawMaterialName}</span>
                  </td>

                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={1}
                      defaultValue={a.requiredQuantity}
                      onBlur={(e) => {
                        const qty = Number(e.target.value);
                        if (qty === a.requiredQuantity) return;
                        updateQty(a.id, a.rawMaterialId, qty).catch(() => {
                          alert("Failed to update required quantity.");
                        });
                      }}
                      className="w-28 rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                    />
                  </td>

                  <td className="px-3 py-2">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (!window.confirm("Remove this raw material from the product?")) return;
                          remove(a.id).catch(() => alert("Failed to remove raw material."));
                        }}
                        disabled={isBusy}
                        className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
