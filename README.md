# SaaS Auth Dashboard Demo

[![CI](https://github.com/Beckerr11/saas-auth-dashboard-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/Beckerr11/saas-auth-dashboard-demo/actions/workflows/ci.yml)

Showcase público de uma experiência SaaS com **login, cadastro, sessão persistente, dashboard protegido por estado local e edição de perfil**.

**Demo:** https://saas-auth-dashboard-demo.vercel.app  
**Portfólio:** https://douglasdev.tech

> Este projeto demonstra **UX e fluxo de autenticação simulada**. Não possui backend de autenticação, OAuth real, hashing de senhas ou tokens de produção e não é apresentado como um sistema de autenticação seguro para uso real.

![Preview do auth demo](./docs/preview-auth-login.png)

## O que este projeto demonstra

- login local com contas de demonstração;
- cadastro de nova conta no ambiente da demo;
- sessão persistente no navegador;
- rota/dashboard condicionado ao estado de autenticação;
- edição de perfil;
- login social explicitamente simulado;
- separação do estado de autenticação em contexto React;
- testes automatizados do comportamento público;
- lint, build e auditoria de dependências em CI.

## Credenciais da demo

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Owner | `douglas@demo.com` | `123456` |
| Client | `cliente@demo.com` | `123456` |

Essas credenciais são fictícias e existem somente dentro do showcase público.

## Fluxo

```text
Login / cadastro
      ↓
AuthContext
      ↓
Estado de sessão local
      ↓
Dashboard
      ↓
Perfil editável
      ↓
Persistência no navegador
```

`AuthContext.jsx` concentra o estado de sessão e as contas da demo. A interface consome esse contrato para decidir navegação e acesso às telas, sem fingir que existe uma API de autenticação por trás do projeto.

## Stack

- React 19;
- Vite 7;
- React Router;
- React Icons;
- Tailwind CSS;
- localStorage;
- Node.js test runner;
- ESLint;
- GitHub Actions;
- Playwright para captura do material de showcase.

## Executando localmente

O projeto declara Node.js 24.x.

```bash
npm ci
npm run dev
```

## Testes e qualidade

```bash
npm test
npm run lint
npm run build
npm audit --omit=dev --audit-level=high
```

O GitHub Actions executa automaticamente esse gate em pushes e pull requests para `main`:

1. `npm ci`;
2. testes automatizados;
3. lint;
4. build de produção;
5. auditoria das dependências de produção.

## Estrutura principal

```text
src/
├── context/
│   └── AuthContext.jsx  # sessão local e contas da demo
└── pages/
    ├── Login.jsx        # login local e social simulado
    ├── Register.jsx     # cadastro de conta na demo
    ├── Dashboard.jsx    # workspace após autenticação
    └── Profile.jsx      # edição de perfil

tests/                  # verificações automatizadas
showcase/               # roteiro e material de apresentação
scripts/                # automação de captura do showcase
```

## Decisões de engenharia

- **Escopo explícito de demo:** o projeto separa experiência de autenticação de segurança real, evitando apresentar um mock como implementação de produção.
- **Estado centralizado:** autenticação e sessão ficam concentradas no contexto em vez de espalhadas pelas páginas.
- **Persistência local:** facilita a avaliação pública sem infraestrutura externa.
- **Pipeline verificável:** testes, lint, build e auditoria são executados no CI.

## Segurança e limites

Contas, senhas em texto simples e tokens simulados são dados fictícios locais. Eles **não devem ser reutilizados como arquitetura de autenticação de produção**.

O projeto não implementa:

- backend de autenticação;
- banco de usuários;
- hashing de senha;
- cookies `HttpOnly`;
- OAuth/OIDC real;
- rotação ou validação criptográfica de tokens;
- autorização server-side.

Esses limites são deliberadamente documentados para que o estado do repositório seja avaliável sem confundir demonstração de UX com segurança de autenticação.

## Showcase e entrevista

- `showcase/README.md` — visão geral do showcase;
- `showcase/video-script.md` — roteiro de vídeo;
- `showcase/scenes.md` — lista de cenas;
- `showcase/captions.md` — legendas sugeridas;
- `docs/INTERVIEW_GUIDE.md` — guia para apresentação técnica do projeto.

**Validado em 26/07/2026:** testes, lint, build, auditoria de dependências e fluxo local.

## Autor

**Douglas Silva**  
[GitHub](https://github.com/Beckerr11) · [Portfólio](https://douglasdev.tech) · [LinkedIn](https://www.linkedin.com/in/douglassilva11)
