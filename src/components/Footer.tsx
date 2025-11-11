import { MapPin, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
                📘
              </div>
              <h3 className="font-heading font-bold text-lg">Escola Digital MZ</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Plataforma educacional digital para estudantes moçambicanos. 
              Educação de qualidade ao alcance de todos.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Maputo — Local X, Moçambique</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:escoladigital.mz@support.com" className="hover:text-primary transition-colors">
                  escoladigital.mz@support.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Seg–Sáb, 07:00–17:00</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Redes Sociais</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Siga-nos nas redes sociais para ficar atualizado.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Escola Digital MZ. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
