"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewFaxPage() {
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
      user_id: user?.id,
      account_id: formData.get("account_id"),
      direction: formData.get("direction"),
      to_number: formData.get("to_number"),
      from_number: formData.get("from_number"),
      status: formData.get("status"),
      failure_reason: formData.get("failure_reason"),
      page_count: formData.get("page_count") ? Number(formData.get("page_count")) : null,
      document_url: formData.get("document_url"),
      cover_page_text: formData.get("cover_page_text"),
      vendor_fax_id: formData.get("vendor_fax_id"),
      sent_at: formData.get("sent_at"),
      delivered_at: formData.get("delivered_at"),
    };

    const { error: insertError } = await supabase.from("faxes").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/faxes");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/faxes" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Faxes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Fax</h1>
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
          <label htmlFor="direction" className="label">Direction</label>
          <input id="direction" name="direction" type="text" className="input" placeholder="Enter direction" required />
        </div>
        <div>
          <label htmlFor="to_number" className="label">To Number</label>
          <input id="to_number" name="to_number" type="text" className="input" placeholder="Enter to number" />
        </div>
        <div>
          <label htmlFor="from_number" className="label">From Number</label>
          <input id="from_number" name="from_number" type="text" className="input" placeholder="Enter from number" />
        </div>
        <div>
          <label htmlFor="status" className="label">Status</label>
          <input id="status" name="status" type="text" className="input" placeholder="Enter status" />
        </div>
        <div>
          <label htmlFor="failure_reason" className="label">Failure Reason</label>
          <input id="failure_reason" name="failure_reason" type="text" className="input" placeholder="Enter failure reason" />
        </div>
        <div>
          <label htmlFor="page_count" className="label">Page Count</label>
          <input id="page_count" name="page_count" type="number" className="input" placeholder="Enter page count" />
        </div>
        <div>
          <label htmlFor="document_url" className="label">Document Url</label>
          <input id="document_url" name="document_url" type="url" className="input" placeholder="Enter document url" />
        </div>
        <div>
          <label htmlFor="cover_page_text" className="label">Cover Page Text</label>
          <input id="cover_page_text" name="cover_page_text" type="text" className="input" placeholder="Enter cover page text" />
        </div>
        <div>
          <label htmlFor="vendor_fax_id" className="label">Vendor Fax Id</label>
          <input id="vendor_fax_id" name="vendor_fax_id" type="text" className="input" placeholder="Enter vendor fax id" />
        </div>
        <div>
          <label htmlFor="sent_at" className="label">Sent At</label>
          <input id="sent_at" name="sent_at" type="datetime-local" className="input" placeholder="Enter sent at" />
        </div>
        <div>
          <label htmlFor="delivered_at" className="label">Delivered At</label>
          <input id="delivered_at" name="delivered_at" type="datetime-local" className="input" placeholder="Enter delivered at" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Fax"}
          </button>
          <Link href="/dashboard/faxes" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
