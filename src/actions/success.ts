"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPaymentSuccessEmails(data: { 
  email: string, 
  name: string, 
  vin: string, 
  orderId: string,
  amount: string 
}) {
  try {
    const displayName = data.name && data.name !== "Customer" ? data.name : "Valued Customer";

    // 📧 EMAIL 3: To Admin
    await resend.emails.send({
      from: process.env.RESEND_EMAIL || "TrueK System <noreply@truekinspection.com>",
      to: process.env.OWNER_EMAIL || "contact@truekinspection.com",
      subject: `💰 New Order: ${data.vin}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="background-color: #d32f2f; color: #fff; padding: 15px; text-align: center; margin: 0;">✔️ Payment Successful - TrueK</h2>
          <div style="padding: 20px; background-color: #ffffff;">
            <p>Hello TrueK Owner, a new payment has been received:</p>
            <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
              <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold; width: 30%;">Name:</td><td style="padding: 10px;">${displayName}</td></tr>
              <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">Email:</td><td style="padding: 10px;">${data.email}</td></tr>
              <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">VIN:</td><td style="padding: 10px;">${data.vin}</td></tr>
              <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">Order ID:</td><td style="padding: 10px;">${data.orderId}</td></tr>
              <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">Amount:</td><td style="padding: 10px;">$${data.amount}</td></tr>
            </table>
          </div>
        </div>`,
    });

    // 📧 EMAIL 4: To User
    await resend.emails.send({
      from: process.env.RESEND_EMAIL || "TrueK Inspection <noreply@truekinspection.com>",
      to: data.email,
      subject: "We have received your payment - TrueK",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="background-color: #d32f2f; color: #fff; padding: 15px; text-align: center; margin: 0;">Payment Received</h2>
          <div style="padding: 20px;">
            <p>Hello ${displayName},</p>
            <p>We have received your payment for the TrueK Inspection Report.</p>
            <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
              <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">VIN:</td><td style="padding: 10px;">${data.vin}</td></tr>
              <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">Order ID:</td><td style="padding: 10px;">${data.orderId}</td></tr>
            </table>
            <p>Our team will email you the report within 6 working hours.</p>
          </div>
        </div>`,
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}