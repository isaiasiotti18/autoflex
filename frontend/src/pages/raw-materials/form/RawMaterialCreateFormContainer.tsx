import { useNavigate } from "react-router-dom";
import { useCreateRawMaterialForm } from "../../../hooks/useCreateRawMaterialForm";
import { RawMaterialForm } from "./RawMaterialForm";

export function RawMaterialCreateFormContainer() {
  const navigate = useNavigate();
  const { submit, isPending } = useCreateRawMaterialForm();

  return (
    <RawMaterialForm
      defaultValues={{ name: "", quantity: 0 }}
      isPending={isPending}
      submitLabel="Create raw material"
      onSubmit={async (values) => {
        await submit(values);
        navigate("/raw-materials");
      }}
    />
  );
}
