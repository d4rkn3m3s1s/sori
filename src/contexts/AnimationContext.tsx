import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type AnimationLevel = 'system' | 'normal' | 'reduced'

type AnimationContextValue = {
  level: AnimationLevel
  setLevel: (level: AnimationLevel) => void
  isReduced: boolean
}

const AnimationContext = createContext<AnimationContextValue | undefined>(undefined)

function getSystemPrefersReduced(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

function loadStoredLevel(): AnimationLevel | null {
  try {
    const v = localStorage.getItem('animation-level')
    if (v === 'system' || v === 'normal' || v === 'reduced') return v
    return null
  } catch {
    return null
  }
}

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [level, setLevel] = useState<AnimationLevel>(() => loadStoredLevel() ?? 'system')
  const [systemReduced, setSystemReduced] = useState<boolean>(getSystemPrefersReduced())

  useEffect(() => {
    try {
      localStorage.setItem('animation-level', level)
    } catch {}
  }, [level])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setSystemReduced(mq.matches)
    try {
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    } catch {
      // Older Safari
      // @ts-ignore
      mq.addListener?.(onChange)
      return () => {
        // @ts-ignore
        mq.removeListener?.(onChange)
      }
    }
  }, [])

  const isReduced = useMemo(() => {
    if (level === 'reduced') return true
    if (level === 'normal') return false
    return systemReduced
  }, [level, systemReduced])

  const value = useMemo(() => ({ level, setLevel, isReduced }), [level, isReduced])

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', isReduced)
  }, [isReduced])

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimationLevel(): AnimationContextValue {
  const ctx = useContext(AnimationContext)
  if (!ctx) throw new Error('useAnimationLevel must be used within AnimationProvider')
  return ctx
}




