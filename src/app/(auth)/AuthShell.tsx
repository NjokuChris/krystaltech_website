/**
 * AuthShell - branded frame for the login / signup screens.
 * Full-height sand background, centered card, Krystal logo, matching
 * the public site's design system (sand/ink/amber).
 */

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F1EA] px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="inline-flex">
            <Image
              src="/krystal4.png"
              alt="Krystal Technologies"
              width={220}
              height={68}
              priority
              className="h-11 w-auto"
            />
          </Link>
        </div>

        <div className="rounded-3xl border border-[#11142B]/10 bg-white p-8 shadow-xl shadow-[#11142B]/5">
          <h1 className="text-2xl font-light tracking-tight text-[#11142B]">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-[#11142B]/60">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>

        {footer && <div className="mt-6 text-center text-sm text-[#11142B]/60">{footer}</div>}
      </div>
    </div>
  );
}
