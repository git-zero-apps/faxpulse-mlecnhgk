"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditFaxPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [record, setRecord] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchRecord() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("faxes")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) setError(error.message);
      else setRecord(data);
      setFetching(false);
    }
    fetchRecord();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();

    const updates: Record<string, unknown> = {
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

    const { error: updateError } = await supabase
      .from("faxes")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/faxes");
      router.refresh();
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4">
        <p className="text-sm text-red-700">Fax not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/faxes" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Faxes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Fax</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="account_id" className="label">Account Id</label>
          <input id="account_id" name="account_id" type="text" className="input" defaultValue={String(record.account_id ?? "")} required />
        </div>
        <div>
          <label htmlFor="direction" className="label">Direction</label>
          <input id="direction" name="direction" type="text" className="input" defaultValue={String(record.direction ?? "")} required />
        </div>
        <div>
          <label htmlFor="to_number" className="label">To Number</label>
          <input id="to_number" name="to_number" type="text" className="input" defaultValue={String(record.to_number ?? "")} />
        </div>
        <div>
          <label htmlFor="from_number" className="label">From Number</label>
          <input id="from_number" name="from_number" type="text" className="input" defaultValue={String(record.from_number ?? "")} />
        </div>
        <div>
          <label htmlFor="status" className="label">Status</label>
          <input id="status" name="status" type="text" className="input" defaultValue={String(record.status ?? "")} />
        </div>
        <div>
          <label htmlFor="failure_reason" className="label">Failure Reason</label>
          <input id="failure_reason" name="failure_reason" type="text" className="input" defaultValue={String(record.failure_reason ?? "")} />
        </div>
        <div>
          <label htmlFor="page_count" className="label">Page Count</label>
          <input id="page_count" name="page_count" type="number" className="input" defaultValue={String(record.page_count ?? "")} />
        </div>
        <div>
          <label htmlFor="document_url" className="label">Document Url</label>
          <input id="document_url" name="document_url" type="url" className="input" defaultValue={String(record.document_url ?? "")} />
        </div>
        <div>
          <label htmlFor="cover_page_text" className="label">Cover Page Text</label>
          <input id="cover_page_text" name="cover_page_text" type="text" className="input" defaultValue={String(record.cover_page_text ?? "")} />
        </div>
        <div>
          <label htmlFor="vendor_fax_id" className="label">Vendor Fax Id</label>
          <input id="vendor_fax_id" name="vendor_fax_id" type="text" className="input" defaultValue={String(record.vendor_fax_id ?? "")} />
        </div>
        <div>
          <label htmlFor="sent_at" className="label">Sent At</label>
          <input id="sent_at" name="sent_at" type="datetime-local" className="input" defaultValue={String(record.sent_at ?? "")} />
        </div>
        <div>
          <label htmlFor="delivered_at" className="label">Delivered At</label>
          <input id="delivered_at" name="delivered_at" type="datetime-local" className="input" defaultValue={String(record.delivered_at ?? "")} />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Fax"}
          </button>
          <Link href="/dashboard/faxes" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
