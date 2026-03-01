import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useProductionCapacity } from "../../../hooks/useProductionCapacity";
import { formatMoney2 } from "../../../utils/formatMoney";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { ProductionCapacityTableRow } from "./ProductionCapacityTableRow";

export function ProductionCapacityTableBody() {
  const { data, refresh } = useProductionCapacity();

  return (
    <tbody>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center">
                  <div className="space-y-2">
                    <p className="text-sm text-red-600">Failed to load products.</p>
                    <button
                      type="button"
                      onClick={resetErrorBoundary}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Try again
                    </button>
                  </div>
                </td>
              </tr>
            )}
          >
            <Suspense
              fallback={
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                    Loading products...
                  </td>
                </tr>
              }
            >
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                    No results yet. Click <span className="font-medium">Refresh</span>.
                  </td>
                </tr>
              ) : (
                <ProductionCapacityTableRow
                  grandTotalValue={data.grandTotalValue}
                  items={data.items}
                />
              )}
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </tbody>
  );
}
