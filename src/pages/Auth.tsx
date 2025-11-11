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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (!isLogin && !name) {
      toast.error('Preencha seu nome');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        
        // Check if user has completed onboarding
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser!.uid));
        if (userDoc.exists() && userDoc.data().onboardingCompleted) {
          navigate('/dashboard');
        } else {
          navigate('/onboarding');
        }
        
        toast.success('Login realizado com sucesso!');
      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create user document
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          email,
          createdAt: new Date().toISOString(),
          onboardingCompleted: false,
        });
        
        toast.success('Conta criada com sucesso!');
        navigate('/onboarding');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Este email já está em uso');
      } else if (error.code === 'auth/weak-password') {
        toast.error('A senha deve ter pelo menos 6 caracteres');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Email inválido');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Email ou senha incorretos');
      } else {
        toast.error('Erro ao processar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl mx-auto mb-4 shadow-xl">
            📘
          </div>
          <h1 className="text-3xl font-heading font-bold mb-2">Escola Digital MZ</h1>
          <p className="text-muted-foreground">Educação de qualidade para todos</p>
        </div>

        {/* Auth Form */}
        <div className="bg-card rounded-3xl shadow-2xl p-8 border border-border">
          <div className="flex gap-2 mb-6">
            <Button
              variant={isLogin ? "default" : "outline"}
              className="flex-1"
              onClick={() => setIsLogin(true)}
              type="button"
            >
              Entrar
            </Button>
            <Button
              variant={!isLogin ? "default" : "outline"}
              className="flex-1"
              onClick={() => setIsLogin(false)}
              type="button"
            >
              Criar Conta
            </Button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
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
