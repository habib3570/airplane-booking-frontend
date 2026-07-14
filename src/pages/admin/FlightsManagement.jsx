import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Plane, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import Pagination from "../../components/admin/Pagination";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import PhotoManagerModal from "../../components/admin/PhotoManagerModal";
import { FlightStatusBadge } from "../../components/ui/StatusBadge";
import {
  getFlights,
  createFlight,
  updateFlight,
  updateFlightStatus,
  deleteFlight,
  uploadFlightPhotos,
  getFlightPhotos,
  deleteFlightPhoto,
} from "../../api/flightApi";
import { getAirlines } from "../../api/airlineApi";
import { FLIGHT_STATUS_OPTIONS } from "../../utils/enums";
import { formatDate, formatTime, formatCurrency, getErrorMessage } from "../../utils/helpers";

const emptyForm = {
  flightNumber: "",
  airlineId: "",
  aircraftId: "",
  routeId: "",
  departureTime: "",
  arrivalTime: "",
  economyBasePrice: "",
  businessBasePrice: "",
  firstClassBasePrice: "",
  airportFee: "",
  taxPercentage: "",
  gateNumber: "",
};

export default function FlightsManagement() {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [statusModalFlight, setStatusModalFlight] = useState(null);
  const [statusForm, setStatusForm] = useState({ status: "Scheduled", gateNumber: "", delayReason: "" });

  const [photoModalFlight, setPhotoModalFlight] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const [deletingPhotoId, setDeletingPhotoId] = useState(null);

  useEffect(() => {
    fetchFlights();
    getAirlines()
      .then((data) => setAirlines(Array.isArray(data) ? data : data?.items || []))
      .catch(() => setAirlines([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchFlights() {
    setLoading(true);
    try {
      const data = await getFlights({ PageNumber: page, PageSize: 10 });
      setFlights(data?.items || []);
      setTotalPages(data?.totalPages || 1);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  }

  function openEditModal(flight) {
    setEditingId(flight.id);
    setForm({
      flightNumber: flight.flightNumber || "",
      airlineId: "",
      aircraftId: "",
      routeId: "",
      departureTime: flight.departureTime?.slice(0, 16) || "",
      arrivalTime: flight.arrivalTime?.slice(0, 16) || "",
      economyBasePrice: flight.economyBasePrice ?? "",
      businessBasePrice: flight.businessBasePrice ?? "",
      firstClassBasePrice: flight.firstClassBasePrice ?? "",
      airportFee: flight.airportFee ?? "",
      taxPercentage: flight.taxPercentage ?? "",
      gateNumber: flight.gateNumber || "",
    });
    setErrors({});
    setModalOpen(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!form.flightNumber.trim()) newErrors.flightNumber = "Required";
    if (!form.airlineId) newErrors.airlineId = "Required";
    if (!form.aircraftId.trim()) newErrors.aircraftId = "Required (Aircraft ID)";
    if (!form.routeId.trim()) newErrors.routeId = "Required (Route ID)";
    if (!form.departureTime) newErrors.departureTime = "Required";
    if (!form.arrivalTime) newErrors.arrivalTime = "Required";
    if (!form.economyBasePrice) newErrors.economyBasePrice = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        flightNumber: form.flightNumber,
        airlineId: form.airlineId,
        aircraftId: form.aircraftId,
        routeId: form.routeId,
        departureTime: form.departureTime,
        arrivalTime: form.arrivalTime,
        economyBasePrice: Number(form.economyBasePrice) || 0,
        businessBasePrice: Number(form.businessBasePrice) || 0,
        firstClassBasePrice: Number(form.firstClassBasePrice) || 0,
        airportFee: Number(form.airportFee) || 0,
        taxPercentage: Number(form.taxPercentage) || 0,
        gateNumber: form.gateNumber || null,
      };
      if (editingId) {
        await updateFlight(editingId, payload);
        toast.success("Flight updated successfully");
      } else {
        await createFlight(payload);
        toast.success("Flight created successfully");
      }
      setModalOpen(false);
      fetchFlights();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      await deleteFlight(deleteTarget.id);
      toast.success("Flight deleted");
      setDeleteTarget(null);
      fetchFlights();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function openStatusModal(flight) {
    setStatusModalFlight(flight);
    setStatusForm({
      status: flight.status,
      gateNumber: flight.gateNumber || "",
      delayReason: "",
    });
  }

  async function handleStatusSubmit() {
    if (!statusModalFlight) return;
    setIsSubmitting(true);
    try {
      await updateFlightStatus(statusModalFlight.id, statusForm);
      toast.success("Flight status updated");
      setStatusModalFlight(null);
      fetchFlights();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function openPhotoModal(flight) {
    setPhotoModalFlight(flight);
    setPhotosLoading(true);
    try {
      const data = await getFlightPhotos(flight.id);
      setPhotos(data || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setPhotosLoading(false);
    }
  }

  async function handlePhotoUpload(files) {
    setIsUploadingPhotos(true);
    try {
      await uploadFlightPhotos(photoModalFlight.id, files);
      toast.success("Photos uploaded successfully");
      const data = await getFlightPhotos(photoModalFlight.id);
      setPhotos(data || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUploadingPhotos(false);
    }
  }

  async function handlePhotoDelete(photoId) {
    setDeletingPhotoId(photoId);
    try {
      await deleteFlightPhoto(photoModalFlight.id, photoId);
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
      toast.success("Photo deleted");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeletingPhotoId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy mb-1">Flights</h1>
          <p className="text-muted">Manage scheduled flights</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={openCreateModal}>
          Add Flight
        </Button>
      </div>

      <Card className="mb-6 bg-yellow-50 border-yellow-200">
        <p className="text-xs text-navy">
          <span className="font-semibold">Note:</span> Aircraft ID and Route ID
          must be entered manually as GUIDs — dedicated Aircraft/Route
          management endpoints were not part of the provided API spec.
        </p>
      </Card>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size={32} className="text-navy" />
          </div>
        ) : flights.length === 0 ? (
          <p className="text-center text-muted text-sm py-16">No flights found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-soft text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold text-navy">Flight</th>
                  <th className="px-5 py-3 font-semibold text-navy">Route</th>
                  <th className="px-5 py-3 font-semibold text-navy">Schedule</th>
                  <th className="px-5 py-3 font-semibold text-navy">Price</th>
                  <th className="px-5 py-3 font-semibold text-navy">Status</th>
                  <th className="px-5 py-3 font-semibold text-navy text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {flights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-soft/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Plane size={14} className="text-gold flex-shrink-0" />
                        <div>
                          <p className="font-medium text-navy">{flight.flightNumber}</p>
                          <p className="text-xs text-muted">{flight.airlineName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {flight.originIata} → {flight.destinationIata}
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {formatDate(flight.departureTime)}
                      <br />
                      {formatTime(flight.departureTime)} - {formatTime(flight.arrivalTime)}
                    </td>
                    <td className="px-5 py-3 text-navy font-medium">
                      {formatCurrency(flight.economyBasePrice)}
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => openStatusModal(flight)}>
                        <FlightStatusBadge status={flight.status} />
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openPhotoModal(flight)}
                          className="p-2 rounded-lg text-navy hover:bg-navy/5"
                          title="Manage Photos"
                        >
                          <ImageIcon size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(flight)}
                          className="p-2 rounded-lg text-navy hover:bg-navy/5"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(flight)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-5 pb-5">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </Card>

      {/* Create/Edit Flight Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Flight" : "Add Flight"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Flight Number" name="flightNumber" placeholder="BS147" value={form.flightNumber} onChange={handleChange} error={errors.flightNumber} required />
            <Select
              label="Airline"
              name="airlineId"
              placeholder="Select airline"
              options={airlines.map((a) => ({ value: a.id, label: a.name }))}
              value={form.airlineId}
              onChange={handleChange}
              error={errors.airlineId}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Aircraft ID (GUID)" name="aircraftId" value={form.aircraftId} onChange={handleChange} error={errors.aircraftId} required />
            <Input label="Route ID (GUID)" name="routeId" value={form.routeId} onChange={handleChange} error={errors.routeId} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Departure Time" name="departureTime" type="datetime-local" value={form.departureTime} onChange={handleChange} error={errors.departureTime} required />
            <Input label="Arrival Time" name="arrivalTime" type="datetime-local" value={form.arrivalTime} onChange={handleChange} error={errors.arrivalTime} required />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Input label="Economy Price" name="economyBasePrice" type="number" value={form.economyBasePrice} onChange={handleChange} error={errors.economyBasePrice} required />
            <Input label="Business Price" name="businessBasePrice" type="number" value={form.businessBasePrice} onChange={handleChange} />
            <Input label="First Class Price" name="firstClassBasePrice" type="number" value={form.firstClassBasePrice} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Input label="Airport Fee" name="airportFee" type="number" value={form.airportFee} onChange={handleChange} />
            <Input label="Tax %" name="taxPercentage" type="number" value={form.taxPercentage} onChange={handleChange} />
            <Input label="Gate Number" name="gateNumber" value={form.gateNumber} onChange={handleChange} />
          </div>
          <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
            {editingId ? "Update Flight" : "Create Flight"}
          </Button>
        </form>
      </Modal>

      {/* Status Update Modal */}
      <Modal
        isOpen={!!statusModalFlight}
        onClose={() => setStatusModalFlight(null)}
        title={`Update Status — ${statusModalFlight?.flightNumber || ""}`}
        size="sm"
      >
        <div className="space-y-4">
          <Select
            label="Status"
            options={FLIGHT_STATUS_OPTIONS}
            value={statusForm.status}
            onChange={(e) => setStatusForm((prev) => ({ ...prev, status: e.target.value }))}
          />
          <Input
            label="Gate Number"
            value={statusForm.gateNumber}
            onChange={(e) => setStatusForm((prev) => ({ ...prev, gateNumber: e.target.value }))}
          />
          {statusForm.status === "Delayed" && (
            <Input
              label="Delay Reason"
              value={statusForm.delayReason}
              onChange={(e) => setStatusForm((prev) => ({ ...prev, delayReason: e.target.value }))}
            />
          )}
          <Button variant="primary" className="w-full" onClick={handleStatusSubmit} isLoading={isSubmitting}>
            Update Status
          </Button>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isSubmitting}
        title="Delete Flight"
        message={`Are you sure you want to delete flight ${deleteTarget?.flightNumber}? This cannot be undone.`}
        confirmLabel="Delete"
      />

      <PhotoManagerModal
        isOpen={!!photoModalFlight}
        onClose={() => setPhotoModalFlight(null)}
        title={`Photos — ${photoModalFlight?.flightNumber || ""}`}
        photos={photos}
        loading={photosLoading}
        onUpload={handlePhotoUpload}
        onDelete={handlePhotoDelete}
        isUploading={isUploadingPhotos}
        deletingId={deletingPhotoId}
        allowUpload={true}
      />
    </div>
  );
}