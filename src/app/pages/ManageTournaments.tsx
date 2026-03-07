import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import logoTechcup from "@/assets/logo.png";
import {
  User,
  LogOut,
  ChevronLeft,
  Trophy,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  AlertCircle,
  Calendar,
  Clock,
  Building2,
  Save,
  X,
  CheckCircle2,
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
interface Tournament {
  id: number;
  name: string;
  status: "active" | "completed" | "upcoming";
  startDate: string;
  endDate: string;
  teams: number;
  matches: number;
  eliminatedTeams: number;
  totalRevenue: number;
  maxTeams?: number;
  playersPerTeam?: number;
  schedules?: string[];
  allowedDecanaturas?: string[];
  costPerTeam?: number;
}

// ── Mock data ─────────────────────────────────────
const mockTournaments: Tournament[] = [
  {
    id: 1,
    name: "TECHCUP 2026",
    status: "active",
    startDate: "2026-03-01",
    endDate: "2026-03-30",
    teams: 16,
    matches: 32,
    eliminatedTeams: 4,
    totalRevenue: 24000000,
    maxTeams: 16,
    playersPerTeam: 11,
    schedules: ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    allowedDecanaturas: ["Ingeniería de Sistemas", "Ingeniería Industrial", "Ciencias Económicas"],
    costPerTeam: 50000,
  },
  {
    id: 2,
    name: "TECHCUP 2025",
    status: "completed",
    startDate: "2025-03-01",
    endDate: "2025-03-28",
    teams: 12,
    matches: 24,
    eliminatedTeams: 12,
    totalRevenue: 18000000,
    maxTeams: 12,
    playersPerTeam: 11,
    schedules: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    allowedDecanaturas: ["Ingeniería de Sistemas", "Derecho"],
    costPerTeam: 45000,
  },
  {
    id: 3,
    name: "TECHCUP 2027",
    status: "upcoming",
    startDate: "2027-03-01",
    endDate: "2027-03-30",
    teams: 0,
    matches: 0,
    eliminatedTeams: 0,
    totalRevenue: 0,
    maxTeams: 20,
    playersPerTeam: 11,
    schedules: [],
    allowedDecanaturas: [],
    costPerTeam: 60000,
  },
];

const decanaturasOptions = [
  "Ingeniería de Sistemas",
  "Ingeniería Industrial",
  "Ingeniería Civil",
  "Ingeniería Electrónica",
  "Ingeniería Mecánica",
  "Ciencias Económicas",
  "Ciencias de la Salud",
  "Ciencias Sociales",
  "Derecho",
  "Arquitectura",
];

const horariosOptions = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];

