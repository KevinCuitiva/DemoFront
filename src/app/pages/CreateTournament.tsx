import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  ChevronLeft,
  Save,
  Users,
  UserCheck,
  Clock,
  Building2,
  Calendar,
  Trophy,
  CheckCircle2,
} from "lucide-react";

const P = {
  primary: "#B81C1C",
  secondary: "#C4841D",
  success: "#17C964",
  info: "#0066FE",
  default: "#6E6E73",
  textPrimary: "#1C1C1E",
  bg: "#F2F2F7",
  purple: "#8B5CF6",
  orange: "#F97316",
};

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

export function CreateTournament() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    nombreTorneo: "",
    cantidadEquipos: 16,
    personasPorEquipo: 11,
    horarios: [] as string[],
    decanaturasPermitidas: [] as string[],
    fechaInicio: "",
    fechaFin: "",
    costoPorEquipo: 50000,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleHorario = (horario: string) => {
    if (formData.horarios.includes(horario)) {
      handleInputChange("horarios", formData.horarios.filter(h => h !== horario));
    } else {
      handleInputChange("horarios", [...formData.horarios, horario]);
    }
  };

  const toggleDecanatura = (decanatura: string) => {
    if (formData.decanaturasPermitidas.includes(decanatura)) {
      handleInputChange("decanaturasPermitidas", formData.decanaturasPermitidas.filter(d => d !== decanatura));
    } else {
      handleInputChange("decanaturasPermitidas", [...formData.decanaturasPermitidas, decanatura]);
    }
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar en backend
    console.log("Datos del torneo:", formData);
    setSaved(true);
    setTimeout(() => {
      navigate("/dashboard-admin");
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-28 lg:pb-8" style={{ backgroundColor: P.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b px-6" style={{
        background: "rgba(242,242,247,0.85)",
        borderColor: "rgba(0,0,0,0.06)",
        backdropFilter: "saturate(180%) blur(20px)",
      }}>
        <div className="max-w-4xl mx-auto flex items-center h-[60px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors group-hover:bg-black/5">
              <ChevronLeft style={{ width: 20, height: 20, color: P.default }} />
            </div>
            <span style={{ fontSize: "0.95rem", fontWeight: 600, color: P.default }}>
              Volver
            </span>
          </button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-8 pb-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: `${P.orange}15`, border: `1px solid ${P.orange}30` }}
          >
            <Trophy style={{ width: 14, height: 14, color: P.orange }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: P.orange, textTransform: "uppercase" }}>
              Configuración de torneo
            </span>
          </div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 800, color: P.textPrimary, letterSpacing: "-0.02em" }}>
            Crear Nuevo Torneo
          </h1>
          <p style={{ color: P.default, fontWeight: 500, fontSize: "0.95rem" }}>
            Configura los parámetros para el nuevo torneo TECHCUP
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[24px] p-6 sm:p-8"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="space-y-6">
            {/* Nombre del Torneo */}
            <div>
              <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                Nombre del Torneo
              </label>
              <input
                type="text"
                value={formData.nombreTorneo}
                onChange={(e) => handleInputChange("nombreTorneo", e.target.value)}
                placeholder="Ej: TECHCUP 2026"
                className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-purple-500 transition-colors"
                style={{ fontSize: "0.95rem", fontWeight: 500 }}
              />
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                  <Calendar style={{ width: 16, height: 16, color: P.info }} />
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  value={formData.fechaInicio}
                  onChange={(e) => handleInputChange("fechaInicio", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-purple-500 transition-colors"
                  style={{ fontSize: "0.95rem", fontWeight: 500 }}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                  <Calendar style={{ width: 16, height: 16, color: P.info }} />
                  Fecha de Finalización
                </label>
                <input
                  type="date"
                  value={formData.fechaFin}
                  onChange={(e) => handleInputChange("fechaFin", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-purple-500 transition-colors"
                  style={{ fontSize: "0.95rem", fontWeight: 500 }}
                />
              </div>
            </div>

            {/* Cantidad de equipos y personas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                  <Users style={{ width: 16, height: 16, color: P.primary }} />
                  Cantidad de Equipos
                </label>
                <input
                  type="number"
                  value={formData.cantidadEquipos}
                  onChange={(e) => handleInputChange("cantidadEquipos", parseInt(e.target.value))}
                  min={2}
                  max={64}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-purple-500 transition-colors"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                  <UserCheck style={{ width: 16, height: 16, color: P.success }} />
                  Personas por Equipo
                </label>
                <input
                  type="number"
                  value={formData.personasPorEquipo}
                  onChange={(e) => handleInputChange("personasPorEquipo", parseInt(e.target.value))}
                  min={5}
                  max={20}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-purple-500 transition-colors"
                  style={{ fontSize: "0.95rem", fontWeight: 600 }}
                />
              </div>
            </div>

            {/* Costo por equipo */}
            <div>
              <label className="block text-sm mb-2" style={{ fontWeight: 600, color: P.textPrimary }}>
                Costo por Equipo (COP)
              </label>
              <input
                type="number"
                value={formData.costoPorEquipo}
                onChange={(e) => handleInputChange("costoPorEquipo", parseInt(e.target.value))}
                min={0}
                step={1000}
                className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-purple-500 transition-colors"
                style={{ fontSize: "0.95rem", fontWeight: 600 }}
              />
            </div>

            {/* Horarios disponibles */}
            <div>
              <label className="flex items-center gap-2 text-sm mb-3" style={{ fontWeight: 600, color: P.textPrimary }}>
                <Clock style={{ width: 16, height: 16, color: P.secondary }} />
                Horarios Disponibles
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {horariosOptions.map((horario) => (
                  <motion.button
                    key={horario}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleHorario(horario)}
                    className="px-4 py-3 rounded-xl text-left transition-all duration-200 flex items-center justify-between"
                    style={{
                      backgroundColor: formData.horarios.includes(horario) ? `${P.secondary}15` : "transparent",
                      border: formData.horarios.includes(horario) ? `2px solid ${P.secondary}` : "2px solid rgba(0,0,0,0.08)",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: formData.horarios.includes(horario) ? P.secondary : P.default,
                    }}
                  >
                    {horario}
                    {formData.horarios.includes(horario) && (
                      <CheckCircle2 style={{ width: 16, height: 16, color: P.secondary }} />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Decanaturas permitidas */}
            <div>
              <label className="flex items-center gap-2 text-sm mb-3" style={{ fontWeight: 600, color: P.textPrimary }}>
                <Building2 style={{ width: 16, height: 16, color: P.info }} />
                Decanaturas Permitidas
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {decanaturasOptions.map((decanatura) => (
                  <motion.button
                    key={decanatura}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleDecanatura(decanatura)}
                    className="px-4 py-3 rounded-xl text-left transition-all duration-200 flex items-center justify-between"
                    style={{
                      backgroundColor: formData.decanaturasPermitidas.includes(decanatura) ? `${P.info}15` : "transparent",
                      border: formData.decanaturasPermitidas.includes(decanatura) ? `2px solid ${P.info}` : "2px solid rgba(0,0,0,0.08)",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: formData.decanaturasPermitidas.includes(decanatura) ? P.info : P.default,
                    }}
                  >
                    {decanatura}
                    {formData.decanaturasPermitidas.includes(decanatura) && (
                      <CheckCircle2 style={{ width: 16, height: 16, color: P.info }} />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Save button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saved}
            className="w-full mt-8 py-4 rounded-xl text-white flex items-center justify-center gap-2"
            style={{
              backgroundColor: saved ? P.success : P.purple,
              fontWeight: 700,
              fontSize: "1rem",
              opacity: saved ? 0.9 : 1,
            }}
          >
            {saved ? (
              <>
                <CheckCircle2 style={{ width: 20, height: 20 }} />
                Torneo Guardado
              </>
            ) : (
              <>
                <Save style={{ width: 20, height: 20 }} />
                Guardar Torneo
              </>
            )}
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
