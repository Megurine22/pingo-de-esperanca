# Pingo de Esperança

Projeto front-end desenvolvido para uma ONG fictícia, com foco em semântica, acessibilidade, formulários, interação dinâmica e organização modular do código.

## Sobre o projeto

O Pingo de Esperança é uma aplicação web desenvolvida como projeto acadêmico de Desenvolvimento Front-end. A proposta é apresentar uma interface digital para uma organização do terceiro setor, permitindo apresentar projetos, incentivar o voluntariado, receber contribuições e realizar cadastro de participantes.

O projeto foi desenvolvido priorizando organização do código, separação de responsabilidades, acessibilidade e experiência de utilização.

## Objetivos

- Apresentar os projetos e iniciativas da organização.
- Permitir cadastro de participantes.
- Disponibilizar opções de contribuição voluntária e financeira.
- Validar e tratar os dados inseridos nos formulários.
- Manter informações temporárias no navegador.
- Disponibilizar interações dinâmicas utilizando JavaScript.
- Integrar recursos específicos com Vue 3.
- Aplicar boas práticas de acessibilidade e organização do código.

## Tecnologias utilizadas

### HTML5

Utilizado para estruturar semanticamente as páginas da aplicação, incluindo formulários, navegação, seções, campos agrupados com `fieldset` e `legend`, elementos interativos e conteúdo acessível.

### CSS3

Utilizado para apresentação visual da aplicação, incluindo layout, tipografia, espaçamento, componentes, estados dos campos e responsividade.

### JavaScript

Utilizado para implementar a lógica da aplicação, manipulação do DOM, navegação, eventos, validações, máscaras, armazenamento de dados e integração com serviços externos.

### JavaScript ES6 Modules

A aplicação utiliza `import` e `export` para separar as funcionalidades em módulos, reduzindo o acoplamento e facilitando a manutenção.

### Vue 3

Utilizado como complemento ao JavaScript para o componente relacionado às campanhas e atividades, mantendo a integração isolada das demais funcionalidades.

### APIs externas

- ViaCEP: consulta e preenchimento de dados de endereço a partir do CEP.
- API de localidades do IBGE: carregamento das cidades conforme o estado selecionado.

### Web Storage

O `localStorage` é utilizado para manter dados do formulário e informações da aplicação no navegador.

### Git e GitHub

Utilizados para controle de versão, organização de branches, commits semânticos, Pull Requests, releases e acompanhamento das atividades do projeto.

## Funcionalidades

### Cadastro

O formulário permite o preenchimento de dados pessoais, contato e endereço.

São realizadas validações específicas para:

- Nome completo.
- CPF.
- Telefone.
- Data de nascimento.
- CEP.
- Endereço.
- Número.
- Estado.
- Cidade.

### Máscaras

O formulário possui máscaras para:

- CPF.
- Telefone.
- CEP.

### Consulta de CEP

Após o preenchimento de um CEP válido, a aplicação consulta a API ViaCEP e pode preencher automaticamente informações de endereço, estado e cidade.

### Estados e cidades

Os estados brasileiros são disponibilizados para seleção e as cidades são carregadas conforme o estado escolhido utilizando a API do IBGE.

### Persistência de dados

O formulário possui armazenamento de rascunho utilizando `localStorage`, permitindo recuperar informações preenchidas anteriormente no navegador.

### Contribuições

O utilizador pode selecionar trabalho voluntário e contribuição financeira. Quando as duas opções são selecionadas, a aplicação apresenta uma confirmação antes de continuar.

### Validação acessível

Os campos do formulário apresentam feedback visual conforme o estado de validação e utilizam o atributo `aria-invalid` para representar semanticamente campos válidos e inválidos.

## Estrutura do projeto

```text
pingo-de-esperanca/
│
├── css/
│   └── style.css
│
├── html/
│   ├── index.html
│   ├── projetos.html
│   └── cadastro.html
│
├── imagens/
│   ├── ong.jpg.png
│   └── doacoes.png
│
├── js/
│   ├── api.js
│   ├── app.js
│   ├── campanha.js
│   ├── dados.js
│   ├── formulario.js
│   ├── storage.js
│   ├── templates.js
│   ├── votacao.js
│   └── vue-widget.js
│
└── README.md
## Pré-requisitos

Para executar o projeto localmente, é necessário:

- Navegador web atualizado.
- Visual Studio Code ou outro editor de código.
- Git, caso seja necessário trabalhar com o repositório.

O projeto utiliza HTML, CSS e JavaScript e não possui, nesta etapa, instalação de dependências por gerenciador de pacotes.

## Como executar

1. Clone o repositório:

```bash
git clone https://github.com/Megurine22/pingo-de-esperanca.git
```

2. Acesse a pasta do projeto:

```bash
cd pingo-de-esperanca
```

3. Abra o projeto no Visual Studio Code.

4. Instale as dependências:

```bash
npm install
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

6. Abra no navegador:

```text
http://localhost:5173/html/index.html
```

### Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar localmente a versão de produção:

```bash
npm run preview
```

Acesse:

```text
http://localhost:4173/html/index.html
```

### Site publicado

A versão publicada do projeto está disponível em:

https://megurine22.github.io/pingo-de-esperanca/
