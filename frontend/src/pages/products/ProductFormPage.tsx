// src/pages/products/ProductFormPage.tsx
import { Suspense } from "react";
import { Link } from "react-router-dom";

import { ProductCreateFormContainer } from "./form/ProductCreateFormContainer";
import { ProductEditFormContainer } from "./form/ProductEditFormContainer";

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
              {isEdit ? "Update product information." : "Create a new product with name and value."}
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
      {isEdit ? (
        <Suspense
          fallback={
            <section className="rounded-xl border bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Loading product...</p>
            </section>
          }
        >
          <ProductEditFormContainer />
        </Suspense>
      ) : (
        <ProductCreateFormContainer />
      )}
    </div>
  );
}
