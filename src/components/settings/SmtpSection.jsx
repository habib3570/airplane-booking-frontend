import React, { useState } from "react";

export default function SmtpSection({ formData, onChange, onTestSmtp }) {
  const [testEmail, setTestEmail] = useState("");
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    if (!testEmail) return;
    setTesting(true);
    await onTestSmtp(testEmail);
    setTesting(false);
  };

  return (
    <div className="settings-section">
      <h2>SMTP / Email Configuration</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="smtpHost">SMTP Host</label>
          <input
            id="smtpHost"
            type="text"
            value={formData.smtpHost || ""}
            onChange={(e) => onChange("smtpHost", e.target.value)}
            placeholder="smtp.gmail.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="smtpPort">SMTP Port</label>
          <input
            id="smtpPort"
            type="number"
            value={formData.smtpPort || ""}
            onChange={(e) => onChange("smtpPort", e.target.value ? parseInt(e.target.value, 10) : null)}
            placeholder="587"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="smtpUsername">SMTP Username</label>
          <input
            id="smtpUsername"
            type="text"
            value={formData.smtpUsername || ""}
            onChange={(e) => onChange("smtpUsername", e.target.value)}
            placeholder="your-email@gmail.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="smtpPassword">
            SMTP Password{" "}
            {formData.smtpPasswordConfigured && (
              <span className="hint-text">(already set — leave blank to keep it)</span>
            )}
          </label>
          <input
            id="smtpPassword"
            type="password"
            value={formData.smtpPassword || ""}
            onChange={(e) => onChange("smtpPassword", e.target.value)}
            placeholder={formData.smtpPasswordConfigured ? "••••••••" : "Enter password"}
            autoComplete="new-password"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="smtpFromEmail">From Email</label>
          <input
            id="smtpFromEmail"
            type="email"
            value={formData.smtpFromEmail || ""}
            onChange={(e) => onChange("smtpFromEmail", e.target.value)}
            placeholder="no-reply@yourdomain.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="smtpFromName">From Name</label>
          <input
            id="smtpFromName"
            type="text"
            value={formData.smtpFromName || ""}
            onChange={(e) => onChange("smtpFromName", e.target.value)}
            placeholder="SkyBooker Airlines"
          />
        </div>
      </div>

      <div className="form-group form-group--checkbox">
        <label>
          <input
            type="checkbox"
            checked={formData.smtpEnableSsl || false}
            onChange={(e) => onChange("smtpEnableSsl", e.target.checked)}
          />
          Enable SSL/TLS
        </label>
      </div>

      <div className="smtp-test-box">
        <label htmlFor="testEmail">Send a test email to verify configuration</label>
        <div className="smtp-test-row">
          <input
            id="testEmail"
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="test-recipient@example.com"
          />
          <button
            type="button"
            className="btn-secondary"
            onClick={handleTest}
            disabled={testing || !testEmail}
          >
            {testing ? "Sending..." : "Send Test Email"}
          </button>
        </div>
        <small>⚠️ Save your SMTP settings first before testing.</small>
      </div>
    </div>
  );
}