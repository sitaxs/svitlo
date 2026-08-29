'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Heart,
  MapPin,
  Navigation,
  Share2,
  Star,
  ThumbsUp,
  TrainFront,
  UserRound,
  Zap,
} from 'lucide-react'

const travelOptions = [
  { icon: '🚶', label: 'Пішки', time: '5 хв' },
  { icon: '🛴', label: 'Самокат', time: '2 хв' },
  { icon: '🚗', label: 'Таксі / Авто', time: '3 хв' },
]

const reviews = [
  { name: 'Олена К.', time: '2 години тому', score: '5.0', text: 'Дуже затишно, тихо і справді тепло. Перевірила розетки — все працює.' },
  { name: 'Андрій М.', time: 'вчора', score: '4.8', text: 'Гарне місце, коли треба попрацювати під час тривоги. Кава теж чудова.' },
]

export default function PlacePage() {
  const [saved, setSaved] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const [activeTravel, setActiveTravel] = useState('Пішки')

  return (
    <main className="svitlo-app">
      <div className="place-canvas">
        <header className="place-topbar">
          <button type="button" className="place-icon-button" aria-label="Назад"><ArrowLeft size={20} /></button>
          <div className="place-top-actions">
            <button type="button" className="place-icon-button" aria-label="Поділитися"><Share2 size={18} /></button>
            <button type="button" className={`place-icon-button ${saved ? 'saved' : ''}`} aria-label="Зберегти місце" aria-pressed={saved} onClick={() => setSaved(!saved)}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} /></button>
          </div>
        </header>

        <div className="place-scroll">
          <section className="place-hero">
            <div className="place-hero-image"><div className="hero-coffee">☕</div><span>Фото закладу</span><div className="carousel-dots"><i className="active" /><i /><i /></div></div>
            <div className="place-title-row"><div><p className="place-kicker">КОВОРКІНГ · КИЇВ</p><h1>Кав&apos;ярня &quot;Urban Space 500&quot;</h1><p className="place-address"><MapPin size={14} /> вул. Бориса Грінченка, 9</p></div><span className="place-price">₴₴</span></div>
            <p className="place-type">₴₴ · Кав&apos;ярня &amp; Коворкінг</p>
          </section>

          <section className="status-card" aria-label="Поточний статус закладу">
            <div className="section-label"><span className="status-live-dot" /> ЗАРАЗ НА МІСЦІ</div>
            <p><span>🟢</span> Працюємо під час тривоги <small>(цокольне приміщення)</small></p>
            <p><span>⚡️</span> Працює генератор + Starlink</p>
            <p><span>🌡</span> Автономне опалення</p>
          </section>

          <section className="route-section">
            <div className="section-heading"><h2>Як дістатися</h2><span>від вашої локації</span></div>
            <div className="travel-options">{travelOptions.map((option) => <button key={option.label} type="button" className={`travel-option ${activeTravel === option.label ? 'active' : ''}`} onClick={() => setActiveTravel(option.label)}><span>{option.icon}</span><strong>{option.time}</strong><small>{option.label}</small></button>)}</div>
            <button type="button" className="maps-button"><Navigation size={17} fill="currentColor" /> Відкрити в Google Maps / Waze <ChevronRight size={16} /></button>
          </section>

          <button type="button" className={`checkin-button ${checkedIn ? 'checked' : ''}`} onClick={() => setCheckedIn(!checkedIn)}><MapPin size={17} /> {checkedIn ? 'Ви відмітилися тут' : 'Я тут був (Чек-ін)'} <span>{checkedIn ? '✓' : '128'}</span></button>

          <div className="admin-notice"><span>ℹ️</span><p>Цей профіль створено адміністрацією.<br /><small>Відповіді на відгуки можуть бути відсутні.</small></p></div>

          <section className="reviews-section">
            <div className="reviews-heading"><div><p className="section-label">ВІДГУКИ</p><h2>Що кажуть гості</h2></div><div className="rating"><strong>4.9</strong><Star size={16} fill="currentColor" /><small>32 відгуки</small></div></div>
            <div className="review-list">{reviews.map((review) => <article className="review" key={review.name}><div className="review-head"><div className="review-avatar"><UserRound size={16} /></div><div><strong>{review.name}</strong><span>{review.time}</span></div><b><Star size={12} fill="currentColor" /> {review.score}</b></div><p>{review.text}</p>{review.name === 'Олена К.' && <div className="owner-reply"><CheckCircle2 size={14} /> <span><strong>Відповідь власника:</strong> Дякуємо, розетки біля 3-го столика вільні!</span></div>}<div className="review-like"><ThumbsUp size={13} /> Корисно</div></article>)}</div>
            <button type="button" className="write-review"><Heart size={16} /> Залишити відгук</button>
          </section>
        </div>
      </div>
    </main>
  )
}
