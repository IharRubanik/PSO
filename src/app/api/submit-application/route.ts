import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";
import nodemailer from "nodemailer";

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

    await payload.create({
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

    // Отправка email-уведомления через SMTP из настроек
    try {
      const settings = await payload.findGlobal({
        slug: "site-settings" as "site-settings",
      }) as Record<string, unknown>;

      const smtp = settings?.smtp as {
        notificationEmail?: string;
        smtpHost?: string;
        smtpPort?: number;
        smtpUser?: string;
        smtpPassword?: string;
      } | undefined;

      if (smtp?.notificationEmail && smtp?.smtpHost && smtp?.smtpUser && smtp?.smtpPassword) {
        const transporter = nodemailer.createTransport({
          host: smtp.smtpHost,
          port: smtp.smtpPort || 465,
          secure: (smtp.smtpPort || 465) === 465,
          auth: {
            user: smtp.smtpUser,
            pass: smtp.smtpPassword,
          },
        });

        await transporter.sendMail({
          from: `"Заявка с сайта" <${smtp.smtpUser}>`,
          to: smtp.notificationEmail,
          subject: `Новая заявка — ${name}`,
          html: `
            <h2>Новая заявка с сайта</h2>
            <table style="border-collapse:collapse;font-family:sans-serif;">
              <tr><td style="padding:8px;font-weight:bold;">Имя:</td><td style="padding:8px;">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Телефон:</td><td style="padding:8px;">${phone}</td></tr>
              ${email ? `<tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${email}</td></tr>` : ""}
              ${message ? `<tr><td style="padding:8px;font-weight:bold;">Сообщение:</td><td style="padding:8px;">${message}</td></tr>` : ""}
              ${page ? `<tr><td style="padding:8px;font-weight:bold;">Страница:</td><td style="padding:8px;">${page}</td></tr>` : ""}
            </table>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
