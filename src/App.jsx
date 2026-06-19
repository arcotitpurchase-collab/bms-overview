// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainOverview from "./pages/MainOverview";
// import BuildingOverview from "./pages/BuildingOverview";
// import FloorOverview from "./pages/FloorOverview";
// import ClientOverview from "./pages/ClientOverview";
// import OverviewPage from "./pages/OverviewPage";

// export default function App() {
//   return (
//     <BrowserRouter >
//       <Routes>
//         <Route path="/" element={<MainOverview />} />
//         <Route path="/building/:buildingId" element={<BuildingOverview />} />
//         <Route path="/building/:buildingId/floor/:floorId" element={<FloorOverview />} />
//         <Route path="/building/:buildingId/floor/:floorId/client/:clientId" element={<ClientOverview />} />

//         <Route path="/overview" element={<OverviewPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import MainOverview from "./pages/MainOverview";
import BuildingOverview from "./pages/BuildingOverview";
import FloorOverview from "./pages/FloorOverview";
import ClientOverview from "./pages/ClientOverview";
import OverviewPage from "./pages/OverviewPage";
import AuthPage from "./pages/AuthPage";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("bmsLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainOverview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/building/:buildingId"
          element={
            <ProtectedRoute>
              <BuildingOverview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/building/:buildingId/floor/:floorId"
          element={
            <ProtectedRoute>
              <FloorOverview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/building/:buildingId/floor/:floorId/client/:clientId"
          element={
            <ProtectedRoute>
              <ClientOverview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <OverviewPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}