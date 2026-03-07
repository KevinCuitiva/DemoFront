import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Edit2,
  Settings,
  Bell,
  KeyRound,
  ShieldCheck,
  LayoutGrid,
  Activity,
  User,
} from "lucide-react";

const P = {
  primary: "#B81C1C",
  secondary: "#C4841D",
  success: "#17C964",
  info: "#0066FE",
  default: "#6E6E73",
  textPrimary: "#1C1C1E",
  bg: "#F2F2F7",
};

type Tab = "overview" | "settings" | "activity";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
      style={{ backgroundColor: enabled ? P.success : "#E5E5EA" }}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
      />
    </button>
  );
}

function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color, textTransform: "uppercase" }}>
        {text}
      </span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />
    </div>
  );
}

const activityLog = [
  { action: "Inscrito en torneo TECHCUP Spring", time: "Hace 2 días", color: P.success },
  { action: "Cambio de contraseña realizado", time: "Hace 3 días", color: P.info },
  { action: "Perfil actualizado", time: "Hace 1 semana", color: P.secondary },
  { action: "Nuevo logro: Top Scorer", time: "Hace 2 semanas", color: P.primary },
  { action: "Partido completado vs Equipo Nova", time: "Hace 3 semanas", color: P.default },
];

export function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  const [tournamentAlerts, setTournamentAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Rivers");
  const [email, setEmail] = useState("alex.rivers@techcup.io");
  const [bio, setBio] = useState(
    "Apasionado por la integración de análisis de datos en el entrenamiento deportivo. Entrenador part-time en TechCup Academy."
  );

  // Detectar el contexto del usuario
  const savedContext = sessionStorage.getItem("userContext");
  const [userContext, setUserContext] = useState<string>(savedContext || "user");

  useEffect(() => {
    const context = sessionStorage.getItem("userContext");
    if (context) {
      setUserContext(context);
    }
  }, []);

  // Determinar el dashboard de retorno y configuración de color
  const dashboardPath = userContext === "admin" ? "/dashboard-admin" : userContext === "arbitro" ? "/dashboard-arbitro" : "/dashboard";
  const badgeColor = userContext === "admin" ? P.success : userContext === "arbitro" ? P.secondary : P.primary;
  const badgeLabel = userContext === "admin" ? "Administrador" : userContext === "arbitro" ? "Árbitro" : "Usuario";

  const handleBack = () => {
    navigate(dashboardPath);
  };

  const tabs: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
    { id: "overview", label: "Resumen", icon: LayoutGrid },
    { id: "settings", label: "Ajustes", icon: Settings },
    { id: "activity", label: "Actividad", icon: Activity },
  ];

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
            onClick={handleBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer flex-shrink-0"
            style={{ backgroundColor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <ArrowLeft style={{ width: 16, height: 16, color: P.default }} />
          </motion.div>
          <span className="flex-1" style={{ fontWeight: 800, color: P.primary, fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
            TECHCUP
          </span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: `${badgeColor}12` }}>
            <User style={{ width: 14, height: 14, color: badgeColor }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: badgeColor }}>{badgeLabel}</span>
          </div>
        </div>
      </motion.header>

      <main className="max-w-3xl mx-auto px-6 sm:px-10 pt-10 pb-16 space-y-6">

        {/* ── Profile hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.45, ease: "easeOut" }}
          className="bg-white rounded-[20px] p-6"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1759701546662-b79f5d881124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGF0aGxldGUlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI2MzUxNDB8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Alex Rivers"
                className="w-16 h-16 rounded-2xl object-cover"
                style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}
              />
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white"
                style={{ backgroundColor: P.success }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: P.textPrimary, letterSpacing: "-0.02em" }}>
                Alex Rivers
              </h2>
              <p className="mt-0.5" style={{ fontSize: "0.82rem", color: P.default, fontWeight: 500 }}>
                alex.rivers@techcup.io
              </p>
              <div className="flex flex-wrap gap-2 mt-2.5">
                <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${P.secondary}14`, color: P.secondary, fontWeight: 700, letterSpacing: "0.05em" }}>
                  PRO ATHLETE
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${P.primary}12`, color: P.primary, fontWeight: 700, letterSpacing: "0.05em" }}>
                  TECHLEAD ELITE
                </span>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-white flex-shrink-0"
              style={{ backgroundColor: P.secondary, fontWeight: 600, fontSize: "0.82rem", boxShadow: `0 4px 14px ${P.secondary}35` }}
            >
              Ver Perfil Público
              <ExternalLink style={{ width: 13, height: 13 }} />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="sm:hidden mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white"
            style={{ backgroundColor: P.secondary, fontWeight: 600, fontSize: "0.82rem" }}
          >
            Ver Perfil Público
            <ExternalLink style={{ width: 13, height: 13 }} />
          </motion.button>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.4 }}
          className="bg-white rounded-[20px] overflow-hidden"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          {/* Tab bar */}
          <div className="flex" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 relative transition-all duration-200"
                  style={{
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? P.textPrimary : P.default,
                    fontSize: "0.82rem",
                  }}
                >
                  <Icon style={{ width: 15, height: 15 }} />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="tab-bar"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: P.secondary }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Tab Content ── */}
          <AnimatePresence mode="wait">
            {/* Overview */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="p-6"
              >
                <SectionLabel text="Estadísticas" color={P.primary} />
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: "Partidos Jugados", value: "42", color: P.primary },
                    { label: "Victorias", value: "28", color: P.success },
                    { label: "Torneos", value: "8", color: P.secondary },
                    { label: "Puntos Totales", value: "2,450", color: P.info },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center p-4 rounded-2xl"
                      style={{ backgroundColor: P.bg }}
                    >
                      <p style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>
                        {s.value}
                      </p>
                      <p className="mt-0.5" style={{ fontSize: "0.75rem", color: P.default, fontWeight: 500 }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <SectionLabel text="Biografía" color={P.default} />
                <p style={{ fontSize: "0.88rem", color: P.default, fontWeight: 500, lineHeight: 1.65 }}>
                  {bio}
                </p>
              </motion.div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="divide-y"
                style={{ "--tw-divide-opacity": 1, borderColor: "rgba(0,0,0,0.05)" } as React.CSSProperties}
              >
                {/* Personal Info */}
                <div className="p-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <SectionLabel text="Información Personal" color={P.secondary} />
                    </div>
                    <button className="flex items-center gap-1 flex-shrink-0 -mt-1" style={{ fontSize: "0.78rem", fontWeight: 600, color: P.secondary }}>
                      <Edit2 style={{ width: 12, height: 12 }} />
                      Editar
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Nombre", value: firstName, setter: setFirstName },
                        { label: "Apellido", value: lastName, setter: setLastName },
                      ].map((f) => (
                        <div key={f.label}>
                          <label className="block mb-1.5" style={{ fontSize: "0.75rem", fontWeight: 600, color: P.default }}>
                            {f.label}
                          </label>
                          <input
                            type="text"
                            value={f.value}
                            onChange={(e) => f.setter(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl outline-none transition-all duration-200"
                            style={{
                              fontSize: "0.88rem",
                              fontWeight: 500,
                              backgroundColor: P.bg,
                              border: "1.5px solid transparent",
                              color: P.textPrimary,
                            }}
                            onFocus={(e) => (e.target.style.borderColor = P.secondary)}
                            onBlur={(e) => (e.target.style.borderColor = "transparent")}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block mb-1.5" style={{ fontSize: "0.75rem", fontWeight: 600, color: P.default }}>
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl outline-none transition-all duration-200"
                        style={{ fontSize: "0.88rem", fontWeight: 500, backgroundColor: P.bg, border: "1.5px solid transparent", color: P.textPrimary }}
                        onFocus={(e) => (e.target.style.borderColor = P.secondary)}
                        onBlur={(e) => (e.target.style.borderColor = "transparent")}
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5" style={{ fontSize: "0.75rem", fontWeight: 600, color: P.default }}>
                        Biografía
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        className="w-full px-3.5 py-2.5 rounded-xl outline-none transition-all duration-200 resize-none"
                        style={{ fontSize: "0.88rem", fontWeight: 500, backgroundColor: P.bg, border: "1.5px solid transparent", color: P.textPrimary }}
                        onFocus={(e) => (e.target.style.borderColor = P.secondary)}
                        onBlur={(e) => (e.target.style.borderColor = "transparent")}
                      />
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="p-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="flex items-start justify-between mb-5">
                    <SectionLabel text="Seguridad y Acceso" color={P.info} />
                    <button className="flex items-center gap-1 flex-shrink-0 -mt-1" style={{ fontSize: "0.78rem", fontWeight: 600, color: P.info }}>
                      <Settings style={{ width: 12, height: 12 }} />
                      Gestionar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: KeyRound, label: "Contraseña", sub: "Actualizada hace 3 meses", color: P.info, action: "Cambiar" },
                      { icon: ShieldCheck, label: "Autenticación 2FA", sub: "Actualmente habilitada", color: P.success, action: "Configurar" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 p-3.5 rounded-2xl"
                          style={{ backgroundColor: P.bg }}
                        >
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}12` }}>
                            <Icon style={{ width: 16, height: 16, color: item.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p style={{ fontSize: "0.88rem", fontWeight: 600, color: P.textPrimary }}>{item.label}</p>
                            <p style={{ fontSize: "0.75rem", color: item.color === P.success ? item.color : P.default, fontWeight: 500 }}>{item.sub}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-3 py-1.5 rounded-xl bg-white flex-shrink-0"
                            style={{ fontSize: "0.75rem", fontWeight: 600, color: P.textPrimary, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
                          >
                            {item.action}
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notifications */}
                <div className="p-6">
                  <SectionLabel text="Notificaciones" color={P.primary} />
                  <div className="space-y-5">
                    {[
                      { label: "Alertas del Torneo", sub: "Recibe notificaciones cuando inicia un nuevo torneo.", value: tournamentAlerts, setter: setTournamentAlerts },
                      { label: "Correos de Marketing", sub: "Actualizaciones sobre nuevas funciones de la plataforma.", value: marketingEmails, setter: setMarketingEmails },
                    ].map((n) => (
                      <div key={n.label} className="flex items-start justify-between gap-4">
                        <div>
                          <p style={{ fontSize: "0.88rem", fontWeight: 600, color: P.textPrimary }}>{n.label}</p>
                          <p className="mt-0.5" style={{ fontSize: "0.75rem", color: P.default, fontWeight: 500 }}>{n.sub}</p>
                        </div>
                        <Toggle enabled={n.value} onToggle={() => n.setter((v) => !v)} />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-8 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-5 py-2.5 rounded-xl"
                      style={{ fontSize: "0.85rem", fontWeight: 600, color: P.default, backgroundColor: P.bg }}
                    >
                      Descartar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-5 py-2.5 rounded-xl text-white"
                      style={{ fontSize: "0.85rem", fontWeight: 600, backgroundColor: P.secondary, boxShadow: `0 4px 14px ${P.secondary}35` }}
                    >
                      Guardar Cambios
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Activity */}
            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="p-6"
              >
                <SectionLabel text="Actividad Reciente" color={P.primary} />
                <div className="space-y-2">
                  {activityLog.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 p-3.5 rounded-2xl transition-colors duration-200"
                      style={{ backgroundColor: "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = P.bg)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: "0.88rem", fontWeight: 600, color: P.textPrimary }}>{item.action}</p>
                        <p className="mt-0.5" style={{ fontSize: "0.75rem", color: P.default, fontWeight: 500 }}>{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </main>
    </div>
  );
}
