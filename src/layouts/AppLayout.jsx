import { useState } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import IconSymbol from "../components/IconSymbol"
import { useAuth } from "../hooks/useAuth"
import { getRoleLabel } from "../utils/roles"

const publicItems = [
  { to: "/login", label: "Entrar" },
  { to: "/register", label: "Cadastrar" },
]

const workspaceItems = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/perfil", label: "Perfil", icon: "profile" },
]

const pageLabels = {
  "/login": "Entrar",
  "/register": "Cadastrar",
  "/dashboard": "Dashboard",
  "/perfil": "Perfil",
}

function buildNavLinkClass(baseClass) {
  return ({ isActive }) => `${baseClass}${isActive ? " active" : ""}`
}

export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()
  const [isPublicMenuOpen, setIsPublicMenuOpen] = useState(false)
  const currentTitle = pageLabels[location.pathname] || "Workspace"

  async function handleLogout() {
    await logout()
    navigate("/login", { replace: true })
  }

  if (!isAuthenticated) {
    return (
      <div className="app-layout">
        <header className={`surface public-topbar public-topbar-minimal editorial-public-topbar${isPublicMenuOpen ? " menu-open" : ""}`}>
          <Link className="brand-link public-brand-link" to="/login">
            <span className="brand-mark">DS</span>
            <span>
              <strong>Auth Demo</strong>
              <small>SaaS workspace</small>
            </span>
          </Link>

          <nav className="topbar-nav public-nav-desktop" aria-label="Navegacao publica">
            {publicItems.map((item) => (
              <NavLink className={buildNavLinkClass("nav-pill")} key={item.to} onClick={() => setIsPublicMenuOpen(false)} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="topbar-actions public-topbar-actions">
            <div className="public-desktop-actions">
              <a className="public-utility-link" href="https://github.com/Beckerr11" rel="noreferrer" target="_blank">
                <IconSymbol className="icon-sm" name="github" />
                GitHub
              </a>
            </div>
            <button
              aria-controls="public-mobile-panel"
              aria-expanded={isPublicMenuOpen}
              className="nav-icon-button public-menu-toggle"
              onClick={() => setIsPublicMenuOpen((current) => !current)}
              type="button"
            >
              <IconSymbol className="icon-md" name={isPublicMenuOpen ? "close" : "menu"} />
              <span className="sr-only">{isPublicMenuOpen ? "Fechar menu" : "Abrir menu"}</span>
            </button>
          </div>

          <div className={`public-mobile-panel${isPublicMenuOpen ? " open" : ""}`} id="public-mobile-panel">
            <nav className="public-mobile-nav" aria-label="Navegacao publica mobile">
              {publicItems.map((item) => (
                <NavLink className={buildNavLinkClass("nav-pill mobile")} key={item.to} onClick={() => setIsPublicMenuOpen(false)} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <Outlet />
      </div>
    )
  }

  return (
    <div className="app-layout">
      <div className="workspace-shell">
        <aside className="surface sidebar shell-panel">
          <div className="sidebar-brand">
            <Link className="brand-link sidebar-brand-link" to="/dashboard">
              <span className="brand-mark">DS</span>
              <span>
                <strong>SaaS Auth Demo</strong>
                <small>{getRoleLabel(user?.role)}</small>
              </span>
            </Link>
          </div>

          <div className="sidebar-profile">
            {user?.avatarUrl ? (
              <img alt={`Avatar de ${user?.fullName || user?.username || "usuario"}`} className="avatar-photo" loading="lazy" referrerPolicy="no-referrer" src={user.avatarUrl} />
            ) : (
              <div className="avatar-badge">{(user?.fullName || user?.username || "D").slice(0, 1).toUpperCase()}</div>
            )}
            <div>
              <h2>{user?.fullName || user?.username}</h2>
              <p className="section-copy compact">{user?.company || "Workspace demo"}</p>
            </div>
          </div>

          <div className="sidebar-block">
            <p className="eyebrow">Workspace</p>
            <div className="sidebar-links">
              {workspaceItems.map((item) => (
                <NavLink className={buildNavLinkClass("sidebar-link")} key={item.to} to={item.to}>
                  <IconSymbol className="icon-sm" name={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </aside>

        <div className="workspace-main">
          <header className="surface topbar shell-panel">
            <div className="topbar-copy">
              <p className="eyebrow">Workspace</p>
              <h2>{currentTitle}</h2>
              <p className="section-copy compact">Login, sessao e dashboard em demo independente.</p>
            </div>

            <div className="topbar-actions cluster">
              <Link className="button ghost small" to="/perfil">
                Perfil
              </Link>
              <button className="button small" onClick={handleLogout} type="button">
                Sair
              </button>
            </div>
          </header>

          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
