import { Link } from "react-router-dom";

type RawMaterialFormPageProps = {
  mode: "create" | "edit";
};

export function RawMaterialFormPage({ mode }: RawMaterialFormPageProps) {
  const isEdit = mode === "edit";

  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              {isEdit ? "Edit Raw Material" : "Create Raw Material"}
            </h1>
            <p className="text-sm text-slate-600">
              {isEdit
                ? "Update raw material information and stock quantity."
                : "Create a new raw material and set its stock quantity."}
            </p>
          </div>

          <Link
            to="/raw-materials"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to raw materials
          </Link>
        </div>
      </section>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Raw Material Information</h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Flour"
                defaultValue={isEdit ? "Example Raw Material" : ""}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="mb-1 block text-sm font-medium text-slate-700">
                Stock Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min={0}
                placeholder="0"
                defaultValue={isEdit ? 100 : 0}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Link
              to="/raw-materials"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              {isEdit ? "Save changes" : "Create raw material"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
