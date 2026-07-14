import { cn } from "../../utils/helpers";
import Spinner from "./Spinner";

const variants = {
  primary:
    "bg-navy text-white hover:bg-navy-light border border-navy shadow-sm",
  outline:
    "bg-transparent text-navy border border-gold hover:bg-gold hover:text-navy",
  gold:
    "bg-gold text-navy hover:bg-gold-dark border border-gold",
  ghost:
    "bg-transparent text-navy hover:bg-navy-50 border border-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 border border-red-600",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-1",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Spinner size={16} />}
      {!isLoading && Icon && iconPosition === "left" && <Icon size={16} />}
      {children}
      {!isLoading && Icon && iconPosition === "right" && <Icon size={16} />}
    </button>
  );
}