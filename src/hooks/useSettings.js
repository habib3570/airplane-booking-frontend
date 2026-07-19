import { useState, useEffect, useCallback } from "react";
import settingsApi from "../api/settingsApi";

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await settingsApi.getSettings();
      setSettings(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (payload) => {
    setSaving(true);
    setError(null);
    try {
      const updated = await settingsApi.updateSettings(payload);
      setSettings(updated);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update settings.";
      setError(message);
      return { success: false, message };
    } finally {
      setSaving(false);
    }
  };

  const uploadLogo = async (file) => {
    try {
      const result = await settingsApi.uploadLogo(file);
      setSettings((prev) => ({ ...prev, logoUrl: result.url }));
      return { success: true, url: result.url };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Logo upload failed." };
    }
  };

  const uploadFavicon = async (file) => {
    try {
      const result = await settingsApi.uploadFavicon(file);
      setSettings((prev) => ({ ...prev, faviconUrl: result.url }));
      return { success: true, url: result.url };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Favicon upload failed." };
    }
  };

  const testSmtp = async (email) => {
    try {
      const result = await settingsApi.testSmtp(email);
      return { success: true, message: result.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Test email failed." };
    }
  };

  return {
    settings,
    loading,
    saving,
    error,
    fetchSettings,
    updateSettings,
    uploadLogo,
    uploadFavicon,
    testSmtp,
  };
}