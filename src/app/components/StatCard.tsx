import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  changeType?: "success" | "info" | "default";
  delay?: number;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeType = "default",
  delay = 0,
}: StatCardProps) {
  const changeColors = {
    success: "#17C964",
    info: "#0066FE",
    default: "#ADB5BD",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 border border-black/5 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.95)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[#ADB5BD] mb-2" style={{ fontWeight: 500 }}>
            {label}
          </p>
          <h3 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
            {value}
          </h3>
          {change && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
              className="text-sm"
              style={{ color: changeColors[changeType], fontWeight: 600 }}
            >
              {change}
            </motion.p>
          )}
        </div>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="p-3 rounded-xl bg-[#F8F9FA]"
        >
          <Icon className="w-6 h-6 text-[#B81C1C]" />
        </motion.div>
      </div>
    </motion.div>
  );
}