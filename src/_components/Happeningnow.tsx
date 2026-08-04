/**
 * HappeningNow - Krystal Tech Hub
 * ------------------------------------------------------------
 * Sits between the hero and the programs listing. Server component:
 * reads the active announcement from the CMS and renders it.
 * Returns null (section is fully hidden) when no announcement is active.
 */

import HappeningNowView from "./HappeningNowView";
import { getActiveAnnouncement } from "@/lib/content";

export default async function HappeningNow() {
  const active = await getActiveAnnouncement();
  if (!active) return null;
  return <HappeningNowView announcement={active} />;
}
