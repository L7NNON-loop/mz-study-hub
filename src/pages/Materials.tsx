import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookOpen, FileText, GraduationCap, Calculator, Atom, TestTube, Dna, FileEdit, Landmark, Globe } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Materials() {
  const [activeTab, setActiveTab] = useState('subjects');

  const subjects = [
    {
      name: 'Química',
      icon: TestTube,
      classes: [
        { class: '8ª Classe', url: 'https://www.escolamz.com/search/label/Qu%C3%ADmica%3A%208%C2%AA%20Classe' },
        { class: '9ª Classe', url: 'https://www.escolamz.com/search/label/Qu%C3%ADmica%3A%209%C2%AA%20Classe' },
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Física',
      icon: Atom,
      classes: [
        { class: '10ª Classe', url: 'https://www.escolamz.com/search/label/F%C3%ADsica%3A%2010%C2%AA%20Classe' },
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Biologia',
      icon: Dna,
      classes: [
        { class: '11ª Classe', url: 'https://www.escolamz.com/search/label/Biologia%3A%2011%C2%AA%20Classe' },
        { class: '12ª Classe', url: 'https://www.escolamz.com/search/label/Biologia%3A%2012%C2%AA%20Classe' },
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'História',
      icon: Landmark,
      classes: [
        { class: '9ª Classe', url: 'https://www.escolamz.com/search/label/Hist%C3%B3ria%3A%209%C2%AA%20Classe' },
        { class: '10ª Classe', url: 'https://www.escolamz.com/search/label/Hist%C3%B3ria%3A%2010%C2%AA%20Classe' },
        { class: '11ª Classe', url: 'https://www.escolamz.com/search/label/Hist%C3%B3ria%3A%2011%C2%AA%20Classe' },
        { class: '12ª Classe', url: 'https://www.escolamz.com/search/label/Hist%C3%B3ria%3A%2012%C2%AA%20Classe' },
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Geografia',
      icon: Globe,
      classes: [
        { class: '10ª Classe', url: 'https://www.escolamz.com/search/label/Geografia%3A%2010%C2%AA%20Classe' },
        { class: '11ª Classe', url: 'https://www.escolamz.com/search/label/Geografia%3A%2011%C2%AA%20Classe' },
        { class: '12ª Classe', url: 'https://www.escolamz.com/search/label/Geografia%3A%2012%C2%AA%20Classe' },
      ],
      color: 'from-teal-500 to-cyan-500',
    },
    {
      name: 'Português',
      icon: FileEdit,
      classes: [
        { class: '11ª Classe', url: 'https://www.escolamz.com/search/label/Portugu%C3%AAs%3A%2011%C2%AA%20Classe' },
        { class: '12ª Classe', url: 'https://www.escolamz.com/search/label/Portugu%C3%AAs%3A%2012%C2%AA%20Classe' },
      ],
      color: 'from-indigo-500 to-purple-500',
    },
    {
      name: 'Filosofia',
      icon: BookOpen,
      classes: [
        { class: '11ª Classe', url: 'https://www.escolamz.com/search/label/Filosofia%3A%2011%C2%AA%20Classe' },
        { class: '12ª Classe', url: 'https://www.escolamz.com/search/label/Filosofia%3A%2012%C2%AA%20Classe' },
      ],
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const books = [
    { class: '11ª Classe', url: 'https://www.escolamz.com/search/label/Livros%20da%2011%C2%AA%20Classe' },
    { class: '12ª Classe', url: 'https://www.escolamz.com/search/label/Livros%20da%2012%C2%AA%20Classe' },
  ];

  const exams = [
    { name: 'Exames da 10ª Classe', url: 'https://www.escolamz.com/search/label/Exames%20da%2010%C2%AA%20Classe' },
    { name: 'Exames da 12ª Classe', url: 'https://www.escolamz.com/search/label/Exames%20da%2012%C2%AA%20Classe' },
    { name: 'Exames de Admissão - UP', url: 'https://evirtualmz.blogspot.com/2020/07/baixar-todos-exames-de-admissao-da-up.html' },
    { name: 'Exames de Admissão - UEM', url: 'https://evirtualmz.blogspot.com/search/label/Exames%20de%20Admiss%C3%A3o%20da%20UEM' },
    { name: 'Exames de Admissão - ISRI', url: 'https://evirtualmz.blogspot.com/2020/07/isri-baixar-todos-exames-de-admissao.html' },
    { name: 'Exames de Admissão - ISCISA', url: 'https://evirtualmz.blogspot.com/2020/07/iscisa-baixar-exames-de-admissao.html' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
            Matérias Gratuitas
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Conteúdos educacionais organizados por disciplina, classe e categoria
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-auto">
            <TabsTrigger value="subjects" className="text-xs sm:text-sm py-2">
              <BookOpen className="w-4 h-4 mr-1.5" />
              Disciplinas
            </TabsTrigger>
            <TabsTrigger value="books" className="text-xs sm:text-sm py-2">
              <GraduationCap className="w-4 h-4 mr-1.5" />
              Livros
            </TabsTrigger>
            <TabsTrigger value="exams" className="text-xs sm:text-sm py-2">
              <FileText className="w-4 h-4 mr-1.5" />
              Exames
            </TabsTrigger>
          </TabsList>

          {/* Disciplinas Tab */}
          <TabsContent value="subjects" className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject, idx) => {
                const Icon = subject.icon;
                return (
                  <div
                    key={idx}
                    className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-heading font-bold mb-3">{subject.name}</h3>
                    <div className="space-y-1.5">
                      {subject.classes.map((item, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs h-8"
                          onClick={() => window.open(item.url, '_blank')}
                        >
                          <FileText className="w-3 h-3 mr-1.5" />
                          {item.class}
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Livros Tab */}
          <TabsContent value="books" className="space-y-4">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold">Baixar Livros</h3>
                  <p className="text-xs text-muted-foreground">Material didático completo por classe</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {books.map((book, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-between text-sm h-12"
                    onClick={() => window.open(book.url, '_blank')}
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Livros da {book.class}
                    </span>
                    <FileText className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Exames Tab */}
          <TabsContent value="exams" className="space-y-4">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-orange-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold">Exames e Preparatórios</h3>
                  <p className="text-xs text-muted-foreground">Provas anteriores e exames de admissão</p>
                </div>
              </div>
              <div className="space-y-2">
                {exams.map((exam, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-between text-sm h-11"
                    onClick={() => window.open(exam.url, '_blank')}
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {exam.name}
                    </span>
                    <Calculator className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 text-center border border-primary/20">
          <h2 className="text-lg sm:text-xl font-heading font-bold mb-2">
            Precisa de Mais Material?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 max-w-xl mx-auto">
            Visite nossa loja para ebooks premium e exames preparatórios exclusivos
          </p>
          <Button variant="gradient" size="sm" className="text-xs h-8" onClick={() => window.location.href = '/shop'}>
            Ver Loja
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
