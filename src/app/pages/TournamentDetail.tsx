import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import logoTechcup from "@/assets/logo.png";
import {
  User,
  LogOut,
  ChevronLeft,
  Trophy,
  Users,
  Calendar,
  DollarSign,
  Edit,
  Eye,
  AlertCircle,
  Clock,
  MapPin,
  Plus,
  X,
  CheckCircle,
  Save,
} from "lucide-react";

// ── Palette ───────────────────────────────────────
const P = {
  primary: "#B81C1C",
  secondary: "#C4841D",
  success: "#17C964",
  info: "#0066FE",
  default: "#6E6E73",
  textPrimary: "#1C1C1E",
  bg: "#F2F2F7",
};

// ── Interfaces ────────────────────────────────────
interface Team {
  id: number;
  name: string;
  decanatura: string;
  players: number;
  status: "active" | "eliminated";
  eliminatedDate?: string;
}

interface Match {
  id: number;
  date: string;
  time: string;
  court: string;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  scorers?: Array<{ player: string; team: string; minute: string }>;
  yellowCards?: Array<{ player: string; team: string; minute: string }>;
  redCards?: Array<{ player: string; team: string; minute: string }>;
  status: "pending" | "in-progress" | "completed";
}

// ── Mock data ─────────────────────────────────────
const mockTeams: Team[] = [
  { id: 1, name: "Los Tigres FC", decanatura: "Ingeniería de Sistemas", players: 7, status: "active" },
  { id: 2, name: "Relámpagos", decanatura: "Ingeniería Industrial", players: 7, status: "active" },
  { id: 3, name: "Dragones Rojos", decanatura: "Ingeniería Civil", players: 7, status: "active" },
  { id: 4, name: "Aguilas Doradas", decanatura: "Ingeniería Electrónica", players: 7, status: "active" },
  { id: 5, name: "Titanes", decanatura: "Ingeniería Mecánica", players: 7, status: "eliminated", eliminatedDate: "2026-03-05" },
  { id: 6, name: "Leones FC", decanatura: "Ingeniería Biomédica", players: 7, status: "eliminated", eliminatedDate: "2026-03-04" },
];

const mockMatches: Match[] = [
  {
    id: 1,
    date: "2026-03-10",
    time: "14:00",
    court: "Cancha 1",
    teamA: "Los Tigres FC",
    teamB: "Relámpagos",
    scoreA: 3,
    scoreB: 2,
    scorers: [
      { player: "Juan Pérez", team: "Los Tigres FC", minute: "11'" },
      { player: "Luis Díaz", team: "Relámpagos", minute: "23'" },
      { player: "Mateo Silva", team: "Los Tigres FC", minute: "46'" },
      { player: "Carlos Rivas", team: "Relámpagos", minute: "58'" },
      { player: "Andrés Gil", team: "Los Tigres FC", minute: "74'" },
    ],
    yellowCards: [
      { player: "Sergio Mora", team: "Relámpagos", minute: "34'" },
      { player: "David Luna", team: "Los Tigres FC", minute: "67'" },
    ],
    redCards: [
      { player: "Felipe Rojas", team: "Relámpagos", minute: "82'" },
    ],
    status: "completed",
  },
  {
    id: 2,
    date: "2026-03-10",
    time: "16:00",
    court: "Cancha 2",
    teamA: "Dragones Rojos",
    teamB: "Aguilas Doradas",
    scoreA: 1,
    scoreB: 1,
    scorers: [
      { player: "Miguel Soto", team: "Dragones Rojos", minute: "18'" },
      { player: "Daniel Ariza", team: "Aguilas Doradas", minute: "52'" },
    ],
    yellowCards: [{ player: "Julio Peña", team: "Dragones Rojos", minute: "40'" }],
    redCards: [],
    status: "in-progress",
  },
  { id: 3, date: "2026-03-12", time: "14:00", court: "Cancha 1", teamA: "Los Tigres FC", teamB: "Dragones Rojos", status: "pending" },
  { id: 4, date: "2026-03-12", time: "16:00", court: "Cancha 2", teamA: "Relámpagos", teamB: "Aguilas Doradas", status: "pending" },
];

