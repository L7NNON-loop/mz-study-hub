import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Shield, Package } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'ebooks' | 'exams';
  available: boolean;
}

const ADMIN_CODE = 'Madara08';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<'ebooks' | 'exams'>('ebooks');

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleAccessCode = () => {
    if (accessCode === ADMIN_CODE) {
      setIsAuthenticated(true);
      toast.success('Acesso autorizado!');
    } else {
      toast.error('Código incorreto!');
    }
  };

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    const productsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    setProducts(productsData);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setCategory('ebooks');
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const productData = {
        title,
        description,
        price: parseFloat(price),
        imageUrl: imageUrl || '',
        category,
        available: true,
      };

      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), productData);
        toast.success('Produto atualizado!');
      } else {
        await addDoc(collection(db, 'products'), productData);
        toast.success('Produto adicionado!');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Erro ao salvar produto');
    }
  };

  const handleEdit = (product: Product) => {
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl);
    setCategory(product.category);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Produto excluído!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Erro ao excluir produto');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-3xl shadow-2xl p-8 border border-border text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-heading font-bold mb-2">
              Painel Admin
            </h1>
            <p className="text-muted-foreground mb-6">
              Digite o código de acesso para continuar
            </p>

            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Código de acesso"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="h-12 rounded-xl text-center text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleAccessCode()}
              />
              <Button
                onClick={handleAccessCode}
                className="w-full"
                size="lg"
                variant="gradient"
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">
              Painel Administrativo 🛠️
            </h1>
            <p className="text-muted-foreground">
              Gerencie produtos e configurações
            </p>
          </div>
          <Button
            variant="gradient"
            size="lg"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="w-5 h-5 mr-2" />
            {showForm ? 'Cancelar' : 'Novo Produto'}
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-card rounded-3xl p-8 border border-border shadow-lg mb-8">
            <h2 className="text-2xl font-heading font-bold mb-6">
              {editingId ? 'Editar Produto' : 'Novo Produto'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Título *</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Matemática 12ª Classe"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preço (MT) *</Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: 500"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição *</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o produto..."
                  className="rounded-xl min-h-[100px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>URL da Imagem</Label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as any)}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ebooks">Ebook</SelectItem>
                      <SelectItem value="exams">Exame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" variant="success" size="lg">
                  {editingId ? 'Atualizar' : 'Adicionar'} Produto
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" size="lg" onClick={resetForm}>
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div>
          <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
            <Package className="w-6 h-6" />
            Produtos ({products.length})
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <p className="text-muted-foreground">Nenhum produto cadastrado ainda</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.category === 'ebooks' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-secondary/10 text-secondary'
                    }`}>
                      {product.category === 'ebooks' ? 'Ebook' : 'Exame'}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {product.price} MT
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
