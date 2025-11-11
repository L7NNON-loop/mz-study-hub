import { Mail, LogOut, User, BookOpen } from 'lucide-react';
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
        <div className="flex items-center justify-between py-2 text-xs sm:text-sm text-muted-foreground">
          <a 
            href="mailto:escoladigital.mz@support.com"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">escoladigital.mz@support.com</span>
            <span className="sm:hidden">Suporte</span>
          </a>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-3 border-t border-border/50">
          <div 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-heading font-bold text-foreground">Escola Digital</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Moçambique</p>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
                className="hidden sm:flex h-8 text-xs"
              >
                <User className="w-3 h-3 mr-1" />
                Perfil
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="h-8 text-xs"
              >
                <LogOut className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
