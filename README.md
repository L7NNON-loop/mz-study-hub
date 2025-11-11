# 📘 Escola Digital MZ

Uma plataforma educacional digital moderna e profissional para estudantes moçambicanos. Desenvolvida com React, TypeScript, Firebase e TailwindCSS.

## ✨ Funcionalidades

### Para Estudantes
- 🎓 **Autenticação Segura** - Login e cadastro com Firebase
- 📝 **Onboarding Personalizado** - Configure seu perfil (nome, província, classe)
- 📚 **Matérias Gratuitas** - Acesso a conteúdos educacionais sem custos
- 🛒 **Loja de Ebooks e Exames** - Compre materiais preparatórios
- 💳 **Pagamento Flexível** - USSD (*898#) ou WhatsApp
- 💬 **Chat de Suporte** - Tire dúvidas em tempo real

### Para Administradores
- 🔐 **Painel Admin Seguro** - Código de acesso: `Madara08`
- ➕ **Gestão de Produtos** - Adicionar, editar e remover produtos
- 📊 **Visualização de Pedidos** - Acompanhe vendas e conversas

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Animações**: Framer Motion
- **PWA**: Configurado para instalação em Android

## 🎨 Design System

O projeto utiliza um design system robusto com:
- **Cores Principais**: 
  - Primary: `#4B6BFB` (Azul vibrante)
  - Secondary: `#F97316` (Laranja energético)
  - Fundo: `#F5F7FA` (Cinza suave)
- **Fontes**: Poppins (headings) + Inter (body)
- **Estilo**: Rounded corners, sombras suaves, animações fluidas

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔥 Firebase Configuration

O projeto já está configurado com Firebase. As credenciais estão em `src/lib/firebase.ts`.

### Estrutura do Firestore

```
users/{userId}
  - name: string
  - email: string
  - province: string
  - class: string
  - onboardingCompleted: boolean
  - createdAt: timestamp

products/{productId}
  - title: string
  - description: string
  - price: number
  - imageUrl: string
  - category: 'ebooks' | 'exams'
  - available: boolean

chat/{userId}/messages/{messageId}
  - text: string
  - sender: 'user' | 'bot'
  - timestamp: timestamp
  - userId: string
```

## 📱 PWA (Progressive Web App)

O aplicativo é configurado como PWA e pode ser instalado em dispositivos Android:

1. Acesse o site no navegador
2. Toque no menu (⋮)
3. Selecione "Adicionar à tela inicial"
4. O app estará disponível como aplicativo nativo

## 🔐 Acesso Admin

Para acessar o painel administrativo:
1. Navegue para `/admin`
2. Digite o código: `Madara08`
3. Gerencie produtos e visualize pedidos

## 📞 Contato & Suporte

- **Email**: escoladigital.mz@support.com
- **WhatsApp**: +258 87 100 9140
- **Localização**: Maputo — Local X, Moçambique
- **Horário**: Segunda a Sábado, 07:00–17:00

## 🎯 Rotas Principais

- `/` - Landing page
- `/auth` - Login e cadastro
- `/onboarding` - Configuração inicial
- `/dashboard` - Dashboard principal
- `/shop` - Loja de produtos
- `/materials` - Matérias gratuitas
- `/chat` - Suporte online
- `/admin` - Painel administrativo
- `/profile` - Perfil do usuário

## 🌟 Features Técnicas

- ✅ Autenticação Firebase completa
- ✅ Rotas protegidas
- ✅ Design responsivo (mobile-first)
- ✅ PWA instalável
- ✅ Sistema de chat em tempo real
- ✅ Upload e gestão de produtos
- ✅ Integração com pagamentos (USSD e WhatsApp)
- ✅ SEO otimizado
- ✅ Performance otimizada

## 📄 Licença

© 2024 Escola Digital MZ. Todos os direitos reservados.

---

Desenvolvido com ❤️ para a educação em Moçambique 🇲🇿
