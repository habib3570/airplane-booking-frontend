import { useState, useEffect } from "react";
import { Plus, Pencil, Plane } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import { getAirlines, createAirline, updateAirline } from "../../api/airlineApi";
import { getErrorMessage } from "../../utils/helpers";

const emptyForm = {
  iataCode: "",
  name: "",
  country: "",
  logoUrl: "",
  contactEmail: "",
};

export default function AirlinesManagement() {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAirlines();
  }, []);

  async function fetchAirlines() {
    setLoading(true);
    try {
      const data = await getAirlines();
      setAirlines(Array.isArray(data) ? data : data?.items || []);
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

  function openEditModal(airline) {
    setEditingId(airline.id);
    setForm({
      iataCode: airline.iataCode || "",
      name: airline.name || "",
      country: airline.country || "",
      logoUrl: airline.logoUrl || "",
      contactEmail: airline.contactEmail || "",
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
    if (!form.iataCode.trim()) newErrors.iataCode = "IATA code is required";
    if (!form.name.trim()) newErrors.name = "Airline name is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateAirline(editingId, form);
        toast.success("Airline updated successfully");
      } else {
        await createAirline(form);
        toast.success("Airline created successfully");
      }
      setModalOpen(false);
      fetchAirlines();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy mb-1">Airlines</h1>
          <p className="text-muted">Manage airline partners</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={openCreateModal}>
          Add Airline
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size={32} className="text-navy" />
        </div>
      ) : airlines.length === 0 ? (
        <Card className="text-center py-12">
          <Plane className="text-gray-300 mx-auto mb-3" size={36} />
          <p className="text-muted text-sm">No airlines added yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {airlines.map((airline) => (
            <Card key={airline.id} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-soft flex items-center justify-center flex-shrink-0 overflow-hidden">
                {airline.logoUrl ? (
                  <img src={airline.logoUrl} alt={airline.name} className="w-full h-full object-contain" />
                ) : (
                  <Plane className="text-navy" size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy truncate">{airline.name}</p>
                <p className="text-xs text-muted truncate">
                  {airline.iataCode} · {airline.country}
                </p>
              </div>
              <button
                onClick={() => openEditModal(airline)}
                className="p-2 rounded-lg text-navy hover:bg-navy/5 flex-shrink-0"
              >
                <Pencil size={16} />
              </button>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Airline" : "Add Airline"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="IATA Code"
              name="iataCode"
              placeholder="BS"
              value={form.iataCode}
              onChange={handleChange}
              error={errors.iataCode}
              required
            />
            <Input
              label="Country"
              name="country"
              placeholder="Bangladesh"
              value={form.country}
              onChange={handleChange}
              error={errors.country}
              required
            />
          </div>
          <Input
            label="Airline Name"
            name="name"
            placeholder="US-Bangla Airlines"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <Input
            label="Logo URL"
            name="logoUrl"
            placeholder="https://..."
            value={form.logoUrl}
            onChange={handleChange}
          />
          <Input
            label="Contact Email"
            name="contactEmail"
            type="email"
            placeholder="support@airline.com"
            value={form.contactEmail}
            onChange={handleChange}
          />
          <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
            {editingId ? "Update Airline" : "Create Airline"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}