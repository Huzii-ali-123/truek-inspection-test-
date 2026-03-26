"use server";

import db from "@/lib/db";
import { Resend } from "resend";

type ReportRequest = {
  firstName: string;
  lastName: string;
  email: string;
  vnNumber: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleReportRequest(data: ReportRequest) {
  try {
    const { firstName, lastName, email, vnNumber } = data;

    if (!firstName || !lastName || !email || !vnNumber) {
      throw new Error("Required fields are missing");
    }

    const report = await db.report.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        vinNumber: vnNumber,
      },
    });

    const fullName = `${firstName} ${lastName}`;

    // 1. Send Confirmation Email TO THE USER
    await resend.emails.send({
      from: process.env.RESEND_EMAIL || "Car Inspection <noreply@truekinspection.com>",
      to: email, // <--- CHANGED TO USER EMAIL
      subject: `Your Car Inspection Request - TrueK`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; background-color: #f8f9fa;">
          <h2 style="background-color: #d32f2f; color: #fff; padding: 15px; text-align: center; margin: 0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            📄 TrueK Car Inspection Report Request
          </h2>
          <div style="padding: 20px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #555;">
              Hello <strong>${fullName}</strong>,<br><br>
              We have received your request for a car inspection report. Our team is processing it now.
            </p>
            <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
              <tr><td style="padding: 10px; font-weight: bold;">VIN Number:</td><td>${vnNumber}</td></tr>
            </table>
            <p>You will receive the full report at this email address in 6 working hours.</p>
          </div>
        </div>
      `,
    });

    // 2. Send Notification TO THE ADMIN (Optional but helpful)
   // 2. Send Notification TO THE ADMIN
await resend.emails.send({
  from: process.env.RESEND_EMAIL || "Car Inspection <noreply@truekinspection.com>",
  to: process.env.OWNER_EMAIL || "contact@truekinspection.com",
  subject: `🚗 New Order Request: ${vnNumber}`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #f8f9fa;">
      <h2 style="background-color: #d32f2f; color: #fff; padding: 15px; text-align: center; margin: 0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        📄 New Inspection Request
      </h2>
      <div style="padding: 20px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #555;">
          Hello <strong>TrueK Owner</strong>,<br><br>
          A new request has been submitted for a car inspection report. Below are the details:
        </p>
        <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; color: #333;">
          <tr>
            <td style="padding: 10px; background-color: #d32f2f; font-weight: bold; color: #fff; width: 30%;">Name:</td>
            <td style="padding: 10px;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #d32f2f; font-weight: bold; color: #fff;">Email:</td>
            <td style="padding: 10px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #d32f2f; font-weight: bold; color: #fff;">VIN Number:</td>
            <td style="padding: 10px;">${vnNumber}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Please process this request accordingly. A payment attempt should be following this email.
        </p>
      </div>
      <footer style="background-color: #424242; padding: 10px; text-align: center; font-size: 12px; color: #fff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        <strong>TrueK Car Inspection</strong> | Admin Notification System
      </footer>
    </div>
  `,
});

    return { success: true, data: report };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Internal Server Error" };
  }
}