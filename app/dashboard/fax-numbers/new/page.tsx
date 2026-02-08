"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewFaxNumberPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const record: Record<string, unknown> = {
      account_id: formData.get("account_id"),
      number: formData.get("number"),
      label: formData.get("label"),
      assigned_user_id: formData.get("assigned_user_id"),
      status: formData.get("status"),
      vendor_number_id: formData.get("vendor_number_id"),
      area_code: formData.get("area_code"),
    };

    const { error: insertError } = await supabase.from("fax_numbers").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/fax-numbers");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/fax-numbers" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Fax Numbers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Fax Number</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="account_id" className="label">Account Id</label>
          <input id="account_id" name="account_id" type="text" className="input" placeholder="Enter account id" required />
        </div>
        <div>
          <label htmlFor="number" className="label">Number</label>
          <input id="number" name="number" type="text" className="input" placeholder="Enter number" required />
        </div>
        <div>
          <label htmlFor="label" className="label">Label</label>
          <input id="label" name="label" type="text" className="input" placeholder="Enter label" />
        </div>
        <div>
          <label htmlFor="assigned_user_id" className="label">Assigned User Id</label>
          <input id="assigned_user_id" name="assigned_user_id" type="text" className="input" placeholder="Enter assigned user id" />
        </div>
        <div>
          <label htmlFor="status" className="label">Status</label>
          <input id="status" name="status" type="text" className="input" placeholder="Enter status" />
        </div>
        <div>
          <label htmlFor="vendor_number_id" className="label">Vendor Number Id</label>
          <input id="vendor_number_id" name="vendor_number_id" type="text" className="input" placeholder="Enter vendor number id" />
        </div>
        <div>
          <label htmlFor="area_code" className="label">Area Code</label>
          <input id="area_code" name="area_code" type="text" className="input" placeholder="Enter area code" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Fax Number"}
          </button>
          <Link href="/dashboard/fax-numbers" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
