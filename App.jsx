import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   CONTENT & CONFIG
───────────────────────────────────────────────────────────────────────── */
const IMAGES = {
    img1: "/assets/1.webp",
    img2: "/assets/2.webp",
    img3: "/assets/3.webp",
    img4: "/assets/4.webp",
};

const SECTIONS = [
    { 
        id: "hero", img: "img1", label: "A CELEBRATION OF LOVE", title: "Nileena & Ajeesh", 
        body: "Inviting you to share in our joy as we begin our life together.",
        date: "01 · 05 · 2026",
        align: "center", justify: "center",
        mobileBgPos: "60% center",
        type: "hero"
    },
    { 
        id: "story1", img: "img2", label: "CHAPTER I", title: "The Union", 
        body: "A beautiful journey beginning with a single step, leading us to our forever.",
        align: "flex-start", justify: "center",
        mobileBgPos: "center"
    },
    { 
        id: "story2", img: "img3", label: "CHAPTER II", title: "The Promise", 
        body: "Bound by love and guided by grace, two hearts becoming one.",
        align: "flex-end", justify: "center",
        mobileBgPos: "center"
    },
    { 
        id: "details", img: "img4", label: "THE WEDDING", title: "01 · 05 · 2026", 
        body: "3:00 PM | Edassery Sealine Villa Stay\nCherai, Kochi", 
        type: "cta", align: "center", justify: "flex-end",
        mobileBgPos: "center"
    },
];

const G = "#D4AF37"; // Old Gold
const W = "#F5F5F0"; // Silk White
const S = "rgba(245,245,240,0.6)"; // Soft White

/* ─────────────────────────────────────────────────────────────────────────
   CINEMATIC BACKGROUND — (UNTOUCHED)
───────────────────────────────────────────────────────────────────────── */
function CinematicBg({ activeIdx, scrollYProgress, isMobile }) {
    const section = SECTIONS[activeIdx];
    const targetImg = section?.img;
    const start = activeIdx * 0.25;
    const end = (activeIdx + 1) * 0.25;
    const scrollScale = useTransform(scrollYProgress, [start, end], [1.0, 1.25]);
    const smoothScale = useSpring(scrollScale, { stiffness: 45, damping: 20 });
    const bgPos = isMobile ? (section?.mobileBgPos || "center") : "center";

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#050505", overflow: "hidden" }}>
            <AnimatePresence>
                <motion.div
                    key={targetImg}
                    initial={{ opacity: 0, filter: "blur(15px)" }}
                    animate={{ opacity: 0.9, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: "absolute", inset: "-10%",
                        backgroundImage: `url("${IMAGES[targetImg]}")`,
                        backgroundSize: "cover",
                        backgroundPosition: bgPos,
                        scale: smoothScale
                    }}
                />
            </AnimatePresence>
            <div className="dust-layer" style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none", opacity: 0.15 }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "rgba(5,5,5,0.2)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "radial-gradient(circle at center, transparent 0%, rgba(5,5,5,0.6) 100%)", pointerEvents: "none" }} />
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────
   HERO ANIMATIONS — Balanced Sparkles
