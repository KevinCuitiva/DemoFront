import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import logoTechcup from "@/assets/logo.png";
import {
  User,
  Swords,
  CalendarDays,
  Trophy,
  Info,
  LogOut,
  Bell,
  Users,
  Check,
  X,
  ChevronRight,
  ClipboardList,
  Shield,
  UserPlus,
  Trash2,
  Send,
  AlertCircle,
  CreditCard,
  Upload,
  FileText,
  ImageIcon,
  Paperclip,
} from "lucide-react";

// ── Palette — Apple-style ─────────────────────────
const P = {
  primary: "#B81C1C",
  secondary: "#C4841D",
  success: "#17C964",
  info: "#0066FE",
  default: "#6E6E73",
  textPrimary: "#1C1C1E",
  bg: "#F2F2F7",
};

// ── Nav buttons ───────────────────────────────────
const navButtons = [
  {
    label: "Partidos para Hoy",
    icon: Swords,
    path: "/matches",
    color: "#B81C1C",
    iconBg: "rgba(184,28,28,0.10)",
    iconGlow: "rgba(184,28,28,0.18)",
    hoverAccent: "rgba(184,28,28,0.05)",
    description: "Consulta todos los partidos del día",
  },
  {
    label: "Calendario",
    icon: CalendarDays,
    path: "/schedule",
    color: "#C4841D",
    iconBg: "rgba(196,132,29,0.10)",
    iconGlow: "rgba(196,132,29,0.20)",
    hoverAccent: "rgba(196,132,29,0.05)",
    description: "Fechas próximas y calendario del torneo",
  },
  {
    label: "Tabla de Posiciones",
    icon: Trophy,
    path: "/scores",
    color: "#17C964",
    iconBg: "rgba(23,201,100,0.10)",
    iconGlow: "rgba(23,201,100,0.20)",
    hoverAccent: "rgba(23,201,100,0.05)",
    description: "Puntuación actualizada en tiempo real",
  },
  {
    label: "Info del Torneo",
    icon: Info,
    path: "/tournament",
    color: "#0066FE",
    iconBg: "rgba(0,102,254,0.10)",
    iconGlow: "rgba(0,102,254,0.18)",
    hoverAccent: "rgba(0,102,254,0.05)",
    description: "Reglas, premios y datos del torneo",
  },
];

// ── Notification types ────────────────────────────
type NotifStatus = "pending" | "accepted" | "rejected" | "uploaded";

interface Notification {
  id: number;
  type: "invite" | "payment";
  team: string;
  captain: string;
  time: string;
  status: NotifStatus;
  read: boolean;
}

const initialNotifs: Notification[] = [
  {
    id: 4,
    type: "payment",
    team: "TECHCUP 2026",
    captain: "Administración",
    time: "Hace 10 min",
    status: "pending",
    read: false,
  },
];

