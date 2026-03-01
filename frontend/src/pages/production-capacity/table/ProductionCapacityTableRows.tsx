import { useProductionCapacity } from "../../../hooks/useProductionCapacity";
import { ProductionCapacityTableRow } from "./ProductionCapacityTableRow";

export function ProductionCapacityTableRows() {
  const { data } = useProductionCapacity();

  if (data.items.length === 0) {
    return (
      <tr>
        <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
          No results yet. Click <span className="font-medium">Refresh</span>.
        </td>
      </tr>
    );
  }

  return <ProductionCapacityTableRow items={data.items} />;
}
