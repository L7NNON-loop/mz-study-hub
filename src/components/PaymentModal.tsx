import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/custom-button';
import { Phone, MessageCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
}

export const PaymentModal = ({ isOpen, onClose, productName, productPrice }: PaymentModalProps) => {
  const handleUSSD = () => {
    alert('Disque *898# no seu telemóvel e siga as instruções para completar o pagamento.');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Quero comprar: ${productName} por ${productPrice} MT`);
    window.open(`https://wa.me/258871009140?text=${message}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">
            Escolha a forma de pagamento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Product Info */}
          <div className="bg-muted rounded-2xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Produto:</p>
            <p className="font-semibold mb-2">{productName}</p>
            <p className="text-2xl font-bold text-primary">{productPrice} MT</p>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-auto py-4 flex-col gap-2"
              onClick={handleUSSD}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold">Pagamento via USSD</p>
                  <p className="text-sm text-muted-foreground">Disque *898# no seu telemóvel</p>
                </div>
              </div>
            </Button>

            <Button
              variant="gradient"
              className="w-full h-auto py-4 flex-col gap-2"
              onClick={handleWhatsApp}
            >
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold">Pagamento via WhatsApp</p>
                  <p className="text-sm opacity-90">Fale conosco diretamente</p>
                </div>
              </div>
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-4">
            Após o pagamento, você receberá o produto por email em até 24 horas
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
