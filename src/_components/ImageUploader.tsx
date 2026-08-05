"use client";

/**
 * ImageUploader
 * ---------------------------------------------------------------
 * Drag-and-drop / click-to-upload widget that signs uploads
 * server-side (no API secret in the browser) and pushes the file
 * directly to Cloudinary.
 *
 * Usage:
 *   <ImageUploader value={url} onChange={(url) => setValue("image", url)} />
 *
 * Props:
 *   value    — current image URL (shows preview)
 *   onChange — called with the secure Cloudinary URL after upload
 *   label    — optional field label (default "Image")
 */

import { useCallback, useState } from "react";
import Image from "next/image";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const upload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Image must be under 10 MB.");
        return;
      }

      setError("");
      setUploading(true);

      try {
        // 1. Get signed params from our server
        const sigRes = await fetch("/api/upload", { method: "POST" });
        if (!sigRes.ok) throw new Error("Could not get upload signature.");
        const { timestamp, signature, folder, cloudName, apiKey } =
          await sigRes.json();

        // 2. Upload directly to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("timestamp", String(timestamp));
        formData.append("signature", signature);
        formData.append("folder", folder);
        formData.append("api_key", apiKey);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData },
        );

        if (!uploadRes.ok) throw new Error("Upload failed.");
        const data = await uploadRes.json();
        onChange(data.secure_url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const clear = () => onChange("");

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#11142B]/80">
        {label}
      </label>

      {value ? (
        /* Preview */
        <div className="relative overflow-hidden rounded-xl border border-[#11142B]/15">
          <div className="relative aspect-video w-full">
            <Image
              src={value}
              alt="Preview"
              fill
              sizes="640px"
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
            aria-label="Remove image"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
          <p className="truncate bg-[#11142B]/5 px-3 py-1.5 text-xs text-[#11142B]/50">
            {value}
          </p>
        </div>
      ) : (
        /* Drop zone */
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 transition ${
            dragging
              ? "border-[#FFB627] bg-[#FFB627]/8"
              : "border-[#11142B]/15 hover:border-[#11142B]/30 hover:bg-[#11142B]/3"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFileInput}
            disabled={uploading}
          />
          <PhotoIcon className="h-10 w-10 text-[#11142B]/25" />
          {uploading ? (
            <p className="text-sm font-medium text-[#11142B]/60">Uploading…</p>
          ) : (
            <>
              <p className="text-sm font-medium text-[#11142B]/70">
                Drag an image here or{" "}
                <span className="text-[#11142B] underline">browse</span>
              </p>
              <p className="text-xs text-[#11142B]/40">PNG, JPG, WebP — max 10 MB</p>
            </>
          )}
        </label>
      )}

      {/* Also accept a URL directly */}
      <div className="mt-2 flex gap-2">
        <input
          type="url"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL"
          className="flex-1 rounded-xl border border-[#11142B]/15 bg-white px-3.5 py-2 text-xs text-[#11142B] outline-none placeholder:text-[#11142B]/30 focus:border-[#11142B]/30 focus:ring-2 focus:ring-[#FFB627]/30"
        />
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
