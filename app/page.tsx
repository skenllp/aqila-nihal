'use client';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog';
const asset = (name: string) => `/assets/${name}.png`;
const labels = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'];
const weddingTime = new Date('2026-11-14T11:00:00+05:30').getTime();
function remaining() {
  const seconds = Math.max(0, Math.floor((weddingTime - Date.now()) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
}
function Fade({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return <div className={`fade-up ${className}`} style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}
function Countdown() {
  const [time, setTime] = useState([0, 0, 0, 0]);
  useEffect(() => { setTime(remaining()); const interval = setInterval(() => setTime(remaining()), 1000); return () => clearInterval(interval); }, []);
  return <div className="countdown" aria-label="Wedding countdown">{labels.map((label, i) => <div className="count-unit" key={label}><div className="count-tile"><span key={time[i]}>{String(time[i]).padStart(2, '0')}</span></div><span className="count-label">{label}</span></div>)}</div>;
}
function Wishes() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('full_name') || '').trim();
    const wishes = String(data.get('wishes') || '').trim();
    if (!name || !wishes) { setError('Please enter your name and wishes.'); return; }
    try {
      const entries = JSON.parse(localStorage.getItem('aqila-nihal-wishes') || '[]');
      localStorage.setItem('aqila-nihal-wishes', JSON.stringify([...entries, { name, wishes, createdAt: new Date().toISOString() }]));
    } catch {}
    const message = `*Wedding Wishes for Adv. Aqila & Adv. Nihal* 💍✨\n\n*From:* ${name}\n\n*Wishes:* ${wishes}`;
    const whatsappUrl = `https://wa.me/919446587480?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSaved(true);
    setError('');
  }
  return <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (value) { setSaved(false); setError(''); } }}>
    <DialogTrigger className="invitation-button primary"><Heart size={16} strokeWidth={1.5} />SEND YOUR WISHES</DialogTrigger>
    <DialogContent className="wishes-dialog" showCloseButton={false}>
      <div className="dialog-ornament" aria-hidden="true"><span /><i /><span /></div>
      <DialogTitle className="wishes-title">{saved ? 'Thank You for Your Wishes' : 'Send Your Wishes'}</DialogTitle>
      <DialogDescription className="wishes-description">{saved ? 'Your blessing has been forwarded to the couple on WhatsApp.' : 'A blessing from you means the world to us.'}</DialogDescription>
      {saved ? <div className="wishes-success"><Heart size={28} strokeWidth={1.2} /><p>Your blessings have been opened in WhatsApp to send to the couple.</p><DialogClose className="invitation-button primary">CLOSE</DialogClose></div> : <form onSubmit={submit} className="wishes-form">
        <div><label htmlFor="full-name">FULL NAME</label><input id="full-name" name="full_name" autoComplete="name" maxLength={80} placeholder="Your name" required /></div>
        <div><label htmlFor="wishes">YOUR WISHES</label><textarea id="wishes" name="wishes" rows={5} maxLength={1000} placeholder="Write your blessings for the couple…" required /></div>
        {error && <p role="alert" className="form-error">{error}</p>}
        <div className="form-actions"><button type="submit" className="invitation-button primary">SEND VIA WHATSAPP</button><DialogClose className="invitation-button">CLOSE</DialogClose></div>
      </form>}
    </DialogContent>
  </Dialog>;
}
function Envelope() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.18 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} className={`envelope ${visible ? 'revealed' : ''}`} aria-label="Save the date keepsake"><div className="envelope-scene">
    <img className="envelope-layer envelope-back" src={asset('envelope-back')} alt="" />
    <div className="envelope-piece date-card"><img src={asset('envelope-card')} alt="Save the Date 14.11.26" /></div>
    <img className="envelope-layer envelope-front" src={asset('envelope-front')} alt="" />
  </div></section>;
}
export default function Invitation() {
  return <main className="paper-bg"><h1 className="sr-only">Aqila & Nihal — Wedding Invitation</h1>
    {/* Floating rose petals */}
    <div className="petals" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <span key={i} style={{ left: `${(i * 37 + 16) % 100}%`, width: `${9 + i % 9}px`, height: `${6 + i % 5}px`, animationDelay: `${(i * 1.7) % 12}s`, animationDuration: `${15 + i % 12}s` } as CSSProperties} />)}</div>
    <div className="invitation">

      {/* ── Bismillah / Header ── */}
      <Fade delay={100} className="bismillah-section">
        <div className="rose-divider" />
        <p className="bismillah-tagline">Our story begins with Qubool, love, and the blessings of Allah</p>
        <div className="rose-divider" />
      </Fade>

      {/* ── Logo / Monogram ── */}
      <Fade delay={300} className="monogram"><img src={asset('logo-2')} alt="Aqila &amp; Nihal monogram" /></Fade>

      {/* ── Host family block ── */}
      <Fade delay={500} className="host-block">
        <p className="host-names">MR. MUJEEB CK &amp; MRS. FOUSIYA KK</p>
        <p className="host-address">
          CK (H), POOVALAPPU STREET, JUBILEE RD,<br />
          NEAR DR. THAJ CLINIC, THALASSERY<br />
          PH: 9447411182, 9995997844
        </p>
        <p className="host-invite">
          With the grace of God and our families,<br />
          we invite you to the wedding celebration of our daughter
        </p>
      </Fade>

      {/* ── Bride first, then groom ── */}
      <Fade delay={900} className="couple-names-block">
        <h2 className="couple-name bride">Adv. Aqila Sherin</h2>
        <span className="couple-ampersand">&amp;</span>
        <h2 className="couple-name">Adv. Nihal Bin Noushad</h2>
      </Fade>

      {/* ── Groom's parents ── */}
      <Fade delay={1100} className="parent-details groom-parents">
        <p>S/O Mr. Adv. PC NOUSHAD &amp; Mrs. FATHIMA SHYMA</p>
        <p style={{ fontSize: '10.5px', marginTop: '2px' }}>NEST, PO. MUZHAPILANGAD</p>
      </Fade>

      {/* ── Portrait / Calligraphy medallion ── */}
      <Fade delay={1400} className="portrait">
        <div className="portrait-frame">
          {/* Decorative rose rings SVG */}
          <svg className="portrait-rings-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="rose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8a0b4" />
                <stop offset="45%" stopColor="#f2bfc9" />
                <stop offset="100%" stopColor="#c97a8f" />
              </linearGradient>
            </defs>
            {/* Outer thin rose ring */}
            <circle cx="50" cy="50" r="48.5" fill="none" stroke="url(#rose-grad)" strokeWidth="0.85" />
            {/* Inner thin rose ring */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#rose-grad)" strokeWidth="0.6" opacity="0.75" />
          </svg>
          {/* Calligraphy — soft rose glow behind */}
          <div className="calligraphy-img-wrap">
            <img src="/assets/arabic-monogram.png" alt="Aqila &amp; Nihal Arabic calligraphy monogram" />
          </div>
          {/* Rose stars on top */}
          <svg className="portrait-stars-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="rose-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8a0b4" />
                <stop offset="50%" stopColor="#f2bfc9" />
                <stop offset="100%" stopColor="#c97a8f" />
              </linearGradient>
            </defs>
            {/* Top 4-pointed star */}
            <path d="M50 -5.5 L51.5 1.5 L58.5 3 L51.5 4.5 L50 11.5 L48.5 4.5 L41.5 3 L48.5 1.5 Z" fill="url(#rose-grad2)" />
            {/* Bottom 4-pointed star */}
            <path d="M50 88.5 L51.5 95.5 L58.5 97 L51.5 98.5 L50 105.5 L48.5 98.5 L41.5 97 L48.5 95.5 Z" fill="url(#rose-grad2)" />
          </svg>
        </div>
      </Fade>

      {/* ── Lace panel + event details ── */}
      <div className="lace-panel"><img className="lace-art" src={asset('lace3')} alt="" aria-hidden="true" /><div className="event-content">
        <Fade delay={1700} className="event-date"><h3 className="event-date-text">NOVEMBER 14, 2026</h3></Fade>
        <Fade delay={1900}><p className="inshallah-badge">IN SHA ALLAH</p></Fade>
        <Fade delay={2100} className="nikkah-details"><p className="event-copy">NIKAH ON NOV 14, 2026 AT <span className="time">11:00</span> AM,<br />TOWN BANK AUDITORIUM, THALASSERY</p></Fade>
        <Fade delay={2200} className="location"><a className="invitation-button" href="https://maps.app.goo.gl/QkE8SGKw55oQws686" target="_blank" rel="noopener noreferrer"><MapPin size={16} strokeWidth={1.5} />NIKAH LOCATION</a></Fade>
        <Fade delay={2700} className="countdown-wrap"><Countdown /></Fade>
      </div></div>

      {/* ── Wishes & invite copy ── */}
      <Fade delay={3150} className="wishes-section">
        <Wishes />
        <p className="honour-text">We would be honoured by your presence and prayers as we begin this new chapter.</p>
        <p>WE SEEK YOUR DUAS AND WARMLY<br />INVITE YOU TO CELEBRATE THIS<br />SPECIAL OCCASION WITH US.</p>
      </Fade>

      {/* ── Dua calligraphy ── */}
      <Fade delay={3150} className="dua"><img src={asset('dua')} alt="Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fee khair" /></Fade>

      {/* ── Closing / sender ── */}
      <Fade delay={3400}>
        <p className="closing-section">
          — WITH LOVE, DUAS &amp; BARAKAH FROM —<br />
          <strong style={{ letterSpacing: '.22em', fontStyle: 'normal' }}>MUHAMMAD AKHDAS</strong>
        </p>
      </Fade>

      {/* ── Save the date envelope ── */}
      <Envelope />
    </div>
  </main>;
}
