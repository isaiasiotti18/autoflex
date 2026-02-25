export function RawMaterialsTableHead() {
  return (
    <thead className="border-b bg-slate-50 text-left text-slate-600">
      <tr>
        <th className="hidden px-4 py-3 font-medium sm:table-cell">ID</th>
        <th className="px-4 py-3 font-medium">Name</th>
        <th className="px-4 py-3 font-medium">Quantity</th>
        <th className="px-4 py-3 text-right font-medium">Actions</th>
      </tr>
    </thead>
  );
}
