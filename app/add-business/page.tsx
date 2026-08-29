"use client"

import { useState } from "react"
import { ArrowLeft, Check, ChevronDown, Crosshair, Info, MapPin, Plus, Store, UserRound } from "lucide-react"

const tags = ["Є світло", "Розетки", "Тепло", "Працює як укриття", "Pet-friendly", "Wi-Fi"]

export default function AddBusinessPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["Є світло"])
  const [locationSet, setLocationSet] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function toggleTag(tag: string) {
    setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag])
  }

  if (submitted) {
    return (
      <main className="svitlo-app form-shell">
        <section className="venue-form success-state" aria-live="polite">
          <div className="success-icon"><Check size={28} /></div>
          <p className="form-overline">Дякуємо за внесок</p>
          <h1>Локацію надіслано</h1>
          <p>Ми перевіримо інформацію та додамо заклад на карту SvitloSpot.</p>
          <button className="form-primary" onClick={() => setSubmitted(false)}>Додати ще одну локацію</button>
          <a className="form-secondary-link" href="/profile">Повернутися до профілю</a>
        </section>
      </main>
    )
  }

  return (
    <main className="svitlo-app form-shell">
      <section className="venue-form">
        <header className="form-header">
          <a className="form-back" href="/profile" aria-label="Назад"><ArrowLeft size={18} /></a>
          <div><p className="form-overline">SvitloSpot</p><h1>Додати локацію</h1></div>
          <div className="form-step">1 <span>/</span> 1</div>
        </header>
        <div className="form-scroll">
          <div className="form-intro"><div className="intro-icon"><Plus size={18} /></div><div><strong>Допоможіть місту</strong><p>Додайте кав’ярню або простір, де люди можуть зігрітися та підзарядитися.</p></div></div>
          <section className="form-section"><div className="section-heading"><Store size={17} /><div><h2>Основна інформація</h2><p>Розкажіть про заклад</p></div></div>
            <label className="form-label">Назва закладу<input placeholder="Наприклад, Кав’ярня «Зерно»" /></label>
            <label className="form-label">Тип локації<button className="select-field">Кав’ярня <ChevronDown size={16} /></button></label>
            <label className="form-label">Адреса<input placeholder="Вулиця, номер будинку" /><small>Місто: Київ</small></label>
            <button className={`location-button ${locationSet ? "confirmed" : ""}`} onClick={() => setLocationSet(true)}><Crosshair size={16} />{locationSet ? "Локацію підтверджено" : "Визначити точку на карті"}</button>
          </section>
          <section className="form-section"><div className="section-heading"><UserRound size={17} /><div><h2>Контакти власника</h2><p>Необов’язково, але допоможе підтвердити заклад</p></div></div>
            <label className="form-label">Ваше ім’я<input placeholder="Як до вас звертатися" /></label>
            <label className="form-label">Телефон або email<input placeholder="Для зв’язку з вами" /></label>
            <div className="privacy-note"><Info size={15} /><span>Контакти не відображатимуться публічно.</span></div>
          </section>
          <section className="form-section"><div className="section-heading"><Plus size={17} /><div><h2>Швидкі теги</h2><p>Оберіть усе, що підходить</p></div></div><div className="form-tags">{tags.map((tag) => <button key={tag} className={selectedTags.includes(tag) ? "selected" : ""} onClick={() => toggleTag(tag)}>{selectedTags.includes(tag) && <Check size={13} />}{tag}</button>)}</div></section>
        </div>
        <footer className="form-footer"><button className="form-primary" onClick={() => setSubmitted(true)}>Надіслати на перевірку <ArrowLeft className="submit-arrow" size={16} /></button><p>Публікація безкоштовна. Інформацію можна буде змінити пізніше.</p></footer>
      </section>
    </main>
  )
}
