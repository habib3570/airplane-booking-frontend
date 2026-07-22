import React, { useState, useEffect } from "react";
import { useSettings } from "../../hooks/useSettings";
import BrandingSection from "../../components/settings/BrandingSection";
import SmtpSection from "../../components/settings/SmtpSection";
import StripeSection from "../../components/settings/StripeSection";
import "./SettingsPage.css";

export default function SettingsPage() {
  const {
    settings,
    loading,
    saving,
    error,
    updateSettings,
    uploadLogo,
    uploadFavicon,
    testSmtp,
  } = useSettings();

  const [formData, setFormData] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await updateSettings(formData);
    if (result.success) {
      showToast("success", "Settings saved successfully.");
      // Secret fields খালি করে দিচ্ছি সেভ হওয়ার পর (আবার আগের মতো blank দেখাবে, security জন্য)
      setFormData((prev) => ({
        ...prev,
        stripeSecretKey: "",
        stripeWebhookSecret: "",
      }));
    } else {
      showToast("error", result.message);
    }
  };

  const handleLogoUpload = async (file) => {
    const result = await uploadLogo(file);
    if (result.success) {
      showToast("success", "Logo uploaded successfully.");
    } else {
      showToast("error", result.message);
    }
  };

  const handleFaviconUpload = async (file) => {
    const result = await uploadFavicon(file);
    if (result.success) {
      showToast("success", "Favicon uploaded successfully.");
    } else {
      showToast("error", result.message);
    }
  };

  const handleTestSmtp = async (email) => {
    const result = await testSmtp(email);
    showToast(result.success ? "success" : "error", result.message);
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-loading">Loading settings...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="settings-page">
        <div className="settings-error">{error || "Could not load settings."}</div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>System Settings</h1>
        <p>Manage your platform branding and email configuration</p>
      </div>

      {toast && (
        <div className={`settings-toast settings-toast--${toast.type}`}>
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSave} className="settings-form">
        <BrandingSection
          formData={formData}
          onChange={handleChange}
          onLogoUpload={handleLogoUpload}
          onFaviconUpload={handleFaviconUpload}
        />

        <SmtpSection
          formData={formData}
          onChange={handleChange}
          onTestSmtp={handleTestSmtp}
        />

        <StripeSection formData={formData} onChange={handleChange} />

        <div className="settings-actions">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}