import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchProduct(id);
      setSelectedProductId(id);
    }
    fetchAllProducts();
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const productDoc = await getDoc(doc(db, 'products', productId));
      if (productDoc.exists()) {
        setProduct({ id: productDoc.id, ...productDoc.data() } as Product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Erro ao carregar produto');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const snapshot = await (await import('firebase/firestore')).getDocs(collection(db, 'products'));
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setAllProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const generateOrderId = () => {
    const chars = '123456789ABCDEFGH#&';
    let orderId = '';
    for (let i = 0; i < 5; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !whatsapp || !selectedProductId) {
      toast.error('Preencha todos os campos');
      return;
    }

    const selectedProduct = allProducts.find(p => p.id === selectedProductId);
    if (!selectedProduct) {
      toast.error('Produto não encontrado');
      return;
    }

    try {
      const orderId = generateOrderId();

      // Save order to Firebase
      await addDoc(collection(db, 'orders'), {
        orderId,
        customerName,
        whatsapp,
        productId: selectedProduct.id,
        productName: selectedProduct.title,
        productPrice: selectedProduct.price,
        createdAt: new Date(),
        status: 'pending'
      });

      // Redirect to WhatsApp
      const message = encodeURIComponent(
        `Ola, Gostaria de efectuar a compra: ${orderId}\n\nProduto: ${selectedProduct.title}\nValor: ${selectedProduct.price} MT\nNome: ${customerName}`
      );
      window.open(`https://wa.me/258853984699?text=${message}`, '_blank');

      toast.success('Pedido iniciado! Você será redirecionado para o WhatsApp');
      
      setTimeout(() => {
        navigate('/shop');
      }, 2000);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Erro ao criar pedido');
    }
  };

  const selectedProduct = allProducts.find(p => p.id === selectedProductId);
  const totalPrice = selectedProduct?.price || 0;

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-8">
            Finalizar Compra
          </h1>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-border shadow-lg">
                <h2 className="text-xl md:text-2xl font-heading font-bold mb-6">
                  Dados do Comprador
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Seu nome completo"
                      className="h-11 md:h-12 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">Número de WhatsApp *</Label>
                    <Input
                      id="whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="Ex: 258871234567"
                      className="h-11 md:h-12 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product">Produto *</Label>
                    <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                      <SelectTrigger className="h-11 md:h-12 rounded-xl">
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {allProducts.map((prod) => (
                          <SelectItem key={prod.id} value={prod.id}>
                            {prod.title} - {prod.price} MT
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full mt-6"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Iniciar Compra
                  </Button>
                </form>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl md:rounded-3xl p-6 border border-border shadow-lg sticky top-4">
                <h2 className="text-lg md:text-xl font-heading font-bold mb-6">
                  Resumo do Pedido
                </h2>

                {selectedProduct && (
                  <div className="space-y-4">
                    {/* Product Image */}
                    {selectedProduct.imageUrl && (
                      <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                        <img
                          src={selectedProduct.imageUrl}
                          alt={selectedProduct.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="space-y-2 py-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">Produto:</p>
                      <p className="font-semibold">{selectedProduct.title}</p>
                    </div>

                    {/* Price */}
                    <div className="space-y-2 py-4 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-semibold">{totalPrice} MT</span>
                      </div>
                      <div className="flex justify-between items-center text-lg md:text-xl font-bold text-primary pt-2 border-t border-border">
                        <span>Total:</span>
                        <span>{totalPrice} MT</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-muted rounded-xl p-4 space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Pagamento via WhatsApp</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Entrega em até 24h</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Suporte dedicado</span>
                      </div>
                    </div>
                  </div>
                )}

                {!selectedProduct && (
                  <p className="text-center text-muted-foreground py-8">
                    Selecione um produto para ver o resumo
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
