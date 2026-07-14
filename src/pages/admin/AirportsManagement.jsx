import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, MapPin, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import Pagination from "../../components/admin/Pagination";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import PhotoManagerModal from "../../components/admin/PhotoManagerModal";
import {
  getAirports,
  createAirport,
  updateAirport,
  deleteAirport,
  getAirportPhotos,
  deleteAirportPhoto,
} from "../../api/airportApi";
import { getErrorMessage } from "../../utils/helpers";

const emptyForm = {
  iataCode: "",
  icaoCode: "",
  name: "",
  city: "",
  country: "",
  countryCode: "",
  latitude: "",
  longitude: "",
  timeZone: "",
};

export default function AirportsManagement() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [photoModalAirport, setPhotoModalAirport] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [deletingPhotoId, setDeletingPhotoId] = useState(null);

  useEffect(() => {
    fetchAirports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchAirports() {
    setLoading(true);
    try {
      const data = await getAirports({ PageNumber: page, PageSize: 10 });
      setAirports(data?.items || []);
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

  function openEditModal(airport) {
    setEditingId(airport.id);
    setForm({
      iataCode: airport.iataCode || "",
      icaoCode: airport.icaoCode || "",
      name: airport.name || "",
      city: airport.city || "",
      country: airport.country || "",
      countryCode: airport.countryCode || "",
      latitude: airport.latitude ?? "",
      longitude: airport.longitude ?? "",
      timeZone: airport.timeZone || "",
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
    ["iataCode", "icaoCode", "name", "city", "country", "countryCode", "timeZone"].forEach(
      (field) => {
        if (!form[field]?.toString().trim()) newErrors[field] = "Required";
      }
    );
    if (form.latitude === "" || isNaN(Number(form.latitude)))
      newErrors.latitude = "Valid latitude required";
    if (form.longitude === "" || isNaN(Number(form.longitude)))
      newErrors.longitude = "Valid longitude required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      };
      if (editingId) {
        await updateAirport(editingId, payload);
        toast.success("Airport updated successfully");
      } else {
        await createAirport(payload);
        toast.success("Airport created successfully");
      }
      setModalOpen(false);
      fetchAirports();
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
      await deleteAirport(deleteTarget.id);
      toast.success("Airport deleted");
      setDeleteTarget(null);
      fetchAirports();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function openPhotoModal(airport) {
    setPhotoModalAirport(airport);
    setPhotosLoading(true);
    try {
      const data = await getAirportPhotos(airport.id);
      setPhotos(data || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setPhotosLoading(false);
    }
  }

  async function handlePhotoDelete(photoId) {
    setDeletingPhotoId(photoId);
    try {
      await deleteAirportPhoto(photoModalAirport.id, photoId);
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
          <h1 className="text-2xl font-bold text-navy mb-1">Airports</h1>
          <p className="text-muted">Manage airport records</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={openCreateModal}>
          Add Airport
        </Button>
      </div>

      <Card className="mb-6 bg-yellow-50 border-yellow-200">
        <p className="text-xs text-navy">
          <span className="font-semibold">Note:</span> Photo upload for
          airports is not available yet — the API only supports viewing and
          deleting existing photos.
        </p>
      </Card>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size={32} className="text-navy" />
          </div>
        ) : airports.length === 0 ? (
          <p className="text-center text-muted text-sm py-16">No airports found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-soft text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold text-navy">Airport</th>
                  <th className="px-5 py-3 font-semibold text-navy">IATA/ICAO</th>
                  <th className="px-5 py-3 font-semibold text-navy">Location</th>
                  <th className="px-5 py-3 font-semibold text-navy text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {airports.map((airport) => (
                  <tr key={airport.id} className="hover:bg-soft/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gold flex-shrink-0" />
                        <span className="font-medium text-navy">{airport.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {airport.iataCode} / {airport.icaoCode}
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {airport.city}, {airport.country}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openPhotoModal(airport)}
                          className="p-2 rounded-lg text-navy hover:bg-navy/5"
                          title="View Photos"
                        >
                          <ImageIcon size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(airport)}
                          className="p-2 rounded-lg text-navy hover:bg-navy/5"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(airport)}
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Airport" : "Add Airport"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="IATA Code" name="iataCode" placeholder="DAC" value={form.iataCode} onChange={handleChange} error={errors.iataCode} required />
            <Input label="ICAO Code" name="icaoCode" placeholder="VGHS" value={form.icaoCode} onChange={handleChange} error={errors.icaoCode} required />
          </div>
          <Input label="Airport Name" name="name" placeholder="Hazrat Shahjalal International Airport" value={form.name} onChange={handleChange} error={errors.name} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="City" name="city" placeholder="Dhaka" value={form.city} onChange={handleChange} error={errors.city} required />
            <Input label="Country" name="country" placeholder="Bangladesh" value={form.country} onChange={handleChange} error={errors.country} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Country Code" name="countryCode" placeholder="BD" value={form.countryCode} onChange={handleChange} error={errors.countryCode} required />
            <Input label="Time Zone" name="timeZone" placeholder="Asia/Dhaka" value={form.timeZone} onChange={handleChange} error={errors.timeZone} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Latitude" name="latitude" type="number" step="any" placeholder="23.8433" value={form.latitude} onChange={handleChange} error={errors.latitude} required />
            <Input label="Longitude" name="longitude" type="number" step="any" placeholder="90.3978" value={form.longitude} onChange={handleChange} error={errors.longitude} required />
          </div>
          <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
            {editingId ? "Update Airport" : "Create Airport"}
          </Button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isSubmitting}
        title="Delete Airport"
        message={`Are you sure you want to delete ${deleteTarget?.name}? This cannot be undone.`}
        confirmLabel="Delete"
      />

      <PhotoManagerModal
        isOpen={!!photoModalAirport}
        onClose={() => setPhotoModalAirport(null)}
        title={`Photos — ${photoModalAirport?.name || ""}`}
        photos={photos}
        loading={photosLoading}
        onDelete={handlePhotoDelete}
        deletingId={deletingPhotoId}
        allowUpload={false}
      />
    </div>
  );
}