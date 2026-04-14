import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";
import ruDict from "../dictionaries/ru.json";
import enDict from "../dictionaries/en.json";

async function seed() {
  const payload = await getPayload({ config });

  console.log("Seeding Content global (ru)...");
  await payload.updateGlobal({
    slug: "content",
    locale: "ru",
    data: { data: ruDict },
  });

  console.log("Seeding Content global (en)...");
  await payload.updateGlobal({
    slug: "content",
    locale: "en",
    data: { data: enDict },
  });

  console.log("Done! Content seeded for both locales.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
