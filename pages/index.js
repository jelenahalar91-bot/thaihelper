import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import TextRotate from '../components/TextRotate';

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  en: {
    nav_cta:       'Register Free →',
    hero_badge:    '🇹🇭 Now Launching in Thailand',
    hero_h1:       'Stop Paying Agencies. Get Hired Directly.',
    hero_h1_em:    'Employers pay to contact you. You join free — forever.',
    hero_p:        'ThaiHelper is Thailand\'s direct job platform for nannies, tutors, chefs, drivers, caregivers and more. Post your profile in 3 minutes — verified employers find you, contact you, and hire you. No middleman. No commission cut. You keep 100% of what you earn.',
    hero_cta1:     'Create My Free Profile →',
    hero_cta2:     'See How It Works',
    stat1:         '100% Free for providers',
    stat2:         'Cities across Thailand',
    stat3_bold:    'Direct',
    stat3:         'Contact — no middleman',
    trust1:        'No agency fees — ever',
    trust2:        'Your data is safe',
    trust3:        'Works on any phone',
    trust4:        'Employers come to you',
    preview_label: 'Your Profile',
    preview_title: 'This is how families see you',
    preview_sub:   'A verified, professional profile — visible to families searching in your city.',
    preview_badge: '✓ Verified',
    preview_exp:   'yrs experience',
    preview_btn:   'Contact',
    preview_note:  'Only paid & verified families can contact you.',
    how_label:     'How It Works',
    how_title:     '3 steps to get hired',
    how_sub:       'No agency needed. No waiting rooms. Just your profile and direct contact with employers.',
    step1_h:       'Sign Up Free',
    step1_p:       'Create your profile in minutes. Add your experience, skills, availability, and a photo.',
    step2_h:       'Get Discovered',
    step2_p:       'Families searching for household staff in your city will find your profile and reach out directly.',
    step3_h:       'Start Working',
    step3_p:       'Chat directly, agree on terms, and start your job — no middleman, no commission cut.',
    ben_label:     'Why ThaiHelper',
    ben_title:     'Built for household professionals',
    ben_sub:       'We created ThaiHelper because the current system is broken. Agencies take too much. Facebook is chaos. You deserve better.',
    ben1_h:        'Completely Free for You',
    ben1_p:        'Listing your profile on ThaiHelper is free — forever. Employers pay for access, not you.',
    ben2_h:        'Reach Serious Employers',
    ben2_p:        'Only verified, paying families can contact you. No time-wasters, no spam.',
    ben3_h:        'Thai & International Families',
    ben3_p:        'Work with Thai families and expats from Europe, the US, Russia, and beyond — all living across Thailand.',
    ben4_h:        'Build Your Reputation',
    ben4_p:        'Collect verified reviews after each job. A strong profile means better opportunities.',
    ben5_h:        'Work Where You Live',
    ben5_p:        'Bangkok, Chiang Mai, Phuket, Pattaya, Koh Samui — find jobs in your city.',
    ben6_h:        "You're in Control",
    ben6_p:        'Set your own rates, availability, and preferences. Accept only the jobs you want.',
    cat_label:     'Service Categories',
    cat_title:     'Who can register?',
    cat_sub:       'Household staff, tutors, teachers, and more — all welcome.',
    cat1:          '👶 Nanny & Babysitter',
    cat2:          '🏠 Housekeeper & Cleaner',
    cat3:          '👨‍🍳 Private Chef & Cook',
    cat4:          '🚗 Driver & Chauffeur',
    cat5:          '🌿 Gardener & Pool Care',
    cat6:          '🏥 Elder Care & Caregiver',
    cat7:          '📚 Tutor & Teacher',
    cta_label:     'Join ThaiHelper',
    cta_title:     'Ready to find your next job?',
    cta_sub:       'Be among the first providers on the platform. Early profiles get priority visibility at launch.',
    cta_body:      "Takes about 3 minutes. Add your photo, experience, and contact details — and we'll make sure the right families find you.",
    cta_btn:       'Create My Free Profile →',
    cta_note:      'No credit card. No agency fee. No catch.',
    vid_label:     'See It In Action',
    vid_title:     'Real people. Real jobs.',
    vid_sub:       'Watch how ThaiHelper works — from registration to your first job.',
    vid1_title:    'Welcome to ThaiHelper',
    vid1_sub:      'A quick intro from our founder',
    vid1_badge:    '🇬🇧 English',
    vid2_title:    'วิธีสมัครงาน (How to Register)',
    vid2_sub:      'Step-by-step guide for providers',
    vid2_badge:    '🇵🇭 Filipino · 🇹🇭 Thai',
    vid3_title:    'Provider Stories',
    vid3_sub:      'Coming soon — hear from our community',
    vid3_badge:    '🎬 Coming Soon',
    footer_privacy:'Privacy Policy',
    footer_terms:  'Terms of Service',
  },
  th: {
    nav_cta:       'ลงทะเบียนฟรี →',
    hero_badge:    '🇹🇭 เปิดตัวในประเทศไทยแล้ว',
    hero_h1:       'หยุดจ่ายค่าเอเจนซี่ หางานโดยตรง',
    hero_h1_em:    'นายจ้างจ่ายเพื่อติดต่อคุณ คุณสมัครฟรีตลอดไป',
    hero_p:        'ThaiHelper คือแพลตฟอร์มหางานโดยตรงในประเทศไทย สำหรับพี่เลี้ยง ติวเตอร์ พ่อครัว คนขับรถ ผู้ดูแลผู้สูงอายุ และอีกมากมาย สร้างโปรไฟล์ใน 3 นาที — นายจ้างที่ผ่านการยืนยันจะค้นหาและติดต่อคุณโดยตรง ไม่มีคนกลาง ไม่มีค่าคอมมิชชั่น คุณเก็บรายได้ 100%',
    hero_cta1:     'สร้างโปรไฟล์ฟรีของฉัน →',
    hero_cta2:     'ดูวิธีการใช้งาน',
    stat1:         'ฟรี 100% สำหรับผู้ให้บริการ',
    stat2:         'เมืองทั่วประเทศไทย',
    stat3_bold:    'โดยตรง',
    stat3:         'ติดต่อ ไม่มีคนกลาง',
    trust1:        'ไม่มีค่าเอเจนซี่ ตลอดไป',
    trust2:        'ข้อมูลของคุณปลอดภัย',
    trust3:        'ใช้งานได้ทุกมือถือ',
    trust4:        'นายจ้างมาหาคุณเอง',
    preview_label: 'โปรไฟล์ของคุณ',
    preview_title: 'นี่คือสิ่งที่ครอบครัวจะเห็น',
    preview_sub:   'โปรไฟล์ที่ผ่านการยืนยัน — ปรากฏต่อครอบครัวที่ค้นหาในเมืองของคุณ',
    preview_badge: '✓ ยืนยันแล้ว',
    preview_exp:   'ปีประสบการณ์',
    preview_btn:   'ติดต่อ',
    preview_note:  'เฉพาะครอบครัวที่ยืนยันตัวตนและชำระเงินแล้วเท่านั้นที่ติดต่อคุณได้',
    how_label:     'วิธีการทำงาน',
    how_title:     '3 ขั้นตอนในการหางาน',
    how_sub:       'ไม่ต้องผ่านเอเจนซี่ ไม่ต้องรอนาน แค่มีโปรไฟล์และนายจ้างจะติดต่อมาเอง',
    step1_h:       'สมัครฟรี',
    step1_p:       'สร้างโปรไฟล์ในไม่กี่นาที ใส่ประสบการณ์ ทักษะ ตารางเวลา และรูปภาพ',
    step2_h:       'ถูกค้นพบ',
    step2_p:       'ครอบครัวที่กำลังหาผู้ช่วยงานบ้านในเมืองของคุณจะพบโปรไฟล์และติดต่อโดยตรง',
    step3_h:       'เริ่มทำงาน',
    step3_p:       'คุยกันโดยตรง ตกลงเงื่อนไข แล้วเริ่มงานได้เลย ไม่มีคนกลาง ไม่มีค่าคอมมิชชั่น',
    ben_label:     'ทำไมต้อง ThaiHelper',
    ben_title:     'สร้างมาเพื่อผู้ให้บริการในบ้านโดยเฉพาะ',
    ben_sub:       'เราสร้าง ThaiHelper เพราะระบบเดิมมีปัญหา เอเจนซี่คิดค่าใช้จ่ายสูงเกินไป Facebook ไม่มีระบบ คุณสมควรได้รับสิ่งที่ดีกว่า',
    ben1_h:        'ฟรีสำหรับคุณตลอดไป',
    ben1_p:        'ลงโปรไฟล์ใน ThaiHelper ฟรีตลอดไป นายจ้างเป็นคนจ่าย ไม่ใช่คุณ',
    ben2_h:        'เข้าถึงนายจ้างที่จริงจัง',
    ben2_p:        'เฉพาะครอบครัวที่ยืนยันตัวตนและชำระเงินแล้วเท่านั้นที่ติดต่อคุณได้ ไม่มีคนไม่จริงจัง',
    ben3_h:        'ครอบครัวไทยและต่างชาติ',
    ben3_p:        'ทำงานกับครอบครัวไทยและชาวต่างชาติจากยุโรป อเมริกา รัสเซีย และประเทศอื่นๆ ที่อาศัยอยู่ทั่วประเทศไทย',
    ben4_h:        'สร้างชื่อเสียง',
    ben4_p:        'สะสมรีวิวจริงหลังทำงาน โปรไฟล์ที่ดีหมายถึงโอกาสที่ดีกว่า',
    ben5_h:        'ทำงานใกล้บ้าน',
    ben5_p:        'กรุงเทพฯ เชียงใหม่ ภูเก็ต พัทยา เกาะสมุย หาได้ทุกที่',
    ben6_h:        'คุณควบคุมทุกอย่าง',
    ben6_p:        'กำหนดราคา เวลา และเงื่อนไขเอง รับเฉพาะงานที่คุณต้องการ',
    cat_label:     'ประเภทบริการ',
    cat_title:     'ใครลงทะเบียนได้บ้าง?',
    cat_sub:       'พนักงานบ้าน ติวเตอร์ ครูสอนพิเศษ และอื่นๆ — ยินดีต้อนรับทุกคน',
    cat1:          '👶 พี่เลี้ยงเด็ก',
    cat2:          '🏠 แม่บ้านและพนักงานทำความสะอาด',
    cat3:          '👨‍🍳 พ่อครัว / แม่ครัวส่วนตัว',
    cat4:          '🚗 คนขับรถ',
    cat5:          '🌿 คนสวนและดูแลสระว่ายน้ำ',
    cat6:          '🏥 ผู้ดูแลผู้สูงอายุ',
    cat7:          '📚 ติวเตอร์ / ครูสอนพิเศษ',
    cta_label:     'เข้าร่วม ThaiHelper',
    cta_title:     'พร้อมหางานใหม่แล้วหรือยัง?',
    cta_sub:       'เป็นหนึ่งในผู้ให้บริการกลุ่มแรก โปรไฟล์แรกๆ จะได้รับการแสดงผลก่อนตอนเปิดตัว',
    cta_body:      'ใช้เวลาประมาณ 3 นาที ใส่รูปภาพ ประสบการณ์ และข้อมูลติดต่อ แล้วเราจะทำให้ครอบครัวที่ใช่เจอคุณ',
    cta_btn:       'สร้างโปรไฟล์ฟรีของฉัน →',
    cta_note:      'ไม่ต้องใช้บัตรเครดิต ไม่มีค่าเอเจนซี่ ไม่มีเงื่อนไขซ่อนเร้น',
    vid_label:     'ดูการทำงานจริง',
    vid_title:     'คนจริง งานจริง',
    vid_sub:       'ดูวิธีที่ ThaiHelper ทำงาน ตั้งแต่ลงทะเบียนจนได้งานแรก',
    vid1_title:    'ยินดีต้อนรับสู่ ThaiHelper',
    vid1_sub:      'แนะนำสั้นๆ จากผู้ก่อตั้ง',
    vid1_badge:    '🇬🇧 ภาษาอังกฤษ',
    vid2_title:    'วิธีสมัครงาน (How to Register)',
    vid2_sub:      'คู่มือทีละขั้นตอนสำหรับผู้ให้บริการ',
    vid2_badge:    '🇵🇭 ฟิลิปปินส์ · 🇹🇭 ไทย',
    vid3_title:    'เรื่องราวของผู้ให้บริการ',
    vid3_sub:      'เร็วๆ นี้ — ฟังจากชุมชนของเรา',
    vid3_badge:    '🎬 เร็วๆ นี้',
    footer_privacy:'นโยบายความเป็นส่วนตัว',
    footer_terms:  'ข้อกำหนดการใช้งาน',
  }
};

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLangState] = useState('en');

  // Lade gespeicherte Sprache aus localStorage beim ersten Rendern
  useEffect(() => {
    const saved = localStorage.getItem('th_lang') || 'en';
    setLangState(saved);
  }, []);

  const changeLang = (l) => {
    setLangState(l);
    localStorage.setItem('th_lang', l);
  };

  const t = T[lang];

  return (
    <>
      <Head>
        <title>ThaiHelper – Find Trusted Household Staff in Thailand</title>
        <meta name="description" content="ThaiHelper connects families and expats in Thailand with trusted nannies, housekeepers, cooks, drivers and more. No agency fees." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={lang === 'th' ? 'lang-th' : ''}>

        {/* ── NAV ───────────────────────────────── */}
        <nav>
          <a className="nav-brand" href="#">Thai<span>Helper</span></a>
          <div className="nav-right">
            <div className="lang-toggle">
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => changeLang('en')}
              >🇬🇧 EN</button>
              <button
                className={`lang-btn ${lang === 'th' ? 'active' : ''}`}
                onClick={() => changeLang('th')}
              >🇹🇭 TH</button>
            </div>
            <Link className="nav-cta" href="/register">{t.nav_cta}</Link>
          </div>
        </nav>

        {/* ── HERO ──────────────────────────────── */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-text">
              <div className="hero-badge">{t.hero_badge}</div>
              <h1>
                {t.hero_h1}<br />
                <em>{t.hero_h1_em}</em>
              </h1>
              <p>{t.hero_p}</p>
              <div className="hero-cta-group">
                <Link className="btn-primary" href="/register">{t.hero_cta1}</Link>
                <a className="btn-outline" href="#how-it-works">{t.hero_cta2}</a>
              </div>
            </div>
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=480&h=560&fit=crop&crop=faces"
                alt="Happy family with helper in Thailand"
              />
              <div className="hero-img-float">
                <span className="gold-dot"></span>
                <span>{lang === 'th' ? '✓ ฟรีตลอด ไม่มีค่าใช้จ่ายซ่อนเร้น' : '✓ Free Forever – No Hidden Fees'}</span>
              </div>
            </div>

          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>100%</strong><span>{t.stat1}</span></div>
            <div className="hero-stat"><strong>5</strong><span>{t.stat2}</span></div>
            <div className="hero-stat"><strong>{t.stat3_bold}</strong><span>{t.stat3}</span></div>
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────── */}
        <div className="trust-bar">
          <div className="trust-item">✅ <span>{t.trust1}</span></div>
          <div className="trust-item">🔒 <span>{t.trust2}</span></div>
          <div className="trust-item">📱 <span>{t.trust3}</span></div>
          <div className="trust-item">⚡ <span>{t.trust4}</span></div>
        </div>

        {/* ── PROFILE PREVIEW ───────────────────── */}
        <section className="section preview-section">
          <div className="section-inner">
            <div className="section-label">{t.preview_label}</div>
            <h2 className="section-title">{t.preview_title}</h2>
            <p className="section-sub">{t.preview_sub}</p>

            <div className="profile-cards">
              {[
                {
                  photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face',
                  name: 'Maria S.', verified: true,
                  role: lang === 'th' ? '👶 พี่เลี้ยงเด็ก' : '👶 Nanny & Babysitter',
                  city: 'Phuket', exp: 5,
                  langs: '🇵🇭 🇬🇧', stars: 4.9, reviews: 12, rate: '300',
                  skills: lang === 'th' ? 'ดูแลทารก · รับส่งโรงเรียน · ดูแลกลางคืน' : 'Infant care · School run · Overnight',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=80&h=80&fit=crop&crop=face',
                  name: 'Sunisa K.', verified: true,
                  role: lang === 'th' ? '🏠 แม่บ้าน' : '🏠 Housekeeper',
                  city: 'Bangkok', exp: 8,
                  langs: '🇹🇭 🇬🇧', stars: 4.8, reviews: 7, rate: '200',
                  skills: lang === 'th' ? 'ทำความสะอาด · ซักรีด · ทำอาหาร' : 'Cleaning · Laundry · Cooking',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
                  name: 'Ana R.', verified: true,
                  role: lang === 'th' ? '👨‍🍳 แม่ครัวส่วนตัว' : '👨‍🍳 Private Chef',
                  city: 'Phuket', exp: 3,
                  langs: '🇵🇭 🇬🇧 🇹🇭', stars: 5.0, reviews: 4, rate: '450',
                  skills: lang === 'th' ? 'อาหารไทย · อาหารตะวันตก · ขนมอบ' : 'Thai cuisine · Western · Baking',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face',
                  name: 'Narin P.', verified: true,
                  role: lang === 'th' ? '📚 ติวเตอร์คณิตศาสตร์' : '📚 Maths Tutor',
                  city: 'Phuket', exp: 4,
                  langs: '🇹🇭 🇬🇧', stars: 5.0, reviews: 6, rate: '400',
                  skills: lang === 'th' ? 'คณิตศาสตร์ · ฟิสิกส์ · เตรียมสอบ' : 'Maths · Physics · Exam prep',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=80&h=80&fit=crop&crop=face',
                  name: 'Dao W.', verified: true,
                  role: lang === 'th' ? '🌿 คนสวน / ดูแลสระ' : '🌿 Gardener & Pool Care',
                  city: 'Koh Samui', exp: 6,
                  langs: '🇹🇭', stars: 4.9, reviews: 9, rate: '180',
                  skills: lang === 'th' ? 'ดูแลสวน · ทำความสะอาดสระ · ตัดหญ้า' : 'Garden care · Pool cleaning · Lawn',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=80&h=80&fit=crop&crop=face',
                  name: 'Malee T.', verified: true,
                  role: lang === 'th' ? '🏥 ดูแลผู้สูงอายุ' : '🏥 Elder Care',
                  city: 'Chiang Mai', exp: 7,
                  langs: '🇹🇭 🇬🇧', stars: 4.8, reviews: 5, rate: '250',
                  skills: lang === 'th' ? 'ดูแลสุขอนามัย · เตือนทานยา · คอยเป็นเพื่อน' : 'Personal care · Medication · Companionship',
                },
              ].map((p, i) => (
                <div className="profile-card" key={i}>
                  <div className="profile-card-top">
                    <div className="profile-avatar" style={{ overflow: 'hidden', background: '#e8f7f5' }}>
                      <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="profile-info">
                      <div className="profile-name-row">
                        <span className="profile-name">{p.name}</span>
                        {p.verified && <span className="profile-verified">{t.preview_badge}</span>}
                      </div>
                      <div className="profile-role">{p.role}</div>
                      <div className="profile-meta">📍 {p.city} · {p.exp} {t.preview_exp}</div>
                      <div className="profile-langs">{p.langs}</div>
                    </div>
                  </div>
                  <div className="profile-skills">{p.skills}</div>
                  <div className="profile-card-bottom">
                    <div className="profile-rating-row">
                      <span className="profile-stars">{'★'.repeat(5)}</span>
                      <span className="profile-rating">{p.stars}</span>
                      <span className="profile-reviews">({p.reviews})</span>
                    </div>
                    <div className="profile-rate">{p.rate} THB/hr</div>
                  </div>
                  <button className="profile-contact-btn" disabled>{t.preview_btn}</button>
                </div>
              ))}
            </div>
            <p className="preview-note">🔒 {t.preview_note}</p>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────── */}
        <section className="section" id="how-it-works">
          <div className="section-inner">
            <div className="section-label">{t.how_label}</div>
            <h2 className="section-title">{t.how_title}</h2>
            <p className="section-sub">{t.how_sub}</p>
            <div className="steps">
              <div className="step">
                <div className="step-num">1</div>
                <h3>{t.step1_h}</h3>
                <p>{t.step1_p}</p>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <h3>{t.step2_h}</h3>
                <p>{t.step2_p}</p>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <h3>{t.step3_h}</h3>
                <p>{t.step3_p}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VIDEOS ────────────────────────────── */}
        <section className="section">
          <div className="section-inner">
            <div className="section-label">{t.vid_label}</div>
            <h2 className="section-title">{t.vid_title}</h2>
            <p className="section-sub">{t.vid_sub}</p>
            <div className="video-grid">
              {[
                { title: t.vid1_title, sub: t.vid1_sub, badge: t.vid1_badge },
                { title: t.vid2_title, sub: t.vid2_sub, badge: t.vid2_badge },
                { title: t.vid3_title, sub: t.vid3_sub, badge: t.vid3_badge, soon: true },
              ].map((v, i) => (
                <div className={`video-card${v.soon ? ' video-card-soon' : ''}`} key={i}>
                  <div className="video-thumb">
                    {v.soon
                      ? <div className="video-soon-icon">🎬</div>
                      : <div className="video-play-btn">▶</div>
                    }
                  </div>
                  <div className="video-info">
                    <span className="video-badge">{v.badge}</span>
                    <h3>{v.title}</h3>
                    <p>{v.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ──────────────────────────── */}
        <section className="section why-section">
          <div className="section-inner">
            <div className="section-label">{t.ben_label}</div>
            <h2 className="section-title">{t.ben_title}</h2>
            <p className="section-sub">{t.ben_sub}</p>
            <div className="why-grid-full">

              {/* Card 1 — Free */}
              <div className="why-card-full">
                <div className="why-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div><h3>{t.ben1_h}</h3><p>{t.ben1_p}</p></div>
              </div>

              {/* Card 2 — Serious employers */}
              <div className="why-card-full">
                <div className="why-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                    <polyline points="16 11 18 13 22 9"/>
                  </svg>
                </div>
                <div><h3>{t.ben2_h}</h3><p>{t.ben2_p}</p></div>
              </div>

              {/* Card 3 — Thai & International */}
              <div className="why-card-full">
                <div className="why-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <div><h3>{t.ben3_h}</h3><p>{t.ben3_p}</p></div>
              </div>

              {/* Card 4 — Build reputation */}
              <div className="why-card-full">
                <div className="why-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div><h3>{t.ben4_h}</h3><p>{t.ben4_p}</p></div>
              </div>

              {/* Card 5 — Work where you live */}
              <div className="why-card-full">
                <div className="why-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div><h3>{t.ben5_h}</h3><p>{t.ben5_p}</p></div>
              </div>

              {/* Card 6 — You're in control */}
              <div className="why-card-full">
                <div className="why-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div><h3>{t.ben6_h}</h3><p>{t.ben6_p}</p></div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CATEGORIES ────────────────────────── */}
        <section className="section">
          <div className="section-inner">
            <div className="section-label">{t.cat_label}</div>
            <h2 className="section-title">{t.cat_title}</h2>
            <p className="section-sub">{t.cat_sub}</p>
            <div className="categories">
              {[t.cat1, t.cat2, t.cat3, t.cat4, t.cat5, t.cat6, t.cat7].map((c, i) => (
                <div className="category-pill active" key={i}>{c}</div>
              ))}
            </div>

          </div>
        </section>

        {/* ── CTA ───────────────────────────────── */}
        <section className="provider-cta" id="register">
          <div className="section-inner">
            <div className="section-label">{t.cta_label}</div>
            <h2 className="section-title">{t.cta_title}</h2>
            <p className="section-sub">{t.cta_sub}</p>
            <div className="cta-box">
              <div className="cta-text">
                <p>{t.cta_body}</p>
                <Link className="btn-gold" href="/register">{t.cta_btn}</Link>
                <p className="cta-note">{t.cta_note}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────── */}
        <footer>
          <p>© 2026 ThaiHelper · <a href="mailto:jelenahalar91@gmail.com">jelenahalar91@gmail.com</a></p>
          <p style={{ marginTop: '6px' }}>
            <Link href="/privacy">{t.footer_privacy}</Link> · <Link href="/terms">{t.footer_terms}</Link>
          </p>
        </footer>

        {/* ── COOKIE BANNER ─────────────────────── */}
        <CookieBanner lang={lang} />

      </div>
    </>
  );
}

function CookieBanner({ lang }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accepted = localStorage.getItem('th_cookie_ok');
      if (!accepted) setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('th_cookie_ok', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <span>
        {lang === 'th'
          ? <>เราใช้ local storage เพื่อบันทึกการตั้งค่าภาษาเท่านั้น ไม่มีการติดตาม อ่าน <Link href="/privacy" style={{ color: '#5eead4' }}>นโยบายความเป็นส่วนตัว</Link></>
          : <>We only use local storage to remember your language preference — no tracking. Read our <Link href="/privacy" style={{ color: '#5eead4' }}>Privacy Policy</Link>.</>
        }
      </span>
      <button className="cookie-banner-btn" onClick={accept}>
        {lang === 'th' ? 'รับทราบ' : 'Got it'}
      </button>
    </div>
  );
}
