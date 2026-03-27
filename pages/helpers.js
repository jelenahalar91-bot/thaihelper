import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const T = {
  en: {
    nav_cta:        'Register Free \u2192',
    nav_helpers:    'Browse Helpers',
    nav_home:       'Home',
    hero_badge:     '\ud83c\uddf9\ud83c\udded Find Help in Thailand',
    hero_h1:        'Browse Trusted Helpers',
    hero_sub:       'Find nannies, housekeepers, chefs, drivers, and more \u2014 directly, without agencies.',
    filter_city:    'All Cities',
    filter_cat:     'All Categories',
    filter_area_ph: 'Search by area...',
    filter_btn:     'Search',
    filter_reset:   'Reset',
    results:        'helpers found',
    no_results:     'No helpers found matching your filters.',
    no_results_sub: 'Try adjusting your filters or check back soon \u2014 new helpers register every day.',
    card_exp:       'yrs experience',
    card_contact:   'Contact via WhatsApp',
    card_langs:     'Languages:',
    card_area:      'Area:',
    demo_banner:    'These are sample profiles. Real helper profiles will appear here once providers register.',
    cta_title:      'Are you a helper looking for work?',
    cta_sub:        'Create your free profile and let families find you.',
    cta_btn:        'Register Now \u2014 Free \u2192',
    footer_privacy: 'Privacy Policy',
    footer_terms:   'Terms of Service',
    cat_nanny:      '\ud83d\udc76 Nanny & Babysitter',
    cat_housekeeper:'\ud83c\udfe0 Housekeeper & Cleaner',
    cat_chef:       '\ud83d\udc68\u200d\ud83c\udf73 Private Chef & Cook',
    cat_driver:     '\ud83d\ude97 Driver & Chauffeur',
    cat_gardener:   '\ud83c\udf3f Gardener & Pool Care',
    cat_elder:      '\ud83c\udfe5 Elder Care & Caregiver',
    cat_tutor:      '\ud83d\udcda Tutor & Teacher',
  },
  th: {
    nav_cta:        '\u0e25\u0e07\u0e17\u0e30\u0e40\u0e1a\u0e35\u0e22\u0e19\u0e1f\u0e23\u0e35 \u2192',
    nav_helpers:    '\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e1c\u0e39\u0e49\u0e0a\u0e48\u0e27\u0e22',
    nav_home:       '\u0e2b\u0e19\u0e49\u0e32\u0e41\u0e23\u0e01',
    hero_badge:     '\ud83c\uddf9\ud83c\udded \u0e2b\u0e32\u0e1c\u0e39\u0e49\u0e0a\u0e48\u0e27\u0e22\u0e43\u0e19\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e44\u0e17\u0e22',
    hero_h1:        '\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e1c\u0e39\u0e49\u0e0a\u0e48\u0e27\u0e22\u0e17\u0e35\u0e48\u0e44\u0e27\u0e49\u0e43\u0e08\u0e44\u0e14\u0e49',
    hero_sub:       '\u0e2b\u0e32\u0e1e\u0e35\u0e48\u0e40\u0e25\u0e35\u0e49\u0e22\u0e07 \u0e41\u0e21\u0e48\u0e1a\u0e49\u0e32\u0e19 \u0e1e\u0e48\u0e2d\u0e04\u0e23\u0e31\u0e27 \u0e04\u0e19\u0e02\u0e31\u0e1a\u0e23\u0e16 \u0e41\u0e25\u0e30\u0e2d\u0e37\u0e48\u0e19\u0e46 \u2014 \u0e42\u0e14\u0e22\u0e15\u0e23\u0e07 \u0e44\u0e21\u0e48\u0e1c\u0e48\u0e32\u0e19\u0e40\u0e2d\u0e40\u0e08\u0e19\u0e0b\u0e35\u0e48',
    filter_city:    '\u0e17\u0e38\u0e01\u0e08\u0e31\u0e07\u0e2b\u0e27\u0e31\u0e14',
    filter_cat:     '\u0e17\u0e38\u0e01\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17',
    filter_area_ph: '\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e15\u0e32\u0e21\u0e22\u0e48\u0e32\u0e19...',
    filter_btn:     '\u0e04\u0e49\u0e19\u0e2b\u0e32',
    filter_reset:   '\u0e23\u0e35\u0e40\u0e0b\u0e47\u0e15',
    results:        '\u0e1c\u0e39\u0e49\u0e0a\u0e48\u0e27\u0e22\u0e17\u0e35\u0e48\u0e1e\u0e1a',
    no_results:     '\u0e44\u0e21\u0e48\u0e1e\u0e1a\u0e1c\u0e39\u0e49\u0e0a\u0e48\u0e27\u0e22\u0e15\u0e32\u0e21\u0e40\u0e07\u0e37\u0e48\u0e2d\u0e19\u0e44\u0e02\u0e17\u0e35\u0e48\u0e40\u0e25\u0e37\u0e2d\u0e01',
    no_results_sub: '\u0e25\u0e2d\u0e07\u0e1b\u0e23\u0e31\u0e1a\u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07 \u0e2b\u0e23\u0e37\u0e2d\u0e01\u0e25\u0e31\u0e1a\u0e21\u0e32\u0e14\u0e39\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 \u2014 \u0e21\u0e35\u0e1c\u0e39\u0e49\u0e0a\u0e48\u0e27\u0e22\u0e43\u0e2b\u0e21\u0e48\u0e25\u0e07\u0e17\u0e30\u0e40\u0e1a\u0e35\u0e22\u0e19\u0e17\u0e38\u0e01\u0e27\u0e31\u0e19',
    card_exp:       '\u0e1b\u0e35\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e01\u0e32\u0e23\u0e13\u0e4c',
    card_contact:   '\u0e15\u0e34\u0e14\u0e15\u0e48\u0e2d\u0e17\u0e32\u0e07 WhatsApp',
    card_langs:     '\u0e20\u0e32\u0e29\u0e32:',
    card_area:      '\u0e22\u0e48\u0e32\u0e19:',
    demo_banner:    '\u0e40\u0e2b\u0e25\u0e48\u0e32\u0e19\u0e35\u0e49\u0e04\u0e37\u0e2d\u0e42\u0e1b\u0e23\u0e44\u0e1f\u0e25\u0e4c\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07 \u0e42\u0e1b\u0e23\u0e44\u0e1f\u0e25\u0e4c\u0e08\u0e23\u0e34\u0e07\u0e08\u0e30\u0e1b\u0e23\u0e32\u0e01\u0e0f\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e1c\u0e39\u0e49\u0e43\u0e2b\u0e49\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23\u0e25\u0e07\u0e17\u0e30\u0e40\u0e1a\u0e35\u0e22\u0e19',
    cta_title:      '\u0e04\u0e38\u0e13\u0e40\u0e1b\u0e47\u0e19\u0e1c\u0e39\u0e49\u0e0a\u0e48\u0e27\u0e22\u0e17\u0e35\u0e48\u0e01\u0e33\u0e25\u0e31\u0e07\u0e2b\u0e32\u0e07\u0e32\u0e19\u0e2d\u0e22\u0e39\u0e48\u0e2b\u0e23\u0e37\u0e2d\u0e40\u0e1b\u0e25\u0e48\u0e32?',
    cta_sub:        '\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e42\u0e1b\u0e23\u0e44\u0e1f\u0e25\u0e4c\u0e1f\u0e23\u0e35\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e43\u0e2b\u0e49\u0e04\u0e23\u0e2d\u0e1a\u0e04\u0e23\u0e31\u0e27\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e04\u0e38\u0e13',
    cta_btn:        '\u0e25\u0e07\u0e17\u0e30\u0e40\u0e1a\u0e35\u0e22\u0e19\u0e1f\u0e23\u0e35 \u2192',
    footer_privacy: '\u0e19\u0e42\u0e22\u0e1a\u0e32\u0e22\u0e04\u0e27\u0e32\u0e21\u0e40\u0e1b\u0e47\u0e19\u0e2a\u0e48\u0e27\u0e19\u0e15\u0e31\u0e27',
    footer_terms:   '\u0e02\u0e49\u0e2d\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e01\u0e32\u0e23\u0e43\u0e0a\u0e49\u0e07\u0e32\u0e19',
    cat_nanny:      '\ud83d\udc76 \u0e1e\u0e35\u0e48\u0e40\u0e25\u0e35\u0e49\u0e22\u0e07\u0e40\u0e14\u0e47\u0e01',
    cat_housekeeper:'\ud83c\udfe0 \u0e41\u0e21\u0e48\u0e1a\u0e49\u0e32\u0e19\u0e41\u0e25\u0e30\u0e1e\u0e19\u0e31\u0e01\u0e07\u0e32\u0e19\u0e17\u0e33\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e30\u0e2d\u0e32\u0e14',
    cat_chef:       '\ud83d\udc68\u200d\ud83c\udf73 \u0e1e\u0e48\u0e2d\u0e04\u0e23\u0e31\u0e27 / \u0e41\u0e21\u0e48\u0e04\u0e23\u0e31\u0e27\u0e2a\u0e48\u0e27\u0e19\u0e15\u0e31\u0e27',
    cat_driver:     '\ud83d\ude97 \u0e04\u0e19\u0e02\u0e31\u0e1a\u0e23\u0e16',
    cat_gardener:   '\ud83c\udf3f \u0e04\u0e19\u0e2a\u0e27\u0e19\u0e41\u0e25\u0e30\u0e14\u0e39\u0e41\u0e25\u0e2a\u0e23\u0e30\u0e27\u0e48\u0e32\u0e22\u0e19\u0e49\u0e33',
    cat_elder:      '\ud83c\udfe5 \u0e1c\u0e39\u0e49\u0e14\u0e39\u0e41\u0e25\u0e1c\u0e39\u0e49\u0e2a\u0e39\u0e07\u0e2d\u0e32\u0e22\u0e38',
    cat_tutor:      '\ud83d\udcda \u0e15\u0e34\u0e27\u0e40\u0e15\u0e2d\u0e23\u0e4c / \u0e04\u0e23\u0e39\u0e2a\u0e2d\u0e19\u0e1e\u0e34\u0e40\u0e28\u0e29',
  }
};

