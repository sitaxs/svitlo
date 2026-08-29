'use client'

import { useState } from 'react'
import {
  Bookmark,
  Check,
  ChevronDown,
  Coffee,
  Crosshair,
  Filter,
  Heart,
  Map as MapIcon,
  Navigation,
  PlugZap,
  Search,
  ShieldCheck,
  Thermometer,
  UserCircle,
  Footprints,
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

const places = {
  active: {
    title: "Кав'ярня 'Зерно'",
    address: 'вул. Ярославів Вал, 14',
    distance: '3 хв (240 м)',
    status: 'Працює як укриття',
    power: 'Світло є',
    category: 'Спешелті',
  },
  unknown: {
    title: 'Кава на розі',
    address: 'вул. Олеся Гончара, 18',
    distance: '5 хв (390 м)',
    status: 'Статус невідомий',
    power: 'Перевірити світло',
    category: 'Кавʼярня',
  },
  closed: {
    title: 'Тиха кава',
    address: 'вул. Рейтарська, 9',
    distance: '7 хв (530 м)',
    status: 'Зачинено під час тривоги',
    power: 'Недоступно',
    category: 'Кавʼярня',
  },
}

type PlaceKey = keyof typeof places

function Marker({ type, top, left, selected, onClick }: { type: PlaceKey; top: string; left: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={`Показати ${places[type].title}`}
      onClick={onClick}
      className={`map-marker marker-${type} ${selected ? 'is-selected' : ''}`}
      style={{ top, left }}
    >
      <span className="marker-core" />
      <span className="sr-only">{places[type].title}</span>
    </button>
  )
}

export default function Page() {
  const [selected, setSelected] = useState<PlaceKey>('active')
  const [activeFilters, setActiveFilters] = useState<string[]>(['Є світло'])
  const [view, setView] = useState<'map' | 'list'>('map')
  const [saved, setSaved] = useState(false)

  const place = places[selected]

  function toggleFilter(label: string) {
    setActiveFilters((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label])
  }

  return (
    <main className="svitlo-app">
      <div className="map-canvas" aria-label="Карта кавʼярень Києва">
        <div className="map-grid" />
        <div className="map-water" />
        <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-road road-four" /><div className="map-road road-five" />
        <span className="district district-one">Шевченківський</span><span className="district district-two">Поділ</span><span className="district district-three">Печерськ</span>

        <header className="top-controls">
          <button type="button" className="icon-button" aria-label="Відкрити профіль"><UserCircle size={21} strokeWidth={1.8} /></button>
          <label className="search-box">
            <Search size={18} aria-hidden="true" />
            <input aria-label="Пошук кавʼярні або вулиці" placeholder="Пошук кав'ярні, вулиці..." />
          </label>
          <button type="button" className="icon-button" aria-label="Фільтри"><Filter size={20} strokeWidth={1.8} /></button>
        </header>

        <div className="filter-scroller" aria-label="Швидкі фільтри">
          {filters.map(({ label, icon: Icon }) => {
            const active = activeFilters.includes(label)
            return <button key={label} type="button" onClick={() => toggleFilter(label)} className={`filter-chip ${active ? 'active' : ''}`} aria-pressed={active}>{Icon ? <Icon size={15} /> : <span className="price-icon">₴</span>}{label}{active && <Check size={13} />}</button>
          })}
        </div>

        <Marker type="active" top="43%" left="50%" selected={selected === 'active'} onClick={() => setSelected('active')} />
        <Marker type="unknown" top="31%" left="70%" selected={selected === 'unknown'} onClick={() => setSelected('unknown')} />
        <Marker type="closed" top="55%" left="27%" selected={selected === 'closed'} onClick={() => setSelected('closed')} />
        <Marker type="active" top="65%" left="76%" selected={false} onClick={() => setSelected('active')} />

        <div className="map-label label-a">Золоті ворота</div><div className="map-label label-b">Площа Перемоги</div>

        <section className="bottom-sheet" aria-live="polite">
          <div className="drag-handle" />
          <div className="place-head">
            <div className="coffee-image"><Coffee size={30} strokeWidth={1.4} /><span>{place.category}</span></div>
            <div className="place-copy"><h1>{place.title}</h1><p>{place.address}</p><div className="status-row"><span className={`status-badge ${selected === 'active' ? 'green' : selected === 'unknown' ? 'amber' : 'rose'}`}>{selected === 'active' ? '●' : '●'} {place.status}</span><span className="status-badge green">⚡ {place.power}</span></div></div>
          </div>
          <div className="sheet-footer"><span className="distance"><Footprints size={15} /> {place.distance}</span><div className="sheet-actions"><button type="button" className={`round-action ${saved ? 'saved' : ''}`} aria-label="Зберегти місце" aria-pressed={saved} onClick={() => setSaved(!saved)}>{saved ? <Bookmark size={18} fill="currentColor" /> : <Heart size={18} />}</button><button type="button" className="route-button"><Navigation size={17} fill="currentColor" />Маршрут</button></div></div>
        </section>

        <div className="view-toggle" role="group" aria-label="Перемикач вигляду"><button type="button" className={view === 'map' ? 'selected' : ''} onClick={() => setView('map')}><MapIcon size={16} />Карта</button><button type="button" className={view === 'list' ? 'selected' : ''} onClick={() => setView('list')}><ChevronDown size={16} className="list-icon" />Список</button></div>
        <button type="button" className="location-button" aria-label="Моя локація"><Crosshair size={21} /></button>
      </div>
    </main>
  )
}
