import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Fingerprint, Activity, Clock, ShieldCheck, Check, Zap, Menu, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// --- NAV BAR --- //
const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 md:px-8 py-3 rounded-full transition-all duration-500 max-w-5xl w-[93%] md:w-[90%] border ${scrolled
          ? 'bg-background border-background/20 text-primary shadow-[0_8px_30px_rgb(0,0,0,0.05)]'
          : 'bg-background/10 backdrop-blur-md border-white/10 text-background'
          }`}
      >
        {/* Mobile Hamburger — left */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1 order-1"
          aria-label="Toggle menu"
        >
          {mobileOpen
            ? <X className="w-6 h-6" />
            : <Menu className="w-6 h-6" />
          }
        </button>

        <div className="font-sans font-bold tracking-tight text-xl order-2 md:order-1 flex-1 md:flex-none text-center md:text-left">Nail It!</div>
        <div className="hidden md:flex items-center gap-12 font-sans text-sm tracking-wide order-3 md:order-2">
          <a href="#features" className={`hover:text-accent transition-colors interactive ${scrolled ? 'text-primary/70' : 'text-background/90'}`}>System</a>
          <a href="#philosophy" className={`hover:text-accent transition-colors interactive ${scrolled ? 'text-primary/70' : 'text-background/90'}`}>Philosophy</a>
          <a href="#protocol" className={`hover:text-accent transition-colors interactive ${scrolled ? 'text-primary/70' : 'text-background/90'}`}>Protocol</a>
          <Link to="/prototype-01" className={`hover:text-accent transition-colors interactive ${scrolled ? 'text-primary/70' : 'text-background/90'}`}>Prototype 01</Link>
        </div>

        {/* Sign Up — right side */}
        <button onClick={() => navigate('/signup')} className={`btn-magnetic px-5 py-2 md:px-6 md:py-2.5 font-sans font-semibold text-xs md:text-sm rounded-full order-4 md:order-3 ${scrolled ? 'bg-accent text-background shadow-[0_0_20px_rgba(224,33,138,0.2)]' : 'bg-background text-primary'
          }`}>
          <span className="relative z-10">Sign Up</span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-dark/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileOpen(false)}>
        <div
          className={`absolute top-20 left-1/2 -translate-x-1/2 w-[90%] bg-background rounded-3xl p-8 flex flex-col gap-6 shadow-2xl border border-primary/10 transition-all duration-300 ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <a href="#features" onClick={() => setMobileOpen(false)} className="font-sans text-lg text-primary/80 hover:text-accent transition-colors py-2 border-b border-primary/5">System</a>
          <a href="#philosophy" onClick={() => setMobileOpen(false)} className="font-sans text-lg text-primary/80 hover:text-accent transition-colors py-2 border-b border-primary/5">Philosophy</a>
          <a href="#protocol" onClick={() => setMobileOpen(false)} className="font-sans text-lg text-primary/80 hover:text-accent transition-colors py-2 border-b border-primary/5">Protocol</a>
          <Link to="/prototype-01" onClick={() => setMobileOpen(false)} className="font-sans text-lg text-primary/80 hover:text-accent transition-colors py-2 border-b border-primary/5">Prototype 01</Link>
          <button onClick={() => { navigate('/signup'); setMobileOpen(false); }} className="btn-magnetic bg-accent text-background px-6 py-4 font-sans font-semibold text-base rounded-2xl mt-2 shadow-[0_0_20px_rgba(224,33,138,0.2)]">
            <span className="relative z-10">Sign Up</span>
          </button>
        </div>
      </div>
    </>
  );
};

