import { useState, useRef } from "react";
import { User, Phone, Globe, Camera, CreditCard, Save } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import {
  updateMyProfile,
  uploadProfilePicture,
  updatePassport,
} from "../../api/userApi";
import { getInitials, getErrorMessage, resolveImageUrl } from "../../utils/helpers";
import { isValidPhone } from "../../utils/validators";

export default function Profile() {
  const { user, updateUserInState } = useAuth();
  const fileInputRef = useRef(null);

  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    profilePictureUrl: user?.profilePictureUrl || "",
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [passportForm, setPassportForm] = useState({
    passportNumber: "",
    issuingCountry: "",
    issuedDate: "",
    expiryDate: "",
  });
  const [passportErrors, setPassportErrors] = useState({});
  const [isSavingPassport, setIsSavingPassport] = useState(false);

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    if (profileErrors[name]) setProfileErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handlePassportChange(e) {
    const { name, value } = e.target;
    setPassportForm((prev) => ({ ...prev, [name]: value }));
    if (passportErrors[name]) setPassportErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validateProfile() {
    const errors = {};
    if (!profileForm.firstName.trim()) errors.firstName = "First name is required";
    if (!profileForm.lastName.trim()) errors.lastName = "Last name is required";
    if (!profileForm.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    else if (!isValidPhone(profileForm.phoneNumber))
      errors.phoneNumber = "Enter a valid phone number";
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validatePassport() {
    const errors = {};
    if (!passportForm.passportNumber.trim())
      errors.passportNumber = "Passport number is required";
    if (!passportForm.issuingCountry.trim())
      errors.issuingCountry = "Issuing country is required";
    if (!passportForm.issuedDate) errors.issuedDate = "Issue date is required";
    if (!passportForm.expiryDate) errors.expiryDate = "Expiry date is required";
    if (
      passportForm.issuedDate &&
      passportForm.expiryDate &&
      new Date(passportForm.expiryDate) <= new Date(passportForm.issuedDate)
    ) {
      errors.expiryDate = "Expiry date must be after issue date";
    }
    setPassportErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    if (!validateProfile()) return;

    setIsSavingProfile(true);
    try {
      const updated = await updateMyProfile({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        phoneNumber: profileForm.phoneNumber,
        profilePictureUrl: profileForm.profilePictureUrl,
      });
      updateUserInState(updated);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handlePhotoSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB");
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const updated = await uploadProfilePicture(file);
      updateUserInState(updated);
      setProfileForm((prev) => ({
        ...prev,
        profilePictureUrl: updated.profilePictureUrl,
      }));
      toast.success("Profile picture updated");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handlePassportSubmit(e) {
    e.preventDefault();
    if (!validatePassport()) return;

    setIsSavingPassport(true);
    try {
      await updatePassport(passportForm);
      toast.success("Passport information saved");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSavingPassport(false);
    }
  }

  const avatarUrl = resolveImageUrl(profileForm.profilePictureUrl);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">My Profile</h1>
      <p className="text-muted mb-6">
        Manage your personal information and travel documents
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 text-center h-fit">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-navy text-gold flex items-center justify-center text-2xl font-semibold overflow-hidden mx-auto">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user?.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(user?.fullName)
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingPhoto}
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-gold text-navy flex items-center justify-center border-2 border-white hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              <Camera size={16} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />
          </div>

          {isUploadingPhoto && (
            <p className="text-xs text-muted mb-2">Uploading photo...</p>
          )}

          <h3 className="font-heading font-semibold text-navy">
            {user?.fullName}
          </h3>
          <p className="text-sm text-muted mb-3">{user?.email}</p>
          <span className="inline-block px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-semibold">
            {user?.role}
          </span>

          <div className="mt-5 pt-5 border-t border-gray-100 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Email Verified</span>
              <span className={user?.isEmailVerified ? "text-green-600" : "text-yellow-600"}>
                {user?.isEmailVerified ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Nationality</span>
              <span className="text-navy">{user?.nationality || "-"}</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-4 flex items-center gap-2">
              <User size={16} className="text-gold" />
              Personal Information
            </h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  icon={User}
                  value={profileForm.firstName}
                  onChange={handleProfileChange}
                  error={profileErrors.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  icon={User}
                  value={profileForm.lastName}
                  onChange={handleProfileChange}
                  error={profileErrors.lastName}
                  required
                />
              </div>
              <Input
                label="Phone Number"
                name="phoneNumber"
                icon={Phone}
                value={profileForm.phoneNumber}
                onChange={handleProfileChange}
                error={profileErrors.phoneNumber}
                required
              />
              <Input
                label="Email (cannot be changed)"
                value={user?.email || ""}
                disabled
                className="bg-soft cursor-not-allowed"
              />
              <Button
                type="submit"
                variant="primary"
                icon={Save}
                isLoading={isSavingProfile}
              >
                Save Changes
              </Button>
            </form>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-navy mb-4 flex items-center gap-2">
              <CreditCard size={16} className="text-gold" />
              Passport Information
            </h3>
            <form onSubmit={handlePassportSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Passport Number"
                  name="passportNumber"
                  icon={CreditCard}
                  placeholder="BN1234567"
                  value={passportForm.passportNumber}
                  onChange={handlePassportChange}
                  error={passportErrors.passportNumber}
                  required
                />
                <Input
                  label="Issuing Country"
                  name="issuingCountry"
                  icon={Globe}
                  placeholder="Bangladesh"
                  value={passportForm.issuingCountry}
                  onChange={handlePassportChange}
                  error={passportErrors.issuingCountry}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Issue Date"
                  name="issuedDate"
                  type="date"
                  value={passportForm.issuedDate}
                  onChange={handlePassportChange}
                  error={passportErrors.issuedDate}
                  required
                />
                <Input
                  label="Expiry Date"
                  name="expiryDate"
                  type="date"
                  value={passportForm.expiryDate}
                  onChange={handlePassportChange}
                  error={passportErrors.expiryDate}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                icon={Save}
                isLoading={isSavingPassport}
              >
                Save Passport Info
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}