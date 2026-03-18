import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-email");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      throw new Error("RESEND_API_KEY não configurada");
    }

    const resend = new Resend(resendApiKey);
    const formData: ContactFormData = await req.json();

    console.log("Processing contact form for:", formData.email);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.state) {
      console.error("Missing required fields:", formData);
      throw new Error("Campos obrigatórios não preenchidos");
    }

    // Send email to the company
    const emailResponse = await resend.emails.send({
      from: "MinerindaBand <contato@minerindaband.com.br>",
      to: ["contato@minerindaband.com.br"],
      subject: `Novo Cadastro de Representante - ${formData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3D2314; color: #FFF; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; color: #D4A35C; }
            .content { background-color: #FFF8F0; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #3D2314; }
            .value { margin-top: 5px; padding: 10px; background-color: #FFF; border-radius: 4px; border-left: 3px solid #D4A35C; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MinerindaBand</h1>
              <p>Novo Cadastro de Representante</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nome Completo:</div>
                <div class="value">${formData.name}</div>
              </div>
              <div class="field">
                <div class="label">📧 E-mail:</div>
                <div class="value">${formData.email}</div>
              </div>
              <div class="field">
                <div class="label">📱 Telefone/WhatsApp:</div>
                <div class="value">${formData.phone}</div>
              </div>
              <div class="field">
                <div class="label">📍 Localização:</div>
                <div class="value">${formData.city} - ${formData.state}</div>
              </div>
              ${formData.message ? `
              <div class="field">
                <div class="label">💬 Mensagem:</div>
                <div class="value">${formData.message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Este email foi enviado automaticamente pelo formulário do site.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API Error:", emailResponse.error);
      throw new Error(`Erro ao enviar email: ${emailResponse.error.message}`);
    }

    return new Response(JSON.stringify({ success: true, data: emailResponse.data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