// ── ManageTournaments ─────────────────────────────
export function ManageTournaments() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Tournament | null>(null);

  const getStatusColor = (status: Tournament["status"]) => {
    switch (status) {
      case "active":
        return P.success;
      case "completed":
        return P.default;
      case "upcoming":
        return P.info;
    }
  };

  const getStatusLabel = (status: Tournament["status"]) => {
    switch (status) {
      case "active":
        return "En Curso";
      case "completed":
        return "Finalizado";
      case "upcoming":
        return "Próximo";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleLogout = () => {
    setShowLogout(false);
    navigate("/login");
  };

  const handleEditTournament = (tournament: Tournament) => {

    setEditForm({ ...tournament });
    setShowEditModal(true);
  };

  const handleSaveTournament = () => {
    if (!editForm) return;
    setTournaments((prev) => prev.map((t) => (t.id === editForm.id ? editForm : t)));
    setShowEditModal(false);
    setEditForm(null);
  };

  const toggleSchedule = (schedule: string) => {
    if (!editForm) return;
    const schedules = editForm.schedules || [];
    if (schedules.includes(schedule)) {
      setEditForm({ ...editForm, schedules: schedules.filter((s) => s !== schedule) });
    } else {
      setEditForm({ ...editForm, schedules: [...schedules, schedule] });
    }
  };

  const toggleDecanatura = (decanatura: string) => {
    if (!editForm) return;
    const decanaturas = editForm.allowedDecanaturas || [];
    if (decanaturas.includes(decanatura)) {
      setEditForm({ ...editForm, allowedDecanaturas: decanaturas.filter((d) => d !== decanatura) });
    } else {
      setEditForm({ ...editForm, allowedDecanaturas: [...decanaturas, decanatura] });
    }
  };

  const handleDeleteTournament = (tournamentId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este torneo? Esta acción no se puede deshacer.")) {
      setTournaments((prev) => prev.filter((t) => t.id !== tournamentId));
    }
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
              Administrador
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
      <main className="max-w-3xl mx-auto px-6 sm:px-10 pt-8 pb-16">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/dashboard-admin")}
          className="flex items-center gap-2 mb-6 text-sm group"
          style={{ color: P.default, fontWeight: 600 }}
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Volver al Dashboard
        </motion.button>

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <h1 className="text-3xl mb-2" style={{ fontWeight: 800, color: P.textPrimary, letterSpacing: "-0.02em" }}>
            Gestión de Torneos
          </h1>
          <p style={{ color: P.default, fontSize: "0.95rem", fontWeight: 500 }}>
            Administra y revisa todos los torneos creados
          </p>
        </motion.div>

        {/* Tournaments list */}
        <div className="space-y-4">
          {tournaments.map((tournament, idx) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.08 }}
              className="bg-white rounded-2xl p-6 border"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg" style={{ fontWeight: 700, color: P.textPrimary }}>
                      {tournament.name}
                    </h3>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${getStatusColor(tournament.status)}18`,
                        color: getStatusColor(tournament.status),
                        fontWeight: 700,
                      }}
                    >
                      {getStatusLabel(tournament.status)}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: P.default, fontWeight: 500 }}>
                    {new Date(tournament.startDate).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })} -{" "}
                    {new Date(tournament.endDate).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4" style={{ color: P.info }} />
                    <span className="text-xs" style={{ color: P.default, fontWeight: 600 }}>
                      Equipos
                    </span>
                  </div>
                  <p className="text-xl" style={{ fontWeight: 700, color: P.textPrimary }}>
                    {tournament.teams}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4" style={{ color: P.success }} />
                    <span className="text-xs" style={{ color: P.default, fontWeight: 600 }}>
                      Partidos
                    </span>
                  </div>
                  <p className="text-xl" style={{ fontWeight: 700, color: P.textPrimary }}>
                    {tournament.matches}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4" style={{ color: P.default }} />
                    <span className="text-xs" style={{ color: P.default, fontWeight: 600 }}>
                      Eliminados
                    </span>
                  </div>
                  <p className="text-xl" style={{ fontWeight: 700, color: P.textPrimary }}>
                    {tournament.eliminatedTeams}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4" style={{ color: P.success }} />
                    <span className="text-xs" style={{ color: P.default, fontWeight: 600 }}>
                      Ingresos
                    </span>
                  </div>
                  <p className="text-sm" style={{ fontWeight: 700, color: P.textPrimary }}>
                    {formatCurrency(tournament.totalRevenue)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Link to={`/admin/tournaments/${tournament.id}`} className="flex-1 min-w-[140px]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm"
                    style={{ backgroundColor: P.success, fontWeight: 600 }}
                  >
                    <Eye className="w-4 h-4" />
                    Gestionar Torneo
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleEditTournament(tournament)}
                  className="px-4 py-2.5 rounded-xl text-sm border"
                  style={{ borderColor: "rgba(0,0,0,0.08)", color: P.default, fontWeight: 600 }}
                >
                  <Edit className="w-4 h-4" />
                </motion.button>

                {tournament.status !== "active" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDeleteTournament(tournament.id)}
                    className="px-4 py-2.5 rounded-xl text-sm border"
                    style={{ borderColor: "rgba(184,28,28,0.2)", color: P.primary, fontWeight: 600 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {tournaments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <Trophy className="w-16 h-16 mx-auto mb-4" style={{ color: P.default, opacity: 0.3 }} />
            <p className="text-lg mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
              No hay torneos creados
            </p>
            <p className="text-sm" style={{ color: P.default }}>
              Crea tu primer torneo desde el dashboard
            </p>
          </motion.div>
        )}
      </main>

      {/* ── Edit Tournament Modal ── */}
      <AnimatePresence>
        {showEditModal && editForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
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
                className="bg-white rounded-[24px] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.16)" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-black" style={{ fontWeight: 700 }}>
                    Editar Torneo
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEditModal(false)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                  >
                    <X className="w-5 h-5" style={{ color: P.default }} />
                  </motion.button>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Tournament Name */}
                  <div>
                    <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                      Nombre del Torneo
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Ej: TechCup 2024"
                      className="w-full px-4 py-3 rounded-xl border border-black/8 text-sm"
                      style={{ color: P.textPrimary, fontWeight: 500 }}
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                        Fecha Inicio
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: P.default }} />
                        <input
                          type="date"
                          value={editForm.startDate}
                          onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/8 text-sm"
                          style={{ color: P.textPrimary, fontWeight: 500 }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                        Fecha Fin
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: P.default }} />
                        <input
                          type="date"
                          value={editForm.endDate}
                          onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/8 text-sm"
                          style={{ color: P.textPrimary, fontWeight: 500 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Teams and Players */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                        Cantidad de Equipos
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="64"
                        value={editForm.maxTeams || ''}
                        onChange={(e) => setEditForm({ ...editForm, maxTeams: parseInt(e.target.value) || undefined })}
                        placeholder="Ej: 16"
                        className="w-full px-4 py-3 rounded-xl border border-black/8 text-sm"
                        style={{ color: P.textPrimary, fontWeight: 500 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                        Jugadores por Equipo
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="20"
                        value={editForm.playersPerTeam || ''}
                        onChange={(e) => setEditForm({ ...editForm, playersPerTeam: parseInt(e.target.value) || undefined })}
                        placeholder="Ej: 11"
                        className="w-full px-4 py-3 rounded-xl border border-black/8 text-sm"
                        style={{ color: P.textPrimary, fontWeight: 500 }}
                      />
                    </div>
                  </div>

                  {/* Cost */}
                  <div>
                    <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                      Costo por Equipo
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={editForm.costPerTeam || ''}
                      onChange={(e) => setEditForm({ ...editForm, costPerTeam: parseInt(e.target.value) || undefined })}
                      placeholder="Ej: 50000"
                      className="w-full px-4 py-3 rounded-xl border border-black/8 text-sm"
                      style={{ color: P.textPrimary, fontWeight: 500 }}
                    />
                  </div>

                  {/* Schedules */}
                  <div>
                    <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                      Horarios Disponibles
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {horariosOptions.map((horario) => {
                        const isSelected = editForm.schedules?.includes(horario) || false;
                        return (
                          <motion.button
                            key={horario}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleSchedule(horario)}
                            className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border text-sm transition-all"
                            style={{
                              backgroundColor: isSelected ? `${P.success}15` : "transparent",
                              borderColor: isSelected ? P.success : "rgba(0,0,0,0.08)",
                              color: isSelected ? P.success : P.default,
                              fontWeight: 600,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{horario}</span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5" />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Decanaturas */}
                  <div>
                    <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                      Decanaturas Permitidas
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {decanaturasOptions.map((decanatura) => {
                        const isSelected = editForm.allowedDecanaturas?.includes(decanatura) || false;
                        return (
                          <motion.button
                            key={decanatura}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleDecanatura(decanatura)}
                            className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border text-sm transition-all"
                            style={{
                              backgroundColor: isSelected ? `${P.info}15` : "transparent",
                              borderColor: isSelected ? P.info : "rgba(0,0,0,0.08)",
                              color: isSelected ? P.info : P.default,
                              fontWeight: 600,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              <span>{decanatura}</span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5" />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 rounded-xl border border-black/8 text-sm"
                    style={{ fontWeight: 600, color: P.default }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSaveTournament}
                    className="flex-1 py-3 rounded-xl text-white text-sm flex items-center justify-center gap-2"
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
    </div>
  );
}
