import { MapPin, Phone, Mail } from "lucide-react";
import logoImg from "@/assets/minerindaband.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-[#ffbe1a] text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img 
                src={logoImg} 
                alt="MinerindaBand" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Fábrica de Pães de Queijo artesanais com a tradição e o sabor 
              autêntico de Minas Gerais.
            </p>
          </div>
          
          {/* Contato */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-6 text-[#492a04]">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#492a04]" />
                <span className="text-primary-foreground/80">
                  Av. Santa Terezinha, 106<br />
                  Centro - Bandeira do Sul, MG
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-[#492a04]" />
                <a href="https://wa.me/5535998140495" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-white transition-colors">
                  (35) 99814-0495
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-[#492a04]" />
                <a href="mailto:contato@minerindaband.com.br" className="text-primary-foreground/80 hover:text-white transition-colors">
                  contato@minerindaband.com.br
                </a>
              </li>
            </ul>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-heading text-xl font-semibold mb-6 text-[#492a04]">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#sobre" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Nossos Diferenciais
                </a>
              </li>
              <li>
                <a href="#representante" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Seja um Representante
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} MinerindaBand. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;