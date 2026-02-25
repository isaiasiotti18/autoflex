import { Link } from "react-router-dom";

type ProductFormPageProps = {
  mode: "create" | "edit";
};

export function ProductFormPage({ mode }: ProductFormPageProps) {
  const isEdit = mode === "edit";

  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              {isEdit ? "Edit Product" : "Create Product"}
            </h1>
            <p className="text-sm text-slate-600">
              {isEdit
                ? "Update product information and raw material associations."
                : "Create a new product and define its raw material associations."}
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to products
          </Link>
        </div>
      </section>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Product info */}
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Product Information</h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Hex screw"
                defaultValue={isEdit ? "Example Product" : ""}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="value" className="mb-1 block text-sm font-medium text-slate-700">
                Value
              </label>
              <input
                id="value"
                name="value"
                type="number"
                placeholder="22.99"
                defaultValue={isEdit ? 22.99 : 22.99}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
            </div>
          </div>
        </section>

        {/* Raw material associations (RF007 inside product form) */}
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Raw Material Associations</h2>
              <p className="text-sm text-slate-600">
                Define which raw materials are required for this product.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Add raw material
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-3 py-2 font-medium">Raw Material</th>
                  <th className="px-3 py-2 font-medium">Required Quantity</th>
                  <th className="px-3 py-2 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {/* Static preview row */}
                <tr className="border-b">
                  <td className="px-3 py-2">
                    <select className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm">
                      <option>Flour</option>
                      <option>Sugar</option>
                      <option>Milk</option>
                    </select>
                  </td>

                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={1}
                      defaultValue={1}
                      className="w-32 rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                    />
                  </td>

                  <td className="px-3 py-2">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Static empty hint row (optional visual hint) */}
                <tr>
                  <td colSpan={3} className="px-3 py-4 text-center text-slate-500">
                    Add more rows if this product requires additional raw materials.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Actions */}
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              {isEdit ? "Save changes" : "Create product"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
