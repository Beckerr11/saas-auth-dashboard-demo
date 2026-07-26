import { Link } from "react-router"
import MetricTile from "../components/ui/MetricTile"
import PageHero from "../components/ui/PageHero"
import SectionHeader from "../components/ui/SectionHeader"
import { useAuth } from "../hooks/useAuth"
import { canAccessAdmin, getRoleLabel } from "../utils/roles"

function QuickCard({ title, detail, to }) {
  return (
    <article className="surface nested-card compact-card">
      <strong>{title}</strong>
      <p className="section-copy">{detail}</p>
      <Link className="inline-link" to={to}>
        Abrir
      </Link>
    </article>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const isAdminUser = canAccessAdmin(user)

  const metrics = isAdminUser
    ? [
        { label: "Arquitetura", value: "Frontend", detail: "React, Router e estado local demonstrativo." },
        { label: "Sessão", value: "Simulada", detail: "Controle de interface, sem proteção de dados reais." },
        { label: "Interface", value: "Premium", detail: "Componentização focada em UX operacional." },
        { label: "Deploy", value: "Publicado", detail: "Demo estática hospedada na Vercel." },
      ]
    : [
        { label: "Modo", value: "Demonstração", detail: "Experiência guiada de produto e engenharia." },
        { label: "Persistência", value: "Local", detail: "Dados salvos em sessão para simular sistema real." },
        { label: "Objetivo", value: "Prova Técnica", detail: "Demonstrar domínio de CRUD e Dashboards." },
        { label: "Status", value: "Local", detail: "Sem banco ou autenticação real." },
      ]

  const quickCards = isAdminUser
    ? [
        { title: "Engenharia de Produto", detail: "Explore como os módulos se conectam tecnicamente.", to: "/dashboard" },
        { title: "Vitrine de Skills", detail: "Perfil editável para mostrar domínio de estados.", to: "/perfil" },
        { title: "Base de Portfólio", detail: "Arquitetura modular preparada para evolução e manutenção.", to: "/perfil" },
      ]
    : [
        { title: "Simulação de Fluxo", detail: "Entenda a lógica de um workspace autenticado.", to: "/perfil" },
        { title: "Consistência Técnica", detail: "Mesma stack da landing até o dashboard interno.", to: "/dashboard" },
        { title: "Foco em Interface", detail: "Demonstração dos estados principais da jornada.", to: "/perfil" },
      ]

  return (
    <>
      <PageHero
        actions={
          <>
            <Link className="button" to="/perfil">
              Abrir perfil
            </Link>
            <Link className="button ghost" to="/dashboard">
              Atualizar visao
            </Link>
          </>
        }
        aside={
          <div className="hero-stat-grid">
            <MetricTile detail="Tipo da conta autenticada." icon="admin" label="Permissao" value={getRoleLabel(user?.role)} />
            <MetricTile detail="Contexto atual do workspace demo." icon="dashboard" label="Empresa" value={user?.company || "Workspace"} />
          </div>
        }
        className="hero-dashboard"
        description="Demonstração técnica de frontend, sessão simulada e gestão de perfil local."
        eyebrow="Prova de Produto"
        meta={
          <>
            <span className="mini-pill emphasis">Sessão simulada</span>
            <span className="mini-pill">React + Router</span>
          </>
        }
        title={`Bem-vindo, ${user?.fullName || user?.username || "usuario"}`}
      />

      <section className="stats-grid">
        {metrics.map((item) => (
          <MetricTile detail={item.detail} key={item.label} label={item.label} value={item.value} />
        ))}
      </section>

      <section className="surface section-card">
        <SectionHeader eyebrow="Acoes" title="Blocos principais" />
        <div className="card-grid">
          {quickCards.map((item) => (
            <QuickCard detail={item.detail} key={item.title} title={item.title} to={item.to} />
          ))}
        </div>
      </section>
    </>
  )
}
