import { useMemo, useState } from "react"
import TechBadge from "../components/TechBadge"
import MetricTile from "../components/ui/MetricTile"
import PageHero from "../components/ui/PageHero"
import SectionHeader from "../components/ui/SectionHeader"
import { useAuth } from "../hooks/useAuth"
import { getRoleLabel } from "../utils/roles"

export default function Profile() {
  const { updateProfile, user } = useAuth()
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    company: user?.company || "",
    bio: user?.bio || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    avatarUrl: user?.avatarUrl || "",
    favoriteTechnologies: Array.isArray(user?.favoriteTechnologies) ? user.favoriteTechnologies.join(", ") : "",
  })
  const [feedback, setFeedback] = useState({ tone: "", message: "" })
  const [isSaving, setIsSaving] = useState(false)

  const techList = useMemo(
    () =>
      form.favoriteTechnologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 8),
    [form.favoriteTechnologies]
  )

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setFeedback({ tone: "", message: "" })

    try {
      await updateProfile({
        ...form,
        favoriteTechnologies: techList,
      })
      setFeedback({ tone: "success", message: "Perfil atualizado com sucesso." })
    } catch (error) {
      setFeedback({ tone: "error", message: error.message || "Nao foi possivel salvar o perfil." })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <PageHero
        aside={
          <div className="hero-stat-grid">
            <MetricTile detail="Permissao atual da conta demo." icon="admin" label="Role" value={getRoleLabel(user?.role)} />
            <MetricTile detail="Dados persistidos em sessao local." icon="dashboard" label="Status" value="Sincronizado" />
          </div>
        }
        className="profile-page-hero"
        description="Edite os dados da conta demo para mostrar um fluxo completo de perfil autenticado."
        eyebrow="Perfil"
        meta={
          <>
            <span className="mini-pill emphasis">Workspace demo</span>
            <span className="mini-pill">Avatar + bio + links</span>
          </>
        }
        title="Identidade da conta"
      />

      <section className="content-grid profile-layout">
        <form className="surface section-card form-grid profile-form-card" onSubmit={handleSubmit}>
          <SectionHeader
            actions={
              <button className="button" disabled={isSaving} type="submit">
                {isSaving ? "Salvando..." : "Salvar perfil"}
              </button>
            }
            eyebrow="Dados"
            title="Atualizar perfil"
          />

          <div className="form-grid two-column-form">
            <label className="field">
              <span>Nome completo</span>
              <input onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} value={form.fullName} />
            </label>
            <label className="field">
              <span>E-mail</span>
              <input onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} type="email" value={form.email} />
            </label>
            <label className="field">
              <span>Empresa</span>
              <input onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))} value={form.company} />
            </label>
            <label className="field">
              <span>Avatar URL</span>
              <input onChange={(event) => setForm((current) => ({ ...current, avatarUrl: event.target.value }))} placeholder="https://..." value={form.avatarUrl} />
            </label>
            <label className="field">
              <span>GitHub</span>
              <input onChange={(event) => setForm((current) => ({ ...current, github: event.target.value }))} value={form.github} />
            </label>
            <label className="field">
              <span>LinkedIn</span>
              <input onChange={(event) => setForm((current) => ({ ...current, linkedin: event.target.value }))} value={form.linkedin} />
            </label>
            <label className="field field-full">
              <span>Tecnologias favoritas</span>
              <input onChange={(event) => setForm((current) => ({ ...current, favoriteTechnologies: event.target.value }))} placeholder="React, Node.js, MongoDB" value={form.favoriteTechnologies} />
            </label>
            <label className="field field-full">
              <span>Bio</span>
              <textarea onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))} value={form.bio} />
            </label>
          </div>

          {feedback.message ? <p className={`feedback ${feedback.tone}`}>{feedback.message}</p> : null}
        </form>

        <article className="surface section-card profile-preview premium-card">
          {form.avatarUrl ? (
            <img alt={`Avatar de ${form.fullName || "usuario"}`} className="profile-preview-photo" src={form.avatarUrl} />
          ) : (
            <div className="avatar-badge large">{(form.fullName || "D").slice(0, 1).toUpperCase()}</div>
          )}

          <div className="profile-preview-copy">
            <p className="eyebrow">Preview</p>
            <h2>{form.fullName || "Conta demo"}</h2>
            <p className="section-copy">{form.company || "Workspace"}</p>
            <p className="section-copy compact">{form.bio || "Adicione uma bio curta para fortalecer a apresentacao da conta."}</p>
          </div>

          <div className="pill-row stack-chip-row">
            {techList.length
              ? techList.map((tech) => <TechBadge key={tech} value={tech} />)
              : [<span className="mini-pill" key="empty">Sem stack definida</span>]}
          </div>

        </article>
      </section>
    </>
  )
}
