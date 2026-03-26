import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  // Paddle sends 'transaction.completed' when the money is successfully taken
  if (body.event_type === "transaction.completed") {
    const customerEmail = body.data.customer?.email;
    const customerName = body.data.customer?.name || "Customer";
    const orderId = body.data.id;
    const vin = body.data.custom_data?.vin_number || "N/A";
    const amount = body.data.details?.totals?.total || "49.00";

    try {
      // 📧 EMAIL 3: To Admin (Payment Success Notification)
      await resend.emails.send({
        from: process.env.RESEND_EMAIL || "TrueK System <noreply@truekinspection.com>",
        to: process.env.OWNER_EMAIL || "contact@truekinspection.com",
        subject: `💰 New Order: ${vin}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; background-color: #f8f9fa;">
            <h2 style="background-color: #d32f2f; color: #fff; padding: 15px; text-align: center; margin: 0; border-top-left-radius: 8px;">
              ✔️ Payment Successful - TrueK
            </h2>
            <div style="padding: 20px; background-color: #ffffff;">
              <p>Hello TrueK Owner, a new payment has been received:</p>
              <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
                <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">Name:</td><td style="padding: 10px;">${customerName}</td></tr>
                <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">Email:</td><td style="padding: 10px;">${customerEmail}</td></tr>
                <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">VIN:</td><td style="padding: 10px;">${vin}</td></tr>
                <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">Amount:</td><td style="padding: 10px;">$${amount}</td></tr>
                <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">Order ID:</td><td style="padding: 10px;">${orderId}</td></tr>
              </table>
            </div>
          </div>
        `,
      });

      // 📧 EMAIL 4: To User (Receipt/Confirmation)
      await resend.emails.send({
        from: process.env.RESEND_EMAIL || "TrueK Inspection <noreply@truekinspection.com>",
        to: customerEmail,
        subject: "We have received your payment - TrueK",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="background-color: #d32f2f; color: #fff; padding: 15px; text-align: center; margin: 0;">
              Payment Received
            </h2>
            <div style="padding: 20px; background-color: #ffffff;">
              <p>Hello ${customerName},</p>
              <p>We have received your payment for the TrueK Inspection Report.</p>
              <table style="width: 100%; border-collapse: collapse; background-color: #f8f9fa;">
                <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">VIN:</td><td style="padding: 10px;">${vin}</td></tr>
                <tr><td style="padding: 10px; background-color: #d32f2f; color: #fff; font-weight: bold;">Order ID:</td><td style="padding: 10px;">${orderId}</td></tr>
              </table>
              <p>We will email you the report within 6 working hours.</p>
            </div>
          </div>
        `,
      });
    } catch (e) {
      console.error("Email failed", e);
    }
  }

  return NextResponse.json({ received: true });
}