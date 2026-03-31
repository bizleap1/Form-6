'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

interface Filters {
  lines: string[]
  goals: string[]
  formats: string[]
  maxPrice: number
}

interface ShopSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

const goals = ['Recovery', 'Sleep', 'Focus', 'Energy', 'Immunity', 'Longevity', 'Stress']
const formats = ['Capsule', 'Powder', 'Sachet']

function CheckOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 py-2 cursor-pointer text-[14px] font-medium text-grey-600 hover:text-teal transition-colors">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-teal w-4 h-4 rounded" />
      {label}
    </label>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-bold tracking-widest uppercase text-grey-400 mb-3">{children}</div>
}

function Divider() {
  return <div className="h-px bg-grey-100 my-6" />
}

export default function ShopSidebar({ filters, onChange }: ShopSidebarProps) {
  const toggle = (key: 'lines' | 'goals' | 'formats', value: string) => {
    const arr = filters[key]
    onChange({
      ...filters,
      [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
    })
  }

  return (
    <aside className="w-full">
      <SectionTitle>Product Line</SectionTitle>
      <CheckOption label="FORM6 CORE" checked={filters.lines.includes('core')} onChange={() => toggle('lines', 'core')} />
      <CheckOption label="FORM6 PRIME" checked={filters.lines.includes('prime')} onChange={() => toggle('lines', 'prime')} />

      <Divider />
      <SectionTitle>Goal</SectionTitle>
      {goals.map(goal => (
        <CheckOption key={goal} label={goal} checked={filters.goals.includes(goal)} onChange={() => toggle('goals', goal)} />
      ))}

      <Divider />
      <SectionTitle>Format</SectionTitle>
      {formats.map(fmt => (
        <CheckOption key={fmt} label={fmt} checked={filters.formats.includes(fmt)} onChange={() => toggle('formats', fmt)} />
      ))}

      <Divider />
      <SectionTitle>Max Price</SectionTitle>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[13px] font-bold text-navy">€{filters.maxPrice}</span>
      </div>
      <input
        type="range" min={20} max={100} step={5}
        value={filters.maxPrice}
        onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
        className="w-full accent-teal"
      />
      <div className="flex justify-between text-[11px] text-grey-400 mt-1">
        <span>€20</span><span>€100</span>
      </div>

      <Divider />
      <Button
        variant="primary"
        size="sm"
        className="w-full"
        onClick={() => onChange({ lines: ['core', 'prime'], goals: [], formats: [], maxPrice: 100 })}
      >
        Reset Filters
      </Button>
    </aside>
  )
}
