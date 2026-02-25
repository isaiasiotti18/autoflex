import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "./ProductForm";
import { useEditProductForm } from "../../../hooks/useEditProductForm";
import { Suspense } from "react";
import { ProductRawMaterialsSection } from "./ProductRawMaterialsSection";

export function ProductEditFormContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const productId = Number(id);
  if (!Number.isFinite(productId)) {
    throw new Error("Invalid product id.");
  }

  const { product, submit, isPending } = useEditProductForm(productId);

  return (
    <>
      <ProductForm
        defaultValues={{ name: product.name, value: product.value }}
        isPending={isPending}
        submitLabel="Save changes"
        onSubmit={async (values) => {
          await submit(values);
          navigate("/products");
        }}
      />

      <section id="raw-materials" className="mt-4">
        <Suspense
          fallback={
            <section className="rounded-xl border bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">Loading raw materials...</p>
            </section>
          }
        >
          <ProductRawMaterialsSection productId={product.id} />
        </Suspense>
      </section>
    </>
  );
}