// ── TournamentDetail ──────────────────────────────
export function TournamentDetail() {
  useParams();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [activeTab, setActiveTab] = useState<"matches" | "teams" | "eliminated">("matches");
  const [teams] = useState<Team[]>(mockTeams);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showMatchDetail, setShowMatchDetail] = useState(false);
  const [showEditMatch, setShowEditMatch] = useState(false);
  const [editForm, setEditForm] = useState<Match | null>(null);
  const [showCreateMatch, setShowCreateMatch] = useState(false);
  const [createForm, setCreateForm] = useState<Partial<Match>>({
    date: "",
    time: "",
    court: "",
    teamA: "",
    teamB: "",
    status: "pending"
  });

  const activeTeams = teams.filter((t) => t.status === "active");
  const eliminatedTeams = teams.filter((t) => t.status === "eliminated");
  const scorersMap = matches.reduce<Record<string, number>>((acc, match) => {
    match.scorers?.forEach((goal) => {
      acc[goal.player] = (acc[goal.player] ?? 0) + 1;
    });
    return acc;
  }, {});
  const topScorers = Object.entries(scorersMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const getMatchStatusColor = (status: Match["status"]) => {
    switch (status) {
      case "completed":
        return P.success;
      case "in-progress":
        return P.secondary;
      case "pending":
        return P.info;
    }
  };

  const getMatchStatusLabel = (status: Match["status"]) => {
    switch (status) {
      case "completed":
        return "Finalizado";
      case "in-progress":
        return "En Curso";
      case "pending":
        return "Pendiente";
    }
  };

  const handleLogout = () => {
    setShowLogout(false);
    sessionStorage.removeItem("userContext");
    navigate("/login");
  };

  const handleViewMatch = (match: Match) => {
    setSelectedMatch(match);
    setShowMatchDetail(true);
  };

  const handleEditMatch = (match: Match) => {
    setEditForm({ ...match });
    setShowEditMatch(true);
  };

  const handleSaveMatch = () => {
    if (!editForm) return;
    setMatches((prev) => prev.map((m) => (m.id === editForm.id ? editForm : m)));
    setShowEditMatch(false);
    setEditForm(null);
  };

  const handleCreateMatch = () => {
    setCreateForm({
      date: "",
      time: "",
      court: "",
      teamA: "",
      teamB: "",
      status: "pending"
    });
    setShowCreateMatch(true);
  };

  const handleSaveNewMatch = () => {
    if (!createForm.date || !createForm.time || !createForm.court || !createForm.teamA || !createForm.teamB) {
      alert("Por favor completa todos los campos");
      return;
    }
    if (createForm.teamA === createForm.teamB) {
      alert("Los equipos deben ser diferentes");
      return;
    }
    const newMatch: Match = {
      id: matches.length + 1,
      date: createForm.date,
      time: createForm.time,
      court: createForm.court,
      teamA: createForm.teamA,
      teamB: createForm.teamB,
      status: "pending"
    };
    setMatches((prev) => [...prev, newMatch]);
    setShowCreateMatch(false);
    setCreateForm({
      date: "",
      time: "",
      court: "",
      teamA: "",
      teamB: "",
      status: "pending"
    });
  };

  return (
    <div className="min-h-screen pb-28 lg:pb-0" style={{ backgroundColor: P.bg }}>
      {/* ── Header ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="sticky top-0 z-40 border-b px-6"
        style={{
          background: "rgba(242,242,247,0.85)",
          borderColor: "rgba(0,0,0,0.06)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link to="/">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2.5 cursor-pointer select-none">
              <img src={logoTechcup} alt="TECHCUP Logo" className="w-8 h-8 object-contain" />
              <div>
                <span className="block leading-none" style={{ fontWeight: 800, color: P.primary, fontSize: "1.05rem", letterSpacing: "-0.03em" }}>
                  TECHCUP
                </span>
                <span className="block mt-0.5" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", fontWeight: 600, color: P.secondary, textTransform: "uppercase" }}>
                  Torneo 2026
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Role badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{ backgroundColor: `${P.success}12`, border: `1px solid ${P.success}30` }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: P.success }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: P.success, textTransform: "uppercase" }}>
              Organizador
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => setShowLogout(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[rgba(184,28,28,0.07)]"
            >
              <LogOut style={{ width: 17, height: 17, color: P.default }} />
            </motion.button>

            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ background: `${P.success}18`, border: `1.5px solid ${P.success}30` }}
              >
                <User style={{ width: 16, height: 16, color: P.success }} />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ── Main ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-8 pb-16">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/organizer/tournaments")}
          className="flex items-center gap-2 mb-6 text-sm group"
          style={{ color: P.default, fontWeight: 600 }}
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Volver a Gestión de Torneos
        </motion.button>

        {/* Tournament header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-6 mb-6 border"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl mb-2" style={{ fontWeight: 800, color: P.textPrimary, letterSpacing: "-0.02em" }}>
                TECHCUP 2026
              </h1>
              <p className="text-sm" style={{ color: P.default, fontWeight: 500 }}>
                1 de marzo - 30 de marzo, 2026
              </p>
            </div>
            <span
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: `${P.success}18`,
                color: P.success,
                fontWeight: 700,
              }}
            >
              En Curso
            </span>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Users className="w-5 h-5 mx-auto mb-1" style={{ color: P.info }} />
              <p className="text-xl mb-0.5" style={{ fontWeight: 700, color: P.textPrimary }}>
                {activeTeams.length}
              </p>
              <p className="text-xs" style={{ color: P.default, fontWeight: 600 }}>
                Equipos Activos
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Trophy className="w-5 h-5 mx-auto mb-1" style={{ color: P.success }} />
              <p className="text-xl mb-0.5" style={{ fontWeight: 700, color: P.textPrimary }}>
                {matches.length}
              </p>
              <p className="text-xs" style={{ color: P.default, fontWeight: 600 }}>
                Partidos
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <AlertCircle className="w-5 h-5 mx-auto mb-1" style={{ color: P.default }} />
              <p className="text-xl mb-0.5" style={{ fontWeight: 700, color: P.textPrimary }}>
                {eliminatedTeams.length}
              </p>
              <p className="text-xs" style={{ color: P.default, fontWeight: 600 }}>
                Eliminados
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <DollarSign className="w-5 h-5 mx-auto mb-1" style={{ color: P.success }} />
              <p className="text-lg mb-0.5" style={{ fontWeight: 700, color: P.textPrimary }}>
                $24M
              </p>
              <p className="text-xs" style={{ color: P.default, fontWeight: 600 }}>
                Ingresos
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="rounded-xl px-3 py-2" style={{ backgroundColor: "#F8FAFC" }}>
              <p style={{ fontSize: "0.68rem", color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Cupo máximo
              </p>
              <p style={{ fontSize: "0.88rem", color: P.textPrimary, fontWeight: 700 }}>16 equipos</p>
            </div>
            <div className="rounded-xl px-3 py-2" style={{ backgroundColor: "#F8FAFC" }}>
              <p style={{ fontSize: "0.68rem", color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Jugadores por equipo
              </p>
              <p style={{ fontSize: "0.88rem", color: P.textPrimary, fontWeight: 700 }}>11 jugadores</p>
            </div>
            <div className="rounded-xl px-3 py-2" style={{ backgroundColor: "#F8FAFC" }}>
              <p style={{ fontSize: "0.68rem", color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Costo de inscripción
              </p>
              <p style={{ fontSize: "0.88rem", color: P.textPrimary, fontWeight: 700 }}>$50.000 COP</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.17 }}
          className="bg-white rounded-2xl p-5 mb-6 border"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <h2 className="text-sm mb-3" style={{ color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Tabla de goleadores
          </h2>
          {topScorers.length === 0 ? (
            <p style={{ fontSize: "0.84rem", color: P.default, fontWeight: 500 }}>Aún no hay goleadores registrados.</p>
          ) : (
            <div className="space-y-2">
              {topScorers.map(([player, goals], idx) => (
                <div
                  key={player}
                  className="flex items-center justify-between rounded-xl px-3 py-2"
                  style={{
                    backgroundColor: idx === 0 ? `${P.secondary}14` : "#F7F7F8",
                    border: idx === 0 ? `1px solid ${P.secondary}35` : "1px solid transparent",
                  }}
                >
                  <p style={{ fontSize: "0.84rem", color: P.textPrimary, fontWeight: idx === 0 ? 800 : 600 }}>
                    {idx + 1}. {player}
                  </p>
                  <span
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{
                      backgroundColor: idx === 0 ? `${P.secondary}20` : `${P.info}16`,
                      color: idx === 0 ? P.secondary : P.info,
                      fontWeight: 700,
                    }}
                  >
                    {goals} gol{goals > 1 ? "es" : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {[
            { id: "matches", label: "Partidos", icon: Trophy },
            { id: "teams", label: "Equipos Activos", icon: Users },
            { id: "eliminated", label: "Equipos Eliminados", icon: AlertCircle },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap"
              style={{
                backgroundColor: activeTab === tab.id ? P.success : "white",
                color: activeTab === tab.id ? "white" : P.default,
                fontWeight: 600,
                border: `1px solid ${activeTab === tab.id ? P.success : "rgba(0,0,0,0.06)"}`,
              }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {/* Matches tab */}
          {activeTab === "matches" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg" style={{ fontWeight: 700, color: P.textPrimary }}>
                  Todos los partidos
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateMatch}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm"
                  style={{ backgroundColor: P.success, fontWeight: 600 }}
                >
                  <Plus className="w-4 h-4" />
                  Crear Partido
                </motion.button>
              </div>

              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white rounded-2xl p-5 border"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" style={{ color: P.info }} />
                      <div>
                        <p className="text-sm" style={{ fontWeight: 600, color: P.textPrimary }}>
                          {new Date(match.date).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs flex items-center gap-1" style={{ color: P.default, fontWeight: 500 }}>
                            <Clock className="w-3.5 h-3.5" />
                            {match.time}
                          </span>
                          <span className="text-xs flex items-center gap-1" style={{ color: P.default, fontWeight: 500 }}>
                            <MapPin className="w-3.5 h-3.5" />
                            {match.court}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${getMatchStatusColor(match.status)}18`,
                        color: getMatchStatusColor(match.status),
                        fontWeight: 700,
                      }}
                    >
                      {getMatchStatusLabel(match.status)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-right">
                      <p className="text-base mb-1" style={{ fontWeight: 700, color: P.textPrimary }}>
                        {match.teamA}
                      </p>
                      {match.scoreA !== undefined && (
                        <p className="text-2xl" style={{ fontWeight: 800, color: P.primary }}>
                          {match.scoreA}
                        </p>
                      )}
                    </div>

                    <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: "rgba(0,0,0,0.04)" }}>
                      <p className="text-xs" style={{ color: P.default, fontWeight: 700 }}>
                        VS
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="text-base mb-1" style={{ fontWeight: 700, color: P.textPrimary }}>
                        {match.teamB}
                      </p>
                      {match.scoreB !== undefined && (
                        <p className="text-2xl" style={{ fontWeight: 800, color: P.primary }}>
                          {match.scoreB}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEditMatch(match)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm border"
                      style={{ borderColor: "rgba(0,0,0,0.08)", color: P.default, fontWeight: 600 }}
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleViewMatch(match)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white text-sm"
                      style={{ backgroundColor: P.info, fontWeight: 600 }}
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalle
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Teams tab */}
          {activeTab === "teams" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg" style={{ fontWeight: 700, color: P.textPrimary }}>
                  Equipos participantes ({activeTeams.length})
                </h2>
              </div>

              {activeTeams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white rounded-xl p-4 border flex items-center justify-between"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${P.success}18` }}
                    >
                      <Users className="w-5 h-5" style={{ color: P.success }} />
                    </div>
                    <div>
                      <p className="text-sm mb-0.5" style={{ fontWeight: 700, color: P.textPrimary }}>
                        {team.name}
                      </p>
                      <p className="text-xs" style={{ color: P.default, fontWeight: 500 }}>
                        {team.decanatura} · {team.players} jugadores
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{ borderColor: "rgba(0,0,0,0.08)" }}
                    >
                      <Eye className="w-4 h-4" style={{ color: P.default }} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{ borderColor: "rgba(0,0,0,0.08)" }}
                    >
                      <Edit className="w-4 h-4" style={{ color: P.default }} />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Eliminated teams tab */}
          {activeTab === "eliminated" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg" style={{ fontWeight: 700, color: P.textPrimary }}>
                  Equipos eliminados ({eliminatedTeams.length})
                </h2>
              </div>

              {eliminatedTeams.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border text-center" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: P.success, opacity: 0.5 }} />
                  <p className="text-base mb-1" style={{ fontWeight: 600, color: P.textPrimary }}>
                    No hay equipos eliminados
                  </p>
                  <p className="text-sm" style={{ color: P.default }}>
                    Todos los equipos siguen en competencia
                  </p>
                </div>
              ) : (
                eliminatedTeams.map((team) => (
                  <div
                    key={team.id}
                    className="bg-white rounded-xl p-4 border flex items-center justify-between opacity-60"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${P.default}18` }}
                      >
                        <X className="w-5 h-5" style={{ color: P.default }} />
                      </div>
                      <div>
                        <p className="text-sm mb-0.5" style={{ fontWeight: 700, color: P.textPrimary }}>
                          {team.name}
                        </p>
                        <p className="text-xs" style={{ color: P.default, fontWeight: 500 }}>
                          {team.decanatura} · Eliminado el{" "}
                          {team.eliminatedDate && new Date(team.eliminatedDate).toLocaleDateString("es-CO")}
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg text-xs border"
                      style={{ borderColor: "rgba(0,0,0,0.08)", color: P.default, fontWeight: 600 }}
                    >
                      Ver Historial
                    </motion.button>
                  </div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </main>

      {/* ── Match Detail Modal ── */}
      <AnimatePresence>
        {showMatchDetail && selectedMatch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMatchDetail(false)}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="fixed z-50 inset-0 flex items-center justify-center px-6 pointer-events-none"
            >
              <div
                className="bg-white rounded-[24px] p-6 max-w-lg w-full pointer-events-auto max-h-[90vh] overflow-y-auto"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.16)" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl" style={{ fontWeight: 700, color: P.textPrimary }}>
                    Detalle del Partido
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowMatchDetail(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  >
                    <X className="w-5 h-5" style={{ color: P.default }} />
                  </motion.button>
                </div>

                {/* Status badge */}
                <div className="mb-6">
                  <span
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: `${getMatchStatusColor(selectedMatch.status)}18`,
                      color: getMatchStatusColor(selectedMatch.status),
                      fontWeight: 700,
                    }}
                  >
                    {getMatchStatusLabel(selectedMatch.status)}
                  </span>
                </div>

                {/* Match info */}
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" style={{ color: P.info }} />
                      <span className="text-xs" style={{ color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Fecha y Hora
                      </span>
                    </div>
                    <p className="text-base" style={{ fontWeight: 600, color: P.textPrimary }}>
                      {new Date(selectedMatch.date).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <p className="text-sm mt-1" style={{ color: P.default, fontWeight: 500 }}>
                      {selectedMatch.time}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4" style={{ color: P.success }} />
                      <span className="text-xs" style={{ color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Cancha
                      </span>
                    </div>
                    <p className="text-base" style={{ fontWeight: 600, color: P.textPrimary }}>
                      {selectedMatch.court}
                    </p>
                  </div>
                </div>

                {/* Teams and score */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-6 border" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex-1 text-center">
                      <p className="text-sm mb-2" style={{ color: P.default, fontWeight: 600 }}>
                        Equipo A
                      </p>
                      <p className="text-lg mb-3" style={{ fontWeight: 700, color: P.textPrimary }}>
                        {selectedMatch.teamA}
                      </p>
                      {selectedMatch.scoreA !== undefined && (
                        <div
                          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl"
                          style={{ backgroundColor: `${P.primary}18`, color: P.primary }}
                        >
                          <span className="text-3xl" style={{ fontWeight: 800 }}>
                            {selectedMatch.scoreA}
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className="px-4 py-2 rounded-xl"
                      style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
                    >
                      <p className="text-sm" style={{ color: P.default, fontWeight: 700 }}>
                        VS
                      </p>
                    </div>

                    <div className="flex-1 text-center">
                      <p className="text-sm mb-2" style={{ color: P.default, fontWeight: 600 }}>
                        Equipo B
                      </p>
                      <p className="text-lg mb-3" style={{ fontWeight: 700, color: P.textPrimary }}>
                        {selectedMatch.teamB}
                      </p>
                      {selectedMatch.scoreB !== undefined && (
                        <div
                          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl"
                          style={{ backgroundColor: `${P.primary}18`, color: P.primary }}
                        >
                          <span className="text-3xl" style={{ fontWeight: 800 }}>
                            {selectedMatch.scoreB}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="rounded-xl p-4" style={{ backgroundColor: "#F7FAF8" }}>
                    <p style={{ fontSize: "0.72rem", color: P.success, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Goles
                    </p>
                    {selectedMatch.scorers && selectedMatch.scorers.length > 0 ? (
                      <div className="mt-2 space-y-1.5">
                        {selectedMatch.scorers.map((goal, idx) => (
                          <p key={`${goal.player}-${idx}`} style={{ fontSize: "0.82rem", color: P.textPrimary, fontWeight: 600 }}>
                            {goal.minute} · {goal.player} ({goal.team})
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2" style={{ fontSize: "0.8rem", color: P.default, fontWeight: 500 }}>
                        Sin goles registrados.
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF9EE" }}>
                    <p style={{ fontSize: "0.72rem", color: P.secondary, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Tarjetas Amarillas
                    </p>
                    {selectedMatch.yellowCards && selectedMatch.yellowCards.length > 0 ? (
                      <div className="mt-2 space-y-1.5">
                        {selectedMatch.yellowCards.map((card, idx) => (
                          <p key={`${card.player}-${idx}`} style={{ fontSize: "0.82rem", color: P.textPrimary, fontWeight: 600 }}>
                            {card.minute} · {card.player} ({card.team})
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2" style={{ fontSize: "0.8rem", color: P.default, fontWeight: 500 }}>
                        Sin tarjetas amarillas.
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF3F3" }}>
                    <p style={{ fontSize: "0.72rem", color: P.primary, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Tarjetas Rojas
                    </p>
                    {selectedMatch.redCards && selectedMatch.redCards.length > 0 ? (
                      <div className="mt-2 space-y-1.5">
                        {selectedMatch.redCards.map((card, idx) => (
                          <p key={`${card.player}-${idx}`} style={{ fontSize: "0.82rem", color: P.textPrimary, fontWeight: 600 }}>
                            {card.minute} · {card.player} ({card.team})
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2" style={{ fontSize: "0.8rem", color: P.default, fontWeight: 500 }}>
                        Sin tarjetas rojas.
                      </p>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMatchDetail(false)}
                  className="w-full py-3 rounded-xl text-sm"
                  style={{ backgroundColor: P.info, color: "white", fontWeight: 600 }}
                >
                  Cerrar
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Create Match Modal ── */}
      <AnimatePresence>
        {showCreateMatch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateMatch(false)}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="fixed z-50 inset-0 flex items-center justify-center px-6 pointer-events-none"
            >
              <div
                className="bg-white rounded-[24px] p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.16)" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-black" style={{ fontWeight: 700 }}>
                    Crear Nuevo Partido
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCreateMatch(false)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                  >
                    <X className="w-5 h-5" style={{ color: P.default }} />
                  </motion.button>
                </div>

                {/* Form */}
                <div className="space-y-5">
                  {/* Team A */}
                  <div>
                    <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                      Equipo A
                    </label>
                    <select
                      value={createForm.teamA || ""}
                      onChange={(e) => setCreateForm({ ...createForm, teamA: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/8 text-sm"
                      style={{ color: P.textPrimary, fontWeight: 500 }}
                    >
                      <option value="">Seleccionar equipo</option>
                      {activeTeams.map((team) => (
                        <option key={team.id} value={team.name}>
                          {team.name} - {team.decanatura}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Team B */}
                  <div>
                    <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                      Equipo B
                    </label>
                    <select
                      value={createForm.teamB || ""}
                      onChange={(e) => setCreateForm({ ...createForm, teamB: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-black/8 text-sm"
                      style={{ color: P.textPrimary, fontWeight: 500 }}
                    >
                      <option value="">Seleccionar equipo</option>
                      {activeTeams.map((team) => (
                        <option key={team.id} value={team.name}>
                          {team.name} - {team.decanatura}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                        Fecha
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: P.default }} />
                        <input
                          type="date"
                          value={createForm.date || ""}
                          onChange={(e) => setCreateForm({ ...createForm, date: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/8 text-sm"
                          style={{ color: P.textPrimary, fontWeight: 500 }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                        Hora
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: P.default }} />
                        <input
                          type="time"
                          value={createForm.time || ""}
                          onChange={(e) => setCreateForm({ ...createForm, time: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/8 text-sm"
                          style={{ color: P.textPrimary, fontWeight: 500 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Court */}
                  <div>
                    <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                      Cancha
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: P.default }} />
                      <input
                        type="text"
                        value={createForm.court || ""}
                        onChange={(e) => setCreateForm({ ...createForm, court: e.target.value })}
                        placeholder="Ej: Cancha 1"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/8 text-sm"
                        style={{ color: P.textPrimary, fontWeight: 500 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowCreateMatch(false)}
                    className="flex-1 py-3 rounded-xl border border-black/8 text-sm"
                    style={{ fontWeight: 600, color: P.default }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSaveNewMatch}
                    className="flex-1 py-3 rounded-xl text-white text-sm flex items-center justify-center gap-2"
                    style={{ backgroundColor: P.success, fontWeight: 600 }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Crear Partido
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Edit Match Modal ── */}
      <AnimatePresence>
        {showEditMatch && editForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditMatch(false)}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="fixed z-50 inset-0 flex items-center justify-center px-6 pointer-events-none"
            >
              <div
                className="bg-white rounded-[24px] p-6 max-w-lg w-full pointer-events-auto max-h-[90vh] overflow-y-auto"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.16)" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl" style={{ fontWeight: 700, color: P.textPrimary }}>
                    Editar Partido
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEditMatch(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  >
                    <X className="w-5 h-5" style={{ color: P.default }} />
                  </motion.button>
                </div>

                {/* Form fields */}
                <div className="space-y-4 mb-6">
                  {/* Date */}
                  <div>
                    <label className="block text-xs mb-2" style={{ color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm"
                      style={{ borderColor: "rgba(0,0,0,0.1)" }}
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs mb-2" style={{ color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Hora
                    </label>
                    <input
                      type="time"
                      value={editForm.time}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm"
                      style={{ borderColor: "rgba(0,0,0,0.1)" }}
                    />
                  </div>

                  {/* Court */}
                  <div>
                    <label className="block text-xs mb-2" style={{ color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Cancha
                    </label>
                    <input
                      type="text"
                      value={editForm.court}
                      onChange={(e) => setEditForm({ ...editForm, court: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm"
                      style={{ borderColor: "rgba(0,0,0,0.1)" }}
                      placeholder="Ej: Cancha 1"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs mb-2" style={{ color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Estado
                    </label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Match["status"] })}
                      className="w-full px-4 py-3 rounded-xl border text-sm"
                      style={{ borderColor: "rgba(0,0,0,0.1)" }}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="in-progress">En Curso</option>
                      <option value="completed">Finalizado</option>
                    </select>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-2" style={{ color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Goles {editForm.teamA}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.scoreA ?? ""}
                        onChange={(e) => setEditForm({ ...editForm, scoreA: e.target.value ? parseInt(e.target.value) : undefined })}
                        className="w-full px-4 py-3 rounded-xl border text-sm"
                        style={{ borderColor: "rgba(0,0,0,0.1)" }}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-2" style={{ color: P.default, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Goles {editForm.teamB}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.scoreB ?? ""}
                        onChange={(e) => setEditForm({ ...editForm, scoreB: e.target.value ? parseInt(e.target.value) : undefined })}
                        className="w-full px-4 py-3 rounded-xl border text-sm"
                        style={{ borderColor: "rgba(0,0,0,0.1)" }}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEditMatch(false)}
                    className="flex-1 py-3 rounded-xl text-sm border"
                    style={{ borderColor: "rgba(0,0,0,0.1)", color: P.default, fontWeight: 600 }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveMatch}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm"
                    style={{ backgroundColor: P.success, fontWeight: 600 }}
                  >
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Logout Modal ── */}
      <AnimatePresence>
        {showLogout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogout(false)}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="fixed z-50 inset-0 flex items-center justify-center px-6 pointer-events-none"
            >
              <div
                className="bg-white rounded-[24px] p-8 max-w-sm w-full pointer-events-auto"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.16)" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                  style={{ backgroundColor: `${P.primary}10` }}
                >
                  <LogOut className="w-7 h-7" style={{ color: P.primary }} />
                </div>
                <h2 className="text-xl text-black text-center mb-2" style={{ fontWeight: 700 }}>
                  ¿Cerrar sesión?
                </h2>
                <p className="text-sm text-center mb-8" style={{ color: P.default, fontWeight: 500 }}>
                  Tu sesión en TECHCUP se cerrará. Podrás volver a ingresar cuando quieras.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowLogout(false)}
                    className="flex-1 py-3 rounded-xl border border-black/8 text-sm"
                    style={{ fontWeight: 600, color: "#6C757D" }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleLogout}
                    className="flex-1 py-3 rounded-xl text-white text-sm"
                    style={{ backgroundColor: P.primary, fontWeight: 600 }}
                  >
                    Cerrar sesión
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
