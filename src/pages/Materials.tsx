import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookOpen, FileText, Video, Download, Calculator, Atom, TestTube, Dna, FileEdit, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';

export default function Materials() {
  const subjects = [
    {
      name: 'Matemática',
      icon: Calculator,
      description: 'Álgebra, geometria, trigonometria e cálculo',
      topics: ['Equações', 'Funções', 'Geometria', 'Estatística'],
      link: 'https://www.escolamz.com/matematica',
    },
    {
      name: 'Física',
      icon: Atom,
      description: 'Mecânica, termodinâmica e eletromagnetismo',
      topics: ['Cinemática', 'Dinâmica', 'Energia', 'Ótica'],
      link: 'https://www.escolamz.com/fisica',
    },
    {
      name: 'Química',
      icon: TestTube,
      description: 'Química orgânica, inorgânica e físico-química',
      topics: ['Átomos', 'Ligações', 'Reações', 'Soluções'],
      link: 'https://www.escolamz.com/quimica',
    },
    {
      name: 'Biologia',
      icon: Dna,
      description: 'Célula, genética, ecologia e evolução',
      topics: ['Células', 'DNA', 'Evolução', 'Ecossistemas'],
      link: 'https://www.escolamz.com/biologia',
    },
    {
      name: 'Português',
      icon: FileEdit,
      description: 'Gramática, literatura e interpretação de textos',
      topics: ['Gramática', 'Literatura', 'Redação', 'Interpretação'],
      link: 'https://www.escolamz.com/portugues',
    },
    {
      name: 'História',
      icon: Landmark,
      description: 'História de Moçambique e história mundial',
      topics: ['Colonização', 'Independência', 'Guerras', 'Civilizações'],
      link: 'https://www.escolamz.com/historia',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3">
            Matérias Gratuitas
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
            Acesse conteúdos educacionais de qualidade em diversas disciplinas. 
            Todo o material é gratuito e está disponível online.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-sm mb-1">
              Apostilas Completas
            </h3>
            <p className="text-xs text-muted-foreground">
              Material didático organizado por matéria e classe
            </p>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
              <Video className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-heading font-semibold text-sm mb-1">
              Videoaulas
            </h3>
            <p className="text-xs text-muted-foreground">
              Explicações em vídeo de conceitos importantes
            </p>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-heading font-semibold text-sm mb-1">
              Exercícios
            </h3>
            <p className="text-xs text-muted-foreground">
              Listas de exercícios com gabarito detalhado
            </p>
          </div>
        </div>

        {/* Subjects */}
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold mb-6 text-center">
            Disciplinas Disponíveis
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-5 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    {subject.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {subject.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground text-xs h-8"
                    onClick={() => window.open(subject.link, '_blank')}
                  >
                    <Download className="w-3 h-3 mr-1.5" />
                    Acessar Material
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center border border-primary/20">
          <h2 className="text-xl sm:text-2xl font-heading font-bold mb-3">
            Quer Mais Conteúdo?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-2xl mx-auto">
            Explore nossa loja para encontrar ebooks completos e exames preparatórios 
            que vão turbinar seus estudos!
          </p>
          <Button variant="gradient" size="default" className="text-sm h-9" onClick={() => window.location.href = '/shop'}>
            Ver Loja Completa
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
