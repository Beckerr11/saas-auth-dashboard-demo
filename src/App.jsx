import { Navigate, Route, Routes } from "react-router"
import { useAuth } from "./hooks/useAuth"
import AppLayout from "./layouts/AppLayout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import { ProtectedRoute } from "./routes/ProtectedRoute"

function RootRedirect() {
  const { isAuthenticated, isReady } = useAuth()

  if (!isReady) {
    return null
  }

  return <Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<RootRedirect />} index />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          path="/dashboard"
        />
        <Route
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          path="/perfil"
        />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Route>
    </Routes>
  )
}
