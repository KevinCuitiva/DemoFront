/**
 * @file src\modules\tournament\pages\PaymentReport.tsx
 * @description Main source file for the DemoFront application architecture.
 */
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  ChevronLeft,
  Download,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  FileText,
  X,
  Image as ImageIcon,
  Eye,
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
  warning: "#F5A524",
};

type PaymentStatus = "pagado" | "pendiente" | "rechazado";

interface TeamPayment {
  id: number;
  nombre: string;
  decanatura: string;
  capitan: string;
  monto: number;
  estado: PaymentStatus;
  fecha: string;
  revisadoPor: string;
  comprobanteUrl: string | null;
  comprobanteTipo: "imagen" | "pdf" | null;
}

// Datos de ejemplo
const teamsData: TeamPayment[] = [
  { id: 1, nombre: "Los Compiladores", decanatura: "Ing. Sistemas", capitan: "Juan Pérez", monto: 50000, estado: "pagado", fecha: "2026-02-15", revisadoPor: "Organizador", comprobanteUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1200&q=80", comprobanteTipo: "imagen" },
  { id: 2, nombre: "Bug Hunters", decanatura: "Ing. de Inteligencia Artificial", capitan: "María García", monto: 50000, estado: "pagado", fecha: "2026-02-18", revisadoPor: "Organizador", comprobanteUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80", comprobanteTipo: "imagen" },
  { id: 3, nombre: "Stack Overflow FC", decanatura: "Ing. Industrial", capitan: "Carlos López", monto: 50000, estado: "pendiente", fecha: "-", revisadoPor: "-", comprobanteUrl: "https://images.unsplash.com/photo-1565514020179-026b92b2d6c6?auto=format&fit=crop&w=1200&q=80", comprobanteTipo: "imagen" },
  { id: 4, nombre: "Null Pointers", decanatura: "Ing. Electrónica", capitan: "Ana Martínez", monto: 50000, estado: "pagado", fecha: "2026-02-20", revisadoPor: "Organizador", comprobanteUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80", comprobanteTipo: "imagen" },
  { id: 5, nombre: "Recursive United", decanatura: "Ing. Civil", capitan: "Pedro Sánchez", monto: 50000, estado: "pagado", fecha: "2026-02-22", revisadoPor: "Organizador", comprobanteUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1200&q=80", comprobanteTipo: "imagen" },
  { id: 6, nombre: "Array Warriors", decanatura: "Ing. de Ciberseguridad", capitan: "Laura Díaz", monto: 50000, estado: "pendiente", fecha: "-", revisadoPor: "-", comprobanteUrl: null, comprobanteTipo: null },
  { id: 7, nombre: "Boolean FC", decanatura: "Administración de Empresas", capitan: "Diego Torres", monto: 50000, estado: "pagado", fecha: "2026-02-25", revisadoPor: "Organizador", comprobanteUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80", comprobanteTipo: "imagen" },
  { id: 8, nombre: "Async Avengers", decanatura: "Ing. Mecánica", capitan: "Sofia Ruiz", monto: 50000, estado: "rechazado", fecha: "-", revisadoPor: "Organizador", comprobanteUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=1200&q=80", comprobanteTipo: "imagen" },
  { id: 9, nombre: "Code Masters", decanatura: "Ing. en Biotecnología", capitan: "Miguel Ángel", monto: 50000, estado: "pagado", fecha: "2026-02-28", revisadoPor: "Organizador", comprobanteUrl: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1200&q=80", comprobanteTipo: "imagen" },
  { id: 10, nombre: "Dev United", decanatura: "Ing. Biomédica", capitan: "Camila Rojas", monto: 50000, estado: "pendiente", fecha: "-", revisadoPor: "-", comprobanteUrl: null, comprobanteTipo: null },
];

export function PaymentReport() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(teamsData);
  const [selectedTeam, setSelectedTeam] = useState<TeamPayment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pagado" | "pendiente" | "rechazado">("all");

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          team.decanatura.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          team.capitan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || team.estado === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalEquipos = teams.length;
  const equiposPagados = teams.filter(t => t.estado === "pagado").length;
  const equiposPendientes = teams.filter(t => t.estado === "pendiente").length;
  const totalRecaudado = teams.filter(t => t.estado === "pagado").reduce((acc, t) => acc + t.monto, 0);

  const handleReviewPayment = (id: number, decision: "pagado" | "rechazado") => {
    setTeams((prev) => prev.map((team) => {
      if (team.id !== id) return team;
      return {
        ...team,
        estado: decision,
        fecha: decision === "pagado" ? "2026-03-15" : "-",
        revisadoPor: "Organizador",
      };
    }));
  };

  const handleDownloadReport = () => {
    // Generar CSV
    const headers = ["Equipo", "Decanatura", "Capitán", "Monto", "Estado", "Fecha de Pago"];
    const rows = filteredTeams.map(team => [
      team.nombre,
      team.decanatura,
      team.capitan,
      `$${team.monto.toLocaleString()}`,
      team.estado.charAt(0).toUpperCase() + team.estado.slice(1),
      team.fecha
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `reporte-pagos-techcup-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pagado":
        return <CheckCircle2 style={{ width: 16, height: 16, color: P.success }} />;
      case "pendiente":
        return <Clock style={{ width: 16, height: 16, color: P.warning }} />;
      case "rechazado":
        return <XCircle style={{ width: 16, height: 16, color: P.primary }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pagado":
        return { bg: `${P.success}15`, text: P.success, border: `${P.success}30` };
      case "pendiente":
        return { bg: `${P.warning}15`, text: P.warning, border: `${P.warning}30` };
      case "rechazado":
        return { bg: `${P.primary}15`, text: P.primary, border: `${P.primary}30` };
      default:
        return { bg: "#F3F4F6", text: P.default, border: "#E5E7EB" };
    }
  };

  return (
    <div className="min-h-screen pb-28 lg:pb-8" style={{ backgroundColor: P.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b px-6" style={{
        background: "rgba(242,242,247,0.85)",
        borderColor: "rgba(0,0,0,0.06)",
        backdropFilter: "saturate(180%) blur(20px)",
      }}>
        <div className="max-w-6xl mx-auto flex items-center h-[60px]">
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
      <main className="max-w-6xl mx-auto px-6 sm:px-10 pt-8 pb-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: `${P.purple}15`, border: `1px solid ${P.purple}30` }}
          >
            <CreditCard style={{ width: 14, height: 14, color: P.purple }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: P.purple, textTransform: "uppercase" }}>
              Gestión de pagos
            </span>
          </div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 800, color: P.textPrimary, letterSpacing: "-0.02em" }}>
            Información de Pagos
          </h1>
          <p style={{ color: P.default, fontWeight: 500, fontSize: "0.95rem" }}>
            Reporte de pagos de inscripción de equipos al torneo
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-white rounded-[20px] p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${P.info}15` }}>
                <FileText style={{ width: 20, height: 20, color: P.info }} />
              </div>
            </div>
            <p className="text-2xl mb-1" style={{ fontWeight: 800, color: P.textPrimary }}>{totalEquipos}</p>
            <p className="text-xs" style={{ color: P.default, fontWeight: 600 }}>Total Equipos</p>
          </div>

          <div className="bg-white rounded-[20px] p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${P.success}15` }}>
                <CheckCircle2 style={{ width: 20, height: 20, color: P.success }} />
              </div>
            </div>
            <p className="text-2xl mb-1" style={{ fontWeight: 800, color: P.textPrimary }}>{equiposPagados}</p>
            <p className="text-xs" style={{ color: P.default, fontWeight: 600 }}>Equipos Pagados</p>
          </div>

          <div className="bg-white rounded-[20px] p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${P.warning}15` }}>
                <Clock style={{ width: 20, height: 20, color: P.warning }} />
              </div>
            </div>
            <p className="text-2xl mb-1" style={{ fontWeight: 800, color: P.textPrimary }}>{equiposPendientes}</p>
            <p className="text-xs" style={{ color: P.default, fontWeight: 600 }}>Pagos Pendientes</p>
          </div>

          <div className="bg-white rounded-[20px] p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${P.purple}15` }}>
                <CreditCard style={{ width: 20, height: 20, color: P.purple }} />
              </div>
            </div>
            <p className="text-2xl mb-1" style={{ fontWeight: 800, color: P.textPrimary }}>
              ${(totalRecaudado / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs" style={{ color: P.default, fontWeight: 600 }}>Total Recaudado</p>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-[20px] p-5 mb-6"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2" style={{ width: 18, height: 18, color: P.default }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar equipo, decanatura o capitán..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-purple-500 transition-colors"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter style={{ width: 18, height: 18, color: P.default }} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-purple-500 transition-colors"
                style={{ fontSize: "0.9rem", fontWeight: 600 }}
              >
                <option value="all">Todos</option>
                <option value="pagado">Pagados</option>
                <option value="pendiente">Pendientes</option>
                <option value="rechazado">Rechazados</option>
              </select>
            </div>

            {/* Download button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadReport}
              className="px-5 py-3 rounded-xl text-white flex items-center gap-2"
              style={{
                backgroundColor: P.success,
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              <Download style={{ width: 18, height: 18 }} />
              <span className="hidden sm:inline">Descargar</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[20px] overflow-hidden"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <th className="text-left px-6 py-4 text-xs" style={{ fontWeight: 700, color: P.default, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Equipo
                  </th>
                  <th className="text-left px-6 py-4 text-xs" style={{ fontWeight: 700, color: P.default, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Decanatura
                  </th>
                  <th className="text-left px-6 py-4 text-xs" style={{ fontWeight: 700, color: P.default, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Capitán
                  </th>
                  <th className="text-left px-6 py-4 text-xs" style={{ fontWeight: 700, color: P.default, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Monto
                  </th>
                  <th className="text-left px-6 py-4 text-xs" style={{ fontWeight: 700, color: P.default, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Estado
                  </th>
                  <th className="text-left px-6 py-4 text-xs" style={{ fontWeight: 700, color: P.default, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Fecha
                  </th>
                  <th className="text-left px-6 py-4 text-xs" style={{ fontWeight: 700, color: P.default, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Comprobante
                  </th>
                  <th className="text-left px-6 py-4 text-xs" style={{ fontWeight: 700, color: P.default, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Revisión
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map((team, idx) => {
                  const statusColor = getStatusColor(team.estado);
                  return (
                    <motion.tr
                      key={team.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + idx * 0.02 }}
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p style={{ fontWeight: 600, fontSize: "0.9rem", color: P.textPrimary }}>{team.nombre}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p style={{ fontWeight: 500, fontSize: "0.85rem", color: P.default }}>{team.decanatura}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p style={{ fontWeight: 500, fontSize: "0.85rem", color: P.default }}>{team.capitan}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p style={{ fontWeight: 700, fontSize: "0.9rem", color: P.textPrimary }}>
                          ${team.monto.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                          style={{ backgroundColor: statusColor.bg, border: `1px solid ${statusColor.border}` }}
                        >
                          {getStatusIcon(team.estado)}
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: statusColor.text, textTransform: "capitalize" }}>
                            {team.estado}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p style={{ fontWeight: 500, fontSize: "0.85rem", color: P.default }}>{team.fecha}</p>
                      </td>
                      <td className="px-6 py-4">
                        {team.comprobanteUrl ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTeam(team);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors"
                            style={{
                              backgroundColor: `${P.info}12`,
                              color: P.info,
                              fontWeight: 700,
                            }}
                          >
                            <Eye style={{ width: 14, height: 14 }} />
                            Revisar comprobante
                          </button>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: P.default, fontWeight: 600 }}>
                            Sin archivo
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {team.estado === "pendiente" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReviewPayment(team.id, "pagado"); }}
                              className="px-2.5 py-1 rounded-lg text-xs"
                              style={{ backgroundColor: `${P.success}18`, color: P.success, fontWeight: 700 }}
                            >
                              Aceptar
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReviewPayment(team.id, "rechazado"); }}
                              className="px-2.5 py-1 rounded-lg text-xs"
                              style={{ backgroundColor: `${P.primary}18`, color: P.primary, fontWeight: 700 }}
                            >
                              Rechazar
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: P.default, fontWeight: 600 }}>
                            Revisado por {team.revisadoPor}
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredTeams.length === 0 && (
            <div className="py-12 text-center">
              <p style={{ color: P.default, fontWeight: 500 }}>No se encontraron resultados</p>
            </div>
          )}
        </motion.div>
      </main>

      {selectedTeam && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm"
            onClick={() => setSelectedTeam(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden pointer-events-auto"
              style={{ boxShadow: "0 24px 72px rgba(0,0,0,0.24)" }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <div>
                  <p style={{ fontSize: "0.95rem", fontWeight: 700, color: P.textPrimary }}>Comprobante de {selectedTeam.nombre}</p>
                  <p style={{ fontSize: "0.76rem", fontWeight: 500, color: P.default }}>Capitán: {selectedTeam.capitan}</p>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#F3F4F6" }}
                >
                  <X style={{ width: 18, height: 18, color: P.default }} />
                </button>
              </div>

              <div className="p-4 sm:p-5">
                {!selectedTeam.comprobanteUrl ? (
                  <div className="h-[320px] rounded-xl border border-dashed flex flex-col items-center justify-center gap-2" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
                    <ImageIcon style={{ width: 26, height: 26, color: P.default }} />
                    <p style={{ fontSize: "0.9rem", color: P.textPrimary, fontWeight: 600 }}>Este equipo aún no sube comprobante</p>
                    <p style={{ fontSize: "0.78rem", color: P.default, fontWeight: 500 }}>Cuando lo suba, aparecerá aquí.</p>
                  </div>
                ) : selectedTeam.comprobanteTipo === "pdf" ? (
                  <iframe
                    title={`Comprobante ${selectedTeam.nombre}`}
                    src={selectedTeam.comprobanteUrl}
                    className="w-full h-[70vh] rounded-xl border"
                    style={{ borderColor: "rgba(0,0,0,0.1)" }}
                  />
                ) : (
                  <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                    <img
                      src={selectedTeam.comprobanteUrl}
                      alt={`Comprobante de ${selectedTeam.nombre}`}
                      className="w-full h-[70vh] object-contain bg-[#F9FAFB]"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}



