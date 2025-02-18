import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Restaurants from "./scenes/restaurant";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import BookingsDetails from "./scenes/BookingsDetails";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginForm from "./components/Login";

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setIsAuthenticated(true) && navigate("/");
  }, [navigate]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("restaurantId");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />

          <Route
            element={
              isAuthenticated ? (
                <div className="app">
                  <Sidebar />
                  <main className="content">
                    <Topbar onLogout={handleLogout} />
                    <Outlet />
                  </main>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }>
            <Route
              index
              element={<Dashboard />}
            />
            <Route
              path="team"
              element={<Team />}
            />
            <Route
              path="restaurant"
              element={<Restaurants />}
            />
            <Route
              path="/BookingsDetails/:id"
              element={<BookingsDetails />}
            />
            <Route
              path="form"
              element={<Form />}
            />
            <Route
              path="faq"
              element={<FAQ />}
            />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
