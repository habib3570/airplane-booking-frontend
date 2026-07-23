import React from "react";

const StripeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#635BFF"/>
    <path d="M14.87 13.14c0-.86.7-1.19 1.87-1.19 1.67 0 3.79.51 5.46 1.4V8.62c-1.82-.72-3.63-1-5.46-1-4.46 0-7.43 2.33-7.43 6.22 0 6.06 8.35 5.08 8.35 7.69 0 1.02-.88 1.35-2.11 1.35-1.82 0-4.16-.75-6-1.76v4.78c2.05.88 4.12 1.25 6 1.25 4.57 0 7.71-2.26 7.71-6.2 0-6.54-8.39-5.37-8.39-7.81z" fill="white"/>
  </svg>
);

const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="11" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const WebhookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="2"/>
    <path d="M8.5 10.5L4 18M15.5 10.5L20 18M9 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CurrencyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 7v10M9.5 9.5c0-1.1 1-2 2.5-2s2.5.7 2.5 1.8-1 1.6-2.5 2-2.5.9-2.5 2 1 1.8 2.5 1.8 2.5-.9 2.5-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export default function StripeSection({ formData, onChange }) {
  const isEnabled = formData.stripeEnabled || false;

  return (
    <div className="settings-section stripe-section">
      <div className="settings-section-header">
        <div className="stripe-title">
          <StripeIcon />
          <h2>Stripe Payment Gateway</h2>
        </div>
        <label className={`settings-toggle ${isEnabled ? "is-on" : "is-off"}`}>
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => onChange("stripeEnabled", e.target.checked)}
          />
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          <span className="toggle-label">{isEnabled ? "Enabled" : "Disabled"}</span>
        </label>
      </div>

      <div className={`stripe-body ${!isEnabled ? "stripe-body--dimmed" : ""}`}>
        <div className="stripe-group">
          <div className="stripe-group-label">
            <LockIcon />
            <span>API Keys</span>
          </div>

          <div className="settings-field">
            <label>Publishable key</label>
            <input
              type="text"
              value={formData.stripePublishableKey || ""}
              onChange={(e) => onChange("stripePublishableKey", e.target.value)}
              placeholder="pk_test_..."
              className="mono-input"
            />
          </div>

          <div className="settings-field">
            <label>
              Secret key
              {formData.stripeSecretKeyConfigured && (
                <span className="settings-configured-badge">✓ Set</span>
              )}
            </label>
            <input
              type="password"
              value={formData.stripeSecretKey || ""}
              onChange={(e) => onChange("stripeSecretKey", e.target.value)}
              placeholder={
                formData.stripeSecretKeyConfigured
                  ? "•••••••••••• (leave blank to keep current)"
                  : "sk_test_..."
              }
              className="mono-input"
            />
          </div>
        </div>

        <div className="stripe-group">
          <div className="stripe-group-label">
            <CurrencyIcon />
            <span>Currency Conversion</span>
          </div>

          <div className="settings-field">
            <label>USD to BDT Exchange Rate</label>
            <input
              type="number"
              step="0.01"
              min="1"
              value={formData.usdToBdtRate || ""}
              onChange={(e) => onChange("usdToBdtRate", parseFloat(e.target.value) || 0)}
              placeholder="e.g. 122.50"
              className="mono-input"
            />
            <p className="settings-hint">
              Stripe BDT সাপোর্ট করে না, তাই বুকিং amount USD এ কনভার্ট করে পাঠানো হয়। এই rate নিয়মিত আপডেট করুন (বর্তমান মার্কেট রেট অনুযায়ী)।
            </p>
          </div>
        </div>

        <div className="stripe-group">
          <div className="stripe-group-label">
            <WebhookIcon />
            <span>Webhook</span>
          </div>

          <div className="settings-field">
            <label>
              Signing secret
              {formData.stripeWebhookSecretConfigured && (
                <span className="settings-configured-badge">✓ Set</span>
              )}
            </label>
            <input
              type="password"
              value={formData.stripeWebhookSecret || ""}
              onChange={(e) => onChange("stripeWebhookSecret", e.target.value)}
              placeholder={
                formData.stripeWebhookSecretConfigured
                  ? "•••••••••••• (leave blank to keep current)"
                  : "whsec_..."
              }
              className="mono-input"
            />
          </div>

          <div className="stripe-endpoint">
            <span className="stripe-endpoint-label">Endpoint URL</span>
            <code>https://yourdomain.com/api/v1/payments/webhook</code>
          </div>
        </div>
      </div>
    </div>
  );
}