import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: any;
  userId: string;
}

const FAQ_RESPONSES: Record<string, string> = {
  'olá': 'Olá! Como posso ajudar você hoje? 😊',
  'ola': 'Olá! Como posso ajudar você hoje? 😊',
  'preço': 'Os preços dos nossos produtos variam. Visite a nossa loja para ver todos os preços: /shop',
  'preco': 'Os preços dos nossos produtos variam. Visite a nossa loja para ver todos os preços: /shop',
  'como comprar': 'Para comprar, escolha um produto na loja e selecione o método de pagamento (USSD *898# ou WhatsApp)',
  'pagamento': 'Aceitamos pagamento via USSD (*898#) ou WhatsApp (+258 87 100 9140)',
  'horário': 'Estamos disponíveis de Segunda a Sábado, das 07:00 às 17:00',
  'horario': 'Estamos disponíveis de Segunda a Sábado, das 07:00 às 17:00',
  'email': 'Nosso email de suporte é: escoladigital.mz@support.com',
  'ajuda': 'Posso ajudar com informações sobre produtos, pagamentos e matérias. Como posso ajudar?',
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const messagesRef = collection(db, 'chat', user.uid, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(messagesData);
    });

    // Welcome message
    if (messages.length === 0) {
      sendBotMessage('Olá! Bem-vindo ao suporte da Escola Digital MZ. Como posso ajudar?');
    }

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendBotMessage = async (text: string) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'chat', user.uid, 'messages'), {
        text,
        sender: 'bot',
        timestamp: serverTimestamp(),
        userId: user.uid,
      });
    } catch (error) {
      console.error('Error sending bot message:', error);
    }
  };

  const getAutoResponse = (userMessage: string): string | null => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    return 'Obrigado pela sua mensagem! Nossa equipe irá responder em breve. Para questões urgentes, contacte-nos via email: escoladigital.mz@support.com';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;

    setLoading(true);

    try {
      // Send user message
      await addDoc(collection(db, 'chat', user.uid, 'messages'), {
        text: newMessage,
        sender: 'user',
        timestamp: serverTimestamp(),
        userId: user.uid,
      });

      // Get and send auto response
      const response = getAutoResponse(newMessage);
      setTimeout(() => {
        sendBotMessage(response);
      }, 1000);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold mb-2">
              Chat de Suporte 💬
            </h1>
            <p className="text-muted-foreground">
              Tire suas dúvidas conosco. Estamos aqui para ajudar!
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-warning flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-6 border-t border-border bg-muted/30">
              <div className="flex gap-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="h-12 rounded-xl flex-1"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-12 w-12 rounded-xl"
                  disabled={loading || !newMessage.trim()}
                  variant="gradient"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-6 bg-muted rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground">
              💡 Para questões urgentes, entre em contacto via email:{' '}
              <a href="mailto:escoladigital.mz@support.com" className="text-primary font-medium hover:underline">
                escoladigital.mz@support.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
