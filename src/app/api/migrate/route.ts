import { NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

/**
 * Временный endpoint — восстанавливает upload-relation колонки,
 * которые были ошибочно дропнуты предыдущей версией этого endpoint,
 * и добавляет недостающие колонки в Postgres на проде.
 * После успешного выполнения удалить.
 */
export async function POST() {
  try {
    const payload = await getPayload();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = (payload.db as any).drizzle;

    const queries = [
      // ---- Restore upload-relation (*_id integer) columns ----
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_background_image_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS about_background_image_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS clients_background_image_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS contact_form_feature_icon_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS banner_image_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS about_image_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS armament_image_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS training_image_id integer`,
      `ALTER TABLE about_page_licenses ADD COLUMN IF NOT EXISTS image_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS card_image_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS banner_image_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS feature_image_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS clients_background_image_id integer`,
      // ---- Drop obsolete varchar columns left by broken migration ----
      `ALTER TABLE homepage DROP COLUMN IF EXISTS hero_background_image`,
      `ALTER TABLE homepage DROP COLUMN IF EXISTS about_background_image`,
      `ALTER TABLE homepage DROP COLUMN IF EXISTS clients_background_image`,
      `ALTER TABLE homepage DROP COLUMN IF EXISTS contact_form_feature_icon`,
      `ALTER TABLE about_page DROP COLUMN IF EXISTS banner_image`,
      `ALTER TABLE about_page DROP COLUMN IF EXISTS about_image`,
      `ALTER TABLE about_page DROP COLUMN IF EXISTS armament_image`,
      `ALTER TABLE about_page DROP COLUMN IF EXISTS training_image`,
      `ALTER TABLE about_page_licenses DROP COLUMN IF EXISTS image`,
      `ALTER TABLE services DROP COLUMN IF EXISTS card_image`,
      `ALTER TABLE services DROP COLUMN IF EXISTS banner_image`,
      `ALTER TABLE services DROP COLUMN IF EXISTS feature_image`,
      `ALTER TABLE services DROP COLUMN IF EXISTS clients_background_image`,
      // ---- site_settings ----
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_notification_email varchar`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_smtp_host varchar`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_smtp_port numeric`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_smtp_user varchar`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS smtp_smtp_password varchar`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS map_center_lng numeric`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS map_center_lat numeric`,
      `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS max varchar`,
      `ALTER TABLE site_settings_locales ADD COLUMN IF NOT EXISTS max_label varchar`,
      // ---- responsive image upload fields (tablet + mobile siblings) ----
      // Homepage hero
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_background_image_tablet_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_background_image_mobile_id integer`,
      // Homepage about section
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS about_background_image_tablet_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS about_background_image_mobile_id integer`,
      // Homepage clients section
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS clients_background_image_tablet_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS clients_background_image_mobile_id integer`,
      // AboutPage banner
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS banner_image_tablet_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS banner_image_mobile_id integer`,
      // AboutPage about
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS about_image_tablet_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS about_image_mobile_id integer`,
      // AboutPage armament
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS armament_image_tablet_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS armament_image_mobile_id integer`,
      // AboutPage training
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS training_image_tablet_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS training_image_mobile_id integer`,
      // Services
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS card_image_tablet_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS card_image_mobile_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS banner_image_tablet_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS banner_image_mobile_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS feature_image_tablet_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS feature_image_mobile_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS clients_background_image_tablet_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS clients_background_image_mobile_id integer`,
      // ---- responsive image variants: tablet + mobile siblings ----
      // homepage
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_background_image_tablet_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_background_image_mobile_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS about_background_image_tablet_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS about_background_image_mobile_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS clients_background_image_tablet_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS clients_background_image_mobile_id integer`,
      // about_page
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS banner_image_tablet_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS banner_image_mobile_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS about_image_tablet_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS about_image_mobile_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS armament_image_tablet_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS armament_image_mobile_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS training_image_tablet_id integer`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS training_image_mobile_id integer`,
      // services
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS card_image_tablet_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS card_image_mobile_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS banner_image_tablet_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS banner_image_mobile_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS feature_image_tablet_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS feature_image_mobile_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS clients_background_image_tablet_id integer`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS clients_background_image_mobile_id integer`,
      // ---- homepage visibility ----
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_hero boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_services boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_about boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_stats boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_advantages boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_clients boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_contact_info boolean DEFAULT true`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS show_contact_form boolean DEFAULT true`,
      // ---- about_page visibility ----
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_about boolean DEFAULT true`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_licenses boolean DEFAULT true`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_armament boolean DEFAULT true`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_training boolean DEFAULT true`,
      `ALTER TABLE about_page ADD COLUMN IF NOT EXISTS show_contact_form boolean DEFAULT true`,
      // ---- contacts_page visibility ----
      `ALTER TABLE contacts_page ADD COLUMN IF NOT EXISTS show_contact_info boolean DEFAULT true`,
      `ALTER TABLE contacts_page ADD COLUMN IF NOT EXISTS show_contact_form boolean DEFAULT true`,
      // ---- homepage locales — SEO ----
      `ALTER TABLE homepage_locales ADD COLUMN IF NOT EXISTS seo_meta_title varchar`,
      `ALTER TABLE homepage_locales ADD COLUMN IF NOT EXISTS seo_meta_description varchar`,
      // ---- services locales — per-service clients section title ----
      `ALTER TABLE services_locales ADD COLUMN IF NOT EXISTS clients_section_title varchar`,
      // ---- homepage hero background video ----
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_background_video_id integer`,
      `ALTER TABLE homepage ADD COLUMN IF NOT EXISTS hero_background_video_url varchar`,
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
