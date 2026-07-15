import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import { PermissionProvider } from "./context/PermissionContext";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Permission } from "./types/permission";
import { TicketsPage } from "./pages/TicketsPage";
import { StaffPage } from "./pages/StaffPage";
import { PermissionsRoute } from "./components/PermissionsRoute";

function App() {
  return (
    <SessionProvider>
      <PermissionProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<TicketsPage />} />
              <Route
                path="/tickets"
                element={
                  <ProtectedRoute permission={Permission.VIEW_TICKETS}>
                    <TicketsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff"
                element={
                  <ProtectedRoute permission={Permission.MANAGE_STAFF}>
                    <StaffPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/permissions" element={<PermissionsRoute />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </PermissionProvider>
    </SessionProvider>
  );
}

export default App;
