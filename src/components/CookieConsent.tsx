import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/custom-button';
import { Cookie, X } from 'lucide-react';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setShowConsent(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card/95 backdrop-blur-lg border border-border rounded-2xl shadow-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-base font-heading font-bold mb-1.5">
                🍪 Usamos Cookies
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego do site. 
                Ao continuar navegando, você concorda com nossa política de cookies.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="gradient"
                  size="sm"
                  className="text-xs h-9"
                  onClick={acceptCookies}
                >
                  Aceitar Todos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-9"
                  onClick={declineCookies}
                >
                  Apenas Necessários
                </Button>
              </div>
            </div>
            
            <button
              onClick={declineCookies}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 flex-shrink-0"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
