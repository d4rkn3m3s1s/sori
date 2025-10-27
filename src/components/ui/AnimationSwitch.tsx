import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import { useAnimationLevel, AnimationLevel } from '../../contexts/AnimationContext'

const options: { key: AnimationLevel; label: string }[] = [
  { key: 'system', label: 'Sistem (prefers-reduced-motion)' },
  { key: 'normal', label: 'Normal' },
  { key: 'reduced', label: 'Azaltılmış' },
]

const AnimationSwitch: React.FC = () => {
  const { level, setLevel } = useAnimationLevel()

  return (
    <Select 
      aria-label="Animasyon yoğunluğu"
      size="sm"
      selectedKeys={[level]}
      onSelectionChange={(keys) => {
        const val = Array.from(keys)[0] as AnimationLevel
        if (val) setLevel(val)
      }}
      className="w-full max-w-xs"
    >
      {options.map(o => (
        <SelectItem key={o.key} value={o.key} aria-label={o.label}>
          {o.label}
        </SelectItem>
      ))}
    </Select>
  )
}

export default AnimationSwitch




