"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewUsageLogPage() {
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
      period_start: formData.get("period_start"),
      period_end: formData.get("period_end"),
      pages_sent: formData.get("pages_sent") ? Number(formData.get("pages_sent")) : null,
      pages_received: formData.get("pages_received") ? Number(formData.get("pages_received")) : null,
      total_faxes_sent: formData.get("total_faxes_sent") ? Number(formData.get("total_faxes_sent")) : null,
      total_faxes_received: formData.get("total_faxes_received") ? Number(formData.get("total_faxes_received")) : null,
    };

    const { error: insertError } = await supabase.from("usage_logs").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/usage-logs");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/usage-logs" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Usage Logs
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Usage Log</h1>
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
          <label htmlFor="period_start" className="label">Period Start</label>
          <input id="period_start" name="period_start" type="datetime-local" className="input" placeholder="Enter period start" required />
        </div>
        <div>
          <label htmlFor="period_end" className="label">Period End</label>
          <input id="period_end" name="period_end" type="datetime-local" className="input" placeholder="Enter period end" required />
        </div>
        <div>
          <label htmlFor="pages_sent" className="label">Pages Sent</label>
          <input id="pages_sent" name="pages_sent" type="number" className="input" placeholder="Enter pages sent" />
        </div>
        <div>
          <label htmlFor="pages_received" className="label">Pages Received</label>
          <input id="pages_received" name="pages_received" type="number" className="input" placeholder="Enter pages received" />
        </div>
        <div>
          <label htmlFor="total_faxes_sent" className="label">Total Faxes Sent</label>
          <input id="total_faxes_sent" name="total_faxes_sent" type="number" className="input" placeholder="Enter total faxes sent" />
        </div>
        <div>
          <label htmlFor="total_faxes_received" className="label">Total Faxes Received</label>
          <input id="total_faxes_received" name="total_faxes_received" type="number" className="input" placeholder="Enter total faxes received" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Usage Log"}
          </button>
          <Link href="/dashboard/usage-logs" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
