import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/custom-button';
import { BookOpen, GraduationCap, Users, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import heroImage from '@/assets/hero-education.jpg';

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const features = [
    'Matérias gratuitas de todas as disciplinas',
    'Ebooks digitais de qualidade',
    'Exames preparatórios e simulados',
    'Suporte online via chat',
    'Conteúdo atualizado constantemente',
    'Acesso em qualquer dispositivo',
  ];

  const stats = [
    { value: '1000+', label: 'Estudantes', icon: Users },
    { value: '50+', label: 'Disciplinas', icon: BookOpen },
    { value: '100+', label: 'Materiais', icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen">
      {/* Header/Nav */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
              📘
            </div>
            <span className="font-heading font-bold text-lg">Escola Digital MZ</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate('/auth')}>
              Entrar
            </Button>
            <Button variant="gradient" onClick={() => navigate('/auth')}>
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Educação Digital para Moçambique
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
                Aprenda com a <span className="text-gradient">Melhor Plataforma</span> Educativa
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Acesse matérias gratuitas, compre ebooks e prepare-se para seus exames. 
                Educação de qualidade ao alcance de todos os moçambicanos.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="gradient" onClick={() => navigate('/auth')}>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Saber Mais
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Estudantes africanos" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Por Que Escolher a Escola Digital?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa para acelerar seu aprendizado
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <p className="text-lg">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gradient-to-br from-primary via-primary to-accent rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Pronto para Começar sua Jornada?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a centenas de estudantes que já estão transformando sua educação 
            com a Escola Digital MZ. É grátis para começar!
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/auth')}
            className="shadow-xl hover:scale-105 text-lg px-8 h-14"
          >
            <GraduationCap className="w-6 h-6 mr-2" />
            Criar Conta Grátis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">
                📘
              </div>
              <span className="font-heading font-bold">Escola Digital MZ</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Escola Digital MZ. Educação de qualidade para Moçambique.
            </p>
            <div className="text-sm text-muted-foreground">
              escoladigital.mz@support.com
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
