import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import TextRotate from '../components/TextRotate';

// âââ TRANSLATIONS ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const T = {
  en: {
    nav_cta:       'Register Free â',
    nav_helpers:   'Browse Helpers',
    hero_badge:    'ð¹ð­ Now Launching in Thailand',
    hero_h1:       'Stop Paying Agencies. Get Hired Directly.',
    hero_h1_em:    'Employers pay to contact you. You join free â forever.',
    hero_p:        'ThaiHelper is Thailand\'s direct job platform for nannies, tutors, chefs, drivers, caregivers and more. Post your profile in 3 minutes â verified employers find you, contact you, and hire you. No middleman. No commission cut. You keep 100% of what you earn.',
    hero_cta1:     'Create My Free Profile â',
    hero_cta2:     'See How It Works',
    stat1:         '100% Free for providers',
    stat2:         'Cities across Thailand',
    stat3_bold:    'Direct',
    stat3:         'Contact â no middleman',
    trust1:        'No agency fees â ever',
    trust2:        'Your data is safe',
    trust3:        'Works on any phone',
    trust4:        'Employers come to you',
    preview_label: 'Your Profile',
    preview_title: 'This is how families see you',
    preview_sub:   'A verified, professional profile â visible to families searching in your city.',
    preview_badge: 'â Verified',
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
    step3_p:       'Chat directly, agree on terms, and start your job â no middleman, no commission cut.',
    ben_label:     'Why ThaiHelper',
    ben_title:     'Built for household professionals',
    ben_sub:       'We created ThaiHelper because the current system is broken. Agencies take too much. Facebook is chaos. You deserve better.',
    ben1_h:        'Completely Free for You',
    ben1_p:        'Listing your profile on ThaiHelper is free â forever. Employers pay for access, not you.',
    ben2_h:        'Reach Serious Employers',
    ben2_p:        'Only verified, paying families can contact you. No time-wasters, no spam.',
    ben3_h:        'Thai & International Families',
    ben3_p:        'Work with Thai families and expats from Europe, the US, Russia, and beyond â all living across Thailand.',
    ben4_h:        'Build Your Reputation',
    ben4_p:        'Collect verified reviews after each job. A strong profile means better opportunities.',
    ben5_h:        'Work Where You Live',
    ben5_p:        'Bangkok, Chiang Mai, Phuket, Pattaya, Koh Samui â find jobs in your city.',
    ben6_h:        "You're in Control",
    ben6_p:        'Set your own rates, availability, and preferences. Accept only the jobs you want.',
    cat_label:     'Service Categories',
    cat_title:     'Who can register?',
    cat_sub:       'Household staff, tutors, teachers, and more â all welcome.',
    cat1:          'ð¶ Nanny & Babysitter',
    cat2:          'ð  Housekeeper & Cleaner',
    cat3:          'ð¨âð³ Private Chef & Cook',
    cat4:          'ð Driver & Chauffeur',
    cat5:          'ð¿ Gardener & Pool Care',
    cat6:          'ð¥ Elder Care & Caregiver',
    cat7:          'ð Tutor & Teacher',
    cta_label:     'Join ThaiHelper',
    cta_title:     'Ready to find your next job?',
    cta_sub:       'Be among the first providers on the platform. Early profiles get priority visibility at launch.',
    cta_body:      "Takes about 3 minutes. Add your photo, experience, and contact details â and we'll make sure the right families find you.",
    cta_btn:       'Create My Free Profile â',
    cta_note:      'No credit card. No agency fee. No catch.',
    vid_label:     'See It In Action',
    vid_title:     'Real people. Real jobs.',
    vid_sub:       'Watch how ThaiHelper works â from registration to your first job.',
    vid1_title:    'Welcome to ThaiHelper',
    vid1_sub:      'A quick intro from our founder',
    vid1_badge:    'ð¬ð§ English',
    vid2_title:    'à¸§à¸´à¸à¸µà¸ªà¸¡à¸±à¸à¸£à¸à¸²à¸ (How to Register)',
    vid2_sub:      'Step-by-step guide for providers',
    vid2_badge:    'ðµð­ Filipino Â· ð¹ð­ Thai',
    vid3_title:    'Provider Stories',
    vid3_sub:      'Coming soon â hear from our community',
    vid3_badge:    'ð¬ Coming Soon',
    footer_privacy:'Privacy Policy',
    footer_terms:  'Terms of Service',
  },
  th: {
    nav_cta:       'à¸¥à¸à¸à¸°à¹à¸à¸µà¸¢à¸à¸à¸£à¸µ â',
    nav_helpers:   'à¸à¹à¸à¸«à¸²à¸à¸¹à¹à¸à¹à¸§à¸¢',
    hero_badge:    'ð¹ð­ à¹à¸à¸´à¸à¸à¸±à¸§à¹à¸à¸à¸£à¸°à¹à¸à¸¨à¹à¸à¸¢à¹à¸¥à¹à¸§',
    hero_h1:       'à¸«à¸¢à¸¸à¸à¸à¹à¸²à¸¢à¸à¹à¸²à¹à¸­à¹à¸à¸à¸à¸µà¹ à¸«à¸²à¸à¸²à¸à¹à¸à¸¢à¸à¸£à¸',
    hero_h1_em:    'à¸à¸²à¸¢à¸à¹à¸²à¸à¸à¹à¸²à¸¢à¹à¸à¸·à¹à¸­à¸à¸´à¸à¸à¹à¸­à¸à¸¸à¸ à¸à¸¸à¸à¸ªà¸¡à¸±à¸à¸£à¸à¸£à¸µà¸à¸¥à¸­à¸à¹à¸',
    hero_p:        'ThaiHelper à¸à¸·à¸­à¹à¸à¸¥à¸à¸à¸­à¸£à¹à¸¡à¸«à¸²à¸à¸²à¸à¹à¸à¸¢à¸à¸£à¸à¹à¸à¸à¸£à¸°à¹à¸à¸¨à¹à¸à¸¢ à¸ªà¸³à¸«à¸£à¸±à¸à¸à¸µà¹à¹à¸¥à¸µà¹à¸¢à¸ à¸à¸´à¸§à¹à¸à¸­à¸£à¹ à¸à¹à¸­à¸à¸£à¸±à¸§ à¸à¸à¸à¸±à¸à¸£à¸ à¸à¸¹à¹à¸à¸¹à¹à¸¥à¸à¸¹à¹à¸ªà¸¹à¸à¸­à¸²à¸¢à¸¸ à¹à¸¥à¸°à¸­à¸µà¸à¸¡à¸²à¸à¸¡à¸²à¸¢ à¸ªà¸£à¹à¸²à¸à¹à¸à¸£à¹à¸à¸¥à¹à¹à¸ 3 à¸à¸²à¸à¸µ â à¸à¸²à¸¢à¸à¹à¸²à¸à¸à¸µà¹à¸à¹à¸²à¸à¸à¸²à¸£à¸¢à¸·à¸à¸¢à¸±à¸à¸à¸°à¸à¹à¸à¸«à¸²à¹à¸¥à¸°à¸à¸´à¸à¸à¹à¸­à¸à¸¸à¸à¹à¸à¸¢à¸à¸£à¸ à¹à¸¡à¹à¸¡à¸µà¸à¸à¸à¸¥à¸²à¸ à¹à¸¡à¹à¸¡à¸µà¸à¹à¸²à¸à¸­à¸¡à¸¡à¸´à¸à¸à¸±à¹à¸ à¸à¸¸à¸à¹à¸à¹à¸à¸£à¸²à¸¢à¹à¸à¹ 100%',
    hero_cta1:     'à¸ªà¸£à¹à¸²à¸à¹à¸à¸£à¹à¸à¸¥à¹à¸à¸£à¸µà¸à¸­à¸à¸à¸±à¸ â',
    hero_cta2:     'à¸à¸¹à¸§à¸´à¸à¸µà¸à¸²à¸£à¹à¸à¹à¸à¸²à¸',
    stat1:         'à¸à¸£à¸µ 100% à¸ªà¸³à¸«à¸£à¸±à¸à¸à¸¹à¹à¹à¸«à¹à¸à¸£à¸´à¸à¸²à¸£',
    stat2:         'à¹à¸¡à¸·à¸­à¸à¸à¸±à¹à¸§à¸à¸£à¸°à¹à¸à¸¨à¹à¸à¸¢',
    stat3_bold:    'à¹à¸à¸¢à¸à¸£à¸',
    stat3:         'à¸à¸´à¸à¸à¹à¸­ à¹à¸¡à¹à¸¡à¸µà¸à¸à¸à¸¥à¸²à¸',
    trust1:        'à¹à¸¡à¹à¸¡à¸µà¸à¹à¸²à¹à¸­à¹à¸à¸à¸à¸µà¹ à¸à¸¥à¸­à¸à¹à¸',
    trust2:        'à¸à¹à¸­à¸¡à¸¹à¸¥à¸à¸­à¸à¸à¸¸à¸à¸à¸¥à¸­à¸à¸ à¸±à¸¢',
    trust3:        'à¹à¸à¹à¸à¸²à¸à¹à¸à¹à¸à¸¸à¸à¸¡à¸·à¸­à¸à¸·à¸­',
    trust4:        'à¸à¸²à¸¢à¸à¹à¸²à¸à¸¡à¸²à¸«à¸²à¸à¸¸à¸à¹à¸­à¸',
    preview_label: 'à¹à¸à¸£à¹à¸à¸¥à¹à¸à¸­à¸à¸à¸¸à¸',
    preview_title: 'à¸à¸µà¹à¸à¸·à¸­à¸ªà¸´à¹à¸à¸à¸µà¹à¸à¸£à¸­à¸à¸à¸£à¸±à¸§à¸à¸°à¹à¸«à¹à¸',
    preview_sub:   'à¹à¸à¸£à¹à¸à¸¥à¹à¸à¸µà¹à¸à¹à¸²à¸à¸à¸²à¸£à¸¢à¸·à¸à¸¢à¸±à¸ â à¸à¸£à¸²à¸à¸à¸à¹à¸­à¸à¸£à¸­à¸à¸à¸£à¸±à¸§à¸à¸µà¹à¸à¹à¸à¸«à¸²à¹à¸à¹à¸¡à¸·à¸­à¸à¸à¸­à¸à¸à¸¸à¸',
    preview_badge: 'â à¸¢à¸·à¸à¸¢à¸±à¸à¹à¸¥à¹à¸§',
    preview_exp:   'à¸à¸µà¸à¸£à¸°à¸ªà¸à¸à¸²à¸£à¸à¹',
    preview_btn:   'à¸à¸´à¸à¸à¹à¸­',
    preview_note:  'à¹à¸à¸à¸²à¸°à¸à¸£à¸­à¸à¸à¸£à¸±à¸§à¸à¸µà¹à¸¢à¸·à¸à¸¢à¸±à¸à¸à¸±à¸§à¸à¸à¹à¸¥à¸°à¸à¸³à¸£à¸°à¹à¸à¸´à¸à¹à¸¥à¹à¸§à¹à¸à¹à¸²à¸à¸±à¹à¸à¸à¸µà¹à¸à¸´à¸à¸à¹à¸­à¸à¸¸à¸à¹à¸à¹',
    how_label:     'à¸§à¸´à¸à¸µà¸à¸²à¸£à¸à¸³à¸à¸²à¸',
    how_title:     '3 à¸à¸±à¹à¸à¸à¸­à¸à¹à¸à¸à¸²à¸£à¸«à¸²à¸à¸²à¸',
    how_sub:       'à¹à¸¡à¹à¸à¹à¸­à¸à¸à¹à¸²à¸à¹à¸­à¹à¸à¸à¸à¸µà¹ à¹à¸¡à¹à¸à¹à¸­à¸à¸£à¸­à¸à¸²à¸ à¹à¸à¹à¸¡à¸µà¹à¸à¸£à¹à¸à¸¥à¹à¹à¸¥à¸°à¸à¸²à¸¢à¸à¹à¸²à¸à¸à¸°à¸à¸´à¸à¸à¹à¸­à¸¡à¸²à¹à¸­à¸',
    step1_h:       'à¸ªà¸¡à¸±à¸à¸£à¸à¸£à¸µ',
    step1_p:       'à¸ªà¸£à¹à¸²à¸à¹à¸à¸£à¹à¸à¸¥à¹à¹à¸à¹à¸¡à¹à¸à¸µà¹à¸à¸²à¸à¸µ à¹à¸ªà¹à¸à¸£à¸°à¸ªà¸à¸à¸²à¸£à¸à¹ à¸à¸±à¸à¸©à¸° à¸à¸²à¸£à¸²à¸à¹à¸§à¸¥à¸² à¹à¸¥à¸°à¸£à¸¹à¸à¸ à¸²à¸',
    step2_h:       'à¸à¸¹à¸à¸à¹à¸à¸à¸',
    step2_p:       'à¸à¸£à¸­à¸à¸à¸£à¸±à¸§à¸à¸µà¹à¸à¸³à¸¥à¸±à¸à¸«à¸²à¸à¸¹à¹à¸à¹à¸§à¸¢à¸à¸²à¸à¸à¹à¸²à¸à¹à¸à¹à¸¡à¸·à¸­à¸à¸à¸­à¸à¸à¸¸à¸à¸à¸°à¸à¸à¹à¸à¸£à¹à¸à¸¥à¹à¹à¸¥à¸°à¸à¸´à¸à¸à¹à¸­à¹à¸à¸¢à¸à¸£à¸',
    step3_h:       'à¹à¸£à¸´à¹à¸¡à¸à¸³à¸à¸²à¸',
    step3_p:       'à¸à¸¸à¸¢à¸à¸±à¸à¹à¸à¸¢à¸à¸£à¸ à¸à¸à¸¥à¸à¹à¸à¸·à¹à¸­à¸à¹à¸ à¹à¸¥à¹à¸§à¹à¸£à¸´à¹à¸¡à¸à¸²à¸à¹à¸à¹à¹à¸¥à¸¢ à¹à¸¡à¹à¸¡à¸µà¸à¸à¸à¸¥à¸²à¸ à¹à¸¡à¹à¸¡à¸µà¸à¹à¸²à¸à¸­à¸¡à¸¡à¸´à¸à¸à¸±à¹à¸',
    ben_label:     'à¸à¸³à¹à¸¡à¸à¹à¸­à¸ ThaiHelper',
    ben_title:     'à¸ªà¸£à¹à¸²à¸à¸¡à¸²à¹à¸à¸·à¹à¸­à¸à¸¹à¹à¹à¸«à¹à¸à¸£à¸´à¸à¸²à¸£à¹à¸à¸à¹à¸²à¸à¹à¸à¸¢à¹à¸à¸à¸²à¸°',
    ben_sub:       'à¹à¸£à¸²à¸ªà¸£à¹à¸²à¸ ThaiHelper à¹à¸à¸£à¸²à¸°à¸£à¸°à¸à¸à¹à¸à¸´à¸¡à¸¡à¸µà¸à¸±à¸à¸«à¸² à¹à¸­à¹à¸à¸à¸à¸µà¹à¸à¸´à¸à¸à¹à¸²à¹à¸à¹à¸à¹à¸²à¸¢à¸ªà¸¹à¸à¹à¸à¸´à¸à¹à¸ Facebook à¹à¸¡à¹à¸¡à¸µà¸£à¸°à¸à¸ à¸à¸¸à¸à¸ªà¸¡à¸à¸§à¸£à¹à¸à¹à¸£à¸±à¸à¸ªà¸´à¹à¸à¸à¸µà¹à¸à¸µà¸à¸§à¹à¸²',
    ben1_h:        'à¸à¸£à¸µà¸ªà¸³à¸«à¸£à¸±à¸à¸à¸¸à¸à¸à¸¥à¸­à¸à¹à¸',
    ben1_p:        'à¸¥à¸à¹à¸à¸£à¹à¸à¸¥à¹à¹à¸ ThaiHelper à¸à¸£à¸µà¸à¸¥à¸­à¸à¹à¸ à¸à¸²à¸¢à¸à¹à¸²à¸à¹à¸à¹à¸à¸à¸à¸à¹à¸²à¸¢ à¹à¸¡à¹à¹à¸à¹à¸à¸¸à¸',
    ben2_h:        'à¹à¸à¹à¸²à¸à¸¶à¸à¸à¸²à¸¢à¸à¹à¸²à¸à¸à¸µà¹à¸à¸£à¸´à¸à¸à¸±à¸',
    ben2_p:        'à¹à¸à¸à¸²à¸°à¸à¸£à¸­à¸à¸à¸£à¸±à¸§à¸à¸µà¹à¸¢à¸·à¸à¸¢à¸±à¸à¸à¸±à¸§à¸à¸à¹à¸¥à¸°à¸à¸³à¸£à¸°à¹à¸à¸´à¸à¹à¸¥à¹à¸§à¹à¸à¹à¸²à¸à¸±à¹à¸à¸à¸µà¹à¸à¸´à¸à¸à¹à¸­à¸à¸¸à¸à¹à¸à¹ à¹à¸¡à¹à¸¡à¸µà¸à¸à¹à¸¡à¹à¸à¸£à¸´à¸à¸à¸±à¸',
    ben3_h:        'à¸à¸£à¸­à¸à¸à¸£à¸±à¸§à¹à¸à¸¢à¹à¸¥à¸°à¸à¹à¸²à¸à¸à¸²à¸à¸´',
    ben3_p:        'à¸à¸³à¸à¸²à¸à¸à¸±à¸à¸à¸£à¸­à¸à¸à¸£à¸±à¸§à¹à¸à¸¢à¹à¸¥à¸°à¸à¸²à¸§à¸à¹à¸²à¸à¸à¸²à¸à¸´à¸à¸²à¸à¸¢à¸¸à¹à¸£à¸ à¸­à¹à¸¡à¸£à¸´à¸à¸² à¸£à¸±à¸ªà¹à¸à¸µà¸¢ à¹à¸¥à¸°à¸à¸£à¸°à¹à¸à¸¨à¸­à¸·à¹à¸à¹ à¸à¸µà¹à¸­à¸²à¸¨à¸±à¸¢à¸­à¸¢à¸¹à¹à¸à¸±à¹à¸§à¸à¸£à¸°à¹à¸à¸¨à¹à¸à¸¢',
    ben4_h:        'à¸ªà¸£à¹à¸²à¸à¸à¸·à¹à¸­à¹à¸ªà¸µà¸¢à¸',
    ben4_p:        'à¸ªà¸°à¸ªà¸¡à¸£à¸µà¸§à¸´à¸§à¸à¸£à¸´à¸à¸«à¸¥à¸±à¸à¸à¸³à¸à¸²à¸ à¹à¸à¸£à¹à¸à¸¥à¹à¸à¸µà¹à¸à¸µà¸«à¸¡à¸²à¸¢à¸à¸¶à¸à¹à¸­à¸à¸²à¸ªà¸à¸µà¹à¸à¸µà¸à¸§à¹à¸²',
    ben5_h:        'à¸à¸³à¸à¸²à¸à¹à¸à¸¥à¹à¸à¹à¸²à¸',
    ben5_p:        'à¸à¸£à¸¸à¸à¹à¸à¸à¸¯ à¹à¸à¸µà¸¢à¸à¹à¸«à¸¡à¹ à¸ à¸¹à¹à¸à¹à¸ à¸à¸±à¸à¸¢à¸² à¹à¸à¸²à¸°à¸ªà¸¡à¸¸à¸¢ à¸«à¸²à¹à¸à¹à¸à¸¸à¸à¸à¸µà¹',
    ben6_h:        'à¸à¸¸à¸à¸à¸§à¸à¸à¸¸à¸¡à¸à¸¸à¸à¸­à¸¢à¹à¸²à¸',
    ben6_p:        'à¸à¸³à¸«à¸à¸à¸£à¸²à¸à¸² à¹à¸§à¸¥à¸² à¹à¸¥à¸°à¹à¸à¸·à¹à¸­à¸à¹à¸à¹à¸­à¸ à¸£à¸±à¸à¹à¸à¸à¸²à¸°à¸à¸²à¸à¸à¸µà¹à¸à¸¸à¸à¸à¹à¸­à¸à¸à¸²à¸£',
    cat_label:     'à¸à¸£à¸°à¹à¸ à¸à¸à¸£à¸´à¸à¸²à¸£',
    cat_title:     'à¹à¸à¸£à¸¥à¸à¸à¸°à¹à¸à¸µà¸¢à¸à¹à¸à¹à¸à¹à¸²à¸?',
    cat_sub:       'à¸à¸à¸±à¸à¸à¸²à¸à¸à¹à¸²à¸ à¸à¸´à¸§à¹à¸à¸­à¸£à¹ à¸à¸£à¸¹à¸ªà¸­à¸à¸à¸´à¹à¸¨à¸© à¹à¸¥à¸°à¸­à¸·à¹à¸à¹ â à¸¢à¸´à¸à¸à¸µà¸à¹à¸­à¸à¸£à¸±à¸à¸à¸¸à¸à¸à¸',
    cat1:          'ð¶ à¸à¸µà¹à¹à¸¥à¸µà¹à¸¢à¸à¹à¸à¹à¸',
    cat2:          'ð  à¹à¸¡à¹à¸à¹à¸²à¸à¹à¸¥à¸°à¸à¸à¸±à¸à¸à¸²à¸à¸à¸³à¸à¸§à¸²à¸¡à¸ªà¸°à¸­à¸²à¸',
    cat3:          'ð¨âð³ à¸à¹à¸­à¸à¸£à¸±à¸§ / à¹à¸¡à¹à¸à¸£à¸±à¸§à¸ªà¹à¸§à¸à¸à¸±à¸§',
    cat4:          'ð à¸à¸à¸à¸±à¸à¸£à¸',
    cat5:          'ð¿ à¸à¸à¸ªà¸§à¸à¹à¸¥à¸°à¸à¸¹à¹à¸¥à¸ªà¸£à¸°à¸§à¹à¸²à¸¢à¸à¹à¸³',
    cat6:          'ð¥ à¸à¸¹à¹à¸à¸¹à¹à¸¥à¸à¸¹à¹à¸ªà¸¹à¸à¸­à¸²à¸¢à¸¸',
    cat7:          'ð à¸à¸´à¸§à¹à¸à¸­à¸£à¹ / à¸à¸£à¸¹à¸ªà¸­à¸à¸à¸´à¹à¸¨à¸©',
    cta_label:     'à¹à¸à¹à¸²à¸£à¹à¸§à¸¡ ThaiHelper',
    cta_title:     'à¸à¸£à¹à¸­à¸¡à¸«à¸²à¸à¸²à¸à¹à¸«à¸¡à¹à¹à¸¥à¹à¸§à¸«à¸£à¸·à¸­à¸¢à¸±à¸?',
    cta_sub:       'à¹à¸à¹à¸à¸«à¸à¸¶à¹à¸à¹à¸à¸à¸¹à¹à¹à¸«à¹à¸à¸£à¸´à¸à¸²à¸£à¸à¸¥à¸¸à¹à¸¡à¹à¸£à¸ à¹à¸à¸£à¹à¸à¸¥à¹à¹à¸£à¸à¹ à¸à¸°à¹à¸à¹à¸£à¸±à¸à¸à¸²à¸£à¹à¸ªà¸à¸à¸à¸¥à¸à¹à¸­à¸à¸à¸­à¸à¹à¸à¸´à¸à¸à¸±à¸§',
    cta_body:      'à¹à¸à¹à¹à¸§à¸¥à¸²à¸à¸£à¸°à¸¡à¸²à¸ 3 à¸à¸²à¸à¸µ à¹à¸ªà¹à¸£à¸¹à¸à¸ à¸²à¸ à¸à¸£à¸°à¸ªà¸à¸à¸²à¸£à¸à¹ à¹à¸¥à¸°à¸à¹à¸­à¸¡à¸¹à¸¥à¸à¸´à¸à¸à¹à¸­ à¹à¸¥à¹à¸§à¹à¸£à¸²à¸à¸°à¸à¸³à¹à¸«à¹à¸à¸£à¸­à¸à¸à¸£à¸±à¸§à¸à¸µà¹à¹à¸à¹à¹à¸à¸­à¸à¸¸à¸',
    cta_btn:       'à¸ªà¸£à¹à¸²à¸à¹à¸à¸£à¹à¸à¸¥à¹à¸à¸£à¸µà¸à¸­à¸à¸à¸±à¸ â',
    cta_note:      'à¹à¸¡à¹à¸à¹à¸­à¸à¹à¸à¹à¸à¸±à¸à¸£à¹à¸à¸£à¸à¸´à¸ à¹à¸¡à¹à¸¡à¸µà¸à¹à¸²à¹à¸­à¹à¸à¸à¸à¸µà¹ à¹à¸¡à¹à¸¡à¸µà¹à¸à¸·à¹à¸­à¸à¹à¸à¸à¹à¸­à¸à¹à¸£à¹à¸',
    vid_label:     'à¸à¸¹à¸à¸²à¸£à¸à¸³à¸à¸²à¸à¸à¸£à¸´à¸',
    vid_title:     'à¸à¸à¸à¸£à¸´à¸ à¸à¸²à¸à¸à¸£à¸´à¸',
    vid_sub:       'à¸à¸¹à¸§à¸´à¸à¸µà¸à¸µà¹ ThaiHelper à¸à¸³à¸à¸²à¸ à¸à¸±à¹à¸à¹à¸à¹à¸¥à¸à¸à¸°à¹à¸à¸µà¸¢à¸à¸à¸à¹à¸à¹à¸à¸²à¸à¹à¸£à¸',
    vid1_title:    'à¸¢à¸´à¸à¸à¸µà¸à¹à¸­à¸à¸£à¸±à¸à¸ªà¸¹à¹ ThaiHelper',
    vid1_sub:      'à¹à¸à¸°à¸à¸³à¸ªà¸±à¹à¸à¹ à¸à¸²à¸à¸à¸¹à¹à¸à¹à¸­à¸à¸±à¹à¸',
    vid1_badge:    'ð¬ð§ à¸ à¸²à¸©à¸²à¸­à¸±à¸à¸à¸¤à¸©',
    vid2_title:    'à¸§à¸´à¸à¸µà¸ªà¸¡à¸±à¸à¸£à¸à¸²à¸ (How to Register)',
    vid2_sub:      'à¸à¸¹à¹à¸¡à¸·à¸­à¸à¸µà¸¥à¸°à¸à¸±à¹à¸à¸à¸­à¸à¸ªà¸³à¸«à¸£à¸±à¸à¸à¸¹à¹à¹à¸«à¹à¸à¸£à¸´à¸à¸²à¸£',
    vid2_badge:    'ðµð­ à¸à¸´à¸¥à¸´à¸à¸à¸´à¸à¸ªà¹ Â· ð¹ð­ à¹à¸à¸¢',
    vid3_title:    'à¹à¸£à¸·à¹à¸­à¸à¸£à¸²à¸§à¸à¸­à¸à¸à¸¹à¹à¹à¸«à¹à¸à¸£à¸´à¸à¸²à¸£',
    vid3_sub:      'à¹à¸£à¹à¸§à¹ à¸à¸µà¹ â à¸à¸±à¸à¸à¸²à¸à¸à¸¸à¸¡à¸à¸à¸à¸­à¸à¹à¸£à¸²',
    vid3_badge:    'ð¬ à¹à¸£à¹à¸§à¹ à¸à¸µà¹',
    footer_privacy:'à¸à¹à¸¢à¸à¸²à¸¢à¸à¸§à¸²à¸¡à¹à¸à¹à¸à¸ªà¹à¸§à¸à¸à¸±à¸§',
    footer_terms:  'à¸à¹à¸­à¸à¸³à¸«à¸à¸à¸à¸²à¸£à¹à¸à¹à¸à¸²à¸',
  }
};

