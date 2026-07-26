# Como explicar este projeto em entrevista

## O que é

É uma demo pública de cadastro, login, dashboard e perfil em um shell de produto SaaS. O objetivo é demonstrar a jornada e os estados da interface, não oferecer segurança de produção.

## Stack e arquitetura real

- React, Vite, React Router e React Icons.
- `AuthContext.jsx` mantém contas e sessão demonstrativas.
- `ProtectedRoute.jsx` controla a navegação do lado do cliente.
- O estado fica no `localStorage` daquele navegador.

O projeto não possui backend, API de autenticação ou OAuth real. Ele usa senhas de demonstração em texto simples no código, e os tokens simulados servem apenas para controlar a interface. Nada nesta implementação deve proteger dados reais.

## Fluxo principal

1. Abrir o login e testar uma credencial demo ou um provedor simulado.
2. Criar uma conta local e acessar o dashboard.
3. Editar o perfil e recarregar a página para conferir a persistência.
4. Encerrar a sessão e confirmar o retorno ao login.

## Decisões e desafios

- Representar estados autenticado e anônimo sem infraestrutura externa.
- Preservar uma jornada repetível para apresentação.
- Tornar os limites de segurança visíveis no README e na entrevista.
- Manter navegação, foco e layout utilizáveis em desktop e mobile.

## Próximos passos possíveis

- Adotar um backend separado, hash de senha, cookies seguros e expiração real de sessão.
- Integrar OAuth com `state`, PKCE e callback validado no servidor.
- Criar testes de componente e E2E para cadastro, perfil e logout.

## O que o projeto comprova

Ele comprova modelagem de jornada, estado global, rotas protegidas no cliente, formulários e shell de dashboard. Não comprova segurança de autenticação.

## Pitch de 30 segundos

O SaaS Auth Dashboard Demo mostra cadastro, login, dashboard, perfil e logout em React. Toda a autenticação é simulada e local, o que torna a apresentação autônoma; o README deixa claro que uma versão real exigiria backend, hash de senha e sessão segura.

## Pitch de 2 minutos

Eu criei esta demo para apresentar uma jornada de produto autenticado sem depender de serviços externos. A aplicação contém contas de exemplo, cadastro local, rotas protegidas no cliente, dashboard e perfil persistido. A decisão de usar `localStorage`, senhas em texto simples e tokens simulados é estritamente demonstrativa e está documentada como limite, não como solução de segurança. Em produção, eu moveria identidade e autorização para o servidor, aplicaria hash de senha, cookies seguros, expiração, revogação e testes E2E.
