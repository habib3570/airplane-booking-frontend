import { cn } from "../../utils/helpers";

const variants = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  gold: "bg-gold/10 text-gold-dark border-gold/30",
  navy: "bg-navy/5 text-navy border-navy/20",
};

export default function Badge({ children, variant = "navy", className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}