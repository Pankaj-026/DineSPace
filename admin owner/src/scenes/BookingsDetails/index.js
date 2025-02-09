import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import url from "../../constant/url";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`${url}/api/bookings/book/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }
        const data = await response.json();
        setBooking(data);
        setStatus(data.booking.Status);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const updateStatus = async () => {
    try {
      const response = await fetch(`${url}/api/bookings/book/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Status: status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!booking) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box m="20px" bgcolor={colors.primary[400]} p={3} borderRadius={2}>
      <Typography variant="h2" color={colors.primary[100]} mb={2} fontWeight={600}>
        Booking Details
      </Typography>
      <Box p={3} borderRadius={2} boxShadow={3} bgcolor={colors.primary[500]}>
        <Typography><strong>ID:</strong> {booking.booking._id}</Typography>
        <Typography><strong>Booking Type:</strong> {booking.booking.bookingType}</Typography>
        <Typography><strong>User Name:</strong> {booking.booking.userName}</Typography>
        <Typography><strong>Phone:</strong> {booking.booking.phoneNumber}</Typography>
        <Typography><strong>Restaurant:</strong> {booking.booking.restaurantName}</Typography>
        <Typography><strong>Booking Date:</strong> {booking.booking.bookingDate}</Typography>
        <Typography><strong>Time:</strong> {booking.booking.bookingTime}</Typography>
        <Typography><strong>Guests:</strong> {booking.booking.numberOfGuests}</Typography>
        <Typography><strong>Requests:</strong> {booking.booking.specialRequests || "None"}</Typography>

        <Box mt={2}>
          <Typography><strong>Status:</strong></Typography>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ width: "100%", mt: 1 }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Box>

        <Box display="flex" gap={2} mt={3}>
          <Button variant="contained" color="secondary" onClick={updateStatus}>
            Update Status
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Status updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingDetails;