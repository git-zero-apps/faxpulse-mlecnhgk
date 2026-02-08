"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewAccountPage() {
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
      owner_id: formData.get("owner_id"),
      subscription_plan: formData.get("subscription_plan"),
      subscription_status: formData.get("subscription_status"),
      stripe_customer_id: formData.get("stripe_customer_id"),
      stripe_subscription_id: formData.get("stripe_subscription_id"),
      pages_sent_this_month: formData.get("pages_sent_this_month") ? Number(formData.get("pages_sent_this_month")) : null,
      pages_received_this_month: formData.get("pages_received_this_month") ? Number(formData.get("pages_received_this_month")) : null,
      billing_period_start: formData.get("billing_period_start"),
      billing_period_end: formData.get("billing_period_end"),
    };

    const { error: insertError } = await supabase.from("accounts").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/accounts");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/accounts" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Accounts
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Account</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="owner_id" className="label">Owner Id</label>
          <input id="owner_id" name="owner_id" type="text" className="input" placeholder="Enter owner id" required />
        </div>
        <div>
          <label htmlFor="subscription_plan" className="label">Subscription Plan</label>
          <input id="subscription_plan" name="subscription_plan" type="text" className="input" placeholder="Enter subscription plan" />
        </div>
        <div>
          <label htmlFor="subscription_status" className="label">Subscription Status</label>
          <input id="subscription_status" name="subscription_status" type="text" className="input" placeholder="Enter subscription status" />
        </div>
        <div>
          <label htmlFor="stripe_customer_id" className="label">Stripe Customer Id</label>
          <input id="stripe_customer_id" name="stripe_customer_id" type="text" className="input" placeholder="Enter stripe customer id" />
        </div>
        <div>
          <label htmlFor="stripe_subscription_id" className="label">Stripe Subscription Id</label>
          <input id="stripe_subscription_id" name="stripe_subscription_id" type="text" className="input" placeholder="Enter stripe subscription id" />
        </div>
        <div>
          <label htmlFor="pages_sent_this_month" className="label">Pages Sent This Month</label>
          <input id="pages_sent_this_month" name="pages_sent_this_month" type="number" className="input" placeholder="Enter pages sent this month" />
        </div>
        <div>
          <label htmlFor="pages_received_this_month" className="label">Pages Received This Month</label>
          <input id="pages_received_this_month" name="pages_received_this_month" type="number" className="input" placeholder="Enter pages received this month" />
        </div>
        <div>
          <label htmlFor="billing_period_start" className="label">Billing Period Start</label>
          <input id="billing_period_start" name="billing_period_start" type="datetime-local" className="input" placeholder="Enter billing period start" />
        </div>
        <div>
          <label htmlFor="billing_period_end" className="label">Billing Period End</label>
          <input id="billing_period_end" name="billing_period_end" type="datetime-local" className="input" placeholder="Enter billing period end" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Account"}
          </button>
          <Link href="/dashboard/accounts" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
