import { useMemo, useState } from "react"
import { normalizeUserRole } from "../utils/roles"
import { AuthContext } from "./authContextObject"

const USERS_KEY = "saas-auth-dashboard-demo:users"
const SESSION_KEY = "saas-auth-dashboard-demo:session"

const seedUsers = [
  {
    id: "user-owner-001",
    username: "douglas",
    email: "douglas@demo.com",
    password: "123456",
    fullName: "Douglas Silva",
    company: "Douglas Studio",
    role: "owner",
    bio: "Full stack com foco em auth, dashboard e produto web.",
    github: "https://github.com/Beckerr11",
    linkedin: "https://www.linkedin.com/in/douglassilva11",
    avatarUrl: "https://avatars.githubusercontent.com/Beckerr11?v=4",
    favoriteTechnologies: ["React", "Node.js", "MongoDB", "JWT"],
    certifications: [
      { title: "JavaScript Algorithms", issuer: "freeCodeCamp", year: "2024" },
      { title: "Responsive Web Design", issuer: "freeCodeCamp", year: "2024" },
      { title: "Foundational C#", issuer: "Microsoft", year: "2024" },
    ],
  },
  {
    id: "user-client-001",
    username: "cliente",
    email: "cliente@demo.com",
    password: "123456",
    fullName: "Ana Costa",
    company: "Lumina Fit",
    role: "client",
    bio: "Conta demo de cliente para validar jornada autenticada.",
    github: "",
    linkedin: "",
    avatarUrl: "",
    favoriteTechnologies: ["React", "Vite", "UX/UI"],
  },
]

function sanitizeUser(user) {
  if (!user) {
    return null
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    company: user.company,
    role: normalizeUserRole(user.role),
    bio: user.bio || "",
    github: user.github || "",
    linkedin: user.linkedin || "",
    avatarUrl: user.avatarUrl || "",
    favoriteTechnologies: Array.isArray(user.favoriteTechnologies) ? user.favoriteTechnologies : [],
    certifications: Array.isArray(user.certifications) ? user.certifications : [],
  }
}

function readUsers() {
  if (typeof window === "undefined") {
    return seedUsers
  }

  const stored = window.localStorage.getItem(USERS_KEY)
  if (!stored) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers))
    return seedUsers
  }

  try {
    return JSON.parse(stored)
  } catch {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers))
    return seedUsers
  }
}

function saveUsers(users) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readSession() {
  if (typeof window === "undefined") {
    return null
  }

  const raw = window.localStorage.getItem(SESSION_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    window.localStorage.removeItem(SESSION_KEY)
    return null
  }
}

function persistSession(user) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(sanitizeUser(user)))
}

function createToken(user) {
  return `demo-token-${user.id}`
}

function findUserByIdentity(users, identity) {
  const normalized = String(identity || "").trim().toLowerCase()
  return users.find((user) => user.username.toLowerCase() === normalized || user.email.toLowerCase() === normalized)
}

export function AuthProvider({ children }) {
  const sessionUser = readSession()
  const [token, setToken] = useState(sessionUser ? createToken(sessionUser) : "")
  const [user, setUser] = useState(sessionUser)
  const [isReady] = useState(true)

  const value = useMemo(
    () => ({
      token,
      user,
      isReady,
      isAuthenticated: Boolean(token),
      async login(credentials) {
        const users = readUsers()
        const matchedUser = findUserByIdentity(users, credentials?.username)

        if (!matchedUser || matchedUser.password !== credentials?.password) {
          throw new Error("Credenciais invalidas.")
        }

        const safeUser = sanitizeUser(matchedUser)
        persistSession(safeUser)
        setUser(safeUser)
        setToken(createToken(safeUser))
        return { token: createToken(safeUser), user: safeUser }
      },
      async loginWithProvider(provider) {
        const users = readUsers()
        const matchedUser = provider === "github" ? users[0] : users[1]
        const safeUser = sanitizeUser(matchedUser)
        persistSession(safeUser)
        setUser(safeUser)
        setToken(createToken(safeUser))
        return { token: createToken(safeUser), user: safeUser }
      },
      async register(payload) {
        const users = readUsers()
        const email = String(payload?.email || "").trim().toLowerCase()
        const username = String(payload?.username || "").trim().toLowerCase()

        if (users.some((item) => item.email.toLowerCase() === email)) {
          throw new Error("Ja existe uma conta com esse e-mail.")
        }

        if (users.some((item) => item.username.toLowerCase() === username)) {
          throw new Error("Esse usuario ja esta em uso.")
        }

        const createdUser = {
          id: `user-${Date.now()}`,
          username: String(payload?.username || "").trim(),
          email,
          password: String(payload?.password || ""),
          fullName: String(payload?.fullName || "").trim(),
          company: String(payload?.company || "Cliente demo").trim(),
          role: "client",
          bio: "Conta criada na demo publica de auth.",
          github: "",
          linkedin: "",
          avatarUrl: "",
          favoriteTechnologies: ["React", "JWT"],
        }

        const nextUsers = [...users, createdUser]
        saveUsers(nextUsers)

        const safeUser = sanitizeUser(createdUser)
        persistSession(safeUser)
        setUser(safeUser)
        setToken(createToken(safeUser))
        return { token: createToken(safeUser), user: safeUser }
      },
      async refreshProfile() {
        return user
      },
      async updateProfile(payload) {
        const users = readUsers()
        const nextUsers = users.map((item) =>
          item.id === user?.id
            ? {
                ...item,
                fullName: payload?.fullName ?? item.fullName,
                email: payload?.email ?? item.email,
                company: payload?.company ?? item.company,
                bio: payload?.bio ?? item.bio,
                github: payload?.github ?? item.github,
                linkedin: payload?.linkedin ?? item.linkedin,
                avatarUrl: payload?.avatarUrl ?? item.avatarUrl,
                favoriteTechnologies: payload?.favoriteTechnologies ?? item.favoriteTechnologies,
              }
            : item
        )

        saveUsers(nextUsers)
        const currentUser = sanitizeUser(nextUsers.find((item) => item.id === user?.id))
        persistSession(currentUser)
        setUser(currentUser)
        return currentUser
      },
      async logout() {
        window.localStorage.removeItem(SESSION_KEY)
        setToken("")
        setUser(null)
      },
      setAuthenticatedSession(nextToken, nextUser) {
        const safeUser = sanitizeUser(nextUser)
        persistSession(safeUser)
        setToken(nextToken || createToken(safeUser))
        setUser(safeUser)
      },
    }),
    [isReady, token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
