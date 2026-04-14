import { NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

/**
 * Временный endpoint — сбрасывает/создаёт админа с известными кредами.
 * После использования удалить.
 */
export async function POST() {
  try {
    const payload = await getPayload();

    const existing = await payload.find({
      collection: "users",
      limit: 100,
    });

    const emails = existing.docs.map((u) => ({ id: u.id, email: (u as { email?: string }).email }));

    // Удаляем всех существующих
    for (const u of existing.docs) {
      await payload.delete({ collection: "users", id: u.id });
    }

    // Создаём нового админа
    const newUser = await payload.create({
      collection: "users",
      data: {
        email: "admin@pso.ru",
        password: "admin123",
        name: "Admin",
        role: "admin",
      },
    });

    return NextResponse.json({
      success: true,
      deletedUsers: emails,
      newAdmin: { email: "admin@pso.ru", password: "admin123", id: newUser.id },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
