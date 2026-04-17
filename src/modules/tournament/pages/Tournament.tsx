/**
 * @file src\modules\tournament\pages\Tournament.tsx
 * @description Main source file for the DemoFront application architecture.
 */
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Info, Trophy, Users, Calendar, MapPin, Award, FileText, ChevronDown } from "lucide-react";
import { useState } from "react";

const P = {
  primary: "#B81C1C",
  secondary: "#C4841D",
  success: "#17C964",
  info: "#0066FE",
  default: "#6E6E73",
  textPrimary: "#1C1C1E",
  bg: "#F2F2F7",
};

const faqs = [
  {
    q: "¿Cuál es el formato del torneo?",
    a: "El torneo sigue un formato de fase de grupos seguido de eliminación directa. Los equipos se dividen en grupos de 4, donde los 2 mejores de cada grupo avanzan a cuartos de final.",
  },
  {
    q: "¿Cuántos equipos participan?",
    a: "Participan un total de 8 equipos seleccionados mediante proceso de inscripción y evaluación previa. Cada equipo cuenta con entre 3 y 5 integrantes.",
  },
  {
    q: "¿Cómo se puntúa cada partido?",
    a: "Victoria: 3 puntos. Empate: 1 punto. Derrota: 0 puntos. En caso de empate en puntos al final de la fase de grupos, se aplican criterios de desempate.",
  },
  {
    q: "¿Dónde se realizan los partidos?",
    a: "Todos los partidos se llevan a cabo en el Complejo Deportivo TECHCUP, ubicado en el Arena Central. El acceso es libre para el público con registro previo.",
  },
];

const prizes = [
  { place: "1°", label: "Campeón", prize: "$5,000 USD", icon: "🥇", color: "#C4841D", bg: "rgba(196,132,29,0.08)", border: "rgba(196,132,29,0.22)" },
  { place: "2°", label: "Subcampeón", prize: "$2,500 USD", icon: "🥈", color: "#8A8A8E", bg: "rgba(138,138,142,0.08)", border: "rgba(138,138,142,0.22)" },
  { place: "3°", label: "Tercer Lugar", prize: "$1,000 USD", icon: "🥉", color: "#CD7F32", bg: "rgba(205,127,50,0.08)", border: "rgba(205,127,50,0.22)" },
];

const infoCards = [
  { icon: Users, label: "Equipos", value: "8 equipos", color: P.primary, bg: "rgba(184,28,28,0.08)" },
  { icon: Calendar, label: "Duración", value: "15–30 Mar", color: P.secondary, bg: "rgba(196,132,29,0.08)" },
  { icon: MapPin, label: "Sede", value: "Arena Central", color: P.info, bg: "rgba(0,102,254,0.08)" },
  { icon: Trophy, label: "Premio Total", value: "$8,500 USD", color: P.success, bg: "rgba(23,201,100,0.08)" },
];

function SectionLabel({ text, color, icon }: { text: string; color: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color, textTransform: "uppercase" }}>
        {text}
      </span>
      {icon && <span className="flex items-center" style={{ color }}>{icon}</span>}
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />
    </div>
  );
}

import React from "react";

export function Tournament() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-24 lg:pb-0" style={{ backgroundColor: P.bg }}>

      {/* ── Header ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 border-b px-6"
        style={{
          background: "rgba(242,242,247,0.85)",
          borderColor: "rgba(0,0,0,0.06)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center gap-3 h-[60px]">
          <motion.div
            whileHover={{ scale: 1.05, x: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer flex-shrink-0"
            style={{ backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <ArrowLeft style={{ width: 16, height: 16, color: P.default }} />
          </motion.div>
          <span className="flex-1" style={{ fontWeight: 800, color: P.primary, fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
            TECHCUP
          </span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: `${P.info}12` }}>
            <Info style={{ width: 14, height: 14, color: P.info }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: P.info }}>Torneo</span>
          </div>
        </div>
      </motion.header>

      <main className="max-w-3xl mx-auto px-6 sm:px-10 pt-10 pb-16 space-y-10">

        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.45, ease: "easeOut" }}
        >
          <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.2rem)", fontWeight: 800, color: P.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.12 }}>
            Información del Torneo
          </h1>
          <p className="mt-2" style={{ fontSize: "0.88rem", fontWeight: 500, color: P.default }}>
            Todo lo que necesitas saber sobre TECHCUP 2026
          </p>
        </motion.div>

        {/* ── Stats overview ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.4 }}
        >
          <SectionLabel text="Resumen" color={P.primary} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {infoCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: "easeOut" }}
                  whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.10)" }}
                  className="flex flex-col items-center text-center p-5 rounded-[20px] bg-white transition-all duration-300"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: card.bg }}
                  >
                    <Icon style={{ width: 20, height: 20, color: card.color }} />
                  </div>
                  <p style={{ fontSize: "0.68rem", fontWeight: 600, color: P.default, textTransform: "uppercase", letterSpacing: "0.08em" }}>{card.label}</p>
                  <p className="mt-1" style={{ fontSize: "0.82rem", fontWeight: 700, color: P.textPrimary }}>{card.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Prizes ── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.4 }}
        >
          <SectionLabel text="Premios" color={P.secondary} icon={<Award style={{ width: 13, height: 13 }} />} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {prizes.map((prize, i) => (
              <motion.div
                key={prize.place}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.40 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(0,0,0,0.10)" }}
                className="flex flex-col items-center text-center p-7 rounded-[20px] bg-white transition-all duration-300"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  border: `1.5px solid ${prize.border}`,
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>{prize.icon}</span>
                <p className="mt-3" style={{ fontSize: "0.65rem", fontWeight: 700, color: prize.color, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  {prize.place} {prize.label}
                </p>
                <p className="mt-1.5" style={{ fontSize: "1.4rem", fontWeight: 800, color: P.textPrimary, letterSpacing: "-0.02em" }}>
                  {prize.prize}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── FAQ ── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.4 }}
        >
          <SectionLabel text="Preguntas Frecuentes" color={P.info} icon={<FileText style={{ width: 13, height: 13 }} />} />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56 + i * 0.07, duration: 0.35 }}
                className="bg-white rounded-[20px] overflow-hidden"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4.5 text-left transition-colors duration-200"
                  style={{ paddingTop: "1.1rem", paddingBottom: "1.1rem" }}
                >
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: P.textPrimary, paddingRight: "1rem" }}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: openFaq === i ? `${P.info}12` : P.bg }}
                  >
                    <ChevronDown style={{ width: 15, height: 15, color: openFaq === i ? P.info : P.default }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="px-6 pb-5"
                        style={{ fontSize: "0.875rem", color: P.default, fontWeight: 500, lineHeight: 1.65, borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "0.9rem" }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
}



