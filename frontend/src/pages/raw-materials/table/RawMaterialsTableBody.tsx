import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type RawMaterialsTableBodyProps = {
  children: ReactNode;
};

export function RawMaterialsTableBody({ children }: RawMaterialsTableBodyProps) {
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
              {children}
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </tbody>
  );
}
