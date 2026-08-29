'use client'

import { useState } from 'react'
import { Bell, Bookmark, ChevronRight, Clock3, Info, LogOut, MapPin, Plus, Settings, Star, Store, UserCircle } from 'lucide-react'

const personalItems = [
  { icon: Bookmark, label: 'Збережені локації', detail: '12 місць' },
  { icon: MapPin, label: 'Історія відвідувань', detail: '8 чек-інів' },
  { icon: Star, label: 'Мої відгуки', detail: '3 відгуки' },
]

const businessItems = [
  { icon: Settings, label: 'Керування закладом «Зерно»' },
  { icon: Clock3, label: 'Аналітика' },
  { icon: Star, label: 'Відповіді на відгуки' },
]

const settingsItems = [
  { icon: UserCircle, label: 'Особисті дані' },
]

function MenuCard({ items, toggle, checked, onToggle }: { items: { icon: typeof Bookmark; label: string; detail?: string }[]; toggle?: boolean; checked?: boolean; onToggle?: () => void }) {
  return <div className="native-menu-card">{items.map(({ icon: Icon, label, detail }, index) => <div className="native-menu-item" key={label}>{<div className="native-menu-icon"><Icon size={18} strokeWidth={1.8} /></div>}<div className="native-menu-copy"><strong>{label}</strong>{detail && <small>{detail}</small>}</div>{toggle && index === items.length - 1 ? <button type="button" className={`native-switch ${checked ? 'on' : ''}`} role="switch" aria-checked={checked} onClick={onToggle}><span /></button> : <ChevronRight size={17} className="native-chevron" />}</div>)}</div>
}

export default function ProfilePage() {
  const [alerts, setAlerts] = useState(true)
  const [claimOpen, setClaimOpen] = useState(false)

  return <main className="svitlo-app"><div className="unified-profile">
    <header className="unified-profile-header"><button type="button" className="profile-back" aria-label="Назад"><ChevronRight size={18} className="back-chevron" /></button><div className="unified-avatar"><UserCircle size={58} strokeWidth={1.35} /></div><h1>Олена Коваль</h1><p>olena.koval@gmail.com</p><span className="client-pill">Клієнт</span></header>
    <div className="unified-scroll">
      <section className="native-section"><h2>Мої місця</h2><MenuCard items={personalItems} /></section>
      <section className="native-section"><h2>Для Бізнесу</h2><div className="business-client-card"><div className="business-client-icon"><Store size={22} /></div><h3>Ви власник бізнесу?</h3><p>Додайте свій заклад на карту, щоб безкоштовно керувати статусом світла та залучати гостей.</p><button type="button" className="native-primary" onClick={() => setClaimOpen(true)}><Plus size={17} /> Додати заклад</button></div><MenuCard items={businessItems} /></section>
      <section className="native-section"><h2>Налаштування</h2><MenuCard items={[...settingsItems, { icon: Bell, label: 'Сповіщення про тривоги' }]} toggle checked={alerts} onToggle={() => setAlerts(!alerts)} /></section>
      <button type="button" className="logout-button"><LogOut size={17} /> Вийти з акаунту</button>
    </div>
    {claimOpen && <div className="modal-backdrop" role="presentation" onClick={() => setClaimOpen(false)}><div className="claim-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" aria-label="Закрити" onClick={() => setClaimOpen(false)}>×</button><p className="eyebrow">Для власників</p><h2>Додати заклад</h2><p className="modal-copy">Залиште контакти — ми допоможемо додати локацію на карту.</p><label>Назва закладу<input placeholder="Наприклад, Зерно" /></label><label>Номер телефону<input placeholder="+380 67 000 00 00" /></label><button type="button" className="primary-profile-button" onClick={() => setClaimOpen(false)}>Надіслати запит</button></div></div>}
  </div></main>
}
