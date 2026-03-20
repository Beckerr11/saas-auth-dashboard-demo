import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import { useAuth } from "../hooks/useAuth"

const loginStats = [
  { label: "Conta demo", value: "owner e client", icon: "approved" },
  { label: "Entrada", value: "local + social", icon: "oauth" },
]

export default function Login() {
  const navigate = useNavigate()
  const { isAuthenticated, login, loginWithProvider } = useAuth()
  const [form, setForm] = useState({ username: "", password: "" })
  const [feedback, setFeedback] = useState({ tone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    }
  }, [isAuthenticated, navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback({ tone: "", message: "" })

    try {
      await login(form)
      navigate("/dashboard", { replace: true })
    } catch (error) {
      setFeedback({ tone: "error", message: error.message || "Nao foi possivel entrar." })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSocial(provider) {
    setIsSubmitting(true)
    setFeedback({ tone: "", message: "" })

    try {
      await loginWithProvider(provider)
      navigate("/dashboard", { replace: true })
    } catch (error) {
      setFeedback({ tone: "error", message: error.message || "Nao foi possivel continuar." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Entrar"
      footerActionLabel="Criar conta"
      footerActionTo="/register"
      footerText="Ainda nao tem acesso?"
      stats={loginStats}
      subtitle="Use uma conta demo ou entre com um provedor simulado."
      title="Acessar workspace"
    >
      <div className="surface nested-card compact-card">
        <div className="pill-row">
          <span className="mini-pill">owner: douglas@demo.com / 123456</span>
          <span className="mini-pill">client: cliente@demo.com / 123456</span>
        </div>
      </div>

      <form className="form-grid auth-form-grid" onSubmit={handleSubmit}>
        <label className="field">
          <span>Usuario ou e-mail</span>
          <input
            autoComplete="username"
            onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
            placeholder="douglas@demo.com"
            required
            value={form.username}
          />
        </label>

        <label className="field">
          <span>Senha</span>
          <input
            autoComplete="current-password"
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="123456"
            required
            type="password"
            value={form.password}
          />
        </label>

        {feedback.message ? <p className={`feedback ${feedback.tone}`}>{feedback.message}</p> : null}

        <button className="button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>

        <p className="section-copy compact auth-form-section-label">Ou continue com</p>

        <div className="oauth-grid">
          <button className="button secondary" disabled={isSubmitting} onClick={() => handleSocial("google")} type="button">
            Google demo
          </button>
          <button className="button ghost" disabled={isSubmitting} onClick={() => handleSocial("github")} type="button">
            GitHub demo
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
