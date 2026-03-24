import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { AuthResponse, LoginRequest } from "@/api/auth"
import { AuthApi } from "@/api/auth"
import { type Clinic, ClinicsApi } from "@/api/clinics"
import { UsersApi } from "@/api/users"

interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string | null
}

interface AuthContextType {
  user: User
  isLoading: boolean
  logout: () => void
  token: string | null
  clinic: Clinic | null
  isAuthenticated: boolean
  login: (data: LoginRequest) => Promise<void>
  completeOnboarding: (data: OnboardingData) => Promise<void>
}

interface OnboardingData {
  city: string
  cnpj: string
  state: string
  phone: string
  legalName: string
  councilType: string
  registrationNumber: string
  municipalRegistration: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = "@clinic:token"
const USER_KEY = "@clinic:user"
const CLINIC_KEY = "@clinic:clinic"

interface AuthProviderProps {
  children: ReactNode
}

function getStoredAuth() {
  const storedToken = localStorage.getItem(TOKEN_KEY)
  const storedUser = localStorage.getItem(USER_KEY)
  const storedClinic = localStorage.getItem(CLINIC_KEY)

  if (storedToken && storedUser && storedClinic) {
    return {
      token: storedToken,
      user: JSON.parse(storedUser) as User,
      clinic: JSON.parse(storedClinic) as Clinic,
    }
  }

  return {
    user: null,
    token: null,
    clinic: null,
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(() => getStoredAuth().user)
  const [token, setToken] = useState<string | null>(() => getStoredAuth().token)
  const [clinic, setClinic] = useState<Clinic | null>(
    () => getStoredAuth().clinic
  )

  const navigate = useNavigate()

  const login = async (data: LoginRequest) => {
    setIsLoading(true)
    const { access_token, ...user }: AuthResponse = await AuthApi.login(data)

    setToken(access_token)
    setUser(user)
    localStorage.setItem(TOKEN_KEY, access_token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    toast.success("Login realizado com sucesso!", {
      description: "Você será redirecionado em instantes.",
    })

    const { clinic } = await ClinicsApi.getLoggedUserClinic()

    localStorage.setItem(CLINIC_KEY, JSON.stringify(clinic))
    setClinic(clinic)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    if (!clinic) {
      setIsLoading(false)
      return navigate("/onboarding")
    }

    return navigate("/app")
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setClinic(null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(CLINIC_KEY)
  }

  const completeOnboarding = async (data: OnboardingData) => {
    setIsLoading(true)
    try {
      const {
        city,
        cnpj,
        state,
        legalName,
        municipalRegistration,
        phone,
        councilType,
        registrationNumber,
      } = data

      await UsersApi.updateUser({
        council: councilType,
        councilRegistration: registrationNumber,
      })

      const createdClinic = await ClinicsApi.createClinic({
        city,
        cnpj,
        state,
        phone,
        legalName,
        municipalRegistration,
      })

      setClinic(createdClinic)
      localStorage.setItem(CLINIC_KEY, JSON.stringify(createdClinic))

      toast.success("Cadastro concluído com sucesso!", {
        description: "Você será redirecionado para o painel.",
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      navigate("/app")
    } catch (error) {
      toast.error("Erro ao completar cadastro", {
        description: "Tente novamente mais tarde.",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        clinic,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