───────────────────────────────────────────────────────────────────────── */
function HeroElements({ isMobile }) {
    return (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 25 }}>
            <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 2, delay: 1 }}
                style={{ position: "absolute", inset: isMobile ? "20px" : "60px", border: "0.5px solid #D4AF37" }}
            />

            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                style={{ position: "absolute", top: "50%", left: "50%", width: "100vw", height: "100vh", transform: "translate(-50%, -50%)" }}
            >
                {[...Array(16)].map((_, i) => {
                    const angle = (i / 16) * Math.PI * 2;
                    const radiusX = isMobile ? 180 : 450;
                    const radiusY = isMobile ? 140 : 250;
                    
                    const circleX = Math.cos(angle) * radiusX;
                    const circleY = Math.sin(angle) * radiusY;
                    
                    const t = angle;
                    const heartX = 16 * Math.sin(t) ** 3 * (isMobile ? 15 : 35);
                    const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * (isMobile ? 10 : 25);

                    return (
                        <motion.div
                            key={i}
                            animate={{ 
                                x: [circleX, heartX, circleX], 
                                y: [circleY, heartY, circleY],
                                opacity: [0, 0.5, 0],
                                scale: [0.3, 0.7, 0.3]
                            }}
                            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: i * 0.4 }}
                            style={{ 
                                position: "absolute", top: "50%", left: "50%",
                                fontSize: isMobile ? "0.6rem" : "0.9rem", color: G,
                                textShadow: `0 0 12px ${G}`
                            }}
                        >
                            ♥
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────
   REFINED TEXT PLACEMENT
───────────────────────────────────────────────────────────────────────── */
function EditorialText({ activeIdx, isMobile }) {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 20, pointerEvents: "none" }}>
            <AnimatePresence mode="wait">
                {SECTIONS.map((data, idx) => {
                    if (idx !== activeIdx) return null;

                    // CREATIVE HERO LAYOUT
                    if (data.type === "hero") {
                        return (
                            <motion.div
                                key={data.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                                style={{ position: "absolute", inset: 0 }}
                            >
                                <HeroElements isMobile={isMobile} />
                                
                                <div style={{ position: "absolute", inset: 0, padding: isMobile ? "60px 40px" : "100px" }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 1.5 }}
                                        style={{ 
                                            position: "absolute", top: isMobile ? "8%" : "12%", left: 0, right: 0,
                                            display: "flex", flexDirection: "column", alignItems: "center", gap: "10px"
                                        }}
                                    >
                                        <div style={{ position: 'absolute', top: '-60px', pointerEvents: 'none', zIndex: -1 }}>
                                            <svg width={isMobile ? "180" : "250"} height={isMobile ? "180" : "250"} viewBox="0 0 200 200" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%) rotate(-5deg)", opacity: 0.15 }}>
                                                <path d="M100 160 C 80 145, 10 95, 15 55 C 20 25, 60 15, 85 35 C 92 42, 98 48, 100 55 C 102 48, 108 42, 115 35 C 140 15, 180 25, 185 55 C 190 95, 120 145, 100 160" stroke={G} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="600" className="anim-draw-heart-static" />
                                            </svg>
                                            <svg width={isMobile ? "120" : "160"} height={isMobile ? "120" : "160"} viewBox="0 0 200 200" style={{ position: "absolute", top: "40px", left: isMobile ? "-100px" : "-150px", transform: "rotate(-25deg)", opacity: 0.1 }}>
                                                <path d="M100 160 C 80 145, 10 95, 15 55 C 20 25, 60 15, 85 35 C 92 42, 98 48, 100 55 C 102 48, 108 42, 115 35 C 140 15, 180 25, 185 55 C 190 95, 120 145, 100 160" stroke={G} strokeWidth="2" fill="none" strokeLinecap="round" className="anim-pulse-heart" />
                                            </svg>
                                            <svg width={isMobile ? "120" : "160"} height={isMobile ? "120" : "160"} viewBox="0 0 200 200" style={{ position: "absolute", top: "60px", left: isMobile ? "20px" : "50px", transform: "rotate(15deg)", opacity: 0.1 }}>
                                                <path d="M100 160 C 80 145, 10 95, 15 55 C 20 25, 60 15, 85 35 C 92 42, 98 48, 100 55 C 102 48, 108 42, 115 35 C 140 15, 180 25, 185 55 C 190 95, 120 145, 100 160" stroke={G} strokeWidth="2" fill="none" strokeLinecap="round" className="anim-shimmer-heart" />
                                            </svg>
                                        </div>
                                        <div style={{ width: "1px", height: isMobile ? "20px" : "40px", background: G, opacity: 0.3 }} />
                                        <span style={{ 
                                            fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? "0.45rem" : "0.6rem", 
                                            color: G, letterSpacing: isMobile ? "0.6em" : "1.5em", textTransform: "uppercase", textAlign: "center"
                                        }}>
                                            {data.label}
                                        </span>
                                    </motion.div>

                                    {/* Bottom Names + Date */}
                                    <div style={{ position: "absolute", bottom: isMobile ? "8%" : "12%", left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <div style={{ position: "relative", width: "100%", height: isMobile ? "140px" : "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <motion.h1
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0, x: isMobile ? -15 : -60 }}
                                                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                                                style={{ 
                                                    position: "absolute", 
                                                    fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "3.5rem" : "9rem", 
                                                    fontWeight: 300, fontStyle: "italic", color: W, top: isMobile ? "0" : "-30px",
                                                }}
                                            >
                                                Nileena
                                            </motion.h1>

                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 0.6, scale: 1 }}
                                                transition={{ delay: 0.8, duration: 2 }}
                                                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "2rem" : "4rem", color: G, fontStyle: "italic", zIndex: 1 }}
                                            >
                                                &
                                            </motion.div>

                                            <motion.h1
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0, x: isMobile ? 15 : 60 }}
                                                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                                style={{ 
                                                    position: "absolute", 
                                                    fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "3.5rem" : "9rem", 
                                                    fontWeight: 300, fontStyle: "italic", color: W, bottom: isMobile ? "0" : "-30px",
                                                }}
                                            >
                                                Ajeesh
                                            </motion.h1>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.5, duration: 1.5 }}
                                            style={{ 
                                                fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", color: G, 
                                                letterSpacing: "0.5em", marginTop: "2rem", borderTop: "0.5px solid rgba(212,175,55,0.2)", paddingTop: "1.5rem"
                                            }}
                                        >
                                            {data.date}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    return (
                        <motion.div
                            key={data.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                            style={{ 
                                position: "absolute", inset: 0, padding: isMobile ? "40px" : "80px",
                                display: "flex", alignItems: data.justify, justifyContent: data.align,
                                textAlign: isMobile ? "center" : (data.align === "flex-start" ? "left" : data.align === "flex-end" ? "right" : "center")
                            }}
                        >
                            <div style={{ maxWidth: isMobile ? "100%" : "600px", display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : (data.align === "flex-start" ? "flex-start" : data.align === "flex-end" ? "flex-end" : "center") }}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                    transition={{ delay: 0.5 }}
                                    style={{ 
                                        fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem", color: G, 
                                        letterSpacing: "1em", textTransform: "uppercase", marginBottom: "2rem"
                                    }}
                                >
                                    {data.label}
                                </motion.div>

                                <h1 style={{ 
                                    fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "3rem" : "6rem", 
                                    fontWeight: 300, fontStyle: "italic", color: W, lineHeight: 1.1, marginBottom: "2.5rem"
                                }}>
                                    {data.title}
                                </h1>

                                <div style={{ width: "60px", height: "1px", background: G, opacity: 0.4, marginBottom: "2.5rem" }} />

                                <p style={{ 
                                    fontFamily: "'Montserrat', sans-serif", fontSize: isMobile ? "0.85rem" : "0.75rem", 
                                    color: S, lineHeight: 2.2, letterSpacing: "0.2em", textTransform: "uppercase",
                                    fontWeight: 200, whiteSpace: "pre-line"
                                }}>
                                    {data.body}
                                </p>

                                {data.type === "cta" && (
                                    <div style={{ marginTop: "4rem", display: "flex", gap: "1.5rem", pointerEvents: "auto" }}>
                                        <button className="p-btn">Save Date</button>
                                        <button className="p-btn ghost">Venue</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

function Preloader() {
    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontFamily: "'Cormorant Garamond', serif", color: G, fontSize: "2rem", letterSpacing: "0.3em", fontStyle: "italic" }}
            >
                N & A
            </motion.div>
        </motion.div>
    );
}

export default function EngagementInvitation() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 900);
        check(); window.addEventListener("resize", check);
        setTimeout(() => setIsReady(true), 2500);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const vh = window.innerHeight;
            const idx = Math.min(Math.floor((window.scrollY + vh * 0.5) / vh), 3);
            setActiveIdx(idx);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div style={{ background: "#050505", color: W, overflowX: "hidden" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@100;200;300&display=swap');
                *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
                body { background: #050505; -webkit-font-smoothing: antialiased; }
                .snap-sec { height: 100vh; scroll-snap-align: start; scroll-snap-stop: always; }
                
                .p-btn {
                    padding: 1rem 2.8rem;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.6rem;
                    letter-spacing: 0.4em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: 0.5s;
                    border: none;
                    font-weight: 200;
                }
                .p-btn:not(.ghost) { background: ${G}; color: #000; }
                .p-btn.ghost { background: transparent; border: 1px solid rgba(212,175,55,0.3); color: ${G}; }
                .p-btn:hover { background: ${W}; color: #000; letter-spacing: 0.5em; }

                .dust-layer {
                    background-image: radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px);
                    background-size: 150px 150px;
                    animation: dust-float 100s linear infinite;
                }
                @keyframes dust-float { from { transform: translateY(0); } to { transform: translateY(-1500px); } }

                /* Diverse Heart Animations - With Delay to start after preloader */
                @keyframes drawHeartOnce { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
                .anim-draw-heart-static { 
                    animation: drawHeartOnce 5s ease-in-out forwards; 
                    animation-delay: 3s; /* Starts after the preloader (2.5s) fades out */
                }

                @keyframes pulseHeart { 
                    0% { transform: scale(1); opacity: 0.05; }
                    50% { transform: scale(1.15); opacity: 0.2; }
                    100% { transform: scale(1); opacity: 0.05; }
                }
                .anim-pulse-heart { 
                    animation: pulseHeart 4s ease-in-out infinite; 
                    transform-origin: center;
                    animation-delay: 3.5s;
                }

                @keyframes shimmerHeart {
                    0% { opacity: 0.1; stroke-width: 2; }
                    50% { opacity: 0.3; stroke-width: 4; }
                    100% { opacity: 0.1; stroke-width: 2; }
                }
                .anim-shimmer-heart { 
                    animation: shimmerHeart 3s ease-in-out infinite; 
                    animation-delay: 3.2s;
                }
            `}</style>

            <AnimatePresence>{!isReady && <Preloader />}</AnimatePresence>

            <CinematicBg activeIdx={activeIdx} scrollYProgress={scrollYProgress} isMobile={isMobile} />
            <EditorialText activeIdx={activeIdx} isMobile={isMobile} />

            <div style={{ position: "relative", zIndex: 1 }}>
                {SECTIONS.map((s) => <div key={s.id} className="snap-sec" />)}
            </div>
        </div>
    );
}