"use client"
import { createContext, useContext, useState, useEffect } from "react"

// Create the context
const AuthContext = createContext()

// Create a provider component
export function AuthProvider1({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user data from localStorage on initial render
  useEffect(() => {
    const loadUserFromStorage = () => {
      if (typeof window !== "undefined") {
        try {
          const storedUser = localStorage.getItem("twitter24user")
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
          }
        } catch (error) {
          console.error("Error loading user from localStorage:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadUserFromStorage()
  }, [])

  // Login function
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("twitter24user", JSON.stringify(userData))
    document.cookie = `twitter24user=${JSON.stringify(userData)}; path=/;`
    document.cookie = `auth=true; path=/;`
  }

  // Logout function
  const logout = () => {
    setUser(null)
    console.log('logged out')
    localStorage.removeItem("twitter24user")
    document.cookie = "twitter24user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "auth=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = "/sign-in"
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user
  }

  // Context value
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

