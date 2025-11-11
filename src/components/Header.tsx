import { MapPin, Mail, Clock, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/custom-button';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        {/* Top bar - Info */}
        <div className="flex flex-wrap items-center justify-between py-3 text-sm text-muted-foreground gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Maputo — Local X</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>Seg–Sáb, 07:00–17:00</span>
            </div>
          </div>
          <a 
            href="mailto:escoladigital.mz@support.com"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>escoladigital.mz@support.com</span>
          </a>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform">
              📘
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-foreground">Escola Digital</h1>
              <p className="text-xs text-muted-foreground">Moçambique</p>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
                className="hidden sm:flex"
              >
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
