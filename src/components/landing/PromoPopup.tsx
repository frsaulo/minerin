import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { X } from "lucide-react";

const popupSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  city: z.string().trim().min(2, "Cidade deve ter pelo menos 2 caracteres").max(100, "Nome da cidade muito longo"),
  phone: z.string().trim().min(10, "WhatsApp deve ter pelo menos 10 dígitos").max(20, "WhatsApp muito longo"),
});

type PopupFormData = z.infer<typeof popupSchema>;

const DEFAULT_EMAIL = "sem-email@minerindaband.com.br";
const DEFAULT_STATE = "NI";

const PromoPopup = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof PopupFormData, string>>>({});
  const [formData, setFormData] = useState<PopupFormData>({
    name: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof PopupFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validated = popupSchema.parse(formData);
      const payload = {
        name: validated.name,
        city: validated.city,
        phone: validated.phone,
        email: DEFAULT_EMAIL,
        state: DEFAULT_STATE,
        message: "Cadastro via popup do site.",
      };

      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: payload,
      });

      if (error) {
        throw new Error("Erro ao enviar o cadastro. Tente novamente.");
      }

      if (!data?.success) {
        throw new Error(data?.error || "Erro ao enviar o cadastro.");
      }

      toast({
        title: "Cadastro enviado com sucesso! ✓",
        description: "Em breve entraremos em contato com você.",
      });

      setFormData({ name: "", city: "", phone: "" });
      setIsOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof PopupFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof PopupFormData] = err.message;
          }
        });
        setErrors(newErrors);
        toast({
          title: "Erro no formulário",
          description: "Por favor, verifique os campos destacados.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao enviar",
          description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Cadastro de revendedor"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-background p-6 md:p-8 shadow-elevated">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Fechar popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Aumente sua Renda!
          </h3>
          <p className="mt-2 text-foreground">
            Revendedor autônomo em casa. Revenda pão de queijo congelado na sua casa.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="popup-name" className="text-foreground font-medium">
              Nome
            </Label>
            <Input
              id="popup-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-city" className="text-foreground font-medium">
              Cidade
            </Label>
            <Input
              id="popup-city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Sua cidade"
              className={errors.city ? "border-destructive" : ""}
            />
            {errors.city && <p className="text-destructive text-sm">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-phone" className="text-foreground font-medium">
              Whatsapp
            </Label>
            <Input
              id="popup-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
          </div>

          <Button type="submit" variant="golden" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Enviando..." : "Quero ser revendedor"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PromoPopup;
