import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import VotingPage from "./pages/VotingPage";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import CandidatesPage from "./pages/CandidatesPage";
import AddCandidatesPage from "./pages/AddCandidatesPage";
import EditCandidatesPage from "./pages/EditCandidatesPage";
import UsersPage from "./pages/UsersPages";
import AddUsersPage from "./pages/AddUsersPage";
import EditUsersPage from "./pages/EditUsersPage";
import HistoryPage from "./pages/HistoryPage";
import ReportPage from "./pages/ReportPage";
import PageNotFound from "./pages/PageNotFound";

console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Login System */}
        <Route index path="/" element={<LoginPage />} />

        {/* User */}
        <Route path="/voting" element={<MainLayout />}>
          <Route
            index
            element={
              <ProtectedRoutes path="/" role="user">
                <VotingPage />
              </ProtectedRoutes>
            }
          />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes path="/" role="admin">
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route path="candidates">
            <Route
              index
              element={
                <ProtectedRoutes path="/" role="admin">
                  <CandidatesPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="add"
              element={
                <ProtectedRoutes path="/" role="admin">
                  <AddCandidatesPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoutes path="/" role="admin">
                  <EditCandidatesPage />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route path="users">
            <Route
              index
              element={
                <ProtectedRoutes path="/" role="admin">
                  <UsersPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="add"
              element={
                <ProtectedRoutes path="/" role="admin">
                  <AddUsersPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoutes path="/" role="admin">
                  <EditUsersPage />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route
            path="history"
            element={
              <ProtectedRoutes path="/" role="admin">
                <HistoryPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="report"
            element={
              <ProtectedRoutes path="/" role="admin">
                <ReportPage />
              </ProtectedRoutes>
            }
          />
        </Route>

        {/* 404 Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
