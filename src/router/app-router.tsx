import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "@/components/layout"
import { ForgotPassword, Home, Settings, SignIn, SignUp } from "@/pages"
import { PrivateRoute } from "./private-route"

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route
        path="/app"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
