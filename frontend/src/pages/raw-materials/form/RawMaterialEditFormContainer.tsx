import { useNavigate, useParams } from "react-router-dom";
import { useEditRawMaterialForm } from "../../../hooks/useEditRawMaterialForm";
import { RawMaterialForm } from "./RawMaterialForm";

export function RawMaterialEditFormContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const rawMaterialId = Number(id);
  if (!Number.isFinite(rawMaterialId)) {
    throw new Error("Invalid raw material id.");
  }

  const { rawMaterial, submit, isPending } = useEditRawMaterialForm(rawMaterialId);

  return (
    <RawMaterialForm
      defaultValues={{
        name: rawMaterial.name,
        quantity: rawMaterial.quantity,
      }}
      isPending={isPending}
      submitLabel="Save changes"
      onSubmit={async (values) => {
        await submit(values);
        navigate("/raw-materials");
      }}
    />
  );
}
