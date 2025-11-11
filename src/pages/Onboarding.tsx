import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Button } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const provinces = [
  'Maputo Cidade', 'Maputo Província', 'Gaza', 'Inhambane', 'Sofala',
  'Manica', 'Tete', 'Zambézia', 'Nampula', 'Niassa', 'Cabo Delgado'
];

const classes = [
  '6ª Classe', '7ª Classe', '8ª Classe', '9ª Classe', '10ª Classe',
  '11ª Classe', '12ª Classe', 'Curso Técnico', 'Universitário', 'Outro'
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [province, setProvince] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleComplete = async () => {
    if (!name || !province || !classLevel) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error('Usuário não autenticado');
        return;
      }

      await updateDoc(doc(db, 'users', user.uid), {
        name,
        province,
        class: classLevel,
        onboardingCompleted: true,
      });

      toast.success('Perfil completo! Bem-vindo!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-card rounded-3xl shadow-2xl p-8 border border-border">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Passo {step} de 3
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round((step / 3) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-heading font-bold mb-2">
                  Qual é o seu nome?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Vamos personalizar sua experiência
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-lg text-base"
                  autoFocus
                />
              </div>

              <Button
                onClick={() => name && setStep(2)}
                className="w-full h-10 text-sm"
                disabled={!name}
                variant="gradient"
              >
                Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Province */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-heading font-bold mb-2">
                  Olá, {name}! 👋
                </h2>
                <p className="text-sm text-muted-foreground">
                  Em que província você está?
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Província</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger className="h-11 rounded-lg text-base">
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

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-10 text-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  onClick={() => province && setStep(3)}
                  className="flex-1 h-10 text-sm"
                  disabled={!province}
                  variant="gradient"
                >
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Class */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-heading font-bold mb-2">
                  Quase lá! 🎓
                </h2>
                <p className="text-sm text-muted-foreground">
                  Qual classe ou curso você está?
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Classe/Curso</Label>
                <Select value={classLevel} onValueChange={setClassLevel}>
                  <SelectTrigger className="h-11 rounded-lg text-base">
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

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 h-10 text-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 h-10 text-sm"
                  disabled={!classLevel || loading}
                  variant="success"
                >
                  {loading ? 'Finalizando...' : 'Finalizar'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
