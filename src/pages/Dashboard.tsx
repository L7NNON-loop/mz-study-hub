import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/custom-button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ShoppingBag, FileText, MessageCircle, Sparkles, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-education.jpg';

export default function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: 'Matérias Gratuitas',
      description: 'Acesse conteúdos educacionais de qualidade sem custos',
      gradient: 'from-blue-500 to-cyan-500',
      route: '/materials',
    },
    {
      icon: ShoppingBag,
      title: 'Loja de Ebooks',
      description: 'Compre livros digitais para aprofundar seus estudos',
      gradient: 'from-purple-500 to-pink-500',
      route: '/shop?category=ebooks',
    },
    {
      icon: FileText,
      title: 'Exames Preparatórios',
      description: 'Prepare-se com exames anteriores e simulados',
      gradient: 'from-orange-500 to-red-500',
      route: '/shop?category=exams',
    },
    {
      icon: MessageCircle,
      title: 'Chat de Suporte',
      description: 'Tire suas dúvidas com nossa equipe',
      gradient: 'from-green-500 to-emerald-500',
      route: '/chat',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Bem-vindo à Escola Digital MZ
                </div>
                <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight">
                  Educação de <span className="text-gradient">Qualidade</span> ao Seu Alcance
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Acesse matérias gratuitas, compre ebooks e prepare-se para seus exames. 
                  Tudo em uma plataforma moderna e acessível.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="gradient" onClick={() => navigate('/materials')}>
                    <BookOpen className="w-5 h-5 mr-2" />
                    Começar a Estudar
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/shop')}>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Ver Loja
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={heroImage} 
                    alt="Estudantes africanos estudando" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-xl border border-border hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1000+</p>
                      <p className="text-sm text-muted-foreground">Estudantes Ativos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              O Que Oferecemos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore todas as ferramentas e recursos disponíveis para acelerar seu aprendizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.route)}
                className="group cursor-pointer bg-card rounded-3xl p-6 border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 pb-20">
          <div className="bg-gradient-to-br from-primary via-primary to-accent rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Junte-se a centenas de estudantes que já estão transformando sua educação com a Escola Digital MZ
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/shop')}
              className="shadow-xl hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Explorar Loja
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
