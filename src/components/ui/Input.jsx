import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/helpers";

const Input = forwardRef(
  (
    {
      label,
      error,
      icon: Icon,
      type = "text",
      className = "",
      required = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-navy mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
          )}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full rounded-lg border border-gray-300 bg-white text-navy",
              "px-4 py-2.5 text-sm placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy",
              "transition-colors duration-150",
              Icon && "pl-10",
              isPassword && "pr-10",
              error && "border-red-400 focus:ring-red-100 focus:border-red-400",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-navy"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;