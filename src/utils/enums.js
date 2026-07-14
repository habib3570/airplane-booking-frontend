// Enum string values MUST match backend exactly (JsonStringEnumConverter is enabled)

export const SEAT_CLASS = {
  ECONOMY: "Economy",
  BUSINESS: "Business",
  FIRST: "First",
};

export const SEAT_CLASS_OPTIONS = [
  { value: "Economy", label: "Economy" },
  { value: "Business", label: "Business" },
  { value: "First", label: "First Class" },
];

export const TRIP_TYPE = {
  ONE_WAY: "OneWay",
  ROUND_TRIP: "RoundTrip",
  MULTI_CITY: "MultiCity",
};

export const PASSENGER_TYPE = {
  ADULT: "Adult",
  CHILD: "Child",
  INFANT: "Infant",
};

export const BOOKING_STATUS = {
  PENDING_PAYMENT: "PendingPayment",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
  REFUNDED: "Refunded",
};

export const PAYMENT_STATUS = {
  PENDING: "Pending",
  SUCCEEDED: "Succeeded",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

export const FLIGHT_STATUS = {
  SCHEDULED: "Scheduled",
  DELAYED: "Delayed",
  CANCELLED: "Cancelled",
  BOARDING: "Boarding",
  DEPARTED: "Departed",
  ARRIVED: "Arrived",
};

export const PAYMENT_METHOD_OPTIONS = [
  { value: "bKash", label: "bKash" },
  { value: "SPay", label: "SPay" },
];

export function getBookingStatusVariant(status) {
  switch (status) {
    case BOOKING_STATUS.CONFIRMED:
      return "success";
    case BOOKING_STATUS.PENDING_PAYMENT:
      return "warning";
    case BOOKING_STATUS.CANCELLED:
    case BOOKING_STATUS.EXPIRED:
      return "danger";
    case BOOKING_STATUS.REFUNDED:
      return "info";
    default:
      return "navy";
  }
}

export function getFlightStatusVariant(status) {
  switch (status) {
    case FLIGHT_STATUS.SCHEDULED:
      return "info";
    case FLIGHT_STATUS.BOARDING:
      return "gold";
    case FLIGHT_STATUS.DEPARTED:
    case FLIGHT_STATUS.ARRIVED:
      return "success";
    case FLIGHT_STATUS.DELAYED:
      return "warning";
    case FLIGHT_STATUS.CANCELLED:
      return "danger";
    default:
      return "navy";
  }
}


export const USER_ROLES = ["Passenger", "Agent", "Admin"];

export const FLIGHT_STATUS_OPTIONS = [
  { value: "Scheduled", label: "Scheduled" },
  { value: "Delayed", label: "Delayed" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Boarding", label: "Boarding" },
  { value: "Departed", label: "Departed" },
  { value: "Arrived", label: "Arrived" },
];