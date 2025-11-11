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
  category: 'ebooks' | 'exams';
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

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Nossa Loja 🛒
          </h1>
          <p className="text-xl text-muted-foreground">
            Encontre ebooks e exames preparatórios para aprimorar seus estudos
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-8 shadow-md">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-xl"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="ebooks">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Ebooks
                  </div>
                </SelectItem>
                <SelectItem value="exams">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Exames
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border animate-pulse">
                <div className="bg-muted h-48 rounded-xl mb-4" />
                <div className="bg-muted h-6 rounded mb-2" />
                <div className="bg-muted h-4 rounded mb-4" />
                <div className="bg-muted h-10 rounded" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-heading font-semibold mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
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
                        <BookOpen className="w-16 h-16 text-primary" />
                      ) : (
                        <FileText className="w-16 h-16 text-secondary" />
                      )}
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.category === 'ebooks' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {product.category === 'ebooks' ? 'Ebook' : 'Exame'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        {product.price} MT
                      </span>
                    </div>
                    <Button size="sm" variant="gradient">
                      <ShoppingCart className="w-4 h-4 mr-2" />
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
