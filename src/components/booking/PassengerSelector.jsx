import { useState } from "react";
import { Users, Minus, Plus } from "lucide-react";

export default function PassengerSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const { adults, children, infants } = value;

  function update(field, delta) {
    const next = { ...value };
    if (field === "adults") {
      next.adults = Math.max(1, Math.min(9, adults + delta));
    } else if (field === "children") {
      next.children = Math.max(0, Math.min(8, children + delta));
    } else if (field === "infants") {
      next.infants = Math.max(0, Math.min(next.adults, infants + delta));
    }
    onChange(next);
  }

  const total = adults + children + infants;
  const summary =
    `${adults} Adult${adults > 1 ? "s" : ""}` +
    (children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : "") +
    (infants > 0 ? `, ${infants} Infant${infants > 1 ? "s" : ""}` : "");

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-navy mb-1.5">
        Passengers
      </label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-left hover:border-navy transition-colors"
      >
        <Users size={18} className="text-muted flex-shrink-0" />
        <span className="text-navy truncate">{summary}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-40 animate-fadeIn">
            <PassengerRow
              label="Adults"
              sublabel="Age 12+"
              count={adults}
              onDecrease={() => update("adults", -1)}
              onIncrease={() => update("adults", 1)}
              disableDecrease={adults <= 1}
            />
            <PassengerRow
              label="Children"
              sublabel="Age 2-11"
              count={children}
              onDecrease={() => update("children", -1)}
              onIncrease={() => update("children", 1)}
              disableDecrease={children <= 0}
            />
            <PassengerRow
              label="Infants"
              sublabel="Under 2"
              count={infants}
              onDecrease={() => update("infants", -1)}
              onIncrease={() => update("infants", 1)}
              disableDecrease={infants <= 0}
              disableIncrease={infants >= adults}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full mt-2 py-2 rounded-lg bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors"
            >
              Done ({total} {total > 1 ? "passengers" : "passenger"})
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function PassengerRow({
  label,
  sublabel,
  count,
  onDecrease,
  onIncrease,
  disableDecrease,
  disableIncrease,
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-navy">{label}</p>
        <p className="text-xs text-muted">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={disableDecrease}
          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-navy hover:bg-soft disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus size={13} />
        </button>
        <span className="w-4 text-center text-sm font-semibold text-navy">
          {count}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          disabled={disableIncrease}
          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-navy hover:bg-soft disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}