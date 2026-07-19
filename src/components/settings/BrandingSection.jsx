import React, { useRef } from "react";

export default function BrandingSection({ formData, onChange, onLogoUpload, onFaviconUpload }) {
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onLogoUpload(file);
  };

  const handleFaviconFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFaviconUpload(file);
  };

  return (
    <div className="settings-section">
      <h2>Branding</h2>

      <div className="form-group">
        <label htmlFor="siteName">System Name</label>
        <input
          id="siteName"
          type="text"
          value={formData.siteName || ""}
          onChange={(e) => onChange("siteName", e.target.value)}
          placeholder="e.g. SkyBooker Airlines"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="supportEmail">Support Email</label>
        <input
          id="supportEmail"
          type="email"
          value={formData.supportEmail || ""}
          onChange={(e) => onChange("supportEmail", e.target.value)}
          placeholder="support@yourdomain.com"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Logo</label>
          <div className="upload-box">
            {formData.logoUrl ? (
              <img src={formData.logoUrl} alt="Logo preview" className="preview-img preview-img--logo" />
            ) : (
              <div className="preview-placeholder">No logo uploaded</div>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              ref={logoInputRef}
              onChange={handleLogoFileChange}
              hidden
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => logoInputRef.current?.click()}
            >
              Upload Logo
            </button>
          </div>
          <small>PNG, JPEG, SVG or WEBP. Max 5MB.</small>
        </div>

        <div className="form-group">
          <label>Favicon</label>
          <div className="upload-box">
            {formData.faviconUrl ? (
              <img src={formData.faviconUrl} alt="Favicon preview" className="preview-img preview-img--favicon" />
            ) : (
              <div className="preview-placeholder">No favicon uploaded</div>
            )}
            <input
              type="file"
              accept="image/x-icon,image/png,image/vnd.microsoft.icon"
              ref={faviconInputRef}
              onChange={handleFaviconFileChange}
              hidden
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => faviconInputRef.current?.click()}
            >
              Upload Favicon
            </button>
          </div>
          <small>ICO or PNG. Max 1MB.</small>
        </div>
      </div>
    </div>
  );
}