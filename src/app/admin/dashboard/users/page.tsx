'use client';

import { useEffect, useState, useCallback } from "react";
import {
  TrashIcon,
  UserCircleIcon,
  LinkIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { ui } from "../../components/dashboard/ui";

interface User {
  id: number;
  username: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
  createdAt: string;
}

interface Invite {
  id: string;
  email: string;
  expiresAt: string;
  createdAt: string;
  invitedBy: { username: string };
}

// Reconstruct the invite URL from the stored token
// The API now returns the inviteUrl only at creation time, so for the list
// we just show the email + expiry. A "Regenerate" button creates a new link.

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [email, setEmail] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<{ url: string; email: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [removeError, setRemoveError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [uRes, iRes] = await Promise.all([
      fetch("/api/users"),
      fetch("/api/invites"),
    ]);
    if (uRes.ok) setUsers(await uRes.json());
    if (iRes.ok) setInvites(await iRes.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const generateInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setGeneratedLink(null);
    setGenerating(true);
    try {
      const res = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      setGeneratedLink({ url: data.inviteUrl, email: data.email });
      setEmail("");
      load();
    } finally {
      setGenerating(false);
    }
  };

  const copyLink = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Regenerate = create a fresh invite for the same email (upsert replaces old token)
  const regenerate = async (inviteEmail: string) => {
    setError("");
    setGeneratedLink(null);
    const res = await fetch("/api/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail }),
    });
    const data = await res.json();
    if (res.ok) {
      setGeneratedLink({ url: data.inviteUrl, email: data.email });
      load();
    } else {
      setError(data.message);
    }
  };

  const revokeInvite = async (id: string) => {
    if (!confirm("Revoke this invite? The link will stop working immediately.")) return;
    await fetch(`/api/invites/${id}`, { method: "DELETE" });
    setGeneratedLink(null);
    load();
  };

  const removeUser = async (id: number, username: string) => {
    if (!confirm(`Remove user "${username}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) setRemoveError(data.message);
    else load();
  };

  const roleBadge = (role: User["role"]) =>
    role === "SUPER_ADMIN" ? (
      <span className="inline-flex items-center rounded-full bg-[#FFB627]/15 px-2.5 py-0.5 text-xs font-semibold text-[#b07d00]">
        Super Admin
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full bg-[#11142B]/8 px-2.5 py-0.5 text-xs font-medium text-[#11142B]/60">
        Admin
      </span>
    );

  return (
    <div className="space-y-8">
      <div>
        <h2 className={ui.heading}>Users</h2>
        <p className={`mt-1 ${ui.subheading}`}>Manage team members and invite new admins.</p>
      </div>

      {/* ── Invite form ─────────────────────────────────────────────────── */}
      <section className={`${ui.card} p-6 space-y-4`}>
        <h3 className="flex items-center gap-2 text-base font-semibold text-[#11142B]">
          <LinkIcon className="h-5 w-5 text-[#FFB627]" />
          Generate invite link
        </h3>
        <p className="text-sm text-[#11142B]/55">
          Enter the email address of the person you want to invite. An invite link will be
          generated — share it however you like. The link expires in 48 hours and is locked
          to that email address.
        </p>

        <form onSubmit={generateInvite} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); setGeneratedLink(null); }}
            required
            placeholder="colleague@example.com"
            className={`${ui.input} flex-1`}
          />
          <button
            type="submit"
            disabled={generating}
            className={ui.btnPrimary}
          >
            {generating ? "Generating…" : "Generate link"}
          </button>
        </form>

        {error && (
          <p className="text-sm font-medium text-red-600">{error}</p>
        )}

        {/* Generated link display */}
        {generatedLink && (
          <div className="rounded-xl border border-[#FFB627]/30 bg-[#FFB627]/8 p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#b07d00] mb-1">
                  Invite link for {generatedLink.email}
                </p>
                <p className="break-all font-mono text-xs text-[#11142B]/70">
                  {generatedLink.url}
                </p>
              </div>
              <button
                onClick={() => copyLink(generatedLink.url)}
                className="shrink-0 flex items-center gap-1.5 rounded-lg bg-[#11142B] px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
              >
                {copied ? (
                  <><CheckIcon className="h-3.5 w-3.5" /> Copied!</>
                ) : (
                  <><ClipboardDocumentIcon className="h-3.5 w-3.5" /> Copy</>
                )}
              </button>
            </div>
            <p className="text-xs text-[#11142B]/45">
              This link expires in 48 hours. The recipient must enter{" "}
              <strong className="text-[#11142B]/70">{generatedLink.email}</strong> when
              they open it.
            </p>
          </div>
        )}
      </section>

      {/* ── Pending invites ─────────────────────────────────────────────── */}
      {invites.length > 0 && (
        <section className={`${ui.card} overflow-hidden`}>
          <div className="border-b border-[#11142B]/8 px-6 py-4">
            <h3 className="text-base font-semibold text-[#11142B]">Pending invites</h3>
            <p className="mt-0.5 text-xs text-[#11142B]/45">
              Active links that haven&apos;t been used yet.
            </p>
          </div>
          <ul className="divide-y divide-[#11142B]/6">
            {invites.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between px-6 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#11142B]">{inv.email}</p>
                  <p className="mt-0.5 text-xs text-[#11142B]/45">
                    Created by {inv.invitedBy.username} ·{" "}
                    expires {new Date(inv.expiresAt).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => regenerate(inv.email)}
                    className="rounded-lg border border-[#11142B]/15 bg-[#F3F1EA] px-3 py-1.5 text-xs font-semibold text-[#11142B]/70 transition hover:bg-[#11142B]/8 hover:text-[#11142B]"
                    title="Generate a fresh link for this email"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={() => revokeInvite(inv.id)}
                    className="rounded-lg p-2 text-[#11142B]/35 transition hover:bg-red-50 hover:text-red-600"
                    title="Revoke invite"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Team members ────────────────────────────────────────────────── */}
      <section className={`${ui.card} overflow-hidden`}>
        <div className="border-b border-[#11142B]/8 px-6 py-4">
          <h3 className="text-base font-semibold text-[#11142B]">Team members</h3>
        </div>

        {removeError && (
          <p className="px-6 pt-4 text-sm font-medium text-red-600">{removeError}</p>
        )}

        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-[#11142B]/35">Loading…</div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center py-14">
            <UserCircleIcon className="mb-3 h-10 w-10 text-[#11142B]/15" />
            <p className="text-sm text-[#11142B]/40">No users yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#11142B]/6">
            {users.map((u) => (
              <li key={u.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#11142B] text-sm font-semibold text-white">
                    {u.username[0].toUpperCase()}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#11142B]">{u.username}</p>
                      {roleBadge(u.role)}
                    </div>
                    <p className="mt-0.5 text-xs text-[#11142B]/45">{u.email}</p>
                  </div>
                </div>
                {u.role !== "SUPER_ADMIN" && (
                  <button
                    onClick={() => removeUser(u.id, u.username)}
                    className="ml-4 rounded-lg p-2 text-[#11142B]/35 transition hover:bg-red-50 hover:text-red-600"
                    title="Remove user"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
