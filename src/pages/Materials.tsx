import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookOpen, FileText, Video, Download } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';

export default function Materials() {
  const subjects = [
    {
      name: 'Matemática',
      icon: '📐',
      description: 'Álgebra, geometria, trigonometria e cálculo',
      topics: ['Equações', 'Funções', 'Geometria', 'Estatística'],
    },
    {
      name: 'Física',
      icon: '⚛️',
      description: 'Mecânica, termodinâmica e eletromagnetismo',
      topics: ['Cinemática', 'Dinâmica', 'Energia', 'Ótica'],
    },
    {
      name: 'Química',
      icon: '🧪',
      description: 'Química orgânica, inorgânica e físico-química',
      topics: ['Átomos', 'Ligações', 'Reações', 'Soluções'],
    },
    {
      name: 'Biologia',
      icon: '🧬',
      description: 'Célula, genética, ecologia e evolução',
      topics: ['Células', 'DNA', 'Evolução', 'Ecossistemas'],
    },
    {
      name: 'Português',
      icon: '📝',
      description: 'Gramática, literatura e interpretação de textos',
      topics: ['Gramática', 'Literatura', 'Redação', 'Interpretação'],
    },
    {
      name: 'História',
      icon: '🏛️',
      description: 'História de Moçambique e história mundial',
      topics: ['Colonização', 'Independência', 'Guerras', 'Civilizações'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Matérias Gratuitas 📚
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Acesse conteúdos educacionais de qualidade em diversas disciplinas. 
            Todo o material é gratuito e está disponível para download.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">
              Apostilas Completas
            </h3>
            <p className="text-sm text-muted-foreground">
              Material didático organizado por matéria e classe
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">
              Videoaulas
            </h3>
            <p className="text-sm text-muted-foreground">
              Explicações em vídeo de conceitos importantes
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">
              Exercícios
            </h3>
            <p className="text-sm text-muted-foreground">
              Listas de exercícios com gabarito detalhado
            </p>
          </div>
        </div>

        {/* Subjects */}
        <div>
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            Disciplinas Disponíveis
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="text-5xl mb-4">{subject.icon}</div>
                <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {subject.description}
                </p>

                <div className="space-y-2 mb-6">
                  {subject.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{topic}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  <Download className="w-4 h-4 mr-2" />
                  Acessar Material
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 text-center border border-primary/20">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Quer Mais Conteúdo?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore nossa loja para encontrar ebooks completos e exames preparatórios 
            que vão turbinar seus estudos!
          </p>
          <Button variant="gradient" size="lg" onClick={() => window.location.href = '/shop'}>
            Ver Loja Completa
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
