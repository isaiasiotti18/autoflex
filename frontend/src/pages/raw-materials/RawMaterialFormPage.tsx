import { Suspense } from "react";
import { Link } from "react-router-dom";

import { RawMaterialCreateFormContainer } from "./form/RawMaterialCreateFormContainer";
import { RawMaterialEditFormContainer } from "./form/RawMaterialEditFormContainer";

type RawMaterialFormPageProps = {
  mode: "create" | "edit";
};

export function RawMaterialFormPage({ mode }: RawMaterialFormPageProps) {
  const isEdit = mode === "edit";

  return (
    <div className="space-y-4">
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              {isEdit ? "Edit Raw Material" : "Create Raw Material"}
            </h1>
            <p className="text-sm text-slate-600">
              {isEdit
                ? "Update raw material information and quantity."
                : "Create a new raw material and set its quantity."}
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

      {isEdit ? (
        <Suspense fallback={<RawMaterialFormLoading />}>
          <RawMaterialEditFormContainer />
        </Suspense>
      ) : (
        <RawMaterialCreateFormContainer />
      )}
    </div>
  );
}

function RawMaterialFormLoading() {
  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">Loading raw material...</p>
    </section>
  );
}
