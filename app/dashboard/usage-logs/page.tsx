import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

export default async function UsageLogsPage() {
  const supabase = await createClient();
  const { data: items, error } = await supabase
    .from("usage_logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4">
        <p className="text-sm text-red-700">Error loading usage_logs: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usage Logs</h1>
          <p className="mt-1 text-sm text-gray-500">{items?.length ?? 0} total</p>
        </div>
        <Link href="/dashboard/usage-logs/new" className="btn-primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Usage Log
        </Link>
      </div>

      {items && items.length > 0 ? (
        <div className="card overflow-hidden !p-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period Start</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period End</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Faxes Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Faxes Received</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item: Record<string, unknown>) => (
                <tr key={item.id as string} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{String(item.account_id ?? "—")}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{String(item.period_start ?? "—")}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{String(item.period_end ?? "—")}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{String(item.pages_sent ?? "—")}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{String(item.pages_received ?? "—")}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{String(item.total_faxes_sent ?? "—")}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{String(item.total_faxes_received ?? "—")}</td>
                  <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                    <Link href={`/dashboard/usage-logs/${item.id}/edit`} className="text-brand-600 hover:text-brand-800 font-medium mr-4">
                      Edit
                    </Link>
                    <DeleteButton id={item.id as string} table="usage_logs" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <h3 className="mt-4 text-sm font-semibold text-gray-900">No usage logs</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first usage log.</p>
          <Link href="/dashboard/usage-logs/new" className="btn-primary mt-6 inline-flex">
            Add Usage Log
          </Link>
        </div>
      )}
    </div>
  );
}
