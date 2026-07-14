import Badge from "./Badge";
import { getBookingStatusVariant, getFlightStatusVariant } from "../../utils/enums";

export function BookingStatusBadge({ status }) {
  return <Badge variant={getBookingStatusVariant(status)}>{status}</Badge>;
}

export function FlightStatusBadge({ status }) {
  return <Badge variant={getFlightStatusVariant(status)}>{status}</Badge>;
}

export function PaymentStatusBadge({ status }) {
  const variant =
    status === "Succeeded"
      ? "success"
      : status === "Pending"
      ? "warning"
      : status === "Failed" || status === "Cancelled"
      ? "danger"
      : "navy";
  return <Badge variant={variant}>{status}</Badge>;
}