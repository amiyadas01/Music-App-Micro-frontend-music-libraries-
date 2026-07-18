import React, { createContext, useContext, useState, useEffect } from 'react'
import { generateMockToken, decodeMockToken, type DecodedToken } from './mockAuth'

interface AuthContextType {
  user: DecodedToken | null
  token: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<DecodedToken | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      const decoded = decodeMockToken(storedToken)
      if (decoded) {
        setUser(decoded)
        setToken(storedToken)
      }
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    const result = generateMockToken(username, password)
    if (result) {
      setUser(result.decoded)
      setToken(result.token)
      localStorage.setItem('authToken', result.token)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
