import type { ProductionCapacityItem } from "../../../domain/ProductionCapacity";
import { formatMoney2 } from "../../../utils/formatMoney";

type Props = { items: ProductionCapacityItem[] };

export function ProductionCapacityTableRow({ items }: Props) {
  return (
    <>
      {items.map((item) => (
        <tr key={item.id} className="border-t">
          <td className="hidden px-4 py-3 sm:table-cell">{item.id}</td>

          <td className="px-4 py-3">
            <div className="max-w-[220px] break-words sm:max-w-none">{item.name}</div>
            <div className="mt-1 text-xs text-slate-500 sm:hidden">ID: {item.id}</div>
          </td>

          <td className="px-4 py-3 whitespace-nowrap">
            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
              {item.maxUnits}
            </span>
          </td>

          <td className="px-4 py-3 whitespace-nowrap">{formatMoney2(item.value)}</td>
          <td className="px-4 py-3 whitespace-nowrap">{formatMoney2(item.totalValue)}</td>

          <td className="px-4 py-3">
            {item.rawMaterials.length === 0 ? (
              <span className="text-slate-500">No raw materials</span>
            ) : (
              <ul className="space-y-1">
                {item.rawMaterials.map((rm) => (
                  <li key={`${item.id}-${rm.rawMaterialId}`} className="text-slate-700">
                    <span className="font-medium">{rm.rawMaterialName}</span>
                    <span className="text-slate-500"> — Qty: {rm.requiredQuantity}</span>
                  </li>
                ))}
              </ul>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
