import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import {
  useTheme,
  Box,
  Button,
  TextField,
  Typography,

} from "@mui/material";
import { ColorModeContext } from "../theme";
import axios from "axios";
import url from "../constant/url";
import { tokens } from "../theme";

const LoginForm = ({ onLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
//   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAdmin: false,
    isOwner: true,
    restaurant: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${url}/api/users/login`, formData);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data?.user));
      localStorage.setItem("restaurantId", JSON.stringify(response.data?.user?.restaurant?._id))
      onLogin();
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };


  // Update your textFieldStyles
  const textFieldStyles = {
    mb: 2,
    "& .MuiInputLabel-root": {
      color: colors.grey[100],
      fontSize: "0.9rem",
      fontWeight: 500,
      transform: "translate(14px, 12px) scale(1)",
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)",
      },
      "&.Mui-focused": {
        color: colors.yellowAccent[500],
      },
    },
    "& .MuiInputBase-input": {
      color: colors.grey[100],
      padding: "12px 14px",
      fontSize: "0.95rem",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: colors.primary[400],
      borderRadius: "8px",
      "& fieldset": {
        borderColor: colors.grey[600],
      },
      "&:hover fieldset": {
        borderColor: colors.yellowAccent[400],
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.yellowAccent[500],
        borderWidth: "1px",
      },
    },
    // Add these styles for proper label animation
    "& .MuiInputLabel-root.Mui-focused": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
    "& .MuiInputLabel-root.MuiFormLabel-filled": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: colors.primary[400],
        p: 3,
        backgroundImage: `linear-gradient(106.37deg, ${colors.yellowAccent[100]}29 29.63%, ${colors.yellowAccent[200]}51 51.55%, ${colors.yellowAccent[300]}90 90.85%)`,
      }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "400px",
          p: 4,
          borderRadius: 4,
          backgroundColor: colors.primary[500],
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: colors.yellowAccent[500],
          },
        }}>
        <Typography
          variant="h2"
          sx={{
            mb: 3,
            color: colors.yellowAccent[500],
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}>
          DineSpace Login
        </Typography>

        {error && (
          <Typography
            sx={{
              mb: 2,
              color: colors.redAccent[500],
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              px: 2,
              py: 1,
              backgroundColor: colors.redAccent[900],
              borderRadius: "6px",
            }}>
            <span>⚠️</span> {error}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={textFieldStyles}
          autoComplete="email"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          sx={textFieldStyles}
          autoComplete="current-password"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                  sx={{
                    color: colors.yellowAccent[500],
                    "&.Mui-checked": { color: colors.yellowAccent[500] },
                    py: 0.5
                  }}
                />
              }
              label={
                <Typography sx={{ 
                  color: colors.grey[100], 
                  fontSize: '0.9rem',
                  fontWeight: 500 
                }}>
                  Admin
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isOwner"
                  checked={formData.isOwner}
                  onChange={handleChange}
                  sx={{
                    color: colors.yellowAccent[500],
                    "&.Mui-checked": { color: colors.yellowAccent[500] },
                    py: 0.5
                  }}
                />
              }
              label={
                <Typography sx={{ 
                  color: colors.grey[100], 
                  fontSize: '0.9rem',
                  fontWeight: 500 
                }}>
                  Owner
                </Typography>
              }
            />
          </Grid>
        </Grid> */}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            py: 1.5,
            backgroundColor: colors.yellowAccent[500],
            color: colors.primary[500],
            fontSize: "0.95rem",
            fontWeight: 600,
            borderRadius: "8px",
            textTransform: "none",
            letterSpacing: "0.5px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: colors.yellowAccent[600],
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              backgroundColor: colors.grey[700],
              color: colors.grey[500],
            },
          }}>
          {loading ? "Logging in..." : "Sign In"}
        </Button>

        <Box
          sx={{
            mt: 3,
            textAlign: "center",
            "& button": {
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            },
          }}>
          <Button
            onClick={colorMode.toggleColorMode}
            sx={{
              color: colors.grey[100],
              fontSize: "0.85rem",
              fontWeight: 500,
              textTransform: "none",
            }}>
            Toggle {theme.palette.mode === "dark" ? "Light" : "Dark"} Mode
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
