import { Link } from "react-router-dom";

import { RawMaterialsTableHead } from "./table/RawMaterialsTableHead";
import { RawMaterialsTableBody } from "./table/RawMaterialsTableBody";
import { RawMaterialsTableRows } from "./table/RawMaterialsTableRows";

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
            to="/raw-materials/create"
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
            <RawMaterialsTableHead />

            <RawMaterialsTableBody>
              <RawMaterialsTableRows />
            </RawMaterialsTableBody>
          </table>
        </div>
      </section>
    </div>
  );
}
