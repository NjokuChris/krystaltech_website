"use client";

/**
 * PostEditor — create/edit form for blog posts.
 * Features:
 * - Slug auto-generates from title (can be manually overridden)
 * - "Generate slug" button to re-derive from title on demand
 * - Markdown toolbar: bold, italic, heading, link, code, blockquote, ul, ol, hr
 * - Write / Preview tabs for the content field
 */

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { postSchema, POST_CATEGORIES, type PostInput } from "@/lib/validation";
import { ui } from "./ui";
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  CodeBracketIcon,
  ListBulletIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

type PostRecord = PostInput & { id: string; published: boolean };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Markdown toolbar helpers ──────────────────────────────────────────────

type WrapOpts = {
  before?: string;
  after?: string;
  placeholder?: string;
  linePrefix?: string;
};

function applyWrap(
  textarea: HTMLTextAreaElement,
  opts: WrapOpts,
  getValue: () => string,
  setValue: (v: string) => void,
) {
  const { before = "", after = before, placeholder = "text", linePrefix } = opts;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const full = getValue();
  const selected = full.slice(start, end) || placeholder;

  let replacement: string;
  let cursorStart: number;
  let cursorEnd: number;

  if (linePrefix) {
    // prefix every line (heading, list, blockquote)
    replacement = selected
      .split("\n")
      .map((line) => `${linePrefix}${line}`)
      .join("\n");
    cursorStart = start;
    cursorEnd = start + replacement.length;
  } else {
    replacement = `${before}${selected}${after}`;
    cursorStart = start + before.length;
    cursorEnd = cursorStart + selected.length;
  }

  const newValue = full.slice(0, start) + replacement + full.slice(end);
  setValue(newValue);

  // restore selection after React re-render
  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(cursorStart, cursorEnd);
  });
}

function insertAtCursor(
  textarea: HTMLTextAreaElement,
  text: string,
  getValue: () => string,
  setValue: (v: string) => void,
) {
  const pos = textarea.selectionStart;
  const full = getValue();
  const newValue = full.slice(0, pos) + text + full.slice(pos);
  setValue(newValue);
  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(pos + text.length, pos + text.length);
  });
}

// ─── Toolbar button ────────────────────────────────────────────────────────

function ToolBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#11142B]/60 transition hover:bg-[#11142B]/8 hover:text-[#11142B] active:scale-95"
    >
      {children}
    </button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────

