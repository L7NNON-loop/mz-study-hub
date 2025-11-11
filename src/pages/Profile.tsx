import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { User, Mail, MapPin, GraduationCap, Save, ShoppingBag, Package } from 'lucide-react';

const provinces = [
  'Maputo Cidade', 'Maputo Província', 'Gaza', 'Inhambane', 'Sofala',
  'Manica', 'Tete', 'Zambézia', 'Nampula', 'Niassa', 'Cabo Delgado'
];

const classes = [
  '6ª Classe', '7ª Classe', '8ª Classe', '9ª Classe', '10ª Classe',
  '11ª Classe', '12ª Classe', 'Curso Técnico', 'Universitário', 'Outro'
];

interface Purchase {
  id: string;
  productTitle: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [province, setProvince] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [email, setEmail] = useState('');
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      setEmail(user.email || '');

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setName(data.name || '');
        setProvince(data.province || '');
        setClassLevel(data.class || '');
      }

      // Load purchases (if exists)
      try {
        const purchasesRef = collection(db, 'purchases');
        const q = query(
          purchasesRef, 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const purchasesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Purchase[];
        setPurchases(purchasesData);
      } catch (error) {
        // Purchases collection might not exist yet
        console.log('No purchases found');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !province || !classLevel) {
      toast.error('Preencha todos os campos');
      return;
    }

    setSaving(true);

    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, 'users', user.uid), {
        name,
        province,
        class: classLevel,
      });

      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setSaving(false);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-1 flex items-center gap-2">
              <User className="w-7 h-7" />
              Meu Perfil
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie suas informações e acompanhe suas compras
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-auto">
              <TabsTrigger value="profile" className="text-xs sm:text-sm py-2">
                <User className="w-4 h-4 mr-1.5" />
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="purchases" className="text-xs sm:text-sm py-2">
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                Minhas Compras
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="bg-card rounded-2xl border border-border shadow-lg p-6">
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="h-10 rounded-xl bg-muted text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      O email não pode ser alterado
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" />
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="h-10 rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      Província
                    </Label>
                    <Select value={province} onValueChange={setProvince}>
                      <SelectTrigger className="h-10 rounded-xl text-sm">
                        <SelectValue placeholder="Selecione sua província" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((prov) => (
                          <SelectItem key={prov} value={prov}>
                            {prov}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4" />
                      Classe/Curso
                    </Label>
                    <Select value={classLevel} onValueChange={setClassLevel}>
                      <SelectTrigger className="h-10 rounded-xl text-sm">
                        <SelectValue placeholder="Selecione sua classe" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    variant="success"
                    size="default"
                    className="w-full text-sm h-10"
                    disabled={saving}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Purchases Tab */}
            <TabsContent value="purchases">
              <div className="bg-card rounded-2xl border border-border shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold">Histórico de Compras</h3>
                    <p className="text-xs text-muted-foreground">
                      {purchases.length} {purchases.length === 1 ? 'compra realizada' : 'compras realizadas'}
                    </p>
                  </div>
                </div>

                {purchases.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                      <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h4 className="text-base font-semibold mb-1">Nenhuma compra ainda</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Visite nossa loja e adquira materiais de estudo
                    </p>
                    <Button 
                      variant="gradient" 
                      size="sm" 
                      className="text-xs h-8"
                      onClick={() => window.location.href = '/shop'}
                    >
                      Ir para Loja
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="bg-muted/50 rounded-xl p-4 border border-border"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold mb-1">{purchase.productTitle}</h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              {new Date(purchase.createdAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-bold text-primary">
                                {purchase.amount} MT
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                purchase.status === 'completed' 
                                  ? 'bg-success/10 text-success' 
                                  : 'bg-warning/10 text-warning'
                              }`}>
                                {purchase.status === 'completed' ? 'Concluído' : 'Pendente'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
