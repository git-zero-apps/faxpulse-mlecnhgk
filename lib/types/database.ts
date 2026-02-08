// Auto-generated database types from ZERO Builder
// Do not edit manually
export interface Profiles {
  id: string;
  full_name: string;
  role: string;
  account_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfilesInsert {
  full_name: string;
  role?: string;
  account_id: string | null;
}

export interface Accounts {
  id?: string;
  owner_id: string;
  subscription_plan: string;
  subscription_status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  pages_sent_this_month: number;
  pages_received_this_month: number;
  billing_period_start: string | null;
  billing_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountsInsert {
  owner_id: string;
  subscription_plan?: string;
  subscription_status?: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  pages_sent_this_month?: number;
  pages_received_this_month?: number;
  billing_period_start: string | null;
  billing_period_end: string | null;
}

export interface Faxes {
  id?: string;
  account_id: string;
  user_id: string;
  direction: string;
  to_number: string | null;
  from_number: string | null;
  status: string;
  failure_reason: string | null;
  page_count: number;
  document_url: string | null;
  cover_page_text: string | null;
  vendor_fax_id: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface FaxesInsert {
  account_id: string;
  user_id: string;
  direction: string;
  to_number: string | null;
  from_number: string | null;
  status?: string;
  failure_reason: string | null;
  page_count?: number;
  document_url: string | null;
  cover_page_text: string | null;
  vendor_fax_id: string | null;
  sent_at: string | null;
  delivered_at: string | null;
}

export interface Contacts {
  id?: string;
  account_id: string;
  user_id: string;
  name: string;
  fax_number: string;
  company: string | null;
  email: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactsInsert {
  account_id: string;
  user_id: string;
  name: string;
  fax_number: string;
  company: string | null;
  email: string | null;
  notes: string | null;
}

export interface CoverPageTemplates {
  id?: string;
  account_id: string;
  user_id: string;
  name: string;
  content: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CoverPageTemplatesInsert {
  account_id: string;
  user_id: string;
  name: string;
  content: string;
  is_default?: boolean;
}

export interface FaxNumbers {
  id?: string;
  account_id: string;
  number: string;
  label: string | null;
  assigned_user_id: string | null;
  status: string;
  vendor_number_id: string | null;
  area_code: string | null;
  created_at: string;
  updated_at: string;
}

export interface FaxNumbersInsert {
  account_id: string;
  number: string;
  label: string | null;
  assigned_user_id: string | null;
  status?: string;
  vendor_number_id: string | null;
  area_code: string | null;
}

export interface UsageLogs {
  id?: string;
  account_id: string;
  period_start: string;
  period_end: string;
  pages_sent: number;
  pages_received: number;
  total_faxes_sent: number;
  total_faxes_received: number;
  created_at: string;
}

export interface UsageLogsInsert {
  account_id: string;
  period_start: string;
  period_end: string;
  pages_sent?: number;
  pages_received?: number;
  total_faxes_sent?: number;
  total_faxes_received?: number;
}
