import { Link } from "react-router-dom";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { RawMaterialsTableRows } from "./RawMaterialsTableRows";

export function RawMaterialsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Raw Materials</h1>
            <p className="text-sm text-slate-600">
              Manage raw material records and stock quantities.
            </p>
          </div>

          <Link
            to="/raw-materials/new"
            className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 sm:w-auto"
          >
            Create raw material
          </Link>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                      <tr>
                        <td colSpan={4} className="px-4 py-10 text-center">
                          <div className="space-y-2">
                            <p className="text-sm text-red-600">Failed to load raw materials.</p>
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
                            Loading raw materials...
                          </td>
                        </tr>
                      }
                    >
                      <RawMaterialsTableRows />
                    </Suspense>
                  </ErrorBoundary>
                )}
              </QueryErrorResetBoundary>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
