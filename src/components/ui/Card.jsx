import { cn } from "../../utils/helpers";

export default function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl2 border border-gray-100 shadow-card p-6",
        hover && "transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}