import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/custom-button';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';

export default function SubjectContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get('url');
  const title = searchParams.get('title');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) {
      navigate('/materials');
    }
  }, [url, navigate]);

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

        <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ minHeight: '70vh' }}>
          {loading && (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          {url && (
            <iframe
              src={url}
              className="w-full"
              style={{ height: '70vh', border: 'none' }}
              onLoad={() => setLoading(false)}
              title={title || 'Conteúdo da matéria'}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
