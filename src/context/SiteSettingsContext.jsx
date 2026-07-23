import { createContext, useContext, useEffect, useState } from "react";
import settingsApi from "../api/settingsApi";

const SiteSettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
  siteName: "SkyBook",
  logoUrl: null,
  faviconUrl: null,
  supportEmail: null,
};

export function SiteSettingsProvider({ children }) {
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    settingsApi
      .getPublicSettings()
      .then((data) => {
        if (mounted) {
          setSiteSettings({
            siteName: data.siteName || DEFAULT_SETTINGS.siteName,
            logoUrl: data.logoUrl || null,
            faviconUrl: data.faviconUrl || null,
            supportEmail: data.supportEmail || null,
          });
        }
      })
      .catch(() => {
        // ব্যর্থ হলে default settings থেকে যাবে, পুরো app ভাঙবে না
      })
      .finally(() => {
        if (mounted) setLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (siteSettings.siteName) {
      document.title = siteSettings.siteName;
    }
    if (siteSettings.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = siteSettings.faviconUrl;
    }
  }, [siteSettings]);

  return (
    <SiteSettingsContext.Provider value={{ siteSettings, loaded }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error("useSiteSettings must be used within SiteSettingsProvider");
  }
  return ctx.siteSettings;
}