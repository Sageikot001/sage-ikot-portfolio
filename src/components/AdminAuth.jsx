import { useState, useEffect } from 'react'
import { styles } from '../styles'

const ADMIN_PASSCODE = '17PH1450'

export default function AdminAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid passcode')
    }
  }

  if (isAuthenticated) {
    return children
  }

  return (
    <div className="relative z-0 bg-primary min-h-screen flex items-center justify-center">
      <div className="bg-black-100 p-8 rounded-2xl w-full max-w-md">
        <h2 className={`${styles.sectionHeadText} text-white mb-6`}>Admin Access</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Enter Passcode</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full p-3 rounded-lg bg-tertiary text-white outline-none"
              placeholder="Passcode"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-tertiary py-3 px-6 text-white font-bold rounded-xl hover:bg-white hover:text-tertiary transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
