import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Plane } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import BookingFlightSummary from "../../components/booking/BookingFlightSummary";
import { createBooking } from "../../api/bookingApi";
import { PASSENGER_TYPE } from "../../utils/enums";
import { getErrorMessage } from "../../utils/helpers";
import toast from "react-hot-toast";

function buildInitialPassengers(counts) {
  const list = [];
  for (let i = 0; i < (counts?.adults || 1); i++) {
    list.push({ type: PASSENGER_TYPE.ADULT, ...emptyPassenger() });
  }
  for (let i = 0; i < (counts?.children || 0); i++) {
    list.push({ type: PASSENGER_TYPE.CHILD, ...emptyPassenger() });
  }
  for (let i = 0; i < (counts?.infants || 0); i++) {
    list.push({ type: PASSENGER_TYPE.INFANT, ...emptyPassenger() });
  }
  return list;
}

function emptyPassenger() {
  return {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    passportNumber: "",
    passportExpiry: "",
    passportCountry: "",
    mealPreference: "",
    specialAssistance: "",
  };
}

export default function BookingPassengers() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [passengers, setPassengers] = useState(
    buildInitialPassengers(state?.passengerCounts)
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!state?.segments?.length) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-muted mb-4">
          No flight selected. Please search and select a flight first.
        </p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  function updatePassenger(index, field, value) {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    const errKey = `${index}-${field}`;
    if (errors[errKey]) {
      setErrors((prev) => ({ ...prev, [errKey]: "" }));
    }
  }

  function validate() {
    const newErrors = {};
    passengers.forEach((p, index) => {
      if (!p.firstName.trim())
        newErrors[`${index}-firstName`] = "First name is required";
      if (!p.lastName.trim())
        newErrors[`${index}-lastName`] = "Last name is required";
      if (!p.dateOfBirth)
        newErrors[`${index}-dateOfBirth`] = "Date of birth is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required passenger details");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        tripType: state.tripType,
        segments: state.segments,
        passengers: passengers.map((p) => ({
          firstName: p.firstName,
          lastName: p.lastName,
          passengerType: p.type,
          dateOfBirth: p.dateOfBirth,
          passportNumber: p.passportNumber || null,
          passportExpiry: p.passportExpiry || null,
          passportCountry: p.passportCountry || null,
          seatId: null,
          mealPreference: p.mealPreference || null,
          specialAssistance: p.specialAssistance || null,
        })),
        promoCode: null,
      };

      const booking = await createBooking(payload);
      toast.success("Booking created! Please complete payment.");
      navigate(`/booking/${booking.id}/payment`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-soft min-h-screen py-8">
      <div className="container-app max-w-3xl">
        <h1 className="text-xl sm:text-2xl font-bold text-navy mb-1">
          Passenger Details
        </h1>
        <p className="text-muted text-sm mb-6">
          Enter details exactly as they appear on travel documents
        </p>

        <Card className="mb-6">
          <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
            <Plane size={16} className="text-gold" />
            Flight Summary
          </h3>
          <BookingFlightSummary segments={state.segmentsPreview || []} />
        </Card>

        <form onSubmit={handleSubmit} className="space-y-5">
          {passengers.map((passenger, index) => (
            <Card key={index}>
              <h3 className="text-sm font-semibold text-navy mb-4 flex items-center gap-2">
                <User size={16} className="text-gold" />
                Passenger {index + 1} ({passenger.type})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={passenger.firstName}
                  onChange={(e) =>
                    updatePassenger(index, "firstName", e.target.value)
                  }
                  error={errors[`${index}-firstName`]}
                  required
                />
                <Input
                  label="Last Name"
                  value={passenger.lastName}
                  onChange={(e) =>
                    updatePassenger(index, "lastName", e.target.value)
                  }
                  error={errors[`${index}-lastName`]}
                  required
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={passenger.dateOfBirth}
                  onChange={(e) =>
                    updatePassenger(index, "dateOfBirth", e.target.value)
                  }
                  error={errors[`${index}-dateOfBirth`]}
                  required
                />
                <Input
                  label="Passport Number (optional)"
                  value={passenger.passportNumber}
                  onChange={(e) =>
                    updatePassenger(index, "passportNumber", e.target.value)
                  }
                />
                <Input
                  label="Passport Expiry (optional)"
                  type="date"
                  value={passenger.passportExpiry}
                  onChange={(e) =>
                    updatePassenger(index, "passportExpiry", e.target.value)
                  }
                />
                <Input
                  label="Passport Country (optional)"
                  value={passenger.passportCountry}
                  onChange={(e) =>
                    updatePassenger(index, "passportCountry", e.target.value)
                  }
                />
                <Input
                  label="Meal Preference (optional)"
                  placeholder="e.g. Vegetarian"
                  value={passenger.mealPreference}
                  onChange={(e) =>
                    updatePassenger(index, "mealPreference", e.target.value)
                  }
                />
                <Input
                  label="Special Assistance (optional)"
                  placeholder="e.g. Wheelchair"
                  value={passenger.specialAssistance}
                  onChange={(e) =>
                    updatePassenger(index, "specialAssistance", e.target.value)
                  }
                />
              </div>
            </Card>
          ))}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
          >
            Continue to Payment
          </Button>
        </form>
      </div>
    </div>
  );
}