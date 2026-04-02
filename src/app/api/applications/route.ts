import { NextRequest, NextResponse } from "next/server";

// In-memory storage until PostgreSQL is connected
// Will be replaced with Prisma when DB adapter is configured
interface Application {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  page: string | null;
  status: string;
  createdAt: string;
}

const applications: Application[] = [];

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

    const application: Application = {
      id: crypto.randomUUID(),
      name,
      phone,
      email: email || null,
      message: message || null,
      page: page || null,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    applications.push(application);

    return NextResponse.json({ success: true, id: application.id });
  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(applications);
}
