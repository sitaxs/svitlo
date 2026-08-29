'use client'

import { useState } from 'react'
import { Clock3, LocateFixed, MapPin, Search, X } from 'lucide-react'

const filters = [
  ['⚡️', 'Є світло'],
  ['🔌', 'Розетки'],
  ['🛡', 'Укриття'],
]

const results = [
  { title: "Кав'ярня 'Зерно'", address: 'вул. Ярославів Вал, 14', distance: '🚶 3 хв', tags: ['🟢 Укриття', '⚡️ Світло'], highlighted: true },
  { title: 'Кавовий Дім', address: 'вул. Володимирська, 40', distance: '🚶 7 хв', tags: ['⚡️ Світло'], highlighted: false },
]

export default function SearchPage() {
  const [query, setQuery] = useState('Кав')
  const [active, setActive] = useState<string[]>([])

  return (
    <main className="svitlo-app">
      <div className="search-overlay" aria-label="Пошук місць у Києві">
        <header className="active-search-header">
          <label className="active-search-box">
            <Search size={19} aria-hidden="true" />
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Пошук кавʼярні або вулиці" placeholder="Пошук кавʼярні, вулиці..." />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Очистити пошук"><X size={17} /></button>}
          </label>
          <button type="button" className="cancel-search" onClick={() => setQuery('')}>Скасувати</button>
        </header>

        <div className="search-filter-scroller" aria-label="Швидкі фільтри">
          {filters.map(([icon, label]) => {
            const selected = active.includes(label)
            return <button type="button" key={label} className={`search-filter-chip ${selected ? 'active' : ''}`} aria-pressed={selected} onClick={() => setActive((items) => selected ? items.filter((item) => item !== label) : [...items, label])}><span>{icon}</span>{label}</button>
          })}
        </div>

        <section className="search-content">
          {query ? <>
            <div className="search-section-heading"><h1>Результати пошуку</h1><span>2 місця</span></div>
            <div className="search-results" role="list">
              {results.map((result) => <button type="button" className={`search-result ${result.highlighted ? 'highlighted' : ''}`} key={result.title} role="listitem">
                <span className={`result-pin ${result.highlighted ? 'green' : ''}`}><MapPin size={18} /></span>
                <span className="result-copy"><strong>{result.title}</strong><small>{result.address}</small><span className="result-tags">{result.tags.map((tag) => <em key={tag}>{tag}</em>)}</span></span>
                <span className="result-distance">{result.distance}</span>
              </button>)}
            </div>
          </> : <>
            <div className="search-section-heading"><h1>Останні пошуки</h1></div>
            <div className="recent-searches"><button type="button"><Clock3 size={17} />вулиця Ярославів Вал</button><button type="button"><Clock3 size={17} />Octo Tower</button></div>
          </>}

          <div className="popular-section"><div className="search-section-heading"><h2>Популярні райони</h2></div><div className="popular-chips"><button type="button"><LocateFixed size={14} />Золоті Ворота</button><button type="button"><LocateFixed size={14} />Поділ</button><button type="button"><LocateFixed size={14} />Печерськ</button></div></div>
        </section>
      </div>
    </main>
  )
}
