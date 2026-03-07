import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { LayoutDashboard, Swords, Trophy, User } from "lucide-react";

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Inicio" },
    { path: "/matches", icon: Swords, label: "Partidos" },
    { path: "/scores", icon: Trophy, label: "Puntuación" },
    { path: "/profile", icon: User, label: "Perfil" },
  ];

  // Hide bottom nav on pages that don't need it (landing, login, register)
  const hiddenPaths = ["/", "/login", "/register"];
  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-black/5 px-4 py-2"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path === "/dashboard" && location.pathname === "/dashboard");

          return (
            <Link key={item.path} to={item.path} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.88 }}
                className="flex flex-col items-center gap-1 py-1"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -3 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className={`p-2.5 rounded-xl transition-colors duration-300 ${
                    isActive
                      ? "bg-[#B81C1C] shadow-lg shadow-[#B81C1C]/25"
                      : "bg-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-[#ADB5BD]"
                    }`}
                  />
                </motion.div>
                <span
                  className={`text-xs transition-colors duration-300 ${
                    isActive ? "text-[#B81C1C]" : "text-[#ADB5BD]"
                  }`}
                  style={{ fontWeight: isActive ? 600 : 500 }}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}