// ── Notification Panel ────────────────────────────
function NotifPanel({
  notifs,
  onClose,
  onSelectNotif,
  onMarkRead,
}: {
  notifs: Notification[];
  onClose: () => void;
  onSelectNotif: (n: Notification) => void;
  onMarkRead: (id: number) => void;
}) {
  const unread = notifs.filter((n) => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="absolute right-0 sm:right-0 left-4 sm:left-auto top-12 sm:w-[380px] bg-white rounded-[20px] overflow-hidden z-50"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.14)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4" style={{ color: P.primary }} />
          <span className="text-sm" style={{ fontWeight: 700 }}>
            Notificaciones
          </span>
          {unread > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: P.primary, fontWeight: 700 }}
            >
              {unread}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#F8F9FA] transition-colors duration-200"
        >
          <X className="w-4 h-4" style={{ color: P.default }} />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-black/4 max-h-[360px] overflow-y-auto">
        {notifs.length === 0 ? (
          <div className="py-12 text-center">
            <Bell className="w-8 h-8 mx-auto mb-3" style={{ color: P.default }} />
            <p className="text-sm" style={{ color: P.default, fontWeight: 500 }}>
              Sin notificaciones
            </p>
          </div>
        ) : (
          notifs.map((n) => (
            <motion.button
              key={n.id}
              whileHover={{ backgroundColor: "#F8F9FA" }}
              onClick={() => {
                onMarkRead(n.id);
                if (n.status === "pending") onSelectNotif(n);
              }}
              className="w-full text-left px-5 py-4 flex items-start gap-3 transition-colors duration-150 relative"
            >
              {/* Unread dot */}
              {!n.read && (
                <div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full"
                  style={{ backgroundColor: P.primary }}
                />
              )}

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  backgroundColor:
                    n.type === "payment"
                      ? n.status === "uploaded" ? `${P.success}18` : `${P.info}18`
                      : n.status === "accepted"
                      ? `${P.success}18`
                      : n.status === "rejected"
                      ? `${P.default}18`
                      : `${P.secondary}18`,
                }}
              >
                {n.type === "payment" ? (
                  <CreditCard
                    className="w-5 h-5"
                    style={{ color: n.status === "uploaded" ? P.success : P.info }}
                  />
                ) : (
                  <Users
                    className="w-5 h-5"
                    style={{
                      color:
                        n.status === "accepted"
                          ? P.success
                          : n.status === "rejected"
                          ? P.default
                          : P.secondary,
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm leading-snug" style={{ fontWeight: 600 }}>
                  {n.type === "payment"
                    ? n.status === "uploaded"
                      ? "Comprobante enviado correctamente"
                      : "Bienvenido al torneo · Comprobante de pago"
                    : n.status === "accepted"
                    ? `¡Te uniste a ${n.team}!`
                    : n.status === "rejected"
                    ? `Invitación de ${n.team} rechazada`
                    : `¡Felicidades! Has sido invitado a hacer parte de un equipo`}
                </p>
                <p className="text-xs mt-1" style={{ color: P.default, fontWeight: 500 }}>
                  {n.type === "payment" ? `${n.team} · ${n.captain}` : `${n.team} · Cap. ${n.captain}`}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[11px]" style={{ color: P.default, fontWeight: 500 }}>
                    {n.time}
                  </span>
                  {n.type === "payment" && n.status === "pending" && (
                    <span
                      className="text-[11px] flex items-center gap-0.5"
                      style={{ color: P.info, fontWeight: 700 }}
                    >
                      Subir comprobante
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                  {n.type === "payment" && n.status === "uploaded" && (
                    <span
                      className="text-[11px] flex items-center gap-1"
                      style={{ color: P.success, fontWeight: 700 }}
                    >
                      <Check className="w-3 h-3" /> Enviado
                    </span>
                  )}
                  {n.type === "invite" && n.status === "pending" && (
                    <span
                      className="text-[11px] flex items-center gap-0.5"
                      style={{ color: P.secondary, fontWeight: 700 }}
                    >
                      Ver invitación
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                  {n.type === "invite" && n.status === "accepted" && (
                    <span
                      className="text-[11px] flex items-center gap-1"
                      style={{ color: P.success, fontWeight: 700 }}
                    >
                      <Check className="w-3 h-3" /> Aceptada
                    </span>
                  )}
                  {n.type === "invite" && n.status === "rejected" && (
                    <span
                      className="text-[11px] flex items-center gap-1"
                      style={{ color: P.default, fontWeight: 700 }}
                    >
                      <X className="w-3 h-3" /> Rechazada
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-black/5 bg-[#FAFAFA] text-center">
        <span className="text-xs" style={{ color: P.default, fontWeight: 500 }}>
          Solo se muestran invitaciones activas del torneo
        </span>
      </div>
    </motion.div>
  );
}

// ── Invite Confirm Modal ──────────────────────────
function InviteModal({
  notif,
  onAccept,
  onReject,
  onClose,
}: {
  notif: Notification;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm"
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none"
      >
        <div
          className="bg-white rounded-3xl w-full max-w-sm pointer-events-auto overflow-hidden"
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.18)" }}
        >
          {/* Colored top band */}
          <div className="h-1.5 w-full" style={{ backgroundColor: P.secondary }} />

          <div className="p-8">
            {/* Trophy icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${P.secondary}18` }}
            >
              <Users className="w-8 h-8" style={{ color: P.secondary }} />
            </motion.div>

            {/* Text */}
            <div className="text-center mb-6">
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ fontWeight: 700, color: P.secondary }}
              >
                Invitación al Torneo
              </p>
              <h2 className="text-xl text-black mb-3" style={{ fontWeight: 700 }}>
                ¡Has sido invitado!
              </h2>
              <p className="text-sm" style={{ color: "#6C757D", fontWeight: 500 }}>
                Felicidades, has sido invitado a hacer parte de un equipo en TECHCUP.
              </p>
            </div>

            {/* Team card */}
            <div
              className="rounded-2xl p-4 mb-6 border"
              style={{
                backgroundColor: `${P.primary}06`,
                borderColor: `${P.primary}20`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${P.primary}15` }}
                >
                  <span className="text-lg" style={{ fontWeight: 800, color: P.primary }}>
                    {notif.team.charAt(notif.team.lastIndexOf(" ") + 1)}
                  </span>
                </div>
                <div>
                  <p className="text-base" style={{ fontWeight: 700 }}>
                    {notif.team}
                  </p>
                  <p className="text-xs" style={{ color: P.default, fontWeight: 500 }}>
                    Capitán: {notif.captain}
                  </p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${P.secondary}18`,
                      color: P.secondary,
                      fontWeight: 700,
                    }}
                  >
                    TECHCUP 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Info row */}
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl mb-6"
              style={{ backgroundColor: `${P.info}10` }}
            >
              <Info className="w-4 h-4 flex-shrink-0" style={{ color: P.info }} />
              <p className="text-xs" style={{ color: P.info, fontWeight: 500 }}>
                Al aceptar, quedarás registrado como integrante oficial de {notif.team} para el torneo.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onReject}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-black/8 text-sm"
                style={{ fontWeight: 600, color: "#6C757D" }}
              >
                <X className="w-4 h-4" />
                Rechazar
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onAccept}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-sm shadow-lg"
                style={{
                  backgroundColor: P.success,
                  fontWeight: 700,
                  boxShadow: `0 8px 24px ${P.success}40`,
                }}
              >
                <Check className="w-4 h-4" />
                Aceptar
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ── Payment Modal ─────────────────────────────────
function PaymentModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

  const getIcon = () => {
    if (!file) return null;
    if (file.type.startsWith("image/")) return <ImageIcon className="w-5 h-5" style={{ color: P.info }} />;
    return <FileText className="w-5 h-5" style={{ color: P.info }} />;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const pickFile = (f: File) => {
    if (!ACCEPTED.includes(f.type)) return;
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) pickFile(f);
  };

  const handleSend = () => {
    if (!file) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onClose();
      onSuccess();
    }, 1800);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
      />

      {/* Drawer bottom → centered desktop */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:px-6 pointer-events-none"
      >
        <div
          className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden pointer-events-auto flex flex-col"
          style={{ boxShadow: "0 -8px 60px rgba(0,0,0,0.18)", maxHeight: "92vh" }}
        >
          {/* Drag handle (mobile) */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-black/10" />
          </div>

          {/* Color band */}
          <div className="h-1.5 flex-shrink-0" style={{ background: `linear-gradient(90deg, ${P.info}, #0044CC)` }} />

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1">
            <div className="px-6 pt-6 pb-4">

              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${P.info}15` }}
                  >
                    <CreditCard className="w-5 h-5" style={{ color: P.info }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest" style={{ fontWeight: 700, color: P.info }}>
                      Comprobante de Pago
                    </p>
                    <h2 className="text-lg text-black" style={{ fontWeight: 700 }}>
                      Bienvenido al torneo
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8F9FA] transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-4 h-4" style={{ color: P.default }} />
                </button>
              </div>

              {/* Welcome message */}
              <div
                className="p-4 rounded-2xl mb-5 border"
                style={{ backgroundColor: `${P.info}08`, borderColor: `${P.info}22` }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#1A1A2E", fontWeight: 500 }}>
                  👋 ¡Bienvenido al torneo! Acá puedes subir tu{" "}
                  <span style={{ fontWeight: 700 }}>comprobante de pago</span> para confirmar tu participación en TECHCUP 2026.
                </p>
              </div>

              {/* Accepted formats */}
              <div className="flex flex-wrap gap-2 mb-5">
                {["PNG", "JPG", "PDF"].map((ext) => (
                  <span
                    key={ext}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{ borderColor: `${P.info}30`, color: P.info, fontWeight: 600, backgroundColor: `${P.info}08` }}
                  >
                    {ext}
                  </span>
                ))}
                <span
                  className="text-xs px-2.5 py-1 rounded-full border"
                  style={{ borderColor: "#E9ECEF", color: P.default, fontWeight: 500 }}
                >
                  Máx. 10 MB
                </span>
              </div>

              {/* Drop zone */}
              <motion.div
                animate={{
                  borderColor: dragging ? P.info : file ? P.success : "#E9ECEF",
                  backgroundColor: dragging ? `${P.info}08` : file ? `${P.success}08` : "#FAFAFA",
                }}
                transition={{ duration: 0.2 }}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => !file && inputRef.current?.click()}
                className="rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 mb-4"
                style={{ minHeight: 160 }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }}
                />

                <AnimatePresence mode="wait">
                  {!file ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: dragging ? `${P.info}20` : "#F0F0F0" }}
                      >
                        <Upload className="w-7 h-7" style={{ color: dragging ? P.info : P.default }} />
                      </div>
                      <div>
                        <p className="text-sm" style={{ fontWeight: 700, color: dragging ? P.info : "#333" }}>
                          {dragging ? "Suelta el archivo aquí" : "Arrastra tu archivo aquí"}
                        </p>
                        <p className="text-xs mt-1" style={{ color: P.default, fontWeight: 500 }}>
                          o haz clic para seleccionar desde tu dispositivo
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="file"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-3 w-full"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${P.success}18` }}
                      >
                        <Check className="w-7 h-7" style={{ color: P.success }} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm" style={{ fontWeight: 700, color: "#333" }}>
                          Archivo listo
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: P.default, fontWeight: 500 }}>
                          Toca para cambiar
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* File preview pill */}
              <AnimatePresence>
                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl border mb-4"
                    style={{ borderColor: `${P.success}30`, backgroundColor: `${P.success}08` }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${P.info}18` }}
                    >
                      {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate" style={{ fontWeight: 600 }}>{file.name}</p>
                      <p className="text-xs" style={{ color: P.default, fontWeight: 500 }}>{formatSize(file.size)}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" style={{ color: P.default }} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint */}
              <div
                className="flex items-start gap-2 px-4 py-3 rounded-xl"
                style={{ backgroundColor: `${P.secondary}0D` }}
              >
                <Paperclip className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: P.secondary }} />
                <p className="text-xs" style={{ color: "#7A5C10", fontWeight: 500 }}>
                  Asegúrate de que el comprobante sea legible y muestre el monto, fecha y número de transacción.
                </p>
              </div>
            </div>
          </div>

          {/* ── Sticky footer with Send button ── */}
          <div
            className="flex-shrink-0 px-6 py-5 border-t border-black/5 bg-white"
            style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}
          >
            <motion.button
              whileHover={file && !sending ? { scale: 1.02, y: -1 } : {}}
              whileTap={file && !sending ? { scale: 0.98 } : {}}
              onClick={handleSend}
              disabled={!file || sending}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white text-sm transition-all duration-300"
              style={{
                backgroundColor: file ? P.info : "#E9ECEF",
                fontWeight: 700,
                color: file ? "white" : P.default,
                boxShadow: file ? `0 8px 28px ${P.info}40` : "none",
                cursor: file ? "pointer" : "not-allowed",
              }}
            >
              {sending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                  />
                  Enviando comprobante...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {file ? "Enviar comprobante" : "Selecciona un archivo primero"}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ── Inscription Modal ─────────────────────────────
function InscriptionModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [teamName, setTeamName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [invited, setInvited] = useState<string[]>([]);
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleAddInvite = () => {
    const val = emailInput.trim();
    if (!val) return;
    if (!isValidEmail(val)) { setEmailError("Ingresa un correo válido"); return; }
    if (invited.includes(val)) { setEmailError("Este correo ya fue añadido"); return; }
    setInvited((prev) => [...prev, val]);
    setEmailInput("");
    setEmailError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); handleAddInvite(); }
  };

  const handleSubmit = () => {
    onClose();
    onSuccess();
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
      />

      {/* Drawer — slides from bottom on mobile, centered on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:px-6 pointer-events-none"
      >
        <div
          className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden pointer-events-auto"
          style={{ boxShadow: "0 -8px 60px rgba(0,0,0,0.18)", maxHeight: "92vh" }}
        >
          {/* Drag handle (mobile) */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-black/10" />
          </div>

          {/* Colored band */}
          <div className="h-1.5 w-full mx-0" style={{ background: `linear-gradient(90deg, ${P.primary}, ${P.secondary})` }} />

          {/* Scrollable body */}
          <div className="overflow-y-auto" style={{ maxHeight: "80vh" }}>
            <div className="px-6 pt-6 pb-8">

              {/* ── Captain notice ── */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3 p-4 rounded-2xl mb-6 border"
                style={{
                  backgroundColor: `${P.secondary}0D`,
                  borderColor: `${P.secondary}35`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${P.secondary}20` }}
                >
                  <Shield className="w-4 h-4" style={{ color: P.secondary }} />
                </div>
                <div>
                  <p className="text-sm" style={{ fontWeight: 700, color: P.secondary }}>
                    Rol de Capitán
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#7A5C10", fontWeight: 500 }}>
                    La persona que crea la invitación y el grupo se le asigna el rol de
                    <span style={{ fontWeight: 700 }}> Capitán </span>
                    automáticamente, sin poder hacer el cambio durante el torneo.
                  </p>
                </div>
              </motion.div>

              {/* ── Header ── */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ fontWeight: 700, color: P.primary }}>
                    Inscripción al Torneo
                  </p>
                  <h2 className="text-xl text-black" style={{ fontWeight: 700 }}>
                    {step === 1 ? "Crea tu equipo" : "Invita a tus compañeros"}
                  </h2>
                  <p className="text-xs mt-1" style={{ color: P.default, fontWeight: 500 }}>
                    Paso {step} de 2
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8F9FA] transition-colors duration-200"
                >
                  <X className="w-4 h-4" style={{ color: P.default }} />
                </button>
              </div>

              {/* Step indicator */}
              <div className="flex gap-2 mb-7">
                {[1, 2].map((s) => (
                  <motion.div
                    key={s}
                    animate={{ width: step === s ? 32 : 8 }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: step >= s ? P.primary : "#E9ECEF" }}
                  />
                ))}
              </div>

              {/* ── STEP 1: Team name ── */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-5"
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-2">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${P.primary}10` }}
                      >
                        <ClipboardList className="w-8 h-8" style={{ color: P.primary }} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs mb-1.5" style={{ fontWeight: 700, color: "#6C757D" }}>
                        Nombre del equipo *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Equipo Alpha"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        maxLength={30}
                        className="w-full px-4 py-3.5 rounded-xl border text-sm bg-white outline-none transition-all duration-200"
                        style={{
                          borderColor: teamName ? P.primary : "#E9ECEF",
                          fontWeight: 500,
                          boxShadow: teamName ? `0 0 0 3px ${P.primary}15` : "none",
                        }}
                      />
                      <div className="flex justify-between mt-1">
                        <p className="text-xs" style={{ color: P.default, fontWeight: 500 }}>
                          Máximo 30 caracteres
                        </p>
                        <p className="text-xs" style={{ color: teamName.length > 25 ? P.primary : P.default, fontWeight: 500 }}>
                          {teamName.length}/30
                        </p>
                      </div>
                    </div>

                    {/* Info note */}
                    <div
                      className="flex items-start gap-2 p-3 rounded-xl"
                      style={{ backgroundColor: `${P.info}0D` }}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: P.info }} />
                      <p className="text-xs" style={{ color: P.info, fontWeight: 500 }}>
                        El nombre del equipo es definitivo y no podrá modificarse una vez confirmada la inscripción.
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => teamName.trim() && setStep(2)}
                      disabled={!teamName.trim()}
                      className="w-full py-4 rounded-2xl text-white text-sm transition-all duration-200"
                      style={{
                        backgroundColor: teamName.trim() ? P.primary : "#E9ECEF",
                        fontWeight: 700,
                        color: teamName.trim() ? "white" : P.default,
                        boxShadow: teamName.trim() ? `0 8px 24px ${P.primary}35` : "none",
                        cursor: teamName.trim() ? "pointer" : "not-allowed",
                      }}
                    >
                      Continuar →
                    </motion.button>
                  </motion.div>
                )}

                {/* ── STEP 2: Invite people ── */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-5"
                  >
                    {/* Team badge */}
                    <div
                      className="flex items-center gap-3 p-4 rounded-2xl border"
                      style={{ borderColor: `${P.primary}25`, backgroundColor: `${P.primary}07` }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${P.primary}18` }}
                      >
                        <span className="text-base" style={{ fontWeight: 800, color: P.primary }}>
                          {teamName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm" style={{ fontWeight: 700 }}>{teamName}</p>
                        <p className="text-xs" style={{ color: P.default, fontWeight: 500 }}>
                          Tú · <span style={{ color: P.secondary, fontWeight: 700 }}>Capitán</span>
                        </p>
                      </div>
                      <div className="ml-auto">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: `${P.success}18`, color: P.success, fontWeight: 700 }}
                        >
                          {1 + invited.length} miembro{invited.length !== 0 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Invite input */}
                    <div>
                      <label className="block text-xs mb-1.5" style={{ fontWeight: 700, color: "#6C757D" }}>
                        Invitar por correo institucional
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="correo@universidad.edu"
                          value={emailInput}
                          onChange={(e) => { setEmailInput(e.target.value); setEmailError(""); }}
                          onKeyDown={handleKeyDown}
                          className="flex-1 px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-all duration-200"
                          style={{
                            borderColor: emailError ? P.primary : emailInput ? P.info : "#E9ECEF",
                            fontWeight: 500,
                            boxShadow: emailInput && !emailError ? `0 0 0 3px ${P.info}15` : emailError ? `0 0 0 3px ${P.primary}15` : "none",
                          }}
                        />
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={handleAddInvite}
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                          style={{ backgroundColor: P.info }}
                        >
                          <UserPlus className="w-5 h-5" />
                        </motion.button>
                      </div>
                      {emailError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs mt-1.5 flex items-center gap-1"
                          style={{ color: P.primary, fontWeight: 500 }}
                        >
                          <AlertCircle className="w-3 h-3" />
                          {emailError}
                        </motion.p>
                      )}
                      <p className="text-xs mt-1.5" style={{ color: P.default, fontWeight: 500 }}>
                        Presiona Enter o el botón + para añadir. Puedes invitar hasta 10 jugadores.
                      </p>
                    </div>

                    {/* Invited list */}
                    {invited.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs" style={{ fontWeight: 700, color: "#6C757D" }}>
                          Invitados ({invited.length})
                        </p>
                        <AnimatePresence>
                          {invited.map((email) => (
                            <motion.div
                              key={email}
                              initial={{ opacity: 0, height: 0, y: -8 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -8 }}
                              transition={{ duration: 0.22 }}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black/6 bg-white"
                            >
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                                style={{ backgroundColor: P.info, fontWeight: 700 }}
                              >
                                {email.charAt(0).toUpperCase()}
                              </div>
                              <span className="flex-1 text-sm truncate" style={{ fontWeight: 500 }}>
                                {email}
                              </span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: `${P.secondary}18`, color: P.secondary, fontWeight: 600 }}
                              >
                                Pendiente
                              </span>
                              <button
                                onClick={() => setInvited((prev) => prev.filter((e) => e !== email))}
                                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors duration-150 flex-shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" style={{ color: P.default }} />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}

                    {invited.length === 0 && (
                      <div
                        className="flex flex-col items-center py-6 rounded-2xl border-2 border-dashed"
                        style={{ borderColor: "#E9ECEF" }}
                      >
                        <Users className="w-8 h-8 mb-2" style={{ color: P.default }} />
                        <p className="text-sm" style={{ color: P.default, fontWeight: 500 }}>
                          Aún no has invitado a nadie
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "#CED4DA", fontWeight: 500 }}>
                          Puedes inscribirte sin invitados y hacerlo luego
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setStep(1)}
                        className="flex-none px-5 py-3.5 rounded-2xl border border-black/8 text-sm"
                        style={{ fontWeight: 600, color: "#6C757D" }}
                      >
                        ← Atrás
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSubmit}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-sm"
                        style={{
                          backgroundColor: P.primary,
                          fontWeight: 700,
                          boxShadow: `0 8px 24px ${P.primary}35`,
                        }}
                      >
                        <Send className="w-4 h-4" />
                        Confirmar inscripción
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ── Feedback toast ────────────────────────────────
function Toast({ msg, color }: { msg: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 48, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white shadow-2xl"
      style={{ backgroundColor: color, boxShadow: `0 12px 40px ${color}50` }}
    >
      {color === P.success ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
      <span className="text-sm whitespace-nowrap" style={{ fontWeight: 700 }}>
        {msg}
      </span>
    </motion.div>
  );
}

// ── Dashboard ─────────────────────────────────────
export function Dashboard() {
  const navigate = useNavigate();

  // Logout
  const [showLogout, setShowLogout] = useState(false);

  // Notifications
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);
  const [notifOpen, setNotifOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);
  const [toast, setToast] = useState<{ msg: string; color: string } | null>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Inscription
  const [showInscription, setShowInscription] = useState(false);

  const unreadCount = notifs.filter((n) => !n.read).length;

  // Close panel on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const showToast = (msg: string, color: string) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  const handleMarkRead = (id: number) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleAccept = () => {
    if (!selectedNotif) return;
    setNotifs((prev) =>
      prev.map((n) =>
        n.id === selectedNotif.id ? { ...n, status: "accepted", read: true } : n
      )
    );
    setSelectedNotif(null);
    setNotifOpen(false);
    showToast(`¡Bienvenido a ${selectedNotif.team}!`, P.success);
  };

  const handleReject = () => {
    if (!selectedNotif) return;
    setNotifs((prev) =>
      prev.map((n) =>
        n.id === selectedNotif.id ? { ...n, status: "rejected", read: true } : n
      )
    );
    setSelectedNotif(null);
    showToast(`Invitación de ${selectedNotif.team} rechazada`, P.default);
  };

  const handleLogout = () => {
    setShowLogout(false);
    navigate("/login");
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
            style={{ backgroundColor: `${P.primary}12`, border: `1px solid ${P.primary}30` }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: P.primary }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: P.primary, textTransform: "uppercase" }}>
              Usuario
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">

            {/* Bell */}
            <div className="relative" ref={notifRef}>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setNotifOpen((v) => !v)}
                className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ background: notifOpen ? "rgba(184,28,28,0.08)" : "transparent" }}
              >
                <Bell style={{ width: 19, height: 19, color: notifOpen ? P.primary : P.default }} />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white border-2"
                    style={{ backgroundColor: P.primary, fontSize: 9, fontWeight: 800, borderColor: P.bg }}
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </motion.button>
              <AnimatePresence>
                {notifOpen && (
                  <NotifPanel
                    notifs={notifs}
                    onClose={() => setNotifOpen(false)}
                    onSelectNotif={(n) => { setSelectedNotif(n); setNotifOpen(false); }}
                    onMarkRead={handleMarkRead}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => setShowLogout(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[rgba(184,28,28,0.07)]"
            >
              <LogOut style={{ width: 17, height: 17, color: P.default }} />
            </motion.button>

            {/* Profile */}
            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ background: `${P.primary}18`, border: `1.5px solid ${P.primary}30` }}
              >
                <User style={{ width: 16, height: 16, color: P.primary }} />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ── Invite modal ── */}
      <AnimatePresence>
        {selectedNotif && selectedNotif.type === "invite" && (
          <InviteModal
            notif={selectedNotif}
            onAccept={handleAccept}
            onReject={handleReject}
            onClose={() => setSelectedNotif(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Payment modal ── */}
      <AnimatePresence>
        {selectedNotif && selectedNotif.type === "payment" && (
          <PaymentModal
            onClose={() => setSelectedNotif(null)}
            onSuccess={() => {
              setNotifs((prev) =>
                prev.map((n) =>
                  n.id === selectedNotif!.id ? { ...n, status: "uploaded", read: true } : n
                )
              );
              setSelectedNotif(null);
              showToast("¡Comprobante enviado correctamente!", P.success);
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Inscription modal ── */}
      <AnimatePresence>
        {showInscription && (
          <InscriptionModal
            onClose={() => setShowInscription(false)}
            onSuccess={() => showToast("¡Equipo inscrito exitosamente en TECHCUP!", P.success)}
          />
        )}
      </AnimatePresence>

      {/* ── Logout modal ── */}
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

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} color={toast.color} />}
      </AnimatePresence>

      {/* ── Main ── */}
      <main className="max-w-3xl mx-auto px-6 sm:px-10 pt-10 pb-16">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[24px] mb-8"
          style={{
            background: "linear-gradient(160deg, #5C0000 0%, #8B0000 45%, #B81C1C 100%)",
            boxShadow: "0 8px 32px rgba(184,28,28,0.22)",
          }}
        >
          {/* Dot-grid texture */}
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          {/* Fade bottom edge to bg */}
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(92,0,0,0.35))" }} />
          {/* Red shimmer */}
          <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-[0.15]" style={{ background: "#B81C1C", transform: "translate(40%,-40%)" }} />

          <div className="relative z-10 px-8 py-9 sm:py-11">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
              style={{ background: "rgba(184,28,28,0.25)", border: "1px solid rgba(184,28,28,0.5)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FF6B6B" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", color: "#FF6B6B", textTransform: "uppercase" }}>
                Panel Principal · TECHCUP 2026
              </span>
            </div>
            <h1
              className="text-white mb-2.5"
              style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.3rem)", fontWeight: 800, lineHeight: 1.13, letterSpacing: "-0.03em" }}
            >
              ¡Bienvenido al torneo! 👋
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400, fontSize: "0.92rem", lineHeight: 1.7, maxWidth: "32ch" }}>
              Explora partidos, posiciones y toda la información del torneo desde aquí.
            </p>
          </div>
        </motion.div>

        {/* ── Section label: Explora ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: P.secondary }} />
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color: P.secondary, textTransform: "uppercase" }}>
            Explora el Torneo
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(196,132,29,0.25), transparent)" }} />
        </motion.div>

        {/* ── 4 Nav Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {navButtons.map((btn, index) => {
            const Icon = btn.icon;
            return (
              <Link key={btn.path} to={btn.path} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + index * 0.07, duration: 0.45, ease: "easeOut" }}
                  whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative flex items-center gap-4 px-5 py-5 rounded-[20px] cursor-pointer bg-white overflow-hidden transition-all duration-300 h-full"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  {/* Color wash on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: btn.hoverAccent }}
                  />
                  {/* Left accent bar on hover */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ backgroundColor: btn.color }}
                  />

                  {/* Icon */}
                  <div
                    className="relative z-10 flex items-center justify-center flex-shrink-0 rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: btn.iconBg,
                      width: "3.25rem",
                      height: "3.25rem",
                      boxShadow: `0 4px 14px ${btn.iconGlow}`,
                    }}
                  >
                    <Icon style={{ width: 22, height: 22, color: btn.color }} />
                  </div>

                  {/* Text */}
                  <div className="relative z-10 flex-1 min-w-0">
                    <p className="leading-snug" style={{ fontWeight: 700, color: P.textPrimary, fontSize: "0.9rem" }}>
                      {btn.label}
                    </p>
                    <p className="mt-1" style={{ fontSize: "0.79rem", color: P.default, fontWeight: 400, lineHeight: 1.45 }}>
                      {btn.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    className="relative z-10 flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: btn.iconBg }}
                  >
                    <ChevronRight
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ width: 15, height: 15, color: btn.color }}
                    />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* ── Section label: Únete ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.50, duration: 0.4 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: P.primary }} />
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", color: P.primary, textTransform: "uppercase" }}>
            Únete al Torneo
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(184,28,28,0.2), transparent)" }} />
        </motion.div>

        {/* ── CTA ── */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.45 }}
          whileHover={{ y: -4, boxShadow: "0 16px 44px rgba(196,132,29,0.30)" }}
          whileTap={{ scale: 0.990 }}
          onClick={() => setShowInscription(true)}
          className="w-full flex items-center gap-4 bg-white rounded-[20px] px-5 py-5 cursor-pointer text-left relative overflow-hidden transition-all duration-300"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          {/* Left gold stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[20px]" style={{ background: "linear-gradient(to bottom, #C4841D, #A86A14)" }} />

          {/* Icon */}
          <div
            className="relative z-10 flex items-center justify-center flex-shrink-0 rounded-2xl"
            style={{
              backgroundColor: "rgba(196,132,29,0.10)",
              width: "3.25rem",
              height: "3.25rem",
              boxShadow: "0 4px 14px rgba(196,132,29,0.18)",
            }}
          >
            <ClipboardList style={{ width: 22, height: 22, color: P.secondary }} />
          </div>

          {/* Text */}
          <div className="relative z-10 flex-1 min-w-0">
            <p className="leading-snug" style={{ fontWeight: 700, color: P.textPrimary, fontSize: "0.9rem" }}>
              Inscripción al Torneo
            </p>
            <p className="mt-1" style={{ fontSize: "0.79rem", color: P.default, fontWeight: 400, lineHeight: 1.45 }}>
              Crea tu equipo e invita a tus compañeros
            </p>
          </div>

          {/* Badge */}
          <div
            className="relative z-10 flex-shrink-0 px-3.5 py-1.5 rounded-full hidden sm:flex items-center"
            style={{ background: "rgba(196,132,29,0.10)", border: "1px solid rgba(196,132,29,0.28)" }}
          >
            <span style={{ fontSize: "0.73rem", fontWeight: 700, color: P.secondary }}>Inscribirme</span>
          </div>

          {/* Arrow */}
          <div
            className="relative z-10 flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(196,132,29,0.10)" }}
          >
            <ChevronRight style={{ width: 15, height: 15, color: P.secondary }} />
          </div>
        </motion.button>

      </main>
    </div>
  );
}