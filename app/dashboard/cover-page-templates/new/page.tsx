"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewCoverPageTemplatePage() {
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
      name: formData.get("name"),
      content: formData.get("content"),
      is_default: formData.get("is_default") === "on",
    };

    const { error: insertError } = await supabase.from("cover_page_templates").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/cover-page-templates");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/cover-page-templates" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Cover Page Templates
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Cover Page Template</h1>
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
          <label htmlFor="name" className="label">Name</label>
          <input id="name" name="name" type="text" className="input" placeholder="Enter name" required />
        </div>
        <div>
          <label htmlFor="content" className="label">Content</label>
          <textarea id="content" name="content" rows={4} className="input" placeholder="Enter content" required />
        </div>
        <div className="flex items-center gap-3">
          <input id="is_default" name="is_default" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="is_default" className="text-sm font-medium text-gray-700">Is Default</label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Cover Page Template"}
          </button>
          <Link href="/dashboard/cover-page-templates" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
