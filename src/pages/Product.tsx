import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/custom-button';
import { ArrowLeft, ShoppingCart, BookOpen, FileText, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ProductData {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'ebooks' | 'exams';
  available: boolean;
  features?: string[];
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const productDoc = await getDoc(doc(db, 'products', productId));
      if (productDoc.exists()) {
        setProduct(productDoc.data() as ProductData);
      } else {
        toast.error('Produto não encontrado');
        navigate('/shop');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Erro ao carregar produto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para a loja
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl overflow-hidden border border-border shadow-2xl">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {product.category === 'ebooks' ? (
                    <BookOpen className="w-32 h-32 text-primary" />
                  ) : (
                    <FileText className="w-32 h-32 text-secondary" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                product.category === 'ebooks' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-secondary/10 text-secondary'
              }`}>
                {product.category === 'ebooks' ? '📚 Ebook' : '📝 Exame'}
              </span>

              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {product.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-muted rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">
                  O que está incluído:
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price & CTA */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Preço</p>
                  <p className="text-4xl font-bold text-primary">{product.price} MT</p>
                </div>
              </div>

              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={() => navigate(`/checkout/${id}`)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar Agora
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Pagamento seguro via USSD ou WhatsApp
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
