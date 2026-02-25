import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  rawMaterialFormSchema,
  type RawMaterialFormValues,
} from "../../../validations/raw-material.schema";

type RawMaterialFormProps = {
  defaultValues: RawMaterialFormValues;
  onSubmit: (values: RawMaterialFormValues) => Promise<void>;
  isPending: boolean;
  submitLabel: string;
};

export function RawMaterialForm({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel,
}: RawMaterialFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RawMaterialFormValues>({
    resolver: zodResolver(rawMaterialFormSchema),
    defaultValues,
  });

  const submitHandler = handleSubmit(async (values) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Raw material form submit failed:", error);
      alert("Failed to save raw material.");
    }
  });

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Raw Material Information</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Flour"
              disabled={isPending}
              {...register("name")}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="quantity" className="mb-1 block text-sm font-medium text-slate-700">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min={0}
              disabled={isPending}
              {...register("quantity", { valueAsNumber: true })}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
            {errors.quantity && (
              <p className="mt-1 text-xs text-red-600">{errors.quantity.message}</p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Link
            to="/raw-materials"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Saving..." : submitLabel}
          </button>
        </div>
      </section>
    </form>
  );
}
