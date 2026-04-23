import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionTemplate } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   CONTENT & CONFIG
───────────────────────────────────────────────────────────────────────── */
const IMAGES = {
    img1: "/assets/1.JPG",
    img2: "/assets/2.JPG",
    img3: "/assets/3.JPG",
    img4: "/assets/4.jpg",
};

const preloadImage = (src) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
    });
};

const SECTIONS = [
    { id: "hero", img: "img1", label: "The Union Of", title: "Libin & Aida", subtitle: "03 · 05 · 26", type: "bottom-left" },
    { id: "story1", img: "img2", label: "CHAPTER I", title: "Our Story", body: "A beautiful journey beginning with a single step.", type: "bottom-left" },
    { id: "story2", img: "img3", label: "CHAPTER II", title: "Two Hearts", body: "Two lives blending into one beautiful adventure.", type: "bottom-right" },
    { id: "details", img: "img4", label: "THE ENGAGEMENT", title: "Join Us", body: "03 · 05 · 2026\n3:00 PM\nEdassery Sealine Villa Stay    \nCherai, Kochi", type: "cta-glass" },
];

const IMG_POS_D = { img1: "50% 30%", img2: "50% 20%", img3: "50% 20%", img4: "50% 30%" };
const IMG_POS_M = { img1: "50% 35%", img2: "50% 20%", img3: "50% 20%", img4: "50% 35%" };

/* ─────────────────────────────────────────────────────────────────────────
   BG STAGE — Precise Section-Scoped Scanning
───────────────────────────────────────────────────────────────────────── */
function BgStage({ activeIdx, isMobile }) {
    const targetImg = SECTIONS[activeIdx]?.img;

    const base = { position: "absolute", inset: "-15%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundColor: "#040301" };

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", background: "#040301" }}>
            {/* Pure Framer Motion declarative fade transitions */}
            <AnimatePresence>
                {targetImg && (
                    <motion.div
                        key={targetImg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                        style={{
                            ...base,
                            backgroundImage: `url("${IMAGES[targetImg]}")`,
                            backgroundPosition: isMobile ? IMG_POS_M[targetImg] : IMG_POS_D[targetImg],
                            zIndex: 1
                        }}
                    />
                )}
            </AnimatePresence>

            <div style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none", background: "radial-gradient(circle at 50% 40%, transparent 0%, rgba(4,3,1,0.2) 60%, rgba(4,3,1,0.85) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 7, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(4,3,1,0.5), transparent 40%, transparent 60%, rgba(4,3,1,0.98) 100%)" }} />
        </div>
    );
}

const G = "#D4AF37"; const W = "#FFFFFF"; const Wm = "rgba(255,255,255,0.85)";

function SplitText({ text, delay = 0 }) {
    if (!text) return null;
    return (
        <div style={{ display: "inline-block" }}>
            {Array.from(text).map((char, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.6, delay: delay + i * 0.02, ease: [0.16, 1, 0.3, 1] }} style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}>{char}</motion.span>
            ))}
        </div>
    );
}

const Headline = ({ children, size = "max(3.2rem, 8vw)", style = {} }) => (
    <div style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, fontSize: size, color: W, lineHeight: 1.0, letterSpacing: "-0.01em", ...style }}><SplitText text={children} /></div>
);
const SubHeadline = ({ children, style = {} }) => (
    <div style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400, fontSize: "max(1.5rem, 3vw)", fontStyle: "normal", color: G, marginTop: "0.2rem", ...style }}><SplitText text={children} delay={0.2} /></div>
);
const Label = ({ children, style = {} }) => (
    <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "calc(0.5rem + 0.2vw)", letterSpacing: "0.6em", textTransform: "uppercase", color: G, ...style }}><SplitText text={children} delay={0.1} /></div>
);
const BodyText = ({ children, style = {} }) => (
    <motion.div initial={{ opacity: 0, y: 15, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.2, delay: 0.4 }} style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "max(0.85rem, 1.1vw)", color: Wm, lineHeight: 1.8, letterSpacing: "0.04em", whiteSpace: "pre-line", ...style }}>{children}</motion.div>
);
const Rule = ({ width = 60, style = {} }) => (
    <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }} style={{ display: "flex", alignItems: "center", gap: "1rem", ...style }}>
        <div style={{ height: "0.5px", width, background: `linear-gradient(to right, transparent, ${G})` }} /><div style={{ width: "3px", height: "3px", border: `1px solid ${G}`, transform: "rotate(45deg)" }} /><div style={{ height: "0.5px", width, background: `linear-gradient(to left, transparent, ${G})` }} />
    </motion.div>
);

