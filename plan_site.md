# INSTRUÇÃO MESTRE DE DESENVOLVIMENTO: PROJETO "PADARIA AVIAPÃO"

**Contexto da IA:** Você é um Desenvolvedor Front-end Sênior e Especialista em UI/UX. Sua tarefa é construir uma Landing Page e um sistema de menus digitais para a "Padaria Aviapão", um estabelecimento com temática de aviação militar. O site deve transmitir profissionalismo, qualidade premium, imersão temática e ser altamente responsivo.

Execute a construção do site seguindo rigorosamente os parâmetros, requisitos e estrutura definidos abaixo. Não faça substituições de cores, fontes ou textos sem autorização.

---

## 1. DESIGN SYSTEM E IDENTIDADE VISUAL (STRICT)

### 1.1. Paleta de Cores
Aplique as seguintes variáveis CSS globalmente. NENHUMA cor fora desta paleta deve ser usada para elementos estruturais:
* `--bg-dark`: `#282829` (Fundo principal do site, seções e rodapé)
* `--bg-light`: `#E6E7E8` (Fundo de cards, áreas de leitura e elementos de contraste)
* `--text-dark`: `#373435` (Texto principal sobre fundos claros)
* `--text-light`: `#FFFFFF` (Texto sobre fundos escuros, ícones e logotipo)

### 1.2. Tipografia
* **Fonte Exclusiva:** Importar e utilizar o arquivo `Righteous-Regular.ttf`.
* **Aplicação:** Todos os Títulos (H1, H2, H3), botões (CTAs), nomes de produtos e itens de navegação devem usar a fonte *Righteous* para garantir a estética retrô-futurista de aviação.
* **Corpo de Texto:** Use uma fonte sans-serif limpa e legível (ex: Montserrat ou Roboto) nas descrições longas, respeitando o contraste da paleta.

### 1.3. UI/UX e Efeitos Visuais
* **Logotipo:** Utilizar APENAS a versão transparente (traços brancos). É estritamente proibido o uso do logo com fundo quadrado preto. O logo deve "flutuar" sobre o fundo do site.
* **Parallax:** O fundo da Hero Section e seções de transição devem mover-se em velocidade inferior ao conteúdo frontal, criando profundidade 3D.
* **Animações de Scroll:** Elementos devem surgir na tela com efeitos de `fade-in` e `slide-in` (de baixo para cima) ativados pelo scroll.
* **Snap Scroll:** Na página inicial (Home), as seções principais (Hero, História, Pilares) devem ter um comportamento de "snap", grudando na tela ao rolar.
* **Estética Premium:** Aplicar "Glassmorphism" (fundo translúcido com desfoque) no cabeçalho fixo (Header). Cards devem ter bordas levemente arredondadas com bordas sutis simulando metal reluzente.
* **Lightbox:** Todas as imagens de produtos (Cardápio e Padocatel) devem ser clicáveis, abrindo em tela cheia com fundo escurecido.

---

## 2. ESTRUTURA DO SITE E CONTEÚDO (SITEMAP)

Crie um menu de navegação persistente (Sticky Header) contendo: Início | Nossa História | Cardápio | Padocatel | Localização.

### PÁGINA 1: HOME (LANDING PAGE)

**Seção 1: Hero (Destaque Principal)**
* **Fundo:** Imagem de alta definição de pães artesanais com elementos sutis de aviação (pôr do sol, pista/hangar) com efeito Parallax escurecido (`#282829` com opacidade).
* **Logo:** Grande, centralizado, branco transparente.
* **Título (H1):** "Nascida do Sonho de Voar e Servir"
* **Slogan:** "A sua padaria."
* **CTAs:** Dois botões centrais: [Ver Cardápio] e [Fazer Pedido] (link WhatsApp).

**Seção 2: Nossa História**
* **Layout:** Split-screen (Texto de um lado, foto real do salão cheio/karaokê do outro).
* **Texto a inserir:** "Nossa jornada começou em outubro de 2024, atendendo a um desejo antigo das famílias que frequentam o Círculo Militar de Aviação do Exército (CIMAVEX). Mais do que uma padaria, nascemos como uma iniciativa abraçada pela comunidade, que inclusive escolheu nosso nome em votação online. Aviapão une dois orgulhos de Taubaté: a força da Aviação do Exército e a tradição milenar do Pão. Somos o ponto de encontro onde a cultura aeronáutica se mistura ao sabor de casa. O que nos move é o desafio, a inovação e a satisfação de ver sua família feliz à mesa."
* **Subtítulo abaixo:** "Padaria Temática".

