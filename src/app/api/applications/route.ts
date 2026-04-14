import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, page } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    const payload = await getPayload();

    const application = await payload.create({
      collection: "applications",
      data: {
        name,
        phone,
        email: email || undefined,
        message: message || undefined,
        page: page || undefined,
        status: "new",
      },
    });

    return NextResponse.json({ success: true, id: application.id });
  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