function TextStage({ activeIdx, isMobile, onSave }) {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 20, pointerEvents: "none" }}>
            <AnimatePresence>
                {SECTIONS.map((data, idx) => {
                    if (idx !== activeIdx) return null;

                    const isRight = data.type === "bottom-right";
                    const isCenter = data.type === "bottom-center" || data.type === "cta-glass" || data.type === "family-scroll" || data.type === "text-only-blank";
                    const isGlass = data.type === "cta-glass";
                    const isFullCenter = data.type === "text-only-blank";
                    const isBottomCenter = data.type === "bottom-center" || data.type === "family-scroll";

                    // Determine horizontal positioning
                    const left = isCenter ? "50%" : (isRight ? "auto" : (isMobile ? "8vw" : "10vw"));
                    const right = isRight ? (isMobile ? "8vw" : "10vw") : "auto";
                    const x = isCenter ? "-50%" : "0%";

                    // Determine vertical positioning
                    const top = isFullCenter ? "50%" : "auto";
                    const bottom = isFullCenter ? "auto" : (isBottomCenter ? (isMobile ? "12vh" : "18vh") : (isMobile ? "12vh" : "15vh"));
                    const originY = isFullCenter ? "-50%" : "0%"; // We add the entrance/exit animation offsets to this base

                    return (
                        <motion.div
                            key={data.id}
                            initial={{ opacity: 0, x, y: `calc(${originY} + 40px)`, filter: "blur(12px)" }}
                            animate={{ opacity: 1, x, y: originY, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x, y: `calc(${originY} - 40px)`, filter: "blur(12px)" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: "absolute",
                                left, right, top, bottom,
                                textAlign: isCenter ? "center" : isRight ? "right" : "left",
                                maxWidth: isFullCenter ? "80vw" : (isGlass ? "min(900px, 80vw)" : "min(1200px, 80vw)"),
                                width: "100%",
                                pointerEvents: "auto",
                                ...(isGlass ? { background: "rgba(5,4,2,0.55)", border: "1px solid rgba(212,175,55,0.20)", backdropFilter: "blur(80px)", padding: isMobile ? "10vw 6vw" : "6vw 8vw", boxShadow: "0 80px 160px rgba(0,0,0,0.8)", borderRadius: "2px" } : {})
                            }}
                        >
                            <Label style={{ marginBottom: isMobile ? "0.8rem" : "1rem" }}>{data.label}</Label>
                            <Headline size={isMobile ? (isFullCenter ? "max(1.8rem, 8vw)" : "max(2.5rem, 9vw)") : (isFullCenter ? "max(2.8rem, 5.5vw)" : "max(3.2rem, 7vw)")} style={{ whiteSpace: isMobile ? "normal" : "nowrap" }}>{data.title}</Headline>
                            <Rule width={isFullCenter ? 100 : 50} style={{ margin: (isMobile ? "1rem 0" : "1.2rem 0"), justifyContent: isCenter ? "center" : isRight ? "flex-end" : "flex-start" }} />
                            {data.subtitle && <SubHeadline>{data.subtitle}</SubHeadline>}
                            {data.body && <BodyText style={{ maxWidth: isFullCenter ? 650 : 450, marginTop: "1rem", marginLeft: (isCenter || isRight) ? "auto" : 0, marginRight: isCenter ? "auto" : 0, fontSize: isFullCenter ? "max(1rem, 1.3vw)" : "max(0.85rem, 1.1vw)" }}>{data.body}</BodyText>}
                            {isGlass && (
                                <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", marginTop: isMobile ? "4rem" : "5rem" }}>
                                    <button onClick={onSave} className="lux-btn prime">Save Date</button>
                                    <a href="https://maps.app.goo.gl/5hhUFH1Bdn6ayEFa6?g_st=iw" target="_blank" rel="noreferrer" className="lux-btn ghost">Directions</a>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

function Preloader({ isReady, onEnter }) {
    return (
        <motion.div
            exit={{ y: "-100%", opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
                // This will attempt to play audio when the fade animation is done.
                // Note: Most mobile browsers will still block this until they detect a manual user interaction.
            }}
            style={{
                position: "fixed", inset: 0, zIndex: 1000,
                background: "#040301",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
            }}
        >
            <div style={{ position: "relative", width: "100px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Radiating Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                        style={{ position: "absolute", width: "40px", height: "40px", border: `0.5px solid ${G}`, borderRadius: "50%" }}
                    />
                ))}

                {/* Heart Drawing */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ position: "relative", zIndex: 10 }}>
                    <motion.path
                        d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21z"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        stroke={G}
                        strokeWidth="0.8"
                    />
                    <motion.path
                        d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21z"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        fill={G}
                    />
                </svg>
            </div>

            <div style={{ marginTop: "3rem", textAlign: "center" }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.4rem", fontWeight: 400, letterSpacing: "0.2em", color: W, marginBottom: "0.8rem" }}
                >
                    A Union of Two Souls
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1.0, duration: 1 }}
                    style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "1.2em", color: W, paddingLeft: "1.2em" }}
                >
                    Libin & Aida
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function EngagementInvitation() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Toggle Audio manually
    const toggleAudio = (e) => {
        if (e) e.stopPropagation();
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

    useEffect(() => {
        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
            }
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("touchstart", handleInteraction);
        };
        document.addEventListener("click", handleInteraction);
        document.addEventListener("touchstart", handleInteraction);
        return () => {
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("touchstart", handleInteraction);
        };
    }, []);

    useEffect(() => {
        // Preload all 4 images before dropping the preloader veil, combined with minimum 2.2s delay
        const initialImages = [IMAGES.img1, IMAGES.img2, IMAGES.img3, IMAGES.img4];
        const minTime = new Promise(resolve => setTimeout(resolve, 2200));
        const imgsLoad = Promise.all(initialImages.map(preloadImage));

        Promise.all([minTime, imgsLoad]).then(() => {
            setIsReady(true);
            // Attempt to start audio automatically when fade happens
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
            }
        });
    }, []);

    useEffect(() => {
        const checkMob = () => setIsMobile(window.innerWidth < 900);
        checkMob(); window.addEventListener("resize", checkMob);

        // Layout: sections 0-3 → 100vh each
        let prevIdx = -1;
        let ticking = false;
        const detectSection = () => {
            const vh = window.innerHeight;
            const scrollY = window.scrollY;
            const midpoint = scrollY + vh * 0.5;

            let idx = Math.min(Math.floor(midpoint / vh), 3);

            if (idx !== prevIdx) {
                prevIdx = idx;
                setActiveIdx(idx);
            }
        };
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { detectSection(); ticking = false; });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        detectSection(); // initial
        return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("resize", checkMob); };
    }, []);

    const saveCalendar = () => {
        const ev = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "BEGIN:VEVENT",
            "SUMMARY:Engagement – Libin & Aida",
            "DTSTART:20260503T150000",
            "LOCATION:Edassery Sealine Villa Stay, Cherai, Kochi",
            "DESCRIPTION:Join us for the engagement of Libin & Aida.",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");
        const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([ev], { type: "text/calendar" })); a.download = "Engagement_Invitation.ics"; a.click();
    };

    return (
        <div style={{ background: "#040301", color: W, overflowX: "hidden" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@300;400;600;700&display=swap');
                *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
                body { -webkit-font-smoothing: antialiased; letter-spacing: 0.01em; background: #040301; overflow-x: hidden; }
                .snap-section { height: 100vh; scroll-snap-align: start; scroll-snap-stop: always; position: relative; }
                .family-section { scroll-snap-align: start; scroll-snap-stop: always; position: relative; }
                @media (max-width: 899px) { .family-section { height: 180vh; } }
                @media (min-width: 900px) { .family-section { height: 100vh; } }
                .lux-btn { padding: 1.4rem 3.5rem; font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; cursor: pointer; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); border: none; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; min-width: 220px; }
                .lux-btn:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
                .lux-btn:active { transform: translateY(0); }
                .lux-btn.prime { background: ${G}; color: #000; }
                .lux-btn.ghost { border: 1px solid ${G}; color: ${G}; background: transparent; }

                /* Music Waves */
                .music-wave { width: 2px; background: ${G}; border-radius: 1px; animation: wave 1.2s ease-in-out infinite; transform-origin: bottom; }
                @keyframes wave {
                    0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
                    50% { transform: scaleY(1.2); opacity: 1; }
                }
                .wave-1 { animation-delay: 0.1s; }
                .wave-2 { animation-delay: 0.3s; }
                .wave-3 { animation-delay: 0.5s; }
                .wave-4 { animation-delay: 0.2s; }

                /* Pulse for scroll indicator */
                @keyframes pulse {
                    0% { transform: translate(-50%, 0); opacity: 0.3; }
                    50% { transform: translate(-50%, 10px); opacity: 0.8; }
                    100% { transform: translate(-50%, 0); opacity: 0.3; }
                }
            `}</style>
            <AnimatePresence>{!isReady && <Preloader />}</AnimatePresence>
            <BgStage scrollYProgress={scrollYProgress} activeIdx={activeIdx} isMobile={isMobile} />
            <TextStage activeIdx={activeIdx} isMobile={isMobile} onSave={saveCalendar} />

            {/* Audio Element & Floating Toggle */}
            <audio ref={audioRef} src="/assets/song.mp3" loop />
            <button
                onClick={toggleAudio}
                style={{
                    position: "fixed", bottom: isMobile ? "20px" : "30px", right: isMobile ? "20px" : "30px", zIndex: 100,
                    background: "rgba(5,4,2,0.5)", backdropFilter: "blur(12px)", border: `1px solid rgba(212,175,55,0.25)`,
                    color: G, width: isMobile ? "40px" : "50px", height: isMobile ? "40px" : "50px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)", transition: "all 0.4s ease"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(212,175,55,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(5,4,2,0.5)"; }}
            >
                {isPlaying ? (
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "14px" }}>
                        <div className="music-wave wave-1" style={{ height: "100%" }} />
                        <div className="music-wave wave-2" style={{ height: "100%" }} />
                        <div className="music-wave wave-3" style={{ height: "100%" }} />
                        <div className="music-wave wave-4" style={{ height: "100%" }} />
                    </div>
                ) : (
                    <svg width={isMobile ? "18" : "22"} height={isMobile ? "18" : "22"} viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6 }}>
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                )}
            </button>

            {activeIdx === 0 && (
                <div style={{
                    position: "fixed", bottom: isMobile ? "20px" : "30px", left: "50%", transform: "translateX(-50%)",
                    zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                    animation: "pulse 2s infinite ease-in-out"
                }}>
                    <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, transparent, ${G})` }} />
                    <span style={{ fontFamily: "Manrope", fontSize: "0.5rem", color: G, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
                </div>
            )}

            <div style={{ position: "relative", zIndex: 10 }}>
                {SECTIONS.map((s) => <div key={s.id} id={s.id} className={s.id === 'family' ? 'family-section' : 'snap-section'} />)}
            </div>
        </div>
    );
}