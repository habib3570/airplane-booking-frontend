import axiosClient from "./axiosClient";

export async function getMyTickets() {
  const { data } = await axiosClient.get("/api/v1/tickets/my");
  return data;
}

export async function getTicketsByBooking(bookingId) {
  const { data } = await axiosClient.get(
    `/api/v1/tickets/booking/${bookingId}`
  );
  return data;
}

export async function getTicketByNumber(ticketNumber) {
  const { data } = await axiosClient.get(`/api/v1/tickets/${ticketNumber}`);
  return data;
}

export async function downloadTicketPdfById(ticketId, ticketNumber) {
  const response = await axiosClient.get(
    `/api/v1/tickets/${ticketId}/download`,
    { responseType: "blob" }
  );
  triggerBlobDownload(response.data, `${ticketNumber || ticketId}.pdf`);
}

function triggerBlobDownload(blobData, filename) {
  const blob = new Blob([blobData], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}