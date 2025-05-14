
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailSubscriber {
  id: string;
  email: string;
  created_at: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const subscriber: EmailSubscriber = await req.json();
    console.log("Received subscription data:", subscriber);

    if (!subscriber.email) {
      throw new Error("Email is required");
    }

    const emailResponse = await resend.emails.send({
      from: "AI László <info@ailaszlo.com>",
      to: [subscriber.email],
      subject: "Köszönjük a feliratkozást! Itt az ingyenes eBook",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #4a6cf7; margin-bottom: 20px;">Köszönjük a feliratkozást!</h1>
          
          <p>Kedves Feliratkozó!</p>
          
          <p>Köszönjük, hogy feliratkozott hírlevelünkre! Nagy örömmel adjuk át Önnek az ígért ingyenes eBook-ot, amely segítségével még hatékonyabban növelheti vállalkozása konverzióit.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 25px 0;">
            <p style="font-weight: bold; margin-bottom: 15px;">Az eBook letöltéséhez kattintson az alábbi gombra:</p>
            
            <a href="https://ailaszlo.com/ebook.pdf" 
               style="display: inline-block; background-color: #4a6cf7; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold;">
              eBook Letöltése
            </a>
          </div>
          
          <p>A "Konverzió pszichológiája" című eBook-ban megtalálja a legújabb és leghatékonyabb stratégiákat, amelyekkel növelheti weboldalának konverzióját és üzleti sikereit.</p>
          
          <p>Ha bármilyen kérdése lenne, kérjük, vegye fel velünk a kapcsolatot az info@ailaszlo.com email címen.</p>
          
          <p style="margin-top: 30px;">Üdvözlettel,<br>AI László csapata</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
            <p>Ezt az emailt azért kapta, mert feliratkozott hírlevelünkre. Ha a jövőben nem szeretne tőlünk emaileket kapni, kérjük, kattintson a leiratkozás linkre hírleveleink alján.</p>
          </div>
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
    console.error("Error in send-subscription-email function:", error);
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
