import { forwardRef } from "react";
import { cn } from "../../utils/helpers";

const Textarea = forwardRef(
  ({ label, error, required, className = "", rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-navy mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full rounded-lg border border-gray-300 bg-white text-navy",
            "px-4 py-2.5 text-sm placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy",
            error && "border-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;