const CITIES = ['Phuket', 'Bangkok', 'Chiang Mai', 'Pattaya', 'Koh Samui', 'Hua Hin'];

const CATEGORIES = [
  'Nanny & Babysitter',
  'Housekeeper & Cleaner',
  'Private Chef & Cook',
  'Driver & Chauffeur',
  'Gardener & Pool Care',
  'Elder Care & Caregiver',
  'Tutor & Teacher',
];

const CAT_EMOJI = {
  'Nanny & Babysitter': '\ud83d\udc76',
  'Housekeeper & Cleaner': '\ud83c\udfe0',
  'Private Chef & Cook': '\ud83d\udc68\u200d\ud83c\udf73',
  'Driver & Chauffeur': '\ud83d\ude97',
  'Gardener & Pool Care': '\ud83c\udf3f',
  'Elder Care & Caregiver': '\ud83c\udfe5',
  'Tutor & Teacher': '\ud83d\udcda',
};

const DEMO_PHOTOS = [
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
];

export default function Helpers() {
  const [lang, setLangState] = useState('en');
  const [helpers, setHelpers] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterCity, setFilterCity] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterArea, setFilterArea] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('th_lang') || 'en';
    setLangState(saved);
  }, []);

  useEffect(() => { fetchHelpers(); }, []);

  const changeLang = (l) => {
    setLangState(l);
    localStorage.setItem('th_lang', l);
  };

  const fetchHelpers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/helpers');
      const data = await res.json();
      setHelpers(data.helpers || []);
      setIsDemo(data.demo || false);
    } catch (err) {
      console.error('Failed to load helpers:', err);
      setHelpers([]);
    }
    setLoading(false);
  };

  const t = T[lang];

  const filtered = helpers.filter(h => {
    if (filterCity && h.city?.toLowerCase() !== filterCity.toLowerCase()) return false;
    if (filterCat && !h.category?.toLowerCase().includes(filterCat.toLowerCase())) return false;
    if (filterArea && !h.area?.toLowerCase().includes(filterArea.toLowerCase())) return false;
    return true;
  });

  const resetFilters = () => { setFilterCity(''); setFilterCat(''); setFilterArea(''); };

  const getCatDisplay = (cat) => {
    const emoji = Object.entries(CAT_EMOJI).find(([k]) => cat?.toLowerCase().includes(k.toLowerCase().split(' ')[0]));
    return emoji ? emoji[1] + ' ' + cat : cat;
  };

  const getTranslatedCat = (cat) => {
    const key = Object.keys(CAT_EMOJI).find(k => cat?.toLowerCase().includes(k.toLowerCase().split(' ')[0]));
    if (!key) return cat;
    const catKey = 'cat_' + {'Nanny & Babysitter':'nanny','Housekeeper & Cleaner':'housekeeper','Private Chef & Cook':'chef','Driver & Chauffeur':'driver','Gardener & Pool Care':'gardener','Elder Care & Caregiver':'elder','Tutor & Teacher':'tutor'}[key];
    return t[catKey] || getCatDisplay(cat);
  };

  return (
    <>
      <Head>
        <title>{lang === 'th' ? '\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e1c\u0e39\u0e49\u0e0a\u0e48\u0e27\u0e22 \u2014 ThaiHelper' : 'Find Helpers \u2014 ThaiHelper'}</title>
        <meta name="description" content="Browse trusted household helpers in Thailand. Find nannies, housekeepers, chefs, drivers and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={lang === 'th' ? 'lang-th' : ''}>

        <nav>
          <Link className="nav-brand" href="/">Thai<span>Helper</span></Link>
          <div className="nav-right">
            <Link className="nav-link" href="/">{t.nav_home}</Link>
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => changeLang('en')}>\ud83c\uddec\ud83c\udde7 EN</button>
              <button className={`lang-btn ${lang === 'th' ? 'active' : ''}`} onClick={() => changeLang('th')}>\ud83c\uddf9\ud83c\udded TH</button>
            </div>
            <Link className="nav-cta" href="/register">{t.nav_cta}</Link>
          </div>
        </nav>

        <section className="helpers-hero">
          <div className="helpers-hero-inner">
            <div className="hero-badge">{t.hero_badge}</div>
            <h1>{t.hero_h1}</h1>
            <p>{t.hero_sub}</p>
          </div>
        </section>

        <section className="helpers-filters">
          <div className="helpers-filters-inner">
            <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="filter-select">
              <option value="">{t.filter_city}</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="filter-select">
              <option value="">{t.filter_cat}</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{getCatDisplay(c)}</option>)}
            </select>
            <input type="text" value={filterArea} onChange={e => setFilterArea(e.target.value)} placeholder={t.filter_area_ph} className="filter-input" />
            {(filterCity || filterCat || filterArea) && (
              <button className="filter-reset-btn" onClick={resetFilters}>{t.filter_reset}</button>
            )}
          </div>
        </section>

        {isDemo && (
          <div className="demo-banner">
            <span>\u2139\ufe0f {t.demo_banner}</span>
          </div>
        )}

        <section className="helpers-grid-section">
          <div className="helpers-grid-inner">
            <div className="helpers-results-count">
              <strong>{filtered.length}</strong> {t.results}
            </div>

            {loading ? (
              <div className="helpers-loading"><div className="loading-spinner"></div></div>
            ) : filtered.length === 0 ? (
              <div className="helpers-empty">
                <h3>{t.no_results}</h3>
                <p>{t.no_results_sub}</p>
                <button className="btn-outline" onClick={resetFilters}>{t.filter_reset}</button>
              </div>
            ) : (
              <div className="helpers-grid">
                {filtered.map((h, i) => (
                  <div className="helper-card" key={i}>
                    <div className="helper-card-header">
                      <div className="helper-avatar">
                        <img src={DEMO_PHOTOS[i % DEMO_PHOTOS.length]} alt={h.name} />
                      </div>
                      <div className="helper-info">
                        <h3 className="helper-name">{h.name}</h3>
                        <div className="helper-category">{getTranslatedCat(h.category)}</div>
                        <div className="helper-location">\ud83d\udccd {h.city}{h.area ? ` \u00b7 ${h.area}` : ''}</div>
                      </div>
                    </div>
                    {h.about && <p className="helper-about">{h.about}</p>}
                    <div className="helper-details">
                      {h.experience && <span className="helper-tag">\u23f1 {h.experience} {t.card_exp}</span>}
                      {h.languages && <span className="helper-tag">\ud83d\udde3 {h.languages}</span>}
                    </div>
                    <div className="helper-card-footer">
                      {h.phone ? (
                        <a className="helper-contact-btn" href={`https://wa.me/${h.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">\ud83d\udcac {t.card_contact}</a>
                      ) : (
                        <button className="helper-contact-btn disabled" disabled>\ud83d\udcac {t.card_contact}</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="helpers-cta">
          <div className="section-inner">
            <h2>{t.cta_title}</h2>
            <p>{t.cta_sub}</p>
            <Link className="btn-gold" href="/register">{t.cta_btn}</Link>
          </div>
        </section>

        <footer>
          <p>\u00a9 2026 ThaiHelper \u00b7 <a href="mailto:jelenahalar91@gmail.com">jelenahalar91@gmail.com</a></p>
          <p style={{ marginTop: '6px' }}>
            <Link href="/privacy">{t.footer_privacy}</Link> \u00b7 <Link href="/terms">{t.footer_terms}</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
