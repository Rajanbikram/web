import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/landing.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('lp-visible'), i * 100);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.lp-reveal').forEach((el) => observer.observe(el));

    // Counter animation
    function animateCounter(el, target, duration = 1400) {
      let start = 0;
      const step = Math.ceil(target / (duration / 16));
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          el.textContent = target + '+';
          clearInterval(timer);
        } else {
          el.textContent = start;
        }
      }, 16);
    }

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target, parseInt(e.target.dataset.target));
            statObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('.lp-stat-num[data-target]').forEach((el) => statObserver.observe(el));

    return () => {
      observer.disconnect();
      statObserver.disconnect();
    };
  }, []);

  return (
    <div className="lp">
      {/* NAVBAR */}
      <nav className="lp-nav">
        <div className="lp-logo">Skill<span>Swap</span></div>
        <ul className="lp-nav-links">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#stats">Stats</a></li>
        </ul>
        <div className="lp-nav-btns">
          <button className="lp-btn lp-btn-outline" onClick={() => navigate('/login')}>Login</button>
          <button className="lp-btn lp-btn-primary" onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-text">
          <h1>Share Your Skills.<br /><span>Learn Something</span> New.</h1>
          <p>Connect with people around you who want to teach and learn skills from each other — completely free.</p>
          <div className="lp-hero-btns">
            <button className="lp-btn lp-btn-primary" onClick={() => navigate('/register')}>Get Started Free</button>
            <button className="lp-btn lp-btn-green" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
        <div className="lp-hero-img">
          <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="210" cy="160" r="140" fill="#dbeafe" opacity="0.5"/>
            <rect x="60" y="230" width="300" height="14" rx="7" fill="#93c5fd"/>
            <rect x="130" y="160" width="160" height="100" rx="10" fill="#1d4ed8"/>
            <rect x="138" y="168" width="144" height="84" rx="6" fill="#bfdbfe"/>
            <rect x="148" y="178" width="80" height="7" rx="3" fill="#2563eb"/>
            <rect x="148" y="191" width="110" height="5" rx="2.5" fill="#93c5fd"/>
            <rect x="148" y="202" width="90" height="5" rx="2.5" fill="#93c5fd"/>
            <rect x="148" y="213" width="60" height="5" rx="2.5" fill="#93c5fd"/>
            <rect x="115" y="260" width="190" height="10" rx="5" fill="#3b82f6"/>
            <circle cx="100" cy="145" r="22" fill="#fde68a"/>
            <rect x="82" y="170" width="36" height="50" rx="10" fill="#16a34a"/>
            <rect x="70" y="175" width="12" height="35" rx="6" fill="#fde68a"/>
            <rect x="118" y="175" width="12" height="35" rx="6" fill="#fde68a"/>
            <rect x="86" y="218" width="12" height="30" rx="6" fill="#166534"/>
            <rect x="102" y="218" width="12" height="30" rx="6" fill="#166534"/>
            <rect x="120" y="110" width="80" height="32" rx="10" fill="white" stroke="#2563eb" strokeWidth="1.5"/>
            <polygon points="128,142 120,155 138,142" fill="white" stroke="#2563eb" strokeWidth="1.5"/>
            <rect x="130" y="119" width="50" height="5" rx="2.5" fill="#2563eb"/>
            <rect x="130" y="130" width="36" height="5" rx="2.5" fill="#93c5fd"/>
            <circle cx="320" cy="145" r="22" fill="#fed7aa"/>
            <rect x="302" y="170" width="36" height="50" rx="10" fill="#7c3aed"/>
            <rect x="290" y="175" width="12" height="35" rx="6" fill="#fed7aa"/>
            <rect x="326" y="175" width="12" height="35" rx="6" fill="#fed7aa"/>
            <rect x="306" y="218" width="12" height="30" rx="6" fill="#5b21b6"/>
            <rect x="322" y="218" width="12" height="30" rx="6" fill="#5b21b6"/>
            <rect x="326" y="185" width="20" height="26" rx="3" fill="#fbbf24"/>
            <line x1="336" y1="185" x2="336" y2="211" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x="195" y="100" fontSize="20" fill="#f59e0b">★</text>
            <text x="215" y="85" fontSize="14" fill="#fde68a">★</text>
            <text x="175" y="90" fontSize="12" fill="#fbbf24">★</text>
          </svg>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lp-section lp-how" id="how">
        <h2 className="lp-section-title">How It Works</h2>
        <p className="lp-section-sub">Get started in just 3 simple steps</p>
        <div className="lp-steps">
          {[
            { num: 1, title: 'Create an Account', desc: 'Sign up for free with your email. Set up your profile with your interests and skills.' },
            { num: 2, title: 'Post or Find Skills', desc: 'List skills you can teach or browse skills available in your community.' },
            { num: 3, title: 'Connect & Learn', desc: 'Send or receive skill requests and start your learning journey.' },
          ].map((s) => (
            <div className="lp-step lp-reveal" key={s.num}>
              <div className="lp-step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="lp-stats" id="stats">
        <div className="lp-stats-grid">
          {[
            { target: 500, label: '📋\u00A0 Registered Users' },
            { target: 120, label: '🧠\u00A0 Skills Shared' },
            { target: 300, label: '📨\u00A0 Skill Requests' },
            { target: 200, label: '🎓\u00A0 Learning Sessions' },
          ].map((s) => (
            <div className="lp-stat-box lp-reveal" key={s.label}>
              <div className="lp-stat-num" data-target={s.target}>0</div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <h2>Ready to Share Your Knowledge<br />or Learn Something New?</h2>
        <p>Join hundreds of students and professionals already using SkillSwap.</p>
        <div className="lp-cta-btns">
          <button className="lp-btn lp-btn-white" onClick={() => navigate('/register')}>Join Now – It's Free</button>
          <button className="lp-btn lp-btn-border-white" onClick={() => navigate('/login')}>Login</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-logo">Skill<span>Swap</span></div>
        <div className="lp-footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
        <div className="lp-footer-copy">© 2025 SkillSwap. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default LandingPage;