// âââ COMPONENT âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
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
        <title>ThaiHelper â Find Trusted Household Staff in Thailand</title>
        <meta name="description" content="ThaiHelper connects families and expats in Thailand with trusted nannies, housekeepers, cooks, drivers and more. No agency fees." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={lang === 'th' ? 'lang-th' : ''}>

        {/* ââ NAV âââââââââââââââââââââââââââââââââ */}
        <nav>
          <a className="nav-brand" href="#">Thai<span>Helper</span></a>
          <div className="nav-right">
            {/* Browse Helpers link hidden until enough profiles exist */}
            <div className="lang-toggle">
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => changeLang('en')}
              >ð¬ð§ EN</button>
              <button
                className={`lang-btn ${lang === 'th' ? 'active' : ''}`}
                onClick={() => changeLang('th')}
              >ð¹ð­ TH</button>
            </div>
            <Link className="nav-cta" href="/register">{t.nav_cta}</Link>
          </div>
        </nav>

        {/* ââ HERO ââââââââââââââââââââââââââââââââ */}
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
                <span>{lang === 'th' ? 'â à¸à¸£à¸µà¸à¸¥à¸­à¸ à¹à¸¡à¹à¸¡à¸µà¸à¹à¸²à¹à¸à¹à¸à¹à¸²à¸¢à¸à¹à¸­à¸à¹à¸£à¹à¸' : 'â Free Forever â No Hidden Fees'}</span>
              </div>
            </div>

          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>100%</strong><span>{t.stat1}</span></div>
            <div className="hero-stat"><strong>5</strong><span>{t.stat2}</span></div>
            <div className="hero-stat"><strong>{t.stat3_bold}</strong><span>{t.stat3}</span></div>
          </div>
        </section>

        {/* ââ TRUST BAR âââââââââââââââââââââââââââ */}
        <div className="trust-bar">
          <div className="trust-item">â <span>{t.trust1}</span></div>
          <div className="trust-item">ð <span>{t.trust2}</span></div>
          <div className="trust-item">ð± <span>{t.trust3}</span></div>
          <div className="trust-item">â¡ <span>{t.trust4}</span></div>
        </div>

        {/* ââ PROFILE PREVIEW âââââââââââââââââââââ */}
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
                  role: lang === 'th' ? 'ð¶ à¸à¸µà¹à¹à¸¥à¸µà¹à¸¢à¸à¹à¸à¹à¸' : 'ð¶ Nanny & Babysitter',
                  city: 'Phuket', exp: 5,
                  langs: 'ðµð­ ð¬ð§', stars: 4.9, reviews: 12, rate: '300',
                  skills: lang === 'th' ? 'à¸à¸¹à¹à¸¥à¸à¸²à¸£à¸ Â· à¸£à¸±à¸à¸ªà¹à¸à¹à¸£à¸à¹à¸£à¸µà¸¢à¸ Â· à¸à¸¹à¹à¸¥à¸à¸¥à¸²à¸à¸à¸·à¸' : 'Infant care Â· School run Â· Overnight',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=80&h=80&fit=crop&crop=face',
                  name: 'Sunisa K.', verified: true,
                  role: lang === 'th' ? 'ð  à¹à¸¡à¹à¸à¹à¸²à¸' : 'ð  Housekeeper',
                  city: 'Bangkok', exp: 8,
                  langs: 'ð¹ð­ ð¬ð§', stars: 4.8, reviews: 7, rate: '200',
                  skills: lang === 'th' ? 'à¸à¸³à¸à¸§à¸²à¸¡à¸ªà¸°à¸­à¸²à¸ Â· à¸à¸±à¸à¸£à¸µà¸ Â· à¸à¸³à¸­à¸²à¸«à¸²à¸£' : 'Cleaning Â· Laundry Â· Cooking',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
                  name: 'Ana R.', verified: true,
                  role: lang === 'th' ? 'ð¨âð³ à¹à¸¡à¹à¸à¸£à¸±à¸§à¸ªà¹à¸§à¸à¸à¸±à¸§' : 'ð¨âð³ Private Chef',
                  city: 'Phuket', exp: 3,
                  langs: 'ðµð­ ð¬ð§ ð¹ð­', stars: 5.0, reviews: 4, rate: '450',
                  skills: lang === 'th' ? 'à¸­à¸²à¸«à¸²à¸£à¹à¸à¸¢ Â· à¸­à¸²à¸«à¸²à¸£à¸à¸°à¸§à¸±à¸à¸à¸ Â· à¸à¸à¸¡à¸­à¸' : 'Thai cuisine Â· Western Â· Baking',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face',
                  name: 'Narin P.', verified: true,
                  role: lang === 'th' ? 'ð à¸à¸´à¸§à¹à¸à¸­à¸£à¹à¸à¸à¸´à¸à¸¨à¸²à¸ªà¸à¸£à¹' : 'ð Maths Tutor',
                  city: 'Phuket', exp: 4,
                  langs: 'ð¹ð­ ð¬ð§', stars: 5.0, reviews: 6, rate: '400',
                  skills: lang === 'th' ? 'à¸à¸à¸´à¸à¸¨à¸²à¸ªà¸à¸£à¹ Â· à¸à¸´à¸ªà¸´à¸à¸ªà¹ Â· à¹à¸à¸£à¸µà¸¢à¸¡à¸ªà¸­à¸' : 'Maths Â· Physics Â· Exam prep',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=80&h=80&fit=crop&crop=face',
                  name: 'Dao W.', verified: true,
                  role: lang === 'th' ? 'ð¿ à¸à¸à¸ªà¸§à¸ / à¸à¸¹à¹à¸¥à¸ªà¸£à¸°' : 'ð¿ Gardener & Pool Care',
                  city: 'Koh Samui', exp: 6,
                  langs: 'ð¹ð­', stars: 4.9, reviews: 9, rate: '180',
                  skills: lang === 'th' ? 'à¸à¸¹à¹à¸¥à¸ªà¸§à¸ Â· à¸à¸³à¸à¸§à¸²à¸¡à¸ªà¸°à¸­à¸²à¸à¸ªà¸£à¸° Â· à¸à¸±à¸à¸«à¸à¹à¸²' : 'Garden care Â· Pool cleaning Â· Lawn',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=80&h=80&fit=crop&crop=face',
                  name: 'Malee T.', verified: true,
                  role: lang === 'th' ? 'ð¥ à¸à¸¹à¹à¸¥à¸à¸¹à¹à¸ªà¸¹à¸à¸­à¸²à¸¢à¸¸' : 'ð¥ Elder Care',
                  city: 'Chiang Mai', exp: 7,
                  langs: 'ð¹ð­ ð¬ð§', stars: 4.8, reviews: 5, rate: '250',
                  skills: lang === 'th' ? 'à¸à¸¹à¹à¸¥à¸ªà¸¸à¸à¸­à¸à¸²à¸¡à¸±à¸¢ Â· à¹à¸à¸·à¸­à¸à¸à¸²à¸à¸¢à¸² Â· à¸à¸­à¸¢à¹à¸à¹à¸à¹à¸à¸·à¹à¸­à¸' : 'Personal care Â· Medication Â· Companionship',
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
                      <div className="profile-meta">ð {p.city} Â· {p.exp} {t.preview_exp}</div>
                      <div className="profile-langs">{p.langs}</div>
                    </div>
                  </div>
                  <div className="profile-skills">{p.skills}</div>
                  <div className="profile-card-bottom">
                    <div className="profile-rating-row">
                      <span className="profile-stars">{'â'.repeat(5)}</span>
                      <span className="profile-rating">{p.stars}</span>
                      <span className="profile-reviews">({p.reviews})</span>
                    </div>
                    <div className="profile-rate">{p.rate} THB/hr</div>
                  </div>
                  <button className="profile-contact-btn" disabled>{t.preview_btn}</button>
                </div>
              ))}
            </div>
            <p className="preview-note">ð {t.preview_note}</p>
          </div>
        </section>

        {/* ââ HOW IT WORKS ââââââââââââââââââââââââ */}
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

        {/* ââ VIDEOS ââââââââââââââââââââââââââââââ */}
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
                      ? <div className="video-soon-icon">ð¬</div>
                      : <div className="video-play-btn">â¶</div>
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

        {/* ââ BENEFITS ââââââââââââââââââââââââââââ */}
        <section className="section why-section">
          <div className="section-inner">
            <div className="section-label">{t.ben_label}</div>
            <h2 className="section-title">{t.ben_title}</h2>
            <p className="section-sub">{t.ben_sub}</p>
            <div className="why-grid-full">

              {/* Card 1 â Free */}
              <div className="why-card-full">
                <div className="why-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div><h3>{t.ben1_h}</h3><p>{t.ben1_p}</p></div>
              </div>

              {/* Card 2 â Serious employers */}
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

              {/* Card 3 â Thai & International */}
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

              {/* Card 4 â Build reputation */}
              <div className="why-card-full">
                <div className="why-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div><h3>{t.ben4_h}</h3><p>{t.ben4_p}</p></div>
              </div>

              {/* Card 5 â Work where you live */}
              <div className="why-card-full">
                <div className="why-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div><h3>{t.ben5_h}</h3><p>{t.ben5_p}</p></div>
              </div>

              {/* Card 6 â You're in control */}
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

        {/* ââ CATEGORIES ââââââââââââââââââââââââââ */}
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

        {/* ââ CTA âââââââââââââââââââââââââââââââââ */}
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

        {/* ââ FOOTER ââââââââââââââââââââââââââââââ */}
        <footer>
          <p>Â© 2026 ThaiHelper Â· <a href="mailto:jelenahalar91@gmail.com">jelenahalar91@gmail.com</a></p>
          <p style={{ marginTop: '6px' }}>
            <Link href="/privacy">{t.footer_privacy}</Link> Â· <Link href="/terms">{t.footer_terms}</Link>
          </p>
        </footer>

        {/* ââ COOKIE BANNER âââââââââââââââââââââââ */}
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
          ? <>à¹à¸£à¸²à¹à¸à¹ local storage à¹à¸à¸·à¹à¸­à¸à¸±à¸à¸à¸¶à¸à¸à¸²à¸£à¸à¸±à¹à¸à¸à¹à¸²à¸ à¸²à¸©à¸²à¹à¸à¹à¸²à¸à¸±à¹à¸ à¹à¸¡à¹à¸¡à¸µà¸à¸²à¸£à¸à¸´à¸à¸à¸²à¸¡ à¸­à¹à¸²à¸ <Link href="/privacy" style={{ color: '#5eead4' }}>à¸à¹à¸¢à¸à¸²à¸¢à¸à¸§à¸²à¸¡à¹à¸à¹à¸à¸ªà¹à¸§à¸à¸à¸±à¸§</Link></>
          : <>We only use local storage to remember your language preference â no tracking. Read our <Link href="/privacy" style={{ color: '#5eead4' }}>Privacy Policy</Link>.</>
        }
      </span>
      <button className="cookie-banner-btn" onClick={accept}>
        {lang === 'th' ? 'à¸£à¸±à¸à¸à¸£à¸²à¸' : 'Got it'}
      </button>
    </div>
  );
}
