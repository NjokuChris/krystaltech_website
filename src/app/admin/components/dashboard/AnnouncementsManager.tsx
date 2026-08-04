"use client";

/**
 * AnnouncementsManager — admin UI for the "Happening Now" band.
 * Reskinned to match the admin design system (sand / ink / amber palette).
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, PencilIcon, TrashIcon, BoltIcon } from "@heroicons/react/24/outline";
import { ui, badge } from "./ui";

export type Announcement = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string | null;
  primaryHref: string | null;
  secondaryLabel: string | null;
  secondaryHref: string | null;
  active: boolean;
};

type FormState = {
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  active: boolean;
};

const EMPTY: FormState = {
  eyebrow: "Happening now",
  title: "",
  body: "",
  primaryLabel: "",
  primaryHref: "",
  secondaryLabel: "",
  secondaryHref: "",
  active: true,
};

export default function AnnouncementsManager({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const startNew = () => { setEditingId("new"); setForm(EMPTY); setError(""); };

  const startEdit = (a: Announcement) => {
    setEditingId(a.id);
    setForm({
      eyebrow: a.eyebrow,
      title: a.title,
      body: a.body,
      primaryLabel: a.primaryLabel ?? "",
      primaryHref: a.primaryHref ?? "",
      secondaryLabel: a.secondaryLabel ?? "",
      secondaryHref: a.secondaryHref ?? "",
      active: a.active,
    });
    setError("");
  };

  const cancel = () => { setEditingId(null); setError(""); };

  const save = async () => {
    setBusy(true);
    setError("");
    const isNew = editingId === "new";
    const res = await fetch(
      isNew ? "/api/announcements" : `/api/announcements/${editingId}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    setBusy(false);
    if (res.ok) { setEditingId(null); router.refresh(); return; }
    const result = await res.json().catch(() => ({}));
    setError(result.message || "Could not save. Check the fields and try again.");
  };

  const setActive = async (id: string) => {
    setBusy(true);
    await fetch(`/api/announcements/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: true }),
    });
    setBusy(false);
    router.refresh();
  };

  const setInactive = async (id: string) => {
    setBusy(true);
    await fetch(`/api/announcements/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: false }),
    });
    setBusy(false);
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    setBusy(true);
    await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  };

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={ui.heading}>Announcements</h2>
          <p className={`mt-1 ${ui.subheading}`}>
            The <strong className="font-semibold text-[#11142B]/70">active</strong> announcement
            shows in the &ldquo;Happening Now&rdquo; band on the home page.
            Only one can be active at a time. Inactive announcements are hidden from the site.
          </p>
        </div>
        {editingId === null && (
          <button onClick={startNew} className={ui.btnPrimary}>
            <PlusIcon className="h-4 w-4" />
            New announcement
          </button>
        )}
      </div>

      {/* Form */}
      {editingId !== null && (
        <div className={`${ui.card} max-w-2xl space-y-5 p-6`}>
          <h3 className="text-base font-semibold text-[#11142B]">
            {editingId === "new" ? "New announcement" : "Edit announcement"}
          </h3>

          {error && <div className={ui.errorBox}>{error}</div>}

          <div>
            <label className={ui.label}>Eyebrow</label>
            <input value={form.eyebrow} onChange={set("eyebrow")} className={ui.input} />
          </div>

          <div>
            <label className={ui.label}>Title</label>
            <input value={form.title} onChange={set("title")} className={ui.input} />
          </div>

          <div>
            <label className={ui.label}>Body</label>
            <textarea
              value={form.body}
              onChange={set("body")}
              rows={3}
              className={ui.input}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={ui.label}>Primary button label</label>
              <input value={form.primaryLabel} onChange={set("primaryLabel")} className={ui.input} />
            </div>
            <div>
              <label className={ui.label}>Primary button link</label>
              <input
                value={form.primaryHref}
                onChange={set("primaryHref")}
                className={ui.input}
                placeholder="/contact"
              />
            </div>
            <div>
              <label className={ui.label}>Secondary button label</label>
              <input value={form.secondaryLabel} onChange={set("secondaryLabel")} className={ui.input} />
            </div>
            <div>
              <label className={ui.label}>Secondary button link</label>
              <input
                value={form.secondaryHref}
                onChange={set("secondaryHref")}
                className={ui.input}
                placeholder="/programs"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              className="h-4 w-4 accent-[#11142B]"
            />
            <span className="text-sm font-medium text-[#11142B]/80">
              Set as active — show on home page
            </span>
          </label>

          <div className="flex gap-3 pt-1">
            <button onClick={save} disabled={busy} className={ui.btnPrimary}>
              {busy ? "Saving…" : "Save"}
            </button>
            <button onClick={cancel} className={ui.btnSecondary}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={`${ui.card} overflow-hidden`}>
        {/* table header */}
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[#11142B]/8 px-6 py-3.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#11142B]/40">Title</span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#11142B]/40">Status</span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#11142B]/40">Actions</span>
        </div>

        {announcements.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <BoltIcon className="mx-auto mb-3 h-8 w-8 text-[#11142B]/15" />
            <p className="text-sm text-[#11142B]/40">No announcements yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#11142B]/6">
            {announcements.map((a) => (
              <li
                key={a.id}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-4"
              >
                {/* title + eyebrow */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#11142B]">{a.title}</p>
                  <p className="mt-0.5 truncate text-xs text-[#11142B]/45">{a.eyebrow}</p>
                </div>

                {/* status badge */}
                <span className={badge(a.active ? "on" : "off")}>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${a.active ? "bg-emerald-500" : "bg-[#11142B]/30"}`}
                  />
                  {a.active ? "Active" : "Inactive"}
                </span>

                {/* actions */}
                <div className="flex items-center gap-1.5">
                  {!a.active ? (
                    <button
                      onClick={() => setActive(a.id)}
                      disabled={busy}
                      className={`${ui.chip} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}
                      title="Set as active"
                    >
                      <BoltIcon className="h-3.5 w-3.5" />
                      Activate
                    </button>
                  ) : (
                    <button
                      onClick={() => setInactive(a.id)}
                      disabled={busy}
                      className={`${ui.chip} bg-[#11142B]/6 text-[#11142B]/60 hover:bg-[#11142B]/10`}
                      title="Deactivate (hide from site)"
                    >
                      Deactivate
                    </button>
                  )}
                  <button
                    onClick={() => startEdit(a)}
                    className={`${ui.chip} bg-[#FFB627]/10 text-[#b07d00] hover:bg-[#FFB627]/20`}
                    title="Edit"
                  >
                    <PencilIcon className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => remove(a.id)}
                    disabled={busy}
                    className={`${ui.chip} bg-red-50 text-red-600 hover:bg-red-100`}
                    title="Delete"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
