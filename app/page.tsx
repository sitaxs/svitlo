'use client'

import { useState } from 'react'
import {
  Check,
  ChevronDown,
  Crosshair,
  Filter,
  Footprints,
  Heart,
  Map as MapIcon,
  Navigation,
  PlugZap,
  Search,
  ShieldCheck,
  Thermometer,
  UserCircle,
  Zap,
} from 'lucide-react'

const filters = [
  { label: 'Є світло', icon: Zap },
  { label: 'Розетки', icon: PlugZap },
  { label: 'Тепло', icon: Thermometer },
  { label: 'Працює як укриття', icon: ShieldCheck },
  { label: 'До 5 хв пішки', icon: Footprints },
  { label: 'Середній чек', icon: null },
]

const locations = [
  { name: 'Octo Tower', price: '₴₴', distance: '4 хв пішки', statuses: ['Укриття', 'Генератор', 'Вільні розетки', 'Pet-friendly'], updated: 'Оновлено 10 хв тому', eta: '🚶 4 хв | 🛴 2 хв | 🚗 3 хв', community: true },
  { name: 'Кавʼярня «Зерно»', price: '₴₴₴', distance: '3 хв пішки', statuses: ['Укриття', 'Світло є', 'Тепло'], updated: 'Оновлено 5 хв тому', eta: '🚶 3 хв | 🛴 1 хв | 🚗 2 хв', community: false },
  { name: 'One Love Coffee', price: '₴', distance: '7 хв пішки', statuses: ['Генератор', 'Вільні розетки', 'Pet-friendly'], updated: 'Оновлено 18 хв тому', eta: '🚶 7 хв | 🛴 3 хв | 🚗 4 хв', community: true },
]

export default function Page() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['Є світло'])
  const [view, setView] = useState<'map' | 'list'>('list')
  const [saved, setSaved] = useState<string[]>([])

  function toggleFilter(label: string) {
    setActiveFilters((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label])
  }

  function toggleSaved(name: string) {
    setSaved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  }

  return (
    <main className="svitlo-app">
      <div className="list-canvas" aria-label="Список кавʼярень Києва">
        <header className="list-top-controls">
          <button type="button" className="icon-button" aria-label="Відкрити профіль"><UserCircle size={21} strokeWidth={1.8} /></button>
          <label className="search-box"><Search size={18} aria-hidden="true" /><input aria-label="Пошук кавʼярні або вулиці" placeholder="Пошук кав'ярні, вулиці..." /></label>
          <button type="button" className="icon-button" aria-label="Фільтри"><Filter size={20} strokeWidth={1.8} /></button>
        </header>

        <div className="filter-scroller list-filters" aria-label="Швидкі фільтри">
          {filters.map(({ label, icon: Icon }) => {
            const active = activeFilters.includes(label)
            return <button key={label} type="button" onClick={() => toggleFilter(label)} className={`filter-chip ${active ? 'active' : ''}`} aria-pressed={active}>{Icon ? <Icon size={15} /> : <span className="price-icon">₴</span>}{label}{active && <Check size={13} />}</button>
          })}
        </div>

        <section className="list-content">
          <div className="list-heading"><div><p className="eyebrow">Поруч із вами</p><h1>Кавʼярні та укриття</h1></div><span className="result-count">24 місця</span></div>
          <div className="location-feed">
            {locations.map((location) => {
              const isSaved = saved.includes(location.name)
              return <article className="location-card" key={location.name}>
                <div className="location-card-head"><div><h2>{location.name}</h2><p className="price-tier">{location.price}</p></div><span className="distance-badge"><Footprints size={14} /> {location.distance}</span></div>
                <div className="location-statuses">{location.statuses.map((status) => <span className={`location-status ${status === 'Укриття' || status === 'Світло є' ? 'green' : status === 'Генератор' ? 'amber' : 'neutral'}`} key={status}>{status === 'Укриття' ? '🟢' : status === 'Генератор' ? '⚡️' : status === 'Вільні розетки' ? '🔌' : status === 'Pet-friendly' ? '🐕' : '●'} {status}</span>)}</div>
                <div className="live-row"><span className="live-dot" />{location.updated}<span className="community-badge">{location.community ? 'ℹ️ Додано спільнотою' : 'Перевірено закладом'}</span></div>
                <div className="eta-row"><span>Маршрут</span><strong>{location.eta}</strong></div>
                <div className="card-actions"><button type="button" className="details-button">Відкрити деталі</button><button type="button" className="route-button"><Navigation size={16} fill="currentColor" />Прокласти шлях</button><button type="button" className={`card-heart ${isSaved ? 'saved' : ''}`} aria-label={`Зберегти ${location.name}`} aria-pressed={isSaved} onClick={() => toggleSaved(location.name)}><Heart size={18} fill={isSaved ? 'currentColor' : 'none'} /></button></div>
              </article>
            })}
          </div>
        </section>

        <div className="view-toggle list-toggle" role="group" aria-label="Перемикач вигляду"><button type="button" className={view === 'map' ? 'selected' : ''} onClick={() => setView('map')}><MapIcon size={16} />Карта</button><button type="button" className={view === 'list' ? 'selected' : ''} onClick={() => setView('list')}><ChevronDown size={16} className="list-icon" />Список</button></div>
        <button type="button" className="location-button list-location" aria-label="Моя локація"><Crosshair size={21} /></button>
      </div>
    </main>
  )
}