**Seção 3: Nossos Pilares (Diferenciais)**
Apresentar 4 cards interativos (hover com leve zoom). Usar fotos REAIS, sem ícones genéricos:
1.  **Produtos de Qualidade:** (Foto da Equipe). Texto: "Nossos fornecedores e parceiros são escolhidos por critérios rígidos de qualidade, sempre pensando em trazer o melhor para nossos clientes por um preço justo."
2.  **Alta Qualidade, Preço Justo:** (Foto dos pães Marquespan).
3.  **Ambiente Temático:** (Foto do interior).
4.  **De Família para Família:** (Foto afetiva). Texto: "Nossos serviços são planejados para atender a família, porque também somos uma família que busca por estabelecimentos adequados às nossas necessidades diárias."
* **Nota:** Inserir a foto real da equipe completa logo acima ou anexa a esta seção, com a tag: "Nossa Tripulação Pronta para Servir".

---

### PÁGINA 2: MENU DE BORDO (CARDÁPIO DIGITAL)

* **Destaque Superior:** Seção "Café Selecionado" com o texto: "O que nós tomamos em casa, também escolhido para nossos clientes."
* **Categorias a criar (Renderizar imagens em grid/cards):**
    * Hambúrgueres (X-Salada, X-Egg, X-Bacon)
    * Porções (Batata Frita)
    * Lanches Autorais (Fennec, Pantera, Cougar, Jaguar, Black Hawk)
    * Massas Especiais (Focaccia)
    * Pães Tradicionais (Pão Francês, Pães Especiais)
    * Lanches Matinais (Manteiga, Mortadela, Ovo, Queijo e Ovo, Requeijão, Salame com Mel)

---

### PÁGINA 3: PADOCATEL (EVENTOS E KITS)

* **Descrição Inicial:** "Desenvolvido especialmente para atender você, sua família, colegas e amigos com opções práticas e deliciosas de café da manhã, coffee break e coquetéis."
* **Botão CTA Fixo no Topo:** [Fazer Pedido] -> Redireciona para o WhatsApp.
* **Bloco 1: Kits de Padaria (Cards Grandes com imagem):**
    * Black Hawk (R$ 249,90) | Jaguar (R$ 159,90) | Pantera (R$ 59,90) | Fennec (R$ 17,90)
* **Bloco 2: Itens Avulsos (Tabela Visual com pequenas imagens):**
    * *Salgados e Pães:* Misto Quente (R$ 9,00, no pão francês), Mini Misto (R$ 5,00), Salgado Lanche - Coxinha (R$ 9,90). Pão de Queijo (R$ 6,85/100g), Salgadinhos de Festa (R$ 6,85/100g), Focaccia (R$ 4,99/100g).
    * *Doces:* Cuca (R$ 5,49/100g), Carolina (R$ 5,49/100g), Brownie (R$ 5,49/100g).
    * *Kits Salgados:* Cento (R$ 99,90), Meio Cento (R$ 49,90), Combo Cento (R$ 149,90), Combo Meio Cento (R$ 69,90).
* **Bloco 3: Bebidas (Estilo visual harmonizado entre café e sucos):**
    * Refrigerantes 2L: A partir de R$ 12,30.
    * Café Coado: R$ 16,50 / L.
    * **Nota de Rodapé da Seção (Destaque VIP):** "Comodidade Inclusa: Na compra de qualquer bebida feita pela casa (a partir de 1L), você recebe a térmica ou garrafa de vidro para viagem já inclusa no valor do produto, pronta para servir no seu evento! (Devolução no mesmo dia)."

---

## 3. RODAPÉ (FOOTER) E INTEGRAÇÕES DE CONTATO

* **Formulário de Contato:** Incluir campos (Nome, Email, Mensagem). Ação de envio ("action") deve estar configurada usando Formsubmit (ou serviço similar estático) para direcionar os leads de forma oculta para: `marcoassa@gmail.com`.
* **WhatsApp Oficial:** O botão/link do WhatsApp deve usar o número `5512996167979` com a mensagem url-encoded: "Olá! Gostaria de fazer um pedido do cardápio Padocatel. 🥐☕".
* **Endereço:** Estrada Municipal dos Remédios, 2135, Granjas Rurais Reunidas São Judas Tadeu, Taubaté-SP, CEP 12086-000. O botão/ícone de mapa deve direcionar para: `https://maps.app.goo.gl/nz17kppYzpH5Htuy9`.
* **Horário de Funcionamento:**
    * Autoatendimento: 24h
    * Atendimento Assistido: Seg a Qui (07:30 - 19:30) | Sex (07:30 - 22:00 - Festivais) | Sáb (Sem atendimento assistido) | Dom (08:00 - 14:00 - Com almoço).
* **Legal:** Exibir o CNPJ `55.673.449/0001-02` e copyright.
* **Redes Sociais:** Usar os ícones oficiais em vetor (SVG) para Instagram e Facebook.
* **Imagem de Fechamento:** Inserir a foto do Balcão de Atendimento como o último elemento visual acima da base do rodapé.

---
**Critério de Sucesso:** O site gerado deve compilar sem erros, carregar os assets via CDN para performance ótima, e refletir uma fusão perfeita entre a estética de aviação militar (Dark Mode) e o acolhimento de uma padaria premium. Inicie a renderização da estrutura.