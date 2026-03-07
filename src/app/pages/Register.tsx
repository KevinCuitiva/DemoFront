import React from "react";
import { motion } from "motion/react";
import { Shield, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import logoTechcup from "@/assets/logo.png";

const P = {
  primary: "#B81C1C",
  secondary: "#C4841D",
  bg: "#F2F2F7",
};

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); navigate("/dashboard"); }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    fontSize: "0.92rem",
    fontWeight: 500,
    backgroundColor: P.bg,
    border: "1.5px solid transparent",
    borderRadius: "14px",
    outline: "none",
    padding: "0.75rem 1rem 0.75rem 2.8rem",
    color: "#1C1C1E",
    transition: "border-color 0.2s",
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ── Panel Izquierdo ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-1/2 relative overflow-hidden flex flex-col justify-center p-8 md:p-12 lg:p-16 min-h-[42vh] md:min-h-screen"
        style={{ background: "linear-gradient(160deg, #5C0000 0%, #8B0000 45%, #B81C1C 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: "rgba(255,255,255,0.04)", transform: "translate(-50%,-50%)" }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: "rgba(255,255,255,0.04)", transform: "translate(50%,50%)" }} />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(196,132,29,0.08)" }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2" style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
              <img src={logoTechcup} alt="TECHCUP Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-white leading-none" style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>TECHCUP</p>
              <p className="text-white/50 mt-0.5" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>Torneo Universitario</p>
            </div>
          </div>

          <h2
            className="text-white mb-5"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.03em" }}
          >
            Únete a nuestra<br />
            comunidad y empieza<br />
            <span style={{ color: P.secondary }}>tu viaje.</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-10 h-0.5 rounded-full mb-6"
            style={{ backgroundColor: P.secondary, originX: 0 } as React.CSSProperties}
          />

          <p className="text-white/55" style={{ fontSize: "0.92rem", fontWeight: 500, lineHeight: 1.65 }}>
            Accede a eventos, recursos y conecta con profesionales del sector tecnológico
          </p>
        </motion.div>
      </motion.div>

      {/* ── Panel Derecho ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 lg:p-16"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.2rem)", fontWeight: 800, color: "#1C1C1E", letterSpacing: "-0.03em" }}>
              Crear Cuenta
            </h2>
            <p className="mt-2 mb-7" style={{ fontSize: "0.9rem", color: "#6E6E73", fontWeight: 500 }}>
              Completa tus datos para registrarte
            </p>

            {/* Ir a login */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mb-5">
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl transition-all duration-200"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#1C1C1E",
                  backgroundColor: P.bg,
                  border: "1.5px solid rgba(0,0,0,0.07)",
                }}
              >
                Iniciar sesión
              </Link>
            </motion.div>

            {/* Divider */}
            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }} />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white" style={{ fontSize: "0.78rem", color: "#8A8A8E", fontWeight: 500 }}>
                  O regístrate con email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6E6E73" }}>Nombre completo</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6E6E73" }} />
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    placeholder="Juan Pérez" style={inputBase}
                    onFocus={(e) => (e.target.style.borderColor = P.secondary)}
                    onBlur={(e) => (e.target.style.borderColor = "transparent")}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6E6E73" }}>Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6E6E73" }} />
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="tu@email.com" style={inputBase}
                    onFocus={(e) => (e.target.style.borderColor = P.secondary)}
                    onBlur={(e) => (e.target.style.borderColor = "transparent")}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6E6E73" }}>Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6E6E73" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password" value={formData.password} onChange={handleChange} required
                    placeholder="••••••••" style={{ ...inputBase, paddingRight: "3rem" }}
                    onFocus={(e) => (e.target.style.borderColor = P.secondary)}
                    onBlur={(e) => (e.target.style.borderColor = "transparent")}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#6E6E73" }}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6E6E73" }}>Confirmar contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#6E6E73" }} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
                    placeholder="••••••••" style={{ ...inputBase, paddingRight: "3rem" }}
                    onFocus={(e) => (e.target.style.borderColor = P.secondary)}
                    onBlur={(e) => (e.target.style.borderColor = "transparent")}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#6E6E73" }}>
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-white flex items-center justify-center mt-2"
                style={{
                  backgroundColor: P.primary,
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  padding: "0.9rem 1.5rem",
                  borderRadius: "14px",
                  boxShadow: "0 6px 24px rgba(184,28,28,0.28)",
                  opacity: isLoading ? 0.75 : 1,
                }}
              >
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : "Crear cuenta"}
              </motion.button>
            </form>

            {/* Privacy note */}
            <div className="mt-5 flex items-start gap-3 p-4 rounded-2xl" style={{ backgroundColor: P.bg }}>
              <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: P.primary }} />
              <p style={{ fontSize: "0.78rem", color: "#6E6E73", fontWeight: 500, lineHeight: 1.55 }}>
                Al registrarte, aceptas nuestros términos y condiciones. Tu información está protegida y nunca será compartida.
              </p>
            </div>

            <p className="mt-6 text-center" style={{ fontSize: "0.88rem", color: "#6E6E73" }}>
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" style={{ color: P.primary, fontWeight: 700 }}>Inicia sesión aquí</Link>
            </p>
            <p className="mt-4 text-center">
              <Link to="/" style={{ fontSize: "0.82rem", color: "#8A8A8E", fontWeight: 500 }}>← Volver al inicio</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
