import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import url from "../../constant/url";
// import GeographyChart from "../../components/GeographyChart";
import ProgressCircle from "../../components/ProgressCircle";
import BarChart from "../../components/BarChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalBookings: 0,
    activeUsers: 0,
  });
  const [bookingTrends, setBookingTrends] = useState([]);

  useEffect(() => {
    async function adminStats() {
      try {
        const res = await fetch(`${url}/api/admin/stats`);
        const data = await res.json();
        setStats(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }
    adminStats();
  }, []);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(`${url}/api/bookings/book`);
        const data = await res.json();

        console.log("Fetched Data:", data);

        if (!data || !Array.isArray(data.bookings)) {
          console.error("Invalid bookings data:", data);
          return;
        }

        // Group bookings by date
        const dailyBookings = {};
        data.bookings.forEach((booking) => {
          const date = new Date(booking.createdAt).toISOString().split("T")[0];

          if (!dailyBookings[date]) {
            dailyBookings[date] = 0;
          }
          dailyBookings[date]++;
        });

        // Convert data into Nivo's format
        const chartData = [
          {
            id: "Total Bookings",
            color: "hsl(217, 70%, 50%)",
            data: Object.entries(dailyBookings).map(([date, count]) => ({
              x: date,
              y: count,
            })),
          },
        ];

        console.log("Chart Data:", chartData);
        setBookingTrends(chartData);
      } catch (err) {
        console.error("Error fetching booking trends:", err);
      }
    }

    fetchBookings();
  }, []);

  return (
    <Box mx="30px" mb={5}>
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}>
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your dashboard, SP"
        />
      </Box>

      {/* GRID 
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="150px"
        gap="20px">
        {[
          {
            title: stats.totalUsers,
            subtitle: "Total Users",
            icon: <PersonAddIcon sx={{ fontSize: "26px" }} />,
          },
          {
            title: stats.totalRestaurants,
            subtitle: "Total Restaurants",
            icon: <RestaurantMenuIcon sx={{ fontSize: "26px" }} />,
          },
          {
            title: stats.totalBookings,
            subtitle: "Total Bookings",
            icon: <EmailIcon sx={{ fontSize: "26px" }} />,
          },
          {
            title: stats.activeUsers,
            subtitle: "Active Users (Last 30 Days)",
            icon: <TrafficIcon sx={{ fontSize: "26px" }} />,
          },
        ].map((item, index) => (
          <Box
            key={index}
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="12px"
            boxShadow="3px 5px 15px rgba(0,0,0,0.2)"
            p={2}>
            <StatBox
              title={item.title}
              subtitle={item.subtitle}
              progress="0.75"
              increase="+14%"
              icon={
                <Box sx={{ color: colors.greenAccent[600] }}>{item.icon}</Box>
              }
            />
          </Box>
        ))}
      </Box>
      */}

      {/* CHARTS */}
      <Box
        mt={4}
        p={3}
        backgroundColor={colors.primary[400]}
        borderRadius="12px"
        boxShadow="3px 5px 15px rgba(0,0,0,0.2)">
        <Typography
          variant="h6"
          sx={{ p: 2, fontWeight: "bold" }}>
          Booking Trends (Total Bookings per Date)
        </Typography>
        <Box height="400px">
          <LineChart data={bookingTrends} />
        </Box>
      </Box>

      {/* ROW 3 - Single Row Layout */}
      <Box
        display="flex"
        justifyContent="space-between"
        gap="20px"
        mt={4}>
        {/* Geography Based Traffic */}
        <Box
          flex="1"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius="12px"
          boxShadow="3px 5px 15px rgba(0,0,0,0.2)">
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}>
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            {/* <GeographyChart isDashboard={true} /> */}
            <iframe title="Geography Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96933.3031667097!2d72.68866804335934!3d19.085653700000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9a1447313b7%3A0x5fca9b9dc068d1be!2sL.S.%20Raheja%20College%20Of%20Arts%20%26%20Commerce%2C%20Santacruz!5e1!3m2!1sen!2sin!4v1739867537559!5m2!1sen!2sin" width="350" height="230" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            
          </Box>
        </Box>

        {/* Campaign */}
        <Box
          flex="1"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius="12px"
          boxShadow="3px 5px 15px rgba(0,0,0,0.2)">
          <Typography
            variant="h5"
            fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px">
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}>
              Rs. 3200 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        {/* Sales Quantity */}
        <Box
          flex="1"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius="12px"
          boxShadow="3px 5px 15px rgba(0,0,0,0.2)">
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ paddingBottom: "15px" }}>
            Sales Quantity
          </Typography>
          <Box height="230px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
