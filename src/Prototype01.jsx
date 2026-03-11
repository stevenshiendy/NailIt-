import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Dna, Droplets, Shield, Activity, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Prototype01 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(".proto-elem", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Parallax Background
      gsap.to(".proto-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Phase Cards Stagger
      gsap.from(".phase-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".phases-container",
          start: "top 70%",
        }
      });
      // Phase 1: Prep Drop, Splash & Top-to-Bottom Glow (Top-Down View)
      let tl1 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      tl1.set("#glow-gradient-1 stop", { stopColor: "#808080" }) // Ensure it starts gray
         .fromTo(".phase1-drop", { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.in" })
         .to(".phase1-drop", { opacity: 0, scale: 2, duration: 0.2 })
         .fromTo(".phase1-splash", { scale: 0.5, opacity: 0, transformOrigin: "center" }, { scale: 1.5, opacity: 1, duration: 0.2, ease: "power2.out" }, "-=0.1")
         .to(".phase1-splash", { opacity: 0, scale: 2.5, duration: 0.3 })
         .to("#glow-gradient-1 stop", { stopColor: "#86efac", duration: 0.8, stagger: 0.1, ease: "power1.inOut" }, "-=0.4")
         .to("#glow-gradient-1 stop", { stopColor: "#808080", duration: 0.8, delay: 1, stagger: 0.1, ease: "power1.inOut" });

      // Phase 2: Press-On Application + Pink Pulse (Top-Down View)
      let tl2 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      tl2.set(".phase2-pulse", { opacity: 0, scale: 0.5 })
         .fromTo(".phase2-presson-group", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
         .fromTo(".phase2-pulse", { scale: 0.4, opacity: 0.85, transformOrigin: "center" }, { scale: 2.8, opacity: 0, duration: 1.0, ease: "power2.out" }, "+=0.1")
         .to(".phase2-presson-group", { opacity: 0, duration: 0.5, delay: 1.0 });

      // Phase 3: Serum Drop, Glow, Stars, Removal (Top-Down View)
      let tl3 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      tl3.set(".phase3-stars", { opacity: 0, scale: 0 })
         .fromTo(".phase3-presson-group", { opacity: 0, y: 0 }, { opacity: 1, duration: 0.5 })
         .fromTo(".phase3-serum", { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.in" }, "-=0.2")
         .to(".phase3-serum", { opacity: 0, scale: 2, duration: 0.2 })
         .fromTo(".phase3-splash", { scale: 0.5, opacity: 0, transformOrigin: "center" }, { scale: 1.4, opacity: 1, duration: 0.2, ease: "power2.out" }, "-=0.1")
         .to(".phase3-splash", { opacity: 0, scale: 2.2, duration: 0.25 })
         .fromTo(".phase3-stars", { scale: 0, opacity: 0, transformOrigin: "center" }, { scale: 1.3, opacity: 1, duration: 0.4, ease: "back.out(1.5)" })
         .to(".phase3-stars", { opacity: 0, scale: 1.6, duration: 0.4 }, "+=0.4")
         .to(".phase3-presson-group", { y: -50, opacity: 0, duration: 0.8, ease: "power2.in" }, "-=0.2")
         .set(".phase3-presson-group", { y: 0 });


    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-dark text-background overflow-hidden font-sans">
      
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none fixed h-[120vh]">
        <img
          src="/cloud_aesthetic_bg.png"
          alt="Ethereal background"
          className="w-full h-full object-cover opacity-20 proto-bg mix-blend-overlay grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark"></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-6 lg:left-12 z-50">
        <Link to="/" className="inline-flex items-center gap-2 text-background/60 hover:text-accent transition-colors font-mono text-xs uppercase tracking-wider group interactive">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-28 md:pt-48 pb-16 md:pb-32 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 px-5 py-2.5 rounded-full mb-8 proto-elem">
          <Activity className="w-4 h-4 text-accent animate-pulse" />
          <span className="font-mono text-xs uppercase text-accent tracking-widest font-semibold">Active Research & Development</span>
        </div>
        
        <h1 className="proto-elem font-sans font-bold text-4xl md:text-7xl lg:text-[6rem] tracking-tighter mb-4 md:mb-6 leading-none">
          Prototype 01.
        </h1>
        <p className="proto-elem text-xl md:text-4xl font-light text-background/80 mb-6 md:mb-8 max-w-4xl leading-tight tracking-tight">
          A next-generation press-on nail system engineered to completely eliminate the need for mechanical abrasion and cuticle manipulation.
        </p>
        <p className="proto-elem text-base md:text-lg text-background/50 max-w-2xl leading-relaxed">
          By leveraging advanced biomimetic adhesion inspired by marine organisms and specific keratin-binding peptides, Prototype 01 shifts the paradigm away from physical damage toward intelligent molecular recognition.
        </p>
      </section>

      {/* Science & Biomimetics Grid */}
      <section className="relative z-10 py-16 md:py-24 bg-background text-primary rounded-t-[2rem] md:rounded-t-[4rem] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:text-center max-w-3xl mx-auto">
            <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tight mb-6">Biomimetic Architecture</h2>
            <p className="text-xl font-light text-primary/60">
              Outperforming the longevity of temporary adhesives and mitigating allergenic risks using cutting-edge molecular promoters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 phases-container">
            {/* Catechol Chemistry */}
            <div className="phase-card bg-dark text-background rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-14 border border-white/5 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center mb-8">
                <Droplets className="w-8 h-8 text-[#E0218A]" />
              </div>
              <h3 className="font-sans font-semibold text-3xl mb-4">Mussel-Inspired DOPA Chemistry</h3>
              <p className="text-background/70 text-lg leading-relaxed">
                Derived from the Mytilidae (blue mussel) family. Uses L-DOPA functional catechol side chains that form irreversible covalent cross-links with the amine and thiol functional groups abundantly present in keratinized tissues. Zero mechanical roughening required.
              </p>
            </div>

            {/* Keratin-Binding Peptides */}
            <div className="phase-card bg-dark text-background rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-14 border border-white/5 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center mb-8">
                <Dna className="w-8 h-8 text-[#E0218A]" />
              </div>
              <h3 className="font-sans font-semibold text-3xl mb-4">Keratin-Binding Peptides</h3>
              <p className="text-background/70 text-lg leading-relaxed">
                Utilizing specific peptide sequences (like Decorin-derived KP) that exhibit extraordinary affinity for human alpha-keratin. They achieve precise molecular recognition, binding tightly through dense hydrogen networks and robust intermolecular disulfide bonds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulation Blueprint (3 Phases) */}
      <section className="relative z-10 py-16 md:py-32 bg-dark text-background px-6 lg:px-12 border-t border-background/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tight mb-16 md:text-center">The Formulation Blueprint</h2>

          <div className="space-y-8">
            {/* Phase 1 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start proto-elem bg-background/5 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-background/10">
              <div className="bg-accent text-background font-mono text-xl font-bold px-5 py-3 rounded-2xl shrink-0">01</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3">Non-Abrasive Prep System</h3>
                <h4 className="text-accent text-sm font-mono tracking-widest uppercase mb-4">Chemical Deglossing</h4>
                <p className="text-background/70 leading-relaxed text-lg">
                  A synergistic, rapid-evaporating blend of high-purity isopropyl alcohol and ethyl acetate infused with a non-acidic phosphate promoter. It completely strips the un-buffed nail of residual lipids and rapidly increases surface energy without inflicting microscopic trauma.
                </p>
              </div>
              <div className="w-full md:w-64 h-48 bg-black rounded-2xl border border-white/20 relative overflow-hidden flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-90 overflow-visible p-4">
                  <defs>
                    <linearGradient id="glow-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#808080" />
                      <stop offset="50%" stopColor="#808080" />
                      <stop offset="100%" stopColor="#808080" />
                    </linearGradient>
                  </defs>

                  {/* Finger (Top-Down) - White Colored */}
                  <path d="M 30,100 L 30,50 C 30,30 70,30 70,50 L 70,100" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                  
                  {/* Natural Nail */}
                  <path d="M 35,45 C 35,25 65,25 65,45 L 65,60 C 65,65 35,65 35,60 Z" fill="url(#glow-gradient-1)" stroke="#b0b0b0" strokeWidth="1" />
                  
                  {/* Lunula (half moon) */}
                  <path d="M 40,58 C 45,52 55,52 60,58 Z" fill="#F5D6B8" opacity="0.7" />
                  
                  {/* Prep Drop (Solution) */}
                  <circle cx="50" cy="45" r="4" fill="#ffffff" className="phase1-drop" opacity="0" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.3))" />

                  {/* Splash */}
                  <g className="phase1-splash text-[#86efac]" opacity="0" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="50" cy="45" r="8" opacity="0.5" />
                    <path d="M 50,32 L 50,35 M 63,45 L 60,45 M 50,58 L 50,55 M 37,45 L 40,45" />
                    <path d="M 59,36 L 57,38 M 59,54 L 57,52 M 41,54 L 43,52 M 41,36 L 43,38" />
                  </g>

                  {/* Stars / Sparkles */}
                  <g className="phase1-stars" opacity="0" fill="#86efac" filter="drop-shadow(0 0 8px rgba(134,239,172,0.8))">
                    <path d="M 35,25 Q 40,25 40,20 Q 40,25 45,25 Q 40,25 40,30 Q 40,25 35,25 Z" />
                    <path d="M 65,35 Q 68,35 68,32 Q 68,35 71,35 Q 68,35 68,38 Q 68,35 65,35 Z" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start proto-elem bg-background/5 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-background/25">
              <div className="bg-accent text-background font-mono text-xl font-bold px-5 py-3 rounded-2xl shrink-0">02</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3">Bio-Adhesive Substrate Matrix</h3>
                <h4 className="text-accent text-sm font-mono tracking-widest uppercase mb-4">DOPA-Functionalized Elastomer</h4>
                <p className="text-background/70 leading-relaxed text-lg">
                  A highly viscous, gap-filling semi-cured elastomeric base modified with synthesized catechol groups and keratin-binding peptide sequences. It operates like UV solid gels, establishing a flush, watertight seal on the individual topography of the natural nail bed.
                </p>
              </div>
              <div className="w-full md:w-64 h-48 bg-black rounded-2xl border border-white/20 relative overflow-hidden flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-90 overflow-visible p-4">
                  {/* Finger (Top-Down) - White Colored */}
                  <path d="M 30,100 L 30,50 C 30,30 70,30 70,50 L 70,100" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                  
                  {/* Natural Nail (gray) */}
                  <path d="M 35,45 C 35,25 65,25 65,45 L 65,60 C 65,65 35,65 35,60 Z" fill="#808080" stroke="#b0b0b0" strokeWidth="1" />

                  {/* Pulse ring (Barbie Pink) - animated on landing */}
                  <circle className="phase2-pulse" cx="50" cy="42" r="18" fill="none" stroke="#E0218A" strokeWidth="2.5" opacity="0" />
                  
                  {/* Press-On Nail (Short Barbie Pink Stiletto) */}
                  <g className="phase2-presson-group" opacity="0" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
                    <path d="M 33,40 C 33,25 42,15 50,15 C 58,15 67,25 67,40 L 67,62 C 67,68 33,68 33,62 Z" fill="#E0218A" stroke="#C0106B" strokeWidth="1" />
                    <path d="M 45,22 C 48,18 52,18 55,22" stroke="#FF8FC5" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" fill="none" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start proto-elem bg-background/5 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-background/25">
              <div className="bg-accent text-background font-mono text-xl font-bold px-5 py-3 rounded-2xl shrink-0">03</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3">Zero-Damage Removal Mechanics</h3>
                <h4 className="text-accent text-sm font-mono tracking-widest uppercase mb-4">Peptide-Cleaving Serum</h4>
                <p className="text-background/70 leading-relaxed text-lg">
                  Removal entirely avoids abrasive filing or harsh acetone soaking. It utilizes a specialized, gentle reducing serum designed to specifically target and break the biomimetic peptide bonds and DOPA cross-links at a molecular level, allowing the matrix to effortlessly slide off.
                </p>
              </div>
              <div className="w-full md:w-64 h-48 bg-black rounded-2xl border border-white/20 relative overflow-hidden flex items-center justify-center shrink-0">
                 <svg viewBox="0 0 100 100" className="w-full h-full opacity-90 overflow-visible p-4">
                  {/* Finger (Top-Down) - White Colored */}
                  <path d="M 30,100 L 30,50 C 30,30 70,30 70,50 L 70,100" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
                  
                  {/* Natural Nail (gray) */}
                  <path d="M 35,45 C 35,25 65,25 65,45 L 65,60 C 65,65 35,65 35,60 Z" fill="#808080" stroke="#b0b0b0" strokeWidth="1" />
                  
                  {/* Press-On Nail (Short Barbie Pink Stiletto) */}
                  <g className="phase3-presson-group" style={{filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))"}}>
                    <path className="phase3-presson-bg" d="M 33,40 C 33,25 42,15 50,15 C 58,15 67,25 67,40 L 67,62 C 67,68 33,68 33,62 Z" fill="#E0218A" stroke="#C0106B" strokeWidth="1" />
                    <path d="M 45,22 C 48,18 52,18 55,22" stroke="#FF8FC5" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" fill="none" />
                  </g>

                  {/* Splash (same as Phase 1 - crosshatch burst) */}
                  <g className="phase3-splash" opacity="0" fill="none" stroke="#86efac" strokeWidth="1.5">
                    <circle cx="50" cy="38" r="8" opacity="0.5" />
                    <path d="M 50,25 L 50,28 M 63,38 L 60,38 M 50,51 L 50,48 M 37,38 L 40,38" />
                    <path d="M 59,29 L 57,31 M 59,47 L 57,45 M 41,47 L 43,45 M 41,29 L 43,31" />
                  </g>

                  {/* Stars (lighter mint green) */}
                  <g className="phase3-stars" opacity="0" fill="#86efac" filter="drop-shadow(0 0 8px rgba(187,247,208,0.8))">
                    <path d="M 30,22 Q 35,22 35,17 Q 35,22 40,22 Q 35,22 35,27 Q 35,22 30,22 Z" />
                    <path d="M 65,32 Q 69,32 69,28 Q 69,32 73,32 Q 69,32 69,36 Q 69,32 65,32 Z" />
                  </g>

                  {/* Serum Drop */}
                  <circle cx="50" cy="38" r="4" fill="#ffffff" className="phase3-serum" opacity="0" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.3))" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Prototype01;