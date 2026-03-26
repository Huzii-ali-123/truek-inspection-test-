"use server";

import db from "@/lib/db";
import { Resend } from "resend";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  vnnumber: string;
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleContactForm(data: ContactFormData) {
  try {
    const { firstName, lastName, email, vnnumber, message } = data;

    const contact = await db.contact.create({
      data: { firstName, lastName, email, vnnumber, message },
    });

    // 1. Send full details TO THE ADMIN
  // 1. Send full details TO THE ADMIN
await resend.emails.send({
  from: process.env.RESEND_EMAIL || "Car Inspection <noreply@truekinspection.com>",
  to: process.env.OWNER_EMAIL || "contact@truekinspection.com",
  subject: "📧 New Contact Form Submission - TrueK",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #f8f9fa;">
      <h2 style="background-color: #d32f2f; color: #fff; padding: 15px; text-align: center; margin: 0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        📩 New Contact Inquiry
      </h2>
      <div style="padding: 20px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #555;">
          Hello <strong>TrueK Owner</strong>,<br><br>
          You have received a new message from the contact form:
        </p>
        <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; color: #333;">
          <tr>
            <td style="padding: 10px; background-color: #d32f2f; font-weight: bold; color: #fff; width: 30%;">From:</td>
            <td style="padding: 10px;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #d32f2f; font-weight: bold; color: #fff;">Email:</td>
            <td style="padding: 10px;">${email}</td>
          </tr>
        </table>
        <h3 style="color: #d32f2f; margin-top: 20px;">Message:</h3>
        <div style="background-color: #fff0f0; padding: 15px; border-left: 4px solid #d32f2f; font-style: italic;">
          ${message}
        </div>
      </div>
      <footer style="background-color: #424242; padding: 10px; text-align: center; font-size: 12px; color: #fff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        <strong>TrueK Car Inspection</strong> | Customer Support Lead
      </footer>
    </div>
  `,
});

    // 2. Send "Message Received" TO THE USER
    await resend.emails.send({
      from: process.env.RESEND_EMAIL || "Car Inspection <noreply@truekinspection.com>",
      to: email, 
      subject: "We've received your message - TrueK",
      html: `<p>Hi ${firstName}, thanks for reaching out! We'll get back to you within 24 hours.</p>`,
    });

    return { success: true, data: contact };
  } catch (error) {
    return { success: false, error: "Internal Server Error" };
  }
}