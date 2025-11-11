import { MapPin, Mail, Clock, Facebook, Instagram, Twitter, BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base">Escola Digital MZ</h3>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Plataforma educacional digital para estudantes moçambicanos. 
              Educação de qualidade ao alcance de todos.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm">Contacto</h4>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <a href="mailto:escoladigital.mz@support.com" className="hover:text-primary transition-colors">
                  escoladigital.mz@support.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span>Seg–Sáb, 07:00–17:00</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm">Redes Sociais</h4>
            <p className="text-muted-foreground text-xs sm:text-sm mb-3">
              Siga-nos nas redes sociais para ficar atualizado.
            </p>
            <div className="flex gap-2">
              <a 
                href="#" 
                className="w-8 h-8 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-6 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© 2024 Escola Digital MZ. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
