import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "./ProductForm";
import { useEditProductForm } from "../../../hooks/useEditProductForm";

export function ProductEditFormContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const productId = Number(id);
  if (!Number.isFinite(productId)) {
    throw new Error("Invalid product id.");
  }

  const { product, submit, isPending } = useEditProductForm(productId);

  return (
    <ProductForm
      defaultValues={{ name: product.name, value: product.value }}
      isPending={isPending}
      submitLabel="Save changes"
      onSubmit={async (values) => {
        await submit(values);
        navigate("/products");
      }}
    />
  );
}
