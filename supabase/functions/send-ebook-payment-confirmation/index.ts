import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EbookPaymentRequest {
  name: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email }: EbookPaymentRequest = await req.json();

    console.log("Sending payment confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Ai László <onboarding@resend.dev>",
      to: [email],
      subject: "E-book fizetés folyamatban - Ai László",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Köszönjük a megrendelést!</h1>
          
          <p style="color: #555; font-size: 16px;">Kedves ${name}!</p>
          
          <p style="color: #555; font-size: 16px;">
            Köszönjük, hogy megrendelte az "AI működik 2025-ben" e-book-ot. 
            A fizetés folyamatban van.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Fizetési adatok:</h3>
            <p style="color: #555; margin: 5px 0;"><strong>Bankszámlaszám:</strong> 12345678-12345678-12345678</p>
            <p style="color: #555; margin: 5px 0;"><strong>Összeg:</strong> 4.990 Ft</p>
            <p style="color: #555; margin: 5px 0;"><strong>Közlemény:</strong> ${name} - E-book megrendelés</p>
          </div>
          
          <p style="color: #555; font-size: 16px;">
            Kérjük, utalja át a fenti összeget a megadott bankszámlaszámra, 
            és a közleménybe írja be a nevét a fenti forma szerint.
          </p>
          
          <p style="color: #555; font-size: 16px;">
            Az utalás feldolgozása után 1-2 munkanapon belül elküldjük az e-book-ot 
            erre az email címre.
          </p>
          
          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #1976d2; margin: 0; font-size: 14px;">
              <strong>Fontos:</strong> Ha kérdése van, vagy nem kapja meg az e-book-ot 
              2 munkanapon belül, kérjük írjon nekünk erre az email címre.
            </p>
          </div>
          
          <p style="color: #555; font-size: 16px;">
            Üdvözlettel,<br>
            <strong>Ai László</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            Ez egy automatikus email. Kérjük, ne válaszoljon rá.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-ebook-payment-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);