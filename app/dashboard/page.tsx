import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch counts for each table
  const { count: accountsCount } = await supabase.from("accounts").select("*", { count: "exact", head: true });
  const { count: faxesCount } = await supabase.from("faxes").select("*", { count: "exact", head: true });
  const { count: contactsCount } = await supabase.from("contacts").select("*", { count: "exact", head: true });
  const { count: coverPageTemplatesCount } = await supabase.from("cover_page_templates").select("*", { count: "exact", head: true });
  const { count: faxNumbersCount } = await supabase.from("fax_numbers").select("*", { count: "exact", head: true });
  const { count: usageLogsCount } = await supabase.from("usage_logs").select("*", { count: "exact", head: true });

  const stats = [
    { name: "Accounts", value: accountsCount ?? 0, href: "/dashboard/accounts", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" },
    { name: "Faxes", value: faxesCount ?? 0, href: "/dashboard/faxes", icon: "M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" },
    { name: "Contacts", value: contactsCount ?? 0, href: "/dashboard/contacts", icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" },
    { name: "Cover Page Templates", value: coverPageTemplatesCount ?? 0, href: "/dashboard/cover-page-templates", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "Fax Numbers", value: faxNumbersCount ?? 0, href: "/dashboard/fax-numbers", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
    { name: "Usage Logs", value: usageLogsCount ?? 0, href: "/dashboard/usage-logs", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back{user?.email ? `, ${user.email}` : ""}. Here&apos;s an overview.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} className="card group hover:border-brand-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/accounts" className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-brand-300 transition-all">
            <span className="text-sm font-medium text-gray-700">Manage Accounts</span>
            <svg className="ml-auto h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
          <Link href="/dashboard/faxes" className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-brand-300 transition-all">
            <span className="text-sm font-medium text-gray-700">Manage Faxes</span>
            <svg className="ml-auto h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
          <Link href="/dashboard/contacts" className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-brand-300 transition-all">
            <span className="text-sm font-medium text-gray-700">Manage Contacts</span>
            <svg className="ml-auto h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
          <Link href="/dashboard/cover-page-templates" className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-brand-300 transition-all">
            <span className="text-sm font-medium text-gray-700">Manage Cover Page Templates</span>
            <svg className="ml-auto h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
          <Link href="/dashboard/fax-numbers" className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-brand-300 transition-all">
            <span className="text-sm font-medium text-gray-700">Manage Fax Numbers</span>
            <svg className="ml-auto h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
          <Link href="/dashboard/usage-logs" className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-brand-300 transition-all">
            <span className="text-sm font-medium text-gray-700">Manage Usage Logs</span>
            <svg className="ml-auto h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
