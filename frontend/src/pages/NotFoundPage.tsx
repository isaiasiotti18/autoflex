import { Link, useLocation } from "react-router-dom";

export function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-lg rounded-xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          <span className="text-xl font-semibold">404</span>
        </div>

        <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>

        <p className="mt-2 text-sm text-slate-600">
          The requested route does not exist or has been moved.
        </p>

        <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-left">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Requested route
          </p>
          <code className="mt-1 block text-sm break-all text-slate-800">
            {location.pathname || "/"}
          </code>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            to="/"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Back to home
          </Link>

          <Link
            to="/products"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Go to products
          </Link>
        </div>
      </div>
    </div>
  );
}
