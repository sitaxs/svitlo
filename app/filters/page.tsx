'use client'

import { useState } from 'react'
import { Check, ChevronLeft, RotateCcw, X } from 'lucide-react'

const essentials = ['⚡️ Є світло', '🔌 Вільні розетки', '🌡 Опалення', '📡 Starlink']
const comfort = ['🐕 Pet-friendly', '🧸 Для дітей', '♿️ Інклюзивний вхід', '🤫 Тиха зона', '☕️ Спешелті кава', '🥑 Веган-меню']
const safety = [
  ['🟢 Працює як укриття', 'Безпечно знаходитись під час тривоги'],
  ['🟡 Невизначено', 'Працюють, але без гарантій укриття'],
  ['⚪️ Зачиняються', 'Просять гостей покинути заклад'],
]

export default function FiltersPage() {
  const [selectedEssentials, setSelectedEssentials] = useState(['⚡️ Є світло', '🔌 Вільні розетки'])
  const [selectedComfort, setSelectedComfort] = useState<string[]>([])
  const [selectedSafety, setSelectedSafety] = useState(safety[0][0])
  const [distance, setDistance] = useState('🚶 15 хв')
  const [price, setPrice] = useState('₴₴ Середньо')
  const [applied, setApplied] = useState(false)

  const toggle = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  const reset = () => { setSelectedEssentials([]); setSelectedComfort([]); setSelectedSafety(''); setDistance('🚶 15 хв'); setPrice('₴₴ Середньо'); setApplied(false) }

  return (
    <main className="svitlo-app filters-shell">
      <section className="filters-sheet" aria-label="Розширені фільтри">
        <header className="filters-header">
          <div className="filter-handle" aria-hidden="true" />
          <button type="button" className="reset-button" onClick={reset}><RotateCcw size={14} />Скинути</button>
          <h1>Фільтри</h1>
          <button type="button" className="filter-close" aria-label="Закрити фільтри"><X size={20} /></button>
        </header>

        <div className="filters-scroll">
          <section className="filter-section"><p className="filter-overline">Базові потреби</p><h2>Енергія та зв&apos;язок</h2><div className="filter-chip-grid">{essentials.map((item) => { const active = selectedEssentials.includes(item); return <button key={item} type="button" className={`large-filter-chip ${active ? 'active' : ''}`} aria-pressed={active} onClick={() => toggle(item, setSelectedEssentials)}>{item}{active && <Check size={15} />}</button> })}</div></section>
          <section className="filter-section"><p className="filter-overline">Безпека</p><h2>Повітряна тривога</h2><div className="safety-options">{safety.map(([title, text]) => <button key={title} type="button" className={`safety-option ${selectedSafety === title ? 'active' : ''}`} onClick={() => setSelectedSafety(title)} aria-pressed={selectedSafety === title}><span className="safety-radio">{selectedSafety === title && <span />}</span><span><strong>{title}</strong><small>{text}</small></span></button>)}</div></section>
          <section className="filter-section"><p className="filter-overline">Відстань</p><h2>Максимальна відстань</h2><div className="segmented-control">{['🚶 5 хв', '🚶 15 хв', '🚗 Будь-яка'].map((item) => <button key={item} type="button" className={distance === item ? 'active' : ''} onClick={() => setDistance(item)}>{item}</button>)}</div></section>
          <section className="filter-section"><p className="filter-overline">Вартість</p><h2>Середній чек</h2><div className="segmented-control">{['₴ Дешево', '₴₴ Середньо', '₴₴₴ Дорого'].map((item) => <button key={item} type="button" className={price === item ? 'active' : ''} onClick={() => setPrice(item)}>{item}</button>)}</div></section>
          <section className="filter-section last-filter"><p className="filter-overline">Лайфстайл та комфорт</p><h2>Комфорт</h2><div className="comfort-chips">{comfort.map((item) => { const active = selectedComfort.includes(item); return <button key={item} type="button" className={`comfort-chip ${active ? 'active' : ''}`} aria-pressed={active} onClick={() => toggle(item, setSelectedComfort)}>{item}</button> })}</div></section>
        </div>
        <footer className="filters-footer"><button type="button" className="apply-filters" onClick={() => setApplied(true)}>{applied ? 'Фільтри застосовано' : 'Показати 24 заклади'}<ChevronLeft size={17} className="apply-arrow" /></button></footer>
      </section>
    </main>
  )
}
