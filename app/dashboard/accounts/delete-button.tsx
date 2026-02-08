"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ id, table }: { id: string; table: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this?")) return;
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: deleteError } = await supabase.from(table).delete().eq("id", id);
    setLoading(false);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    router.refresh();
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
      >
        {loading ? "..." : "Delete"}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </>
  );
}
