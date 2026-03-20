import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import { useAuth } from "../hooks/useAuth"

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  })
  const [feedback, setFeedback] = useState({ tone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      setFeedback({ tone: "error", message: "A confirmacao de senha nao confere." })
      return
    }

    setIsSubmitting(true)
    setFeedback({ tone: "", message: "" })

    try {
      await register(form)
      navigate("/dashboard", { replace: true })
    } catch (error) {
      setFeedback({ tone: "error", message: error.message || "Nao foi possivel criar a conta." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Cadastro"
      footerActionLabel="Entrar"
      footerActionTo="/login"
      footerText="Ja possui conta demo?"
      subtitle="Crie um usuario local e acesse o dashboard imediatamente."
      title="Criar conta"
    >
      <form className="form-grid two-column-form auth-form-grid" onSubmit={handleSubmit}>
        <label className="field field-full">
          <span>Nome completo</span>
          <input onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} placeholder="Douglas Silva" required value={form.fullName} />
        </label>

        <label className="field">
          <span>Usuario</span>
          <input onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))} placeholder="douglasdev" required value={form.username} />
        </label>

        <label className="field">
          <span>E-mail</span>
          <input onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="voce@demo.com" required type="email" value={form.email} />
        </label>

        <label className="field field-full">
          <span>Empresa</span>
          <input onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))} placeholder="Studio demo" value={form.company} />
        </label>

        <label className="field">
          <span>Senha</span>
          <input onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="123456" required type="password" value={form.password} />
        </label>

        <label className="field">
          <span>Confirmar senha</span>
          <input onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))} placeholder="123456" required type="password" value={form.confirmPassword} />
        </label>

        {feedback.message ? <p className={`feedback ${feedback.tone} field-full`}>{feedback.message}</p> : null}

        <button className="button field-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Criando..." : "Criar conta"}
        </button>
      </form>
    </AuthLayout>
  )
}
