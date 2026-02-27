import { Link } from "react-router-dom";
import { useProductsTable } from "../../hooks/useProductsTable";
import { formatMoney2 } from "../../utils/formatMoney";

export function ProductsTableRows() {
  const { products, isDeleting, handleDelete } = useProductsTable();

  if (!products.length) {
    return (
      <tr>
        <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
          No products found.
        </td>
      </tr>
    );
  }

  return (
    <>
      {products.map((product) => (
        <tr key={product.id} className="border-t">
          <td className="hidden px-4 py-3 sm:table-cell">{product.id}</td>

          <td className="px-4 py-3">
            <div className="max-w-[140px] break-words sm:max-w-none">{product.name}</div>
            <div className="mt-1 text-xs text-slate-500 sm:hidden">ID: {product.id}</div>
          </td>

          {/* Raw - Materials */}
          <td className="px-4 py-3">
            {!product.rawMaterials || product.rawMaterials.length === 0 ? (
              <span className="text-slate-500">No raw materials</span>
            ) : (
              <div className="flex flex-col gap-1">
                {product.rawMaterials.map((rm) => (
                  <div
                    key={`${product.id}-${rm.rawMaterialId}`}
                    className="inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs"
                  >
                    <span className="font-medium text-slate-800">{rm.rawMaterialName}</span>
                    <span className="text-slate-500">Qty: {rm.requiredQuantity}</span>
                  </div>
                ))}
              </div>
            )}
          </td>

          <td className="px-4 py-3">
            <div className="max-w-[140px] break-words sm:max-w-none">
              {formatMoney2(product.value)}
            </div>
          </td>

          <td className="px-4 py-3">
            <div className="flex justify-end gap-2">
              <Link
                to={`/products/${product.id}/edit`}
                className="rounded-md border border-slate-300 px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:px-3"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(product.id)}
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
