import { NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

/**
 * Временный endpoint — добавляет недостающие колонки в Postgres на проде.
 * После успешного выполнения удалить.
 */
export async function POST() {
  try {
    const payload = await getPayload();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = (payload.db as any).drizzle;

    const queries = [
      // site_settings
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_notification_email varchar`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_smtp_host varchar`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_smtp_port numeric`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_smtp_user varchar`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_smtp_password varchar`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS map_center_lng numeric`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS map_center_lat numeric`,
      // homepage visibility
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_hero boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_services boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_about boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_stats boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_advantages boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_clients boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_contact_info boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_contact_form boolean DEFAULT true`,
      // about_page visibility
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_about boolean DEFAULT true`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_licenses boolean DEFAULT true`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_armament boolean DEFAULT true`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_training boolean DEFAULT true`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_contact_form boolean DEFAULT true`,
      // contacts_page visibility
      `ALTER TABLE contacts_page ADD COLUMN IF NOT EXISTS show_contact_info boolean DEFAULT true`,
      `ALTER TABLE contacts_page ADD COLUMN IF NOT EXISTS show_contact_form boolean DEFAULT true`,
      // homepage locales — SEO
      `ALTER TABLE homepage_locales ADD COLUMN IF NOT EXISTS seo_meta_title varchar`,
      `ALTER TABLE homepage_locales ADD COLUMN IF NOT EXISTS seo_meta_description varchar`,
    ];

    const results: string[] = [];
    for (const q of queries) {
      try {
        await db.execute(q);
        results.push(`OK: ${q.substring(0, 80)}`);
      } catch (e) {
        results.push(`FAIL: ${q.substring(0, 80)} — ${String(e).substring(0, 100)}`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
