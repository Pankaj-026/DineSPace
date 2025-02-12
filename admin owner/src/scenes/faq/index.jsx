import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is DineSPace?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            DineSPace is a restaurant and cafe seat reservation management app
            that allows customers to book tables in advance and helps restaurant
            owners manage their seating efficiently.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I book a table?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To book a table, simply sign up or log in to your DineSPace account,
            browse available restaurants, select your preferred date and time,
            and confirm your reservation.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I modify or cancel my reservation?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, you can modify or cancel your reservation through the DineSPace
            app. Go to "My Bookings," select the reservation, and choose to edit
            or cancel it as per the restaurant's cancellation policy.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can restaurants use DineSPace?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Restaurants can sign up as business owners, set up their seating
            layout, manage bookings, and view customer insights to optimize
            operations.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Is there a fee for using DineSPace?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            DineSPace is free for customers to use. Restaurants may have premium
            features available for a subscription fee to enhance their booking
            and management experience.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
