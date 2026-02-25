import { useNavigate } from "react-router-dom";
import { ProductForm } from "./ProductForm";
import { useCreateProductForm } from "../../../hooks/useCreateProductForm";

export function ProductCreateFormContainer() {
  const navigate = useNavigate();
  const { submit, isPending } = useCreateProductForm();

  return (
    <ProductForm
      defaultValues={{ name: "", value: 0 }}
      isPending={isPending}
      submitLabel="Create product"
      onSubmit={async (values) => {
        await submit(values);
        const created = await submit(values);
        navigate(`/products/${created.id}/edit#raw-materials`);
      }}
    />
  );
}
