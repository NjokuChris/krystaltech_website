"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PlusIcon, PencilIcon, TrashIcon, UsersIcon } from "@heroicons/react/24/outline";
import { ui, badge } from "./ui";
import ImageUploader from "@/_components/ImageUploader";

type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
  published: boolean;
};

type FormState = Omit<Member, "id">;

const EMPTY: FormState = { name: "", role: "", bio: "", image: "", order: 0, published: true };

export default function TeamManager({ members }: { members: Member[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const startNew = () => { setEditingId("new"); setForm(EMPTY); setError(""); };
  const startEdit = (m: Member) => {
    setEditingId(m.id);
    setForm({ name: m.name, role: m.role, bio: m.bio, image: m.image, order: m.order, published: m.published });
    setError("");
  };
  const cancel = () => { setEditingId(null); setError(""); };

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.type === "number" ? Number(e.target.value) : e.target.value;
      setForm(f => ({ ...f, [key]: val }));
    };

  const save = async () => {
    setBusy(true); setError("");
    const isNew = editingId === "new";
    const res = await fetch(isNew ? "/api/team" : `/api/team/${editingId}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    if (res.ok) { setEditingId(null); router.refresh(); return; }
    const data = await res.json().catch(() => ({}));
    setError(data.message || "Could not save.");
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    setBusy(true);
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    setBusy(false); router.refresh();
  };

  const togglePublish = async (m: Member) => {
    setBusy(true);
    await fetch(`/api/team/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !m.published }),
    });
    setBusy(false); router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={ui.heading}>Team</h2>
          <p className={`mt-1 ${ui.subheading}`}>Manage who appears on the team page. Drag order controls display order.</p>
        </div>
        {!editingId && (
          <button onClick={startNew} className={ui.btnPrimary}>
            <PlusIcon className="h-4 w-4" /> Add member
          </button>
        )}
      </div>

      {/* Form */}
      {editingId && (
        <div className={`${ui.card} max-w-2xl space-y-5 p-6`}>
          <h3 className="text-base font-semibold text-[#11142B]">
            {editingId === "new" ? "New team member" : "Edit team member"}
          </h3>
          {error && <div className={ui.errorBox}>{error}</div>}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={ui.label}>Full name</label>
              <input value={form.name} onChange={set("name")} className={ui.input} placeholder="Njoku Chris" />
            </div>
            <div>
              <label className={ui.label}>Role / title</label>
              <input value={form.role} onChange={set("role")} className={ui.input} placeholder="Founder & Lead Mentor" />
            </div>
          </div>

          <div>
            <label className={ui.label}>Bio</label>
            <textarea value={form.bio} onChange={set("bio")} rows={4} className={ui.input}
              placeholder="A short paragraph about this person." />
          </div>

          <ImageUploader value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} label="Photo" />

          <div>
            <label className={ui.label}>Display order <span className="font-normal text-[#11142B]/40">(lower = first)</span></label>
            <input type="number" value={form.order} onChange={set("order")} className={ui.input} min={0} />
          </div>

          <label className="flex cursor-pointer items-center gap-2.5">
            <input type="checkbox" checked={form.published}
              onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
              className="h-4 w-4 accent-[#11142B]" />
            <span className="text-sm font-medium text-[#11142B]/80">Visible on team page</span>
          </label>

          <div className="flex gap-3 pt-1">
            <button onClick={save} disabled={busy} className={ui.btnPrimary}>
              {busy ? "Saving…" : "Save"}
            </button>
            <button onClick={cancel} className={ui.btnSecondary}>Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className={`${ui.card} overflow-hidden`}>
        <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 border-b border-[#11142B]/8 px-6 py-3.5">
          <span />
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#11142B]/40">Member</span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#11142B]/40">Status</span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#11142B]/40">Actions</span>
        </div>

        {members.length === 0 ? (
          <div className="py-14 text-center">
            <UsersIcon className="mx-auto mb-3 h-8 w-8 text-[#11142B]/15" />
            <p className="text-sm text-[#11142B]/40">No team members yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#11142B]/6">
            {members.map(m => (
              <li key={m.id} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-6 py-4">
                {/* avatar */}
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#11142B]/5">
                  {m.image ? (
                    <Image src={m.image} alt={m.name} fill sizes="48px" className="object-cover object-top" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-[#11142B]/30">
                      {m.name[0]}
                    </span>
                  )}
                </div>
                {/* info */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#11142B]">{m.name}</p>
                  <p className="mt-0.5 text-xs text-[#11142B]/45">{m.role} · #{m.order}</p>
                </div>
                {/* status */}
                <span className={badge(m.published ? "on" : "off")}>
                  <span className={`h-1.5 w-1.5 rounded-full ${m.published ? "bg-emerald-500" : "bg-[#11142B]/30"}`} />
                  {m.published ? "Visible" : "Hidden"}
                </span>
                {/* actions */}
                <div className="flex items-center gap-1.5">
                  <button onClick={() => togglePublish(m)} disabled={busy}
                    className={`${ui.chip} ${m.published ? "bg-[#11142B]/6 text-[#11142B]/60 hover:bg-[#11142B]/10" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}>
                    {m.published ? "Hide" : "Show"}
                  </button>
                  <button onClick={() => startEdit(m)}
                    className={`${ui.chip} bg-[#FFB627]/10 text-[#b07d00] hover:bg-[#FFB627]/20`}>
                    <PencilIcon className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => remove(m.id)} disabled={busy}
                    className={`${ui.chip} bg-red-50 text-red-600 hover:bg-red-100`}>
                    <TrashIcon className="h-3.5 w-3.5" /> Remove
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
