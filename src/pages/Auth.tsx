import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Lock, User as UserIcon } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login flow
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          toast.success('✓ Você está logado', {
            description: 'Redirecionando...',
          });
          setTimeout(() => {
            navigate('/');
          }, 500);
        }
      } else {
        // Sign up flow
        if (password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres');
          toast.error('Senha muito curta', {
            description: 'A senha deve ter pelo menos 6 caracteres',
          });
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          toast.success('✓ Registrado com sucesso', {
            description: 'Bem-vindo! Redirecionando...',
          });
          setTimeout(() => {
            navigate('/');
          }, 500);
        }
      }
    } catch (error: any) {
      setError(error.message);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email já registrado', {
          description: 'Este email já está em uso. Tente fazer login.',
        });
      } else if (error.code === 'auth/invalid-credential') {
        toast.error('Credenciais inválidas', {
          description: 'Email ou senha incorretos.',
        });
      } else {
        toast.error('Erro', {
          description: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3 shadow-lg">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold mb-1">Escola Digital MZ</h1>
          <p className="text-sm text-muted-foreground">Educação de qualidade para todos</p>
        </div>

        {/* Auth Form */}
        <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
          <div className="flex gap-2 mb-4">
            <Button
              variant={isLogin ? "default" : "outline"}
              className="flex-1 text-sm h-9"
              onClick={() => setIsLogin(true)}
              type="button"
            >
              Entrar
            </Button>
            <Button
              variant={!isLogin ? "default" : "outline"}
              className="flex-1 text-sm h-9"
              onClick={() => setIsLogin(false)}
              type="button"
            >
              Criar Conta
            </Button>
          </div>

          <form onSubmit={handleAuth} className="space-y-3">
            {!isLogin && (
              <div className="space-y-1.5">
                <Label htmlFor="name" className="flex items-center gap-1.5 text-xs">
                  <UserIcon className="w-3 h-3" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 rounded-lg text-sm"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="flex items-center gap-1.5 text-xs">
                <Mail className="w-3 h-3" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="flex items-center gap-1.5 text-xs">
                <Lock className="w-3 h-3" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-lg text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-10 text-sm"
              disabled={loading}
              variant="gradient"
            >
              {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          {isLogin && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Esqueceu a senha? Entre em contacto conosco.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
