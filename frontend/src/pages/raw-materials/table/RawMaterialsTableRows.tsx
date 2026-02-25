import { Link } from "react-router-dom";
import { useRawMaterialsTable } from "../../../hooks/useRawMaterialsTable";

export function RawMaterialsTableRows() {
  const { rawMaterials, isDeleting, handleDelete } = useRawMaterialsTable();

  if (!rawMaterials.length) {
    return (
      <tr>
        <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
          No raw materials found.
        </td>
      </tr>
    );
  }

  return (
    <>
      {rawMaterials.map((item) => (
        <tr key={item.id} className="border-t">
          <td className="hidden px-4 py-3 sm:table-cell">{item.id}</td>

          <td className="px-4 py-3">
            <div className="max-w-45 wrap-break-word sm:max-w-none">{item.name}</div>
            <div className="mt-1 text-xs text-slate-500 sm:hidden">ID: {item.id}</div>
          </td>

          <td className="px-4 py-3 whitespace-nowrap">{item.quantity}</td>

          <td className="px-4 py-3">
            <div className="flex justify-end gap-2">
              <Link
                to={`/raw-materials/${item.id}/edit`}
                className="rounded-md border border-slate-300 px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:px-3"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={isDeleting}
                className="rounded-md border border-red-300 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:px-3"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