export default function PostEditor({ post }: { post?: PostRecord }) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [serverError, setServerError] = useState("");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      category: post?.category ?? POST_CATEGORIES[0],
      image: post?.image ?? "",
      readTime: post?.readTime ?? "5 min read",
      published: post?.published ?? false,
    },
  });

  const contentValue = watch("content");
  const titleValue = watch("title");

  // Markdown toolbar action
  const toolbar = (opts: WrapOpts | null, insert?: string) => () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const get = () => getValues("content");
    const set = (v: string) => setValue("content", v, { shouldDirty: true });
    if (insert !== undefined) {
      insertAtCursor(ta, insert, get, set);
    } else if (opts) {
      applyWrap(ta, opts, get, set);
    }
  };

  const { ref: contentRef, ...contentRest } = register("content");

  const onSubmit = async (data: PostInput) => {
    setServerError("");
    const res = await fetch(isEdit ? `/api/posts/${post!.id}` : "/api/posts", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/dashboard/posts");
      router.refresh();
      return;
    }

    const result = await res.json().catch(() => ({}));
    setServerError(result.message || "Something went wrong. Please try again.");
  };

  const { label: labelClass, input: inputClass, errorText: errorClass } = ui;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl space-y-5 rounded-2xl border border-[#11142B]/10 bg-white p-6 shadow-sm shadow-[#11142B]/5"
    >
      {serverError && <div className={ui.errorBox}>{serverError}</div>}

      {/* Title */}
      <div>
        <label className={labelClass}>Title</label>
        <input
          {...register("title", {
            onChange: (e) => {
              if (!slugTouched) setValue("slug", slugify(e.target.value));
            },
          })}
          className={inputClass}
          placeholder="Post title"
        />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div>
        <label className={labelClass}>Slug</label>
        <div className="flex gap-2">
          <input
            {...register("slug", { onChange: () => setSlugTouched(true) })}
            className={`${inputClass} flex-1`}
            placeholder="lowercase-with-hyphens"
          />
          <button
            type="button"
            title="Re-generate slug from current title"
            onClick={() => {
              const generated = slugify(titleValue ?? "");
              if (generated) {
                setValue("slug", generated, { shouldDirty: true });
                setSlugTouched(false);
              }
            }}
            className="shrink-0 rounded-xl border border-[#11142B]/15 bg-[#F3F1EA] px-3.5 py-2.5 text-xs font-semibold text-[#11142B]/70 transition hover:bg-[#11142B]/8 hover:text-[#11142B] active:scale-95"
          >
            Generate
          </button>
        </div>
        {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
      </div>

      {/* Category / Read time / Published */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Category</label>
          <select {...register("category")} className={inputClass}>
            {POST_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Read time</label>
          <input {...register("readTime")} className={inputClass} placeholder="5 min read" />
          {errors.readTime && <p className={errorClass}>{errors.readTime.message}</p>}
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input type="checkbox" {...register("published")} className="h-4 w-4 accent-[#11142B]" />
            <span className="text-sm font-medium text-[#11142B]/80">Published</span>
          </label>
        </div>
      </div>

      {/* Cover image */}
      <div>
        <label className={labelClass}>Cover image</label>
        <input
          {...register("image")}
          className={inputClass}
          placeholder="/hero-image.jpg or https://..."
        />
        {errors.image && <p className={errorClass}>{errors.image.message}</p>}
      </div>

      {/* Excerpt */}
      <div>
        <label className={labelClass}>Excerpt</label>
        <textarea {...register("excerpt")} rows={2} className={inputClass} />
        {errors.excerpt && <p className={errorClass}>{errors.excerpt.message}</p>}
      </div>

      {/* Content */}
      <div>
        {/* Header row: label + write/preview tabs */}
        <div className="mb-1.5 flex items-center justify-between">
          <label className={labelClass} style={{ marginBottom: 0 }}>
            Content <span className="font-normal text-[#11142B]/40">(Markdown)</span>
          </label>
          <div className="flex gap-1 rounded-xl border border-[#11142B]/10 bg-[#F3F1EA] p-0.5">
            {(["write", "preview"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-lg px-3.5 py-1 text-xs font-semibold capitalize transition ${
                  tab === t
                    ? "bg-[#11142B] text-white shadow"
                    : "text-[#11142B]/50 hover:text-[#11142B]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === "write" && (
          /* Toolbar */
          <div className="mb-1 flex flex-wrap items-center gap-0.5 rounded-t-xl border border-b-0 border-[#11142B]/15 bg-[#F3F1EA] px-2 py-1.5">
            <ToolBtn title="Bold" onClick={toolbar({ before: "**", after: "**", placeholder: "bold text" })}>
              <BoldIcon className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="Italic" onClick={toolbar({ before: "_", after: "_", placeholder: "italic text" })}>
              <ItalicIcon className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="Strikethrough" onClick={toolbar({ before: "~~", after: "~~", placeholder: "strikethrough" })}>
              <span className="text-sm font-bold line-through">S</span>
            </ToolBtn>

            <span className="mx-1 h-4 w-px bg-[#11142B]/15" />

            <ToolBtn title="Heading 2" onClick={toolbar({ linePrefix: "## " })}>
              <span className="text-xs font-bold">H2</span>
            </ToolBtn>
            <ToolBtn title="Heading 3" onClick={toolbar({ linePrefix: "### " })}>
              <span className="text-xs font-bold">H3</span>
            </ToolBtn>

            <span className="mx-1 h-4 w-px bg-[#11142B]/15" />

            <ToolBtn title="Inline code" onClick={toolbar({ before: "`", after: "`", placeholder: "code" })}>
              <CodeBracketIcon className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="Code block" onClick={toolbar(null, "\n```\n\n```\n")}>
              <span className="text-xs font-mono font-bold">{"{ }"}</span>
            </ToolBtn>
            <ToolBtn title="Blockquote" onClick={toolbar({ linePrefix: "> " })}>
              <span className="text-sm font-bold text-[#11142B]/60">"</span>
            </ToolBtn>
            <ToolBtn title="Link" onClick={toolbar({ before: "[", after: "](url)", placeholder: "link text" })}>
              <LinkIcon className="h-4 w-4" />
            </ToolBtn>

            <span className="mx-1 h-4 w-px bg-[#11142B]/15" />

            <ToolBtn title="Unordered list" onClick={toolbar({ linePrefix: "- " })}>
              <ListBulletIcon className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn title="Ordered list" onClick={toolbar({ linePrefix: "1. " })}>
              <span className="text-xs font-bold">1.</span>
            </ToolBtn>
            <ToolBtn title="Horizontal rule" onClick={toolbar(null, "\n\n---\n\n")}>
              <MinusIcon className="h-4 w-4" />
            </ToolBtn>
          </div>
        )}

        {tab === "write" ? (
          <textarea
            {...contentRest}
            ref={(el) => {
              contentRef(el);
              textareaRef.current = el;
            }}
            rows={20}
            className={`${inputClass} font-mono text-sm ${tab === "write" ? "rounded-t-none" : ""}`}
            placeholder="Write your post in Markdown…"
          />
        ) : (
          <div className="prose prose-sm max-w-none rounded-xl border border-[#11142B]/15 bg-white p-4 min-h-[20rem]">
            {contentValue ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentValue}</ReactMarkdown>
            ) : (
              <p className="text-[#11142B]/30">Nothing to preview yet.</p>
            )}
          </div>
        )}
        {errors.content && <p className={errorClass}>{errors.content.message}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button type="submit" disabled={isSubmitting} className={ui.btnPrimary}>
          {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Create post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard/posts")}
          className={ui.btnSecondary}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
