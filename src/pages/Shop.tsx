import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, ShoppingCart, BookOpen, FileText, Filter } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'ebooks' | 'exams' | 'cursos' | 'apostilas';
  available: boolean;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && (categoryParam === 'ebooks' || categoryParam === 'exams')) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('available', '==', true));
      const snapshot = await getDocs(q);
      
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
            Nossa Loja
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Ebooks e exames preparatórios para aprimorar seus estudos
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-4 border border-border mb-6 shadow-md">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 rounded-lg text-sm"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-10 rounded-lg text-sm">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="ebooks">Ebooks</SelectItem>
                <SelectItem value="exams">Exames</SelectItem>
                <SelectItem value="cursos">Cursos</SelectItem>
                <SelectItem value="apostilas">Apostilas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border animate-pulse">
                <div className="bg-muted h-40 rounded-lg mb-3" />
                <div className="bg-muted h-5 rounded mb-2" />
                <div className="bg-muted h-4 rounded mb-3" />
                <div className="bg-muted h-9 rounded" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {products.length === 0 
                ? 'Ainda não há produtos disponíveis. Volte em breve!'
                : 'Tente ajustar os filtros ou buscar por outro termo'}
            </p>
            {products.length === 0 && (
              <Button variant="outline" size="sm" onClick={() => navigate('/materials')}>
                Ver Matérias Gratuitas
              </Button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {product.category === 'ebooks' ? (
                        <BookOpen className="w-12 h-12 text-primary" />
                      ) : (
                        <FileText className="w-12 h-12 text-secondary" />
                      )}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      product.category === 'ebooks' ? 'bg-primary text-primary-foreground' : 
                      product.category === 'exams' ? 'bg-secondary text-secondary-foreground' :
                      product.category === 'cursos' ? 'bg-accent text-accent-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {product.category === 'ebooks' ? 'Ebook' : 
                       product.category === 'exams' ? 'Exame' :
                       product.category === 'cursos' ? 'Curso' : 'Apostila'}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-heading font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary">
                        {product.price} MT
                      </span>
                    </div>
                    <Button size="sm" variant="gradient" className="text-xs h-8">
                      <ShoppingCart className="w-3 h-3 mr-1.5" />
                      Comprar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
