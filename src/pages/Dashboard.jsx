import { Link } from "react-router-dom"
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
        { label: "Sessao", value: "Ativa", detail: "Login local persistido." },
        { label: "Perfil", value: getRoleLabel(user?.role), detail: "Permissao demo carregada." },
        { label: "Workspace", value: user?.company || "Studio", detail: "Contexto autenticado do usuario." },
        { label: "Stack", value: "React + auth", detail: "Fluxo pronto para portfolio." },
      ]
    : [
        { label: "Sessao", value: "Ativa", detail: "Conta autenticada com persistencia local." },
        { label: "Conta", value: getRoleLabel(user?.role), detail: "Jornada de cliente carregada." },
        { label: "Workspace", value: user?.company || "Cliente", detail: "Contexto da conta demo." },
        { label: "Perfil", value: "Pronto", detail: "Dados podem ser editados na area de perfil." },
      ]

  const quickCards = isAdminUser
    ? [
        { title: "Jornada pronta", detail: "Login, sessao, shell e dashboard no mesmo fluxo.", to: "/dashboard" },
        { title: "Perfil editavel", detail: "Avatar, bio, links e stack ficam salvos localmente.", to: "/perfil" },
        { title: "Base de portfolio", detail: "Projeto pronto para virar repositorio publico separado.", to: "/perfil" },
      ]
    : [
        { title: "Area pessoal", detail: "Atualize seus dados e personalize a conta demo.", to: "/perfil" },
        { title: "Sessao persistente", detail: "Ao recarregar, o workspace continua autenticado.", to: "/dashboard" },
        { title: "Fluxo realista", detail: "A mesma base serve para mostrar auth e shell SaaS.", to: "/perfil" },
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
        description="Uma demo publica de login, cadastro e workspace com cara de produto real."
        eyebrow="SaaS auth demo"
        meta={
          <>
            <span className="mini-pill emphasis">Sessao local</span>
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
