'use client'

import { useState } from 'react'
import { BarChart3, Bell, BriefcaseBusiness, Check, ChevronRight, Clock3, Heart, Link, MapPin, Menu, Pencil, Phone, Plus, Save, ShieldCheck, Star, Trash2, Upload, UserCircle, X, Zap } from 'lucide-react'

const favorites = [
  { name: 'Кавʼярня «Зерно»', detail: 'вул. Ярославів Вал, 14 · 3 хв пішки', status: '⚡️ Світло є' },
  { name: 'Octo Tower', detail: 'вул. Мечникова, 3 · 4 хв пішки', status: '🛡 Укриття' },
]

const claims = [
  { name: 'Кава & Тиша', phone: '+380 67 234 11 90', instagram: '@kava.tysha' },
  { name: 'Простір «На Районі»', phone: '+380 93 811 45 20', instagram: '@narayoni.space' },
]

function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) {
  return <div className="profile-section-title"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{action && <button type="button" className="text-action">{action}<ChevronRight size={14} /></button>}</div>
}

export default function ProfilePage() {
  const [tab, setTab] = useState<'personal' | 'business' | 'admin'>('personal')
  const [owner, setOwner] = useState(false)
  const [claimOpen, setClaimOpen] = useState(false)
  const [saved, setSaved] = useState<string[]>([])
  const [light, setLight] = useState(true)
  const [open, setOpen] = useState(true)
  const [petFriendly, setPetFriendly] = useState(true)
  const [kids, setKids] = useState(false)
  const [approved, setApproved] = useState<string[]>([])

  return <main className="svitlo-app"><div className="profile-canvas">
    <header className="profile-header"><button type="button" className="profile-back" aria-label="Відкрити меню"><Menu size={20} /></button><div className="profile-avatar"><UserCircle size={34} strokeWidth={1.5} /></div><div className="profile-user"><h1>Олена Коваль</h1><p>olena.koval@gmail.com</p></div><span className="role-badge"><ShieldCheck size={13} /> Клієнт</span></header>
    <nav className="profile-tabs" aria-label="Розділи профілю">{[['personal','🔖 Особисте'],['business','💼 Мій бізнес'],['admin','🛡 Адмінка']].map(([value, label]) => <button key={value} type="button" className={tab === value ? 'active' : ''} onClick={() => setTab(value as typeof tab)}>{label}</button>)}</nav>

    <section className="profile-scroll">
      {tab === 'personal' && <div className="profile-stack"><SectionTitle eyebrow="Збережене" title="Мої місця" action="Усі" /><div className="favorite-grid">{favorites.map((place) => <article className="favorite-card" key={place.name}><div className="favorite-image"><span>☕</span><button type="button" aria-label={`Зберегти ${place.name}`} onClick={() => setSaved((s) => s.includes(place.name) ? s.filter((x) => x !== place.name) : [...s, place.name])}><Heart size={16} fill={saved.includes(place.name) ? 'currentColor' : 'none'} /></button></div><h3>{place.name}</h3><p>{place.detail}</p><span className="mini-status">{place.status}</span></article>)}</div><SectionTitle eyebrow="Активність" title="Відвідані місця" /><div className="activity-card"><div className="activity-icon"><MapPin size={17} /></div><div><strong>Кавʼярня «Зерно»</strong><p>Сьогодні, 09:42 · Чек-ін підтверджено</p></div><Check size={17} className="check-green" /></div><div className="activity-card"><div className="activity-icon"><Clock3 size={17} /></div><div><strong>Octo Tower</strong><p>Вчора, 16:18 · 48 хв перебування</p></div><ChevronRight size={17} className="muted-icon" /></div><SectionTitle eyebrow="Ваш голос" title="Мої відгуки" action="Додати" /><article className="review-card"><div className="review-stars"><Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /></div><strong>Кавʼярня «Зерно»</strong><p>«Тихе місце, стабільний Wi-Fi та дуже приємна команда.»</p><small>2 тижні тому</small></article></div>}

      {tab === 'business' && <div className="profile-stack">{!owner ? <><div className="business-claim-card"><div className="business-symbol"><BriefcaseBusiness size={22} /></div><p className="eyebrow">Для власників</p><h2>Ви власник кавʼярні чи простору?</h2><p>Керуйте статусом світла, додавайте оновлення та допомагайте гостям знайти вас.</p><button type="button" className="primary-profile-button" onClick={() => setClaimOpen(true)}><Plus size={17} /> Знайти або додати свій заклад</button></div><div className="info-panel"><ShieldCheck size={18} /><p><strong>Безпечно для всіх</strong><br />Ми перевіримо дані перед підтвердженням власності.</p></div></> : <><SectionTitle eyebrow="Панель власника" title="Кавʼярня «Зерно»" action="Редагувати" /><div className="owner-status-card"><div><span className="live-dot" /> Статус закладу</div><strong>{open ? 'Працюємо для гостей' : 'Зачинено'}</strong><div className="toggle-row"><button type="button" className={light ? 'selected' : ''} onClick={() => setLight(true)}>💡 Світло є</button><button type="button" className={!light ? 'selected' : ''} onClick={() => setLight(false)}>Немає</button></div><div className="toggle-row"><button type="button" className={open ? 'selected' : ''} onClick={() => setOpen(true)}>🛡 Працюємо в тривогу</button><button type="button" className={!open ? 'selected' : ''} onClick={() => setOpen(false)}>Зачинено</button></div></div><div className="owner-tools"><button type="button"><Upload size={17} /> Завантажити фото</button><button type="button"><Pencil size={17} /> Години роботи</button></div><div className="premium-card"><span className="premium-badge">PREMIUM</span><h2>Зростайте разом із містом</h2><p>Більше даних про гостей та гнучкі налаштування простору.</p><div className="analytics"><BarChart3 size={19} /><div><strong>1 248 переглядів</strong><small>+18% цього тижня</small></div></div><label className="switch-line"><span>🐕 Pet-friendly</span><input type="checkbox" checked={petFriendly} onChange={(e) => setPetFriendly(e.target.checked)} /><i /></label><label className="switch-line"><span>🧸 Є дитячий куточок</span><input type="checkbox" checked={kids} onChange={(e) => setKids(e.target.checked)} /><i /></label></div></>}</div>}

      {tab === 'admin' && <div className="profile-stack"><div className="admin-banner"><ShieldCheck size={21} /><div><p className="eyebrow">Панель адміністратора</p><h2>Модерація SvitloSpot</h2></div><span className="admin-count">{claims.length - approved.length}</span></div><SectionTitle eyebrow="Потрібна увага" title="Запити на підтвердження" />{claims.map((claim) => !approved.includes(claim.name) && <article className="claim-card" key={claim.name}><div className="claim-card-head"><div className="claim-avatar"><BriefcaseBusiness size={17} /></div><div><h3>{claim.name}</h3><p><Link size={12} /> {claim.instagram}</p></div></div><p className="claim-detail"><Phone size={13} /> {claim.phone}</p><div className="claim-actions"><button type="button" className="approve" onClick={() => setApproved((a) => [...a, claim.name])}><Check size={15} /> Підтвердити</button><button type="button" className="reject"><X size={15} /> Відхилити</button></div></article>)}<SectionTitle eyebrow="Інструменти" title="Швидко додати заклад" /><div className="quick-add-card"><label>Назва закладу<input placeholder="Наприклад, Світло Room" /></label><div className="two-inputs"><label>Широта<input placeholder="50.4501" /></label><label>Довгота<input placeholder="30.5234" /></label></div><label>Теги за замовчуванням<input placeholder="Укриття, генератор..." /></label><button type="button" className="primary-profile-button"><Save size={16} /> Додати на карту</button></div></div>}
    </section>
    {claimOpen && <div className="modal-backdrop" role="presentation" onClick={() => setClaimOpen(false)}><div className="claim-modal" role="dialog" aria-modal="true" aria-labelledby="claim-title" onClick={(e) => e.stopPropagation()}><button type="button" className="modal-close" onClick={() => setClaimOpen(false)} aria-label="Закрити"><X size={18} /></button><p className="eyebrow">Підтвердження власності</p><h2 id="claim-title">Розкажіть про свій заклад</h2><p className="modal-copy">Ми звʼяжемося з вами для швидкої перевірки.</p><label>Назва кавʼярні<input placeholder="Наприклад, Зерно" /></label><label>Номер телефону<input placeholder="+380 67 000 00 00" /></label><label>Instagram посилання<input placeholder="instagram.com/your-place" /></label><button type="button" className="primary-profile-button" onClick={() => { setClaimOpen(false); setOwner(true) }}>Надіслати запит</button></div></div>}
  </div></main>
}
