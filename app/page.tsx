'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Check, Crosshair, Filter, Footprints, Heart, Map as MapIcon, Navigation,
  PlugZap, Search, ShieldCheck, Thermometer, UserCircle, Zap,
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
  { id: '123', name: 'Octo Tower', price: '₴₴', distance: '4 хв пішки', statuses: ['Укриття', 'Генератор', 'Вільні розетки', 'Pet-friendly'], updated: 'Оновлено 10 хв тому', eta: '🚶 4 хв | 🛴 2 хв | 🚗 3 хв', community: true, x: '42%', y: '43%' },
  { id: 'urban-space-500', name: 'Кавʼярня «Зерно»', price: '₴₴₴', distance: '3 хв пішки', statuses: ['Укриття', 'Світло є', 'Тепло'], updated: 'Оновлено 5 хв тому', eta: '🚶 3 хв | 🛴 1 хв | 🚗 2 хв', community: false, x: '67%', y: '58%' },
  { id: 'one-love', name: 'One Love Coffee', price: '₴', distance: '7 хв пішки', statuses: ['Генератор', 'Вільні розетки', 'Pet-friendly'], updated: 'Оновлено 18 хв тому', eta: '🚶 7 хв | 🛴 3 хв | 🚗 4 хв', community: true, x: '27%', y: '67%' },
]

function Filters({ active, toggle }: { active: string[]; toggle: (label: string) => void }) {
  return <div className="filter-scroller list-filters" aria-label="Швидкі фільтри">
    {filters.map(({ label, icon: Icon }) => {
      const selected = active.includes(label)
      return <button key={label} type="button" onClick={() => toggle(label)} className={`filter-chip ${selected ? 'active' : ''}`} aria-pressed={selected}>
        {Icon ? <Icon size={15} /> : <span className="price-icon">₴</span>}{label}{selected && <Check size={13} />}
      </button>
    })}
  </div>
}

function LocationCard({ location, saved, onSave }: { location: typeof locations[number]; saved: boolean; onSave: () => void }) {
  return <article className="location-card">
    <div className="location-card-head"><div><h2>{location.name}</h2><p className="price-tier">{location.price}</p></div><span className="distance-badge"><Footprints size={14} /> {location.distance}</span></div>
    <div className="location-statuses">{location.statuses.map((status) => <span className={`location-status ${status === 'Укриття' || status === 'Світло є' ? 'green' : status === 'Генератор' ? 'amber' : 'neutral'}`} key={status}>{status === 'Укриття' ? '🟢' : status === 'Генератор' ? '⚡️' : status === 'Вільні розетки' ? '🔌' : status === 'Pet-friendly' ? '🐕' : '●'} {status}</span>)}</div>
    <div className="live-row"><span className="live-dot" />{location.updated}<span className="community-badge">{location.community ? 'ℹ️ Додано спільнотою' : 'Перевірено закладом'}</span></div>
    <div className="eta-row"><span>Маршрут</span><strong>{location.eta}</strong></div>
    <div className="card-actions"><Link href={`/place/${location.id}`} className="details-button">Відкрити деталі</Link><button type="button" className="route-button"><Navigation size={16} fill="currentColor" />Прокласти шлях</button><button type="button" className={`card-heart ${saved ? 'saved' : ''}`} aria-label={`Зберегти ${location.name}`} aria-pressed={saved} onClick={onSave}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button></div>
  </article>
}

function MapView() {
  return <section className="map-canvas" aria-label="Карта локацій Києва">
    <div className="map-grid" /><div className="map-water" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-road road-four" /><div className="map-road road-five" />
    <span className="district district-one">Поділ</span><span className="district district-two">Печерськ</span><span className="district district-three">Шевченківський</span>
    {locations.map((location, index) => <Link key={location.id} href={`/place/${location.id}`} className={`map-marker ${index === 0 ? 'marker-active' : index === 1 ? 'marker-unknown' : 'marker-closed'}`} style={{ left: location.x, top: location.y }} aria-label={`Відкрити ${location.name}`}><span className="marker-core" /></Link>)}
    <button type="button" className="location-button map-location" aria-label="Моя локація"><Crosshair size={21} /></button>
  </section>
}

export default function Page() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['Є світло'])
  const [view, setView] = useState<'map' | 'list'>('map')
  const [saved, setSaved] = useState<string[]>([])
  const toggle = (label: string) => setActiveFilters((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label])
  const toggleSaved = (name: string) => setSaved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])

  return <main className="svitlo-app home-shell">
    <aside className={`home-sidebar ${view === 'list' ? 'mobile-list-visible' : ''}`}>
      <header className="list-top-controls"><Link href="/profile" className="icon-button" aria-label="Відкрити профіль"><UserCircle size={21} strokeWidth={1.8} /></Link><label className="search-box"><Search size={18} aria-hidden="true" /><input aria-label="Пошук кавʼярні або вулиці" placeholder="Пошук кав'ярні, вулиці..." /></label><Link href="/filters" className="icon-button" aria-label="Фільтри"><Filter size={20} strokeWidth={1.8} /></Link></header>
      <Filters active={activeFilters} toggle={toggle} />
      <section className="list-content"><div className="list-heading"><div><p className="eyebrow">Поруч із вами</p><h1>Кавʼярні та укриття</h1></div><span className="result-count">24 місця</span></div><div className="location-feed">{locations.map((location) => <LocationCard key={location.id} location={location} saved={saved.includes(location.name)} onSave={() => toggleSaved(location.name)} />)}</div></section>
    </aside>
    <div className={`home-map ${view === 'list' ? 'mobile-map-hidden' : ''}`}><MapView /></div>
    <div className="view-toggle home-toggle" role="group" aria-label="Перемикач вигляду"><button type="button" className={view === 'map' ? 'selected' : ''} onClick={() => setView('map')}><MapIcon size={16} />Карта</button><button type="button" className={view === 'list' ? 'selected' : ''} onClick={() => setView('list')}><span aria-hidden="true">📄</span>Список</button></div>
  </main>
}
