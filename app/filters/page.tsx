'use client'

import { useState } from 'react'
import { Check, ChevronLeft, RotateCcw, X } from 'lucide-react'

const types = ['☕️ Кав\'ярня', '🏢 Коворкінг', '🍔 Фастфуд', '🛍 ТРЦ', '⛺️ Пункт незламності', '🍽 Ресторан/Бар', '📚 Бібліотека']
const energy = ['⚡️ Є світло', '🔌 Вільні розетки', '🌡 Тепло', '📡 Starlink / Оптика']
const comfort = ['🤫 Тихо', '💻 Ідеально для Zoom', '🛋 Зручні крісла']
const companions = ['🧸 Місце для дітей', '🐕 Pet-friendly (з тваринами)', '♿️ Інклюзивний вхід']
const safety = [['🟢 Працює як укриття', 'Безпечно знаходитись'], ['🟡 Невизначено', 'Працюють без гарантій'], ['⚪️ Зачиняються', 'Просять покинути заклад']]
const prices = ['Безкоштовно', '₴ Економ', '₴₴ Середній', '₴₴₴ Преміум']

export default function FiltersPage() {
  const [selected, setSelected] = useState<string[]>(['⚡️ Є світло'])
  const [selectedSafety, setSelectedSafety] = useState(safety[0][0])
  const [price, setPrice] = useState('₴₴ Середній')
  const [applied, setApplied] = useState(false)
  const toggle = (value: string) => setSelected((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value])
  const reset = () => { setSelected([]); setSelectedSafety(''); setPrice('₴₴ Середній'); setApplied(false) }
  const chips = (items: string[]) => <div className="filter-chip-grid">{items.map((item) => { const active = selected.includes(item); return <button key={item} type="button" className={`large-filter-chip ${active ? 'active' : ''}`} aria-pressed={active} onClick={() => toggle(item)}>{item}{active && <Check size={14} />}</button> })}</div>

  return <main className="svitlo-app filters-shell"><section className="filters-sheet" aria-label="Розширені фільтри"><header className="filters-header"><div className="filter-handle" aria-hidden="true" /><button type="button" className="reset-button" onClick={reset}><RotateCcw size={14} />Скинути</button><h1>Фільтри</h1><button type="button" className="filter-close" aria-label="Закрити фільтри"><X size={20} /></button></header><div className="filters-scroll"><section className="filter-section"><p className="filter-overline">Тип локації</p><h2>Що шукаємо?</h2>{chips(types)}</section><section className="filter-section"><p className="filter-overline">Power & Internet</p><h2>Енергія</h2>{chips(energy)}</section><section className="filter-section"><p className="filter-overline">Safety</p><h2>Повітряна тривога</h2><div className="safety-options">{safety.map(([title, text]) => <button key={title} type="button" className={`safety-option ${selectedSafety === title ? 'active' : ''}`} onClick={() => setSelectedSafety(title)} aria-pressed={selectedSafety === title}><span className="safety-radio">{selectedSafety === title && <span />}</span><span><strong>{title}</strong><small>{text}</small></span></button>)}</div></section><section className="filter-section"><p className="filter-overline">Work Environment</p><h2>Умови для роботи</h2>{chips(comfort)}</section><section className="filter-section"><p className="filter-overline">Companions & Access</p><h2>Компанія та доступність</h2>{chips(companions)}</section><section className="filter-section last-filter"><p className="filter-overline">Price</p><h2>Вартість</h2><div className="segmented-control">{prices.map((item) => <button key={item} type="button" className={price === item ? 'active' : ''} onClick={() => setPrice(item)}>{item}</button>)}</div></section></div><footer className="filters-footer"><button type="button" className="apply-filters" onClick={() => setApplied(true)}>{applied ? 'Фільтри застосовано' : 'Показати 32 локації'}<ChevronLeft size={17} className="apply-arrow" /></button></footer></section></main>
}
