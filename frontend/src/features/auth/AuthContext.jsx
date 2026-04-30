import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { apiFetch } from '../../shared/api'

const AuthContext = createContext(null)
const POLL_INTERVAL = 30_000

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const userRef = useRef(user)

  const login = ({ token, ...userData }) => {
    setUser(userData)
    userRef.current = userData
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    userRef.current = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  useEffect(() => {
  const poll = async () => {
    const current = userRef.current
    if (!current?.id) return
    try {
      const updated = await apiFetch(`/api/users/${current.id}`)
      if (updated && String(updated.balance) !== String(current.balance)) {
        const next = { ...current, balance: updated.balance }
        setUser(next)
        userRef.current = next
        localStorage.setItem('user', JSON.stringify(next))
      }
    } catch {
      // silently ignore network errors between polls
    }
  }

  const id = setInterval(poll, POLL_INTERVAL)
  return () => clearInterval(id)
}, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
