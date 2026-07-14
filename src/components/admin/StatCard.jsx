import Card from "../ui/Card";

export default function StatCard({ label, value, icon: Icon, accent = "navy" }) {
  const accentClasses = {
    navy: "bg-navy/5 text-navy",
    gold: "bg-gold/10 text-gold-dark",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <Card className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${accentClasses[accent]}`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted mb-0.5 truncate">{label}</p>
        <p className="text-xl font-bold text-navy truncate">{value}</p>
      </div>
    </Card>
  );
}