// --- HERO SECTION --- //
const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(".hero-elem", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Parallax effect on scroll
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden bg-dark">
      {/* Background Image - Clean Black and White */}
      <div className="absolute inset-0">
        <img
          src="/cloud_aesthetic_bg.png"
          alt="Ethereal cloud aesthetic background"
          className="w-full h-full object-cover opacity-30 hero-bg mix-blend-overlay grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center translate-y-8">
        <div ref={textRef} className="max-w-4xl text-background">

          <h1 className="hero-elem font-sans font-bold text-5xl md:text-8xl lg:text-[10rem] leading-[1] tracking-tighter mb-4">
            Nail It!
          </h1>
          <h1 className="hero-elem font-sans font-light tracking-tight text-2xl md:text-6xl lg:text-[4rem] leading-[1.1] text-background/90 mb-8 md:mb-12">
            Nail the look. Protect your health.
          </h1>
          <p className="hero-elem font-sans text-base md:text-2xl font-light text-background/70 max-w-2xl mb-10 md:mb-16 leading-relaxed">
            Delivering premium, salon-quality aesthetics with "sticker-like flexibility" that keeps your natural nails healthy and perfectly adapts to your dynamic lifestyle.
          </p>
          <div className="hero-elem">
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-magnetic bg-accent text-background px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-semibold flex items-center gap-3 md:gap-4 group rounded-full shadow-[0_0_40px_rgba(224,33,138,0.3)]"
            >
              <span className="relative z-10">Claim Exclusive Access</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FEATURE CARDS --- //
// 1. Shuffler Content
const ShufflerCard = () => {
  const [cards, setCards] = useState([
    { id: 1, label: "Standard Hold", desc: "(Daily Wear)", color: "bg-dark", textColor: "text-background" },
    { id: 2, label: "Light Hold", desc: "(Wudhu-Friendly)", color: "bg-gray-900", textColor: "text-background" },
    { id: 3, label: "Max Hold", desc: "(Event/Weekend)", color: "bg-gray-800", textColor: "text-background" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const first = newCards.shift();
        newCards.push(first);
        return newCards;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-14 min-h-[400px] md:h-[500px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-primary/20 flex flex-col justify-between overflow-hidden relative group">
      <div>
        <h3 className="font-sans font-semibold tracking-tight text-3xl text-primary mb-4">Customizable Adhesion</h3>
        <p className="text-primary/60 font-sans text-lg leading-relaxed">Innovative glue options that let you adjust the hold based on your schedule.</p>
      </div>

      <div className="relative h-56 mt-auto flex items-end justify-center perspective-[1000px]">
        {cards.map((card, index) => {
          const isTop = index === 0;
          return (
            <div
              key={card.id}
              className={`absolute w-full p-6 rounded-3xl border border-background/10 transition-all duration-[800ms] ${isTop ? 'bg-dark shadow-[0_0_20px_rgba(255,255,255,0.05)]' : card.color} shadow-sm`}
              style={{
                top: `${index * 20}px`,
                scale: 1 - (index * 0.05),
                zIndex: 10 - index,
                opacity: 1 - (index * 0.2),
                transformOrigin: 'top center',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-background/40 mb-2">Setting {card.id}</div>
                  <div className={`font-sans font-bold text-xl ${card.textColor}`}>{card.label}</div>
                  <div className="font-sans text-sm text-background/50 mt-1">{card.desc}</div>
                </div>
                {isTop && <Activity className="w-6 h-6 text-background" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 2. Typewriter Card
const TypewriterCard = () => {
  const fullText = "Analyzing nail bed... Biocompatibility confirmed. Cellular respiration optimal. Zero trapped moisture detected. Health status: 100%.";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, Math.random() * 50 + 20); // Random typing speed
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 5000);
      return () => clearTimeout(reset);
    }
  }, [index, fullText]);

  const renderText = () => {
    const splitIndex = displayText.indexOf("Health status:");
    if (splitIndex === -1) return displayText;
    return (
      <>
        {displayText.substring(0, splitIndex)}
        <span className="text-accent font-semibold">{displayText.substring(splitIndex)}</span>
      </>
    );
  };

  return (
    <div className="bg-background rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-14 min-h-[400px] md:h-[500px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-primary/20 flex flex-col justify-between">
      <div>
        <h3 className="font-sans font-semibold tracking-tight text-3xl text-primary mb-4">Health-First Materials</h3>
        <p className="text-primary/60 font-sans text-lg leading-relaxed">Protect your natural nails, prevent trapped moisture, and let your nail bed breathe.</p>
      </div>

      <div className="bg-dark text-background p-8 rounded-3xl font-mono text-sm leading-relaxed relative min-h-[180px] overflow-hidden flex flex-col shadow-inner">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-background/10">
          <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse"></span>
          <span className="uppercase text-xs tracking-widest text-accent font-semibold">Live Telemetry</span>
        </div>
        <p className="flex-1 opacity-90 text-sm">
          {'>'} {renderText()}
          <span className="inline-block w-2.5 h-4 bg-accent ml-1 animate-pulse translate-y-1"></span>
        </p>
      </div>
    </div>
  );
};

// 3. Scheduler Card
const SchedulerCard = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const svgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.set(".cursor", { x: 200, y: 160, opacity: 0, scale: 1 })
        .to(".cursor", { opacity: 1, duration: 0.3 })
        .to(".cursor", { x: 155, y: 95, duration: 1.2, ease: "power3.inOut" }) // Move specifically to 'W' cell
        .to(".cursor", { scale: 0.8, duration: 0.1 }) // Click down
        .to(".day-box-3", { backgroundColor: "#000000", color: "#FFFFFF", duration: 0.1 }, "<") // Highlight 'W'
        .to(".bg-flare", { scale: 1.5, opacity: 0, duration: 0.4 }, "<")
        .to(".cursor", { scale: 1, duration: 0.1 }) // Click up
        .to(".cursor", { x: 155, y: 145, duration: 1, ease: "power2.inOut", delay: 0.2 }) // Move straight down to 'Secure Week' text
        .to(".cursor", { scale: 0.8, duration: 0.1 }) // Click down
        .to(".save-btn", { scale: 0.95, duration: 0.1 }, "<")
        .to(".cursor", { scale: 1, duration: 0.1 }) // Click up
        .to(".save-btn", { scale: 1, duration: 0.1 }, "<")
        .to(".cursor", { opacity: 0, duration: 0.3, delay: 0.5 })
        .to(".day-box-3", { backgroundColor: "transparent", color: "#111111", duration: 0.3 }, "<") // Reset
        .set(".bg-flare", { scale: 0.5, opacity: 0.2, clearProps: "all" });

    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-14 min-h-[400px] md:h-[500px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-primary/20 flex flex-col justify-between" ref={svgRef}>
      <div>
        <h3 className="font-sans font-semibold tracking-tight text-3xl text-primary mb-4">"No-Pop-Off" Warranty</h3>
        <p className="text-primary/60 font-sans text-lg leading-relaxed">Total peace of mind. Cure the social anxiety of random detached nails.</p>
      </div>

      <div className="bg-gray-50 rounded-3xl p-8 relative overflow-hidden h-56 border border-dark/5 shadow-inner flex flex-col justify-center">
        <div className="flex justify-between mb-6">
          <div className="font-mono text-xs uppercase text-dark/40 tracking-widest font-semibold">Active Schedule</div>
          <Fingerprint className="w-5 h-5 text-dark/30" />
        </div>

        <div className="grid grid-cols-7 gap-2 mb-8 px-2">
          {days.map((d, i) => (
            <div key={i} className={`aspect-square rounded-xl flex items-center justify-center font-mono text-sm font-medium day-box-${i} ${i === 3 ? 'relative' : 'text-primary'}`}>
              {i === 3 && <div className="absolute inset-0 rounded-xl bg-dark opacity-0 bg-flare"></div>}
              <span className="relative z-10">{d}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="save-btn bg-dark text-background px-8 py-3 rounded-full font-sans text-sm font-semibold tracking-wide shadow-lg">
            Secure Week
          </div>
        </div>

        {/* Custom SVG Cursor */}
        <div className="cursor absolute top-0 left-0 text-dark filter drop-shadow-lg z-20 pointer-events-none">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            <path d="m13 13 6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-48 lg:py-64 px-6 lg:px-12 bg-background min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-32 md:text-center mx-auto">
          <h2 className="font-sans font-semibold tracking-tighter text-5xl md:text-7xl text-primary mb-8">
            Engineered for <span className="font-light italic text-accent">Resilience.</span>
          </h2>
          <p className="font-sans text-2xl text-primary/60 leading-relaxed font-light">
            The foundation of a great aesthetic is an unshakeable system. We’ve redesigned the press-on experience from the nail bed up.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="feature-card"><ShufflerCard /></div>
          <div className="feature-card"><TypewriterCard /></div>
          <div className="feature-card"><SchedulerCard /></div>
        </div>
      </div>
    </section>
  );
};

// --- PHILOSOPHY --- //
const Philosophy = () => {
  const compRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax bg
      gsap.to(".phil-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: compRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Text reveal
      const lines = gsap.utils.toArray(".reveal-text");
      lines.forEach((line) => {
        gsap.from(line, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
          }
        });
      });
    }, compRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={compRef} id="philosophy" className="relative py-48 lg:py-64 overflow-hidden bg-dark text-background">
      {/* Subtle organic texture in background */}
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1629196914275-f12bd25eacb2?q=80&w=2864&auto=format&fit=crop"
          alt=""
          className="w-full h-[120%] object-cover phil-bg"
        />
        <div className="absolute inset-0 bg-dark/70"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
        <div className="w-20 h-[2px] bg-background mb-16 opacity-30 reveal-text"></div>
        <p className="font-sans text-2xl md:text-3xl text-background/60 mb-12 max-w-2xl mx-auto reveal-text leading-relaxed font-light tracking-tight">
          Most press-on nails focus on: <span className="text-background font-medium">temporary aesthetics with damaging adhesives.</span>
        </p>

        <p className="reveal-text font-sans font-light tracking-tighter text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] text-background/80">
          We focus on<br />
          <span className="font-semibold text-background">biocompatible flexibility</span><br />
          that adapts to your life.
        </p>
      </div>
    </section>
  );
};

// --- NAIL STYLE SHOWCASE COMPONENT --- //
const NailShowcase = () => {
  const [current, setCurrent] = useState(0);

  const styles = [
    { image: '/Design01.jpg' },
    { image: '/Design02.jpg' },
    { image: '/Design03.jpg' },
    { image: '/Design04.jpg' },
    { image: '/Design05.jpg' },
    { image: '/Design06.jpg' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === styles.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [styles.length]);

  return (
    <div className="relative md:absolute md:top-6 md:right-6 md:bottom-6 w-full md:w-1/2 h-64 md:h-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col bg-dark border border-dark/10 group mt-6 md:mt-0">
      {styles.map((style, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out bg-white ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
        >
          <img
            src={style.image}
            alt={`Showcase Design ${index + 1}`}
            className={`w-full h-full object-cover md:object-contain object-center transition-all duration-1000 delay-100 ${index === current ? 'blur-none opacity-100 scale-100' : 'blur-md opacity-0 scale-110'}`}
          />
        </div>
      ))}

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-0 w-full px-10 md:px-14 z-20 flex gap-2">
        {styles.map((_, index) => (
          <div key={index} className="h-1.5 flex-1 bg-background/30 rounded-full overflow-hidden backdrop-blur-md">
            <div
              className={`h-full bg-background transition-all duration-1000 origin-left ${index === current ? 'scale-x-100 w-full' : index < current ? 'scale-x-100 bg-background/60 w-full' : 'scale-x-0 w-full'}`}
              style={{ transitionDuration: index === current ? '4000ms' : '0ms', transitionTimingFunction: 'linear' }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- ADHESION SHOWCASE COMPONENT --- //
const AdhesionShowcase = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev === 3 ? 1 : prev + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const options = [
    { id: 1, name: 'Light Hold', duration: '1-3 Days', level: 'w-[30%]', color: 'bg-gray-100', dot: 'bg-dark/20' },
    { id: 2, name: 'Standard Hold', duration: '7-14 Days', level: 'w-[65%]', color: 'bg-background', dot: 'bg-dark/40' },
    { id: 3, name: 'Max Hold', duration: '2-4 Weeks', level: 'w-full', color: 'bg-dark', dot: 'bg-background' },
  ];

  return (
    <div className="relative md:absolute md:top-6 md:right-6 md:bottom-6 w-full md:w-1/2 h-auto md:h-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col justify-center bg-gray-50 p-4 md:p-10 lg:p-14 border border-dark/5 shadow-inner mt-6 md:mt-0">
      {/* Mobile: horizontal 3-column grid */}
      <div className="grid grid-cols-3 gap-3 md:hidden">
        {options.map((opt) => {
          const isActive = activeTab === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setActiveTab(opt.id)}
              className={`p-3 rounded-2xl cursor-pointer transition-all duration-500 border text-center ${isActive ? 'bg-dark border-dark shadow-lg scale-100 opacity-100' : 'bg-transparent border-dark/10 scale-[0.97] opacity-50'}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full mx-auto mb-2 ${isActive ? 'bg-background animate-pulse' : opt.dot}`}></div>
              <h4 className={`font-sans font-semibold text-sm mb-1 ${isActive ? 'text-background' : 'text-dark'}`}>{opt.name}</h4>
              <span className={`font-mono text-[10px] font-medium ${isActive ? 'text-background/50' : 'text-dark/40'}`}>{opt.duration}</span>
              <div className={`h-1.5 w-full rounded-full overflow-hidden mt-2 ${isActive ? 'bg-background/20' : 'bg-dark/10'}`}>
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${isActive ? 'bg-background' : 'bg-dark/20'}`}
                  style={{ width: isActive ? opt.level : '0%' }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: vertical stacked cards */}
      <div className="hidden md:flex flex-col gap-6">
        {options.map((opt) => {
          const isActive = activeTab === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setActiveTab(opt.id)}
              className={`p-6 rounded-[2rem] cursor-pointer transition-all duration-500 border ${isActive ? 'bg-dark border-dark shadow-[0_10px_40px_rgb(0,0,0,0.15)] scale-100 opacity-100' : 'bg-transparent border-transparent scale-[0.98] opacity-50 hover:opacity-70'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-3.5 h-3.5 rounded-full ${isActive ? 'bg-background animate-pulse' : opt.dot}`}></div>
                  <span className={`font-mono text-xs uppercase tracking-widest font-semibold ${isActive ? 'text-background' : 'text-dark'}`}>
                    Setting {opt.id}
                  </span>
                </div>
                <span className={`font-mono text-xs font-medium ${isActive ? 'text-background/50' : 'text-dark/40'}`}>{opt.duration}</span>
              </div>

              <h4 className={`font-sans font-semibold text-2xl mb-5 ${isActive ? 'text-background' : 'text-dark'}`}>{opt.name}</h4>

              {/* Strength Meter */}
              <div className={`h-2 w-full rounded-full overflow-hidden ${isActive ? 'bg-background/20' : 'bg-dark/10'}`}>
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${isActive ? 'bg-background' : 'bg-dark/20'}`}
                  style={{ width: isActive ? opt.level : '0%' }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- INTEGRATION SHOWCASE COMPONENT --- //
const IntegrationShowcase = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.set(".press-on", { y: -80, opacity: 0, rotation: -10 })
        .set(".snap-ring", { scale: 0, opacity: 0 })
        .set(".sparkle", { opacity: 0, scale: 0, rotation: 0 })

        // Floating down into frame
        .to(".press-on", { y: -20, opacity: 1, rotation: 0, duration: 1, ease: "power2.out" })

        // The press connection
        .to(".press-on", { y: 0, duration: 0.3, ease: "power4.in" })

        // The snap flash
        .to(".snap-ring", { scale: 2.5, opacity: 0.6, duration: 0.1 }, "-=0.1")
        .to(".snap-ring", { scale: 4, opacity: 0, duration: 0.5 }, ">")

        // Sparkles and lock
        .to(".sparkle", { opacity: 1, scale: 1, rotation: 180, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .to(".press-on", { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.6")

        // Hold, then fade
        .to(".press-on", { opacity: 0, duration: 0.5, delay: 1.5 })
        .to(".sparkle", { opacity: 0, scale: 0, duration: 0.3 }, "-=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative md:absolute md:top-6 md:right-6 md:bottom-6 w-full md:w-1/2 h-48 md:h-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center bg-gray-50 border border-dark/5 mt-6 md:mt-0" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none z-10"></div>

      <div className="relative w-48 h-64 flex flex-col items-center justify-center scale-[0.85] md:scale-[1.35] lg:scale-[1.6] origin-center translate-y-6">
        {/* Finger Base */}
        <div className="w-24 h-48 bg-gray-200 rounded-t-[3rem] shadow-inner relative border border-dark/10">
          {/* Natural Nail Bed */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[4.5rem] h-20 bg-gray-300 rounded-t-[2.5rem] rounded-b-[1rem] opacity-60"></div>
          {/* Cuticle curve */}
          <div className="absolute top-[5.5rem] left-1/2 -translate-x-1/2 w-20 h-4 border-b-2 border-dark/10 rounded-b-[100%] opacity-40"></div>

          {/* Snap Ring (Pulse effect) */}
          <div className="snap-ring absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-[3px] border-accent opacity-0 pointer-events-none z-20"></div>

          {/* Sparkles */}
          <div className="sparkle absolute top-2 -left-6 w-4 h-4 text-accent z-30">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          </div>
          <div className="sparkle absolute top-12 -right-8 w-6 h-6 text-accent z-30">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          </div>
          <div className="sparkle absolute top-20 -left-3 w-3 h-3 text-accent/70 z-30">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          </div>

          {/* The Premium Press-on Nail */}
          <div className="press-on absolute -top-2 left-1/2 -translate-x-1/2 w-[4.5rem] h-24 bg-gradient-to-b from-accent/80 via-accent to-accent/95 rounded-t-[2.5rem] rounded-b-[1rem] shadow-2xl border border-white/10 flex flex-col items-center justify-center pt-2 z-20 backdrop-blur-sm">
            {/* Highlight gleams */}
            <div className="w-8 h-[2px] bg-white/40 rounded-full blur-[0.5px] absolute top-2 left-1/2 -translate-x-1/2"></div>
            <div className="w-2 h-10 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-[1px] transform -rotate-3 absolute top-6 left-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PROTOCOL (STACKING ARCHIVE) --- //
const ArchiveCard = ({ step, title, desc, icon: Icon, image, isActive, isPast }) => {
  return (
    <div
      className={`protocol-card sticky top-24 md:top-32 w-full max-w-6xl mx-auto min-h-[65vh] md:h-[80vh] rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 lg:p-24 flex flex-col justify-between shadow-2xl transition-all duration-[800ms] overflow-hidden ${step === '01' ? 'border border-primary/5' : 'border border-primary/20'} ${isPast ? 'scale-[0.96] opacity-40 blur-sm bg-background/50' : 'scale-100 opacity-100 bg-background'
        }`}
      style={{ zIndex: parseInt(step) }}
    >
      <div className="flex justify-between items-start relative z-10 w-full md:w-1/2 md:pr-12">
        <div className="bg-gray-100 px-6 py-3 rounded-full font-mono text-sm font-semibold tracking-widest text-primary uppercase">
          Phase // {step}
        </div>
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center border border-primary/5">
          <Icon className="w-10 h-10 text-primary" />
        </div>
      </div>

      <div className="max-w-xl relative z-10 w-full md:w-1/2 md:pr-12 mt-auto">
        <h3 className="font-sans font-semibold text-3xl md:text-5xl lg:text-6xl text-primary mb-4 md:mb-8 tracking-tight">{title}</h3>
        <p className="text-lg md:text-2xl text-primary/60 leading-relaxed font-light">{desc}</p>
      </div>

      {/* Image Container / Showcase */}
      {step === '01' ? (
        <NailShowcase />
      ) : step === '02' ? (
        <AdhesionShowcase />
      ) : step === '03' ? (
        <IntegrationShowcase />
      ) : (
        <div className="absolute top-6 right-6 bottom-6 w-1/2 rounded-[3rem] overflow-hidden hidden md:block border border-dark/10">
          <img src={image} alt={`Phase ${step}`} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
        </div>
      )}
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  // Simulated scroll state for the stacking effect
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 40%",
          end: "top 20%",
          onEnter: () => setActiveStep(i + 1),
          onEnterBack: () => setActiveStep(i + 1),
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const protocols = [
    {
      step: "01",
      title: "Choose Your Style",
      desc: "Explore varying lengths, silhouettes, and premium biological finishes. Our sizing intelligence ensures a tailored match for your natural nail curvature.",
      icon: ArrowRight,
      // Image handled by NailShowcase
    },
    {
      step: "02",
      title: "Adhesion Formulation",
      desc: "Select from our biocompatible adhesive range based on your intended wear-time—from light wudhu-ready hold to weekend security.",
      icon: Activity,
      // Image handled by AdhesionShowcase
    },
    {
      step: "03",
      title: "Active Integration",
      desc: "Apply with precision. Our memory-polymer architecture bounds to the natural curve of your nail bed, ensuring zero-gap adherence.",
      icon: Zap,
      // Image handled by IntegrationShowcase
    }
  ];

  return (
    <section id="protocol" ref={containerRef} className="py-20 md:py-48 lg:py-64 px-6 lg:px-12 bg-gray-50 relative pb-[30rem]">
      <div className="max-w-7xl mx-auto mb-16 md:mb-32 md:text-center">
        <h2 className="font-sans font-semibold text-5xl md:text-7xl text-primary mb-8 tracking-tight">
          The <span className="font-light italic text-accent tracking-widest">Integration</span> Process.
        </h2>
      </div>

      <div className="relative z-10">
        {protocols.map((p, i) => (
          <ArchiveCard
            key={i}
            {...p}
            isActive={activeStep === i + 1}
            isPast={activeStep > i + 1}
          />
        ))}
      </div>
    </section>
  );
};

// --- ACTION / PRICING --- //
const Action = () => {
  const [formData, setFormData] = useState({ name: '', email: '', countryCode: '+62', phone: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Phone Validation (Optional, but if provided must be digits)
    if (formData.phone && !/^\d{5,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be between 5 and 15 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => setSubmitted(true), 500);
    }
  };

  return (
    <section id="waitlist" className="py-24 md:py-48 lg:py-64 px-6 lg:px-12 bg-dark relative z-20 text-center overflow-hidden -mt-[15rem] rounded-t-[2rem] md:rounded-t-[4rem]">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-30 pb-16">

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 px-6 py-3 rounded-full mb-12 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
            <span className="font-mono text-sm uppercase text-accent tracking-widest font-semibold">Early Access Waitlist</span>
          </div>

          <h2 className="font-sans font-semibold text-3xl md:text-5xl lg:text-7xl xl:text-[6rem] text-background mb-8 md:mb-10 tracking-tighter leading-none">
            Experience Aesthetic <span className="font-light italic text-accent">Perfection.</span>
          </h2>

          <p className="text-lg md:text-2xl text-background/60 mb-10 md:mb-16 max-w-3xl mx-auto leading-relaxed font-light">
            Join our exclusive launch cohort. Sign up today and receive an exclusive introductory discount on your first bespoke nail system.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-full flex flex-col gap-5 text-left">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background/5 border border-background/20 rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-base md:text-xl text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors font-sans"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: null }) }}
                  className={`w-full bg-background/5 border rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-base md:text-xl text-background placeholder:text-background/40 focus:outline-none transition-colors font-sans ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-background/20 focus:border-accent'}`}
                  required
                />
                {errors.email && <p className="text-red-400 text-sm mt-2 ml-4 font-sans">{errors.email}</p>}
              </div>

              <div>
                <div className="flex gap-3">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="bg-background/5 border border-background/20 rounded-xl md:rounded-2xl px-3 md:px-4 py-3 md:py-5 text-base md:text-xl text-background focus:outline-none focus:border-accent transition-colors font-sans w-24 md:w-28 appearance-none cursor-pointer"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="+62" className="text-dark">🇮🇩 +62</option>
                    <option value="+60" className="text-dark">🇲🇾 +60</option>
                    <option value="+65" className="text-dark">🇸🇬 +65</option>
                    <option value="+66" className="text-dark">🇹🇭 +66</option>
                    <option value="+84" className="text-dark">🇻🇳 +84</option>
                    <option value="+63" className="text-dark">🇵🇭 +63</option>
                    <option value="+95" className="text-dark">🇲🇲 +95</option>
                    <option value="+855" className="text-dark">🇰🇭 +855</option>
                    <option value="+856" className="text-dark">🇱🇦 +856</option>
                    <option value="+673" className="text-dark">🇧🇳 +673</option>
                    <option value="+670" className="text-dark">🇹🇱 +670</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); if (errors.phone) setErrors({ ...errors, phone: null }) }}
                    className={`w-full bg-background/5 border rounded-xl md:rounded-2xl px-5 md:px-8 py-3 md:py-5 text-base md:text-xl text-background placeholder:text-background/40 focus:outline-none transition-colors font-sans flex-1 ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-background/20 focus:border-accent'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-sm mt-2 ml-4 font-sans">{errors.phone}</p>}
              </div>
              
              <button type="submit" className="w-full btn-magnetic bg-accent text-background rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-6 font-semibold text-base md:text-xl mt-3 md:mt-4 font-sans group shadow-[0_0_40px_rgba(224,33,138,0.2)]">
                <span className="relative z-10 flex items-center justify-center gap-3 hover:text-white">
                  Join the Waitlist
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>
          ) : (
            <div className="max-w-lg mx-auto w-full bg-background/5 border border-accent/30 rounded-[2rem] p-12 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-sans font-semibold text-background">Access Secured.</h3>
              <p className="text-background/60 font-sans text-lg">You are now on the priority waitlist. We will notify you when your bespoke system is ready.</p>
            </div>
          )}

          <p className="mt-10 text-sm font-mono text-background/40 tracking-wider">Limited slots available. Secure your priority access.</p>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER --- //
const Footer = () => {
  return (
    <footer className="bg-dark text-background pt-24 pb-16 px-6 lg:px-12 relative z-10 border-t border-background/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 pb-16 border-b border-background/10">
          <div className="col-span-1 md:col-span-2 text-left">
            <div className="font-sans font-bold tracking-tight text-4xl mb-6 text-background">Nail It!</div>
            <p className="text-background/50 font-sans text-lg max-w-md mb-10 leading-relaxed font-light">Precision longevity medicine powered by biological data, applied to structural aesthetics.</p>

            <div className="inline-flex items-center gap-4 bg-background/5 border border-background/10 px-5 py-3 rounded-full font-mono text-sm text-accent">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              SYSTEM OPERATIONAL
            </div>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-xl text-background mb-8 tracking-wide">Navigation</h4>
            <ul className="flex flex-col gap-5 font-sans text-lg text-background/60 font-light">
              <li><a href="#features" className="hover:text-background transition-colors">The System</a></li>
              <li><a href="#philosophy" className="hover:text-background transition-colors">Philosophy</a></li>
              <li><a href="#protocol" className="hover:text-background transition-colors">Protocol</a></li>
              <li><Link to="/prototype-01" className="hover:text-background transition-colors">Prototype 01</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-xl text-background mb-8 tracking-wide">Legal</h4>
            <ul className="flex flex-col gap-5 font-sans text-lg text-background/60 font-light">
              <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Warranty Details</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-mono text-background/40 tracking-wider">
          <p>&copy; {new Date().getFullYear()} Nail It! System.</p>
          <p className="mt-6 md:mt-0">All protocols standardized.</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Action />
      <Footer />
    </React.Fragment>
  );
}

export default App;
