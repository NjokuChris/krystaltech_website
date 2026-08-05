"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PlusIcon, PencilIcon, TrashIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { ui, badge } from "./ui";
import ImageUploader from "@/_components/ImageUploader";
import { PROJECT_CATEGORIES } from "@/lib/validation";

type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  image: string;
  tags: string[];
  published: boolean;
};

type FormState = Omit<Project, "id">;

function slugify(v: string) {
  return v.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const EMPTY: FormState = {
  slug: "", title: "", client: "", category: "Website",
  summary: "", image: "", tags: [], published: false,
};

export default function ProjectsManager({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [tagsInput, setTagsInput] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const startNew = () => {
    setEditingId("new"); setForm(EMPTY);
    setTagsInput(""); setSlugTouched(false); setError("");
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({ slug: p.slug, title: p.title, client: p.client, category: p.category,
      summary: p.summary, image: p.image, tags: p.tags, published: p.published });
    setTagsInput(p.tags.join(", "));
    setSlugTouched(true); setError("");
  };

  const cancel = () => { setEditingId(null); setError(""); };

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const val = e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      setForm(f => ({ ...f, [key]: val }));
      if (key === "title" && !slugTouched) {
        setForm(f => ({ ...f, title: String(val), slug: slugify(String(val)) }));
      }
    };

  const save = async () => {
    setBusy(true); setError("");
    const payload = { ...form, tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean) };
    const isNew = editingId === "new";
    const res = await fetch(isNew ? "/api/projects" : `/api/projects/${editingId}`, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (res.ok) { setEditingId(null); router.refresh(); return; }
    const data = await res.json().catch(() => ({}));
    setError(data.message || "Could not save.");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setBusy(true);
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setBusy(false); router.refresh();
  };

  const togglePublish = async (p: Project) => {
    setBusy(true);
    await fetch(`/api/projects/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !p.published }),
    });
    setBusy(false); router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={ui.heading}>Projects</h2>
          <p className={`mt-1 ${ui.subheading}`}>Manage the work portfolio shown on the site.</p>
        </div>
        {!editingId && (
          <button onClick={startNew} className={ui.btnPrimary}>
            <PlusIcon className="h-4 w-4" /> New project
          </button>
        )}
      </div>

      {/* Form */}
      {editingId && (
        <div className={`${ui.card} max-w-2xl space-y-5 p-6`}>
          <h3 className="text-base font-semibold text-[#11142B]">
            {editingId === "new" ? "New project" : "Edit project"}
          </h3>
          {error && <div className={ui.errorBox}>{error}</div>}

          <div>
            <label className={ui.label}>Title</label>
            <input value={form.title} onChange={set("title")} className={ui.input} placeholder="A storefront that takes orders after hours" />
          </div>

          <div>
            <label className={ui.label}>Slug</label>
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={e => { setSlugTouched(true); setForm(f => ({ ...f, slug: e.target.value })); }}
                className={`${ui.input} flex-1`}
                placeholder="my-project-slug"
              />
              <button type="button" onClick={() => { setForm(f => ({ ...f, slug: slugify(f.title) })); setSlugTouched(false); }}
                className="shrink-0 rounded-xl border border-[#11142B]/15 bg-[#F3F1EA] px-3.5 py-2.5 text-xs font-semibold text-[#11142B]/70 hover:bg-[#11142B]/8">
                Generate
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={ui.label}>Client</label>
              <input value={form.client} onChange={set("client")} className={ui.input} placeholder="Riverside Pharmacy" />
            </div>
            <div>
              <label className={ui.label}>Category</label>
              <select value={form.category} onChange={set("category")} className={ui.input}>
                {PROJECT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={ui.label}>Summary</label>
            <textarea value={form.summary} onChange={set("summary")} rows={3} className={ui.input}
              placeholder="A short description shown on the project card." />
          </div>

          <div>
            <label className={ui.label}>Tags <span className="font-normal text-[#11142B]/40">(comma separated)</span></label>
            <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} className={ui.input}
              placeholder="Next.js, Responsive, Payments" />
          </div>

          <ImageUploader value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} label="Cover image" />

          <label className="flex cursor-pointer items-center gap-2.5">
            <input type="checkbox" checked={form.published}
              onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
              className="h-4 w-4 accent-[#11142B]" />
            <span className="text-sm font-medium text-[#11142B]/80">Published — visible on site</span>
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
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#11142B]/40">Project</span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#11142B]/40">Status</span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#11142B]/40">Actions</span>
        </div>

        {projects.length === 0 ? (
          <div className="py-14 text-center">
            <BriefcaseIcon className="mx-auto mb-3 h-8 w-8 text-[#11142B]/15" />
            <p className="text-sm text-[#11142B]/40">No projects yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#11142B]/6">
            {projects.map(p => (
              <li key={p.id} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-6 py-4">
                {/* thumbnail */}
                <div className="relative h-12 w-16 overflow-hidden rounded-xl bg-[#11142B]/5">
                  {p.image && (
                    <Image src={p.image} alt={p.title} fill sizes="64px" className="object-cover" />
                  )}
                </div>
                {/* info */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#11142B]">{p.title}</p>
                  <p className="mt-0.5 text-xs text-[#11142B]/45">{p.client} · {p.category}</p>
                </div>
                {/* status */}
                <span className={badge(p.published ? "on" : "off")}>
                  <span className={`h-1.5 w-1.5 rounded-full ${p.published ? "bg-emerald-500" : "bg-[#11142B]/30"}`} />
                  {p.published ? "Live" : "Draft"}
                </span>
                {/* actions */}
                <div className="flex items-center gap-1.5">
                  <button onClick={() => togglePublish(p)} disabled={busy}
                    className={`${ui.chip} ${p.published ? "bg-[#11142B]/6 text-[#11142B]/60 hover:bg-[#11142B]/10" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}>
                    {p.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => startEdit(p)}
                    className={`${ui.chip} bg-[#FFB627]/10 text-[#b07d00] hover:bg-[#FFB627]/20`}>
                    <PencilIcon className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => remove(p.id)} disabled={busy}
                    className={`${ui.chip} bg-red-50 text-red-600 hover:bg-red-100`}>
                    <TrashIcon className="h-3.5 w-3.5" /> Delete
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
