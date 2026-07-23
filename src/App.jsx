import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { SiteSettingsProvider } from "./context/SiteSettingsContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <SiteSettingsProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </SiteSettingsProvider>
  );
}

export default App;