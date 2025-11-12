import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/custom-button';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function SubjectContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get('url');
  const title = searchParams.get('title');
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!url) {
      navigate('/materials');
      return;
    }
    
    fetchContent();
  }, [url, navigate]);

  const fetchContent = async () => {
    if (!url) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Fetch the content from the URL
      const response = await fetch(url);
      const html = await response.text();
      
      // Parse HTML and extract main content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Try to find the main content area
      const article = doc.querySelector('article') || 
                      doc.querySelector('.post-body') || 
                      doc.querySelector('.entry-content') ||
                      doc.querySelector('main') ||
                      doc.querySelector('.content');
      
      if (article) {
        // Clean up the content
        const clonedArticle = article.cloneNode(true) as HTMLElement;
        
        // Remove unwanted elements
        const unwantedSelectors = ['script', 'style', 'iframe', '.ads', '.advertisement', 'nav', 'header', 'footer'];
        unwantedSelectors.forEach(selector => {
          clonedArticle.querySelectorAll(selector).forEach(el => el.remove());
        });
        
        setContent(clonedArticle.innerHTML);
      } else {
        setError('Não foi possível extrair o conteúdo desta página.');
        toast({
          title: "Erro",
          description: "Não foi possível carregar o conteúdo.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Erro ao carregar o conteúdo. Por favor, tente novamente.');
      toast({
        title: "Erro",
        description: "Erro ao carregar o conteúdo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8"
            onClick={() => navigate('/materials')}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Voltar
          </Button>
          
          {url && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => window.open(url, '_blank')}
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Abrir Original
            </Button>
          )}
        </div>

        {title && (
          <h1 className="text-xl sm:text-2xl font-heading font-bold mb-4">
            {decodeURIComponent(title)}
          </h1>
        )}

        <div className="bg-card rounded-xl border border-border overflow-hidden p-6" style={{ minHeight: '70vh' }}>
          {loading && (
            <div className="flex flex-col items-center justify-center h-96 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Carregando conteúdo...</p>
            </div>
          )}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center h-96 gap-3">
              <p className="text-sm text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchContent}>
                Tentar Novamente
              </Button>
            </div>
          )}
          {content && !loading && !error && (
            <article 
              className="prose prose-sm sm:prose lg:prose-lg max-w-none dark:prose-invert
                prose-headings:font-heading prose-headings:font-bold
                prose-p:text-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:list-disc prose-ol:list-decimal
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
