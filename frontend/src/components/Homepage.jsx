import React, { memo, useMemo } from "react";
import { NavLink } from "react-router";
import GlowingButton from "../subComponents/GlowingButton";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import QuizIcon from "@mui/icons-material/Quiz";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  Stack,
} from "@mui/material";

const HeroSection = memo(() => {
  const titleStyles = useMemo(() => ({
    color: "white",
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    mb: 3,
    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
  }), []);

  return (
    <Box 
      sx={{ 
        textAlign: "center", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        minHeight: { xs: '80vh', md: '90vh' }
      }}
      component="section"
      aria-label="Hero section"
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          component="h1"
          sx={titleStyles}
          role="heading"
          aria-level="1"
        >
          <span style={{ color: "#ffffff" }}>AI</span>{" "}
          <span style={{ color: "#00e5c9" }}>INTERVIEW</span>
        </Typography>
        
        <Typography
          variant="h6"
          align="center"
          paragraph
          component="p"
          sx={{
            mb: { xs: 3, sm: 4 },
            maxWidth: { xs: "90%", sm: "80%", md: "600px" },
            mx: "auto",
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            fontWeight: 400,
            lineHeight: { xs: 1.4, sm: 1.5 },
          }}
        >
          Upload your resume, select a field, take an AI interview, and get one step closer to the job
        </Typography>
        
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={{ xs: 2, sm: 3 }}
          justifyContent="center"
          alignItems="center"
          sx={{ 
            mt: { xs: 2, sm: 3 },
            px: { xs: 2, sm: 0 } 
          }}
        >
          <Box
            sx={{
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              "&:active": {
                transform: "scale(0.95)",
              }
            }}
          >
            <GlowingButton
              name="Mock Interview"
              icon={SchoolIcon}
              component={NavLink}
              to="/mockInterviewWay"
              aria-label="Navigate to mock interview page"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
});

const FEATURES_DATA = [
  {
    title: "Select Position",
    description:
      "Choose from various roles like Frontend, Backend, Fullstack, DevOps, AI/ML, Data Science, UI/UX, and more.",
    icon: WorkIcon,
  },
  {
    title: "Experience Level",
    description:
      "Select your experience level from Student/Fresher to 10+ years to get appropriate questions.",
    icon: BarChartIcon,
  },
  {
    title: "Interview Mode",
    description: (
      <span>
        Choose between Guided Mode{" "}
        <SchoolIcon sx={{ fontSize: 16, color: '#193E50', verticalAlign: 'middle', mx: 0.3 }} />
        {" "}for structured guidance or Hard Mode{" "}
        <WhatshotIcon sx={{ fontSize: 16, color: '#193E50', verticalAlign: 'middle', mx: 0.3 }} />
        {" "}for challenging questions.
      </span>
    ),
    icon: SettingsIcon,
  },
  {
    title: "Number of Questions",
    description:
      "Customize your practice session with 5, 10, 15, 20, or 25+ questions based on your needs.",
    icon: QuizIcon,
  },
  {
    title: "Upload Resume",
    description:
      "Upload your resume and let our AI analyze your skills and experience to ask relevant questions.",
    icon: UploadFileIcon,
  },
  {
    title: "AI Interview Practice",
    description:
      "Practice with our AI interviewer tailored to your selected position, experience, preferences, and resume-based questions for a personalized interview experience.",
    icon: PsychologyIcon,
  },
];

const FeatureCard = memo(({ feature, index }) => {
  const cardStyles = useMemo(() => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: "16px",
    p: { xs: 4, sm: 5 },
    position: "relative",
    overflow: "hidden",
    maxWidth: { xs: 350, sm: 380 },
    mx: "auto",
    background: "linear-gradient(145deg, rgba(40, 50, 80, 0.6), rgba(30, 40, 70, 0.7))",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(0, 229, 201, 0.2)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px rgba(0, 229, 201, 0.15)",
      border: "1px solid rgba(0, 229, 201, 0.3)",
    },
  }), []);

  const stepNumberStyles = useMemo(() => ({
    width: 48,
    height: 48,
    borderRadius: "12px",
    background: "linear-gradient(135deg, rgba(0, 229, 201, 0.9), rgba(30, 136, 229, 0.8))",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    mb: 3,
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    boxShadow: "0 4px 15px rgba(0, 229, 201, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  }), []);

  const iconStyles = useMemo(() => ({
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: "2rem",
    opacity: 0.15,
    color: "#00e5c9",
  }), []);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: { xs: 3, sm: 0 },
      }}
    >
      <Card
        elevation={0}
        sx={cardStyles}
        role="article"
        aria-labelledby={`feature-title-${index}`}
      >
        <Box sx={stepNumberStyles}>
          {index + 1}
        </Box>

        <Box
          sx={iconStyles}
          role="img"
          aria-label={`${feature.title} icon`}
        >
          <feature.icon />
        </Box>

        <Typography
          variant="h5"
          gutterBottom
          id={`feature-title-${index}`}
          sx={{
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.95)",
            mb: 2,
            textAlign: "left",
            fontSize: { xs: '1.25rem', sm: '1.4rem' },
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            lineHeight: 1.3,
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          {feature.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.6,
            color: "rgba(255, 255, 255, 0.75)",
            fontSize: { xs: '0.95rem', sm: '1rem' },
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            textAlign: "left",
          }}
        >
          {feature.description}
        </Typography>
      </Card>
    </Grid>
  );
});

const FeaturesSection = memo(() => {
  const sectionStyles = useMemo(() => ({
    py: { xs: 8, sm: 10, md: 12 },
    px: { xs: 2, sm: 3 },
    position: "relative",
    color: "rgba(255, 255, 255, 0.9)",
  }), []);

  const titleStyles = useMemo(() => ({
    mb: { xs: 2, sm: 3 },
    fontWeight: 700,
    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
    background: "linear-gradient(135deg, #ffffff 0%, #00e5c9 50%, #1e88e5 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  }), []);

  const subtitleStyles = useMemo(() => ({
    mb: { xs: 6, sm: 8, md: 10 },
    fontSize: { xs: '1.1rem', sm: '1.25rem' },
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    maxWidth: "600px",
    mx: "auto",
    lineHeight: 1.5,
    fontWeight: 400,
  }), []);

  return (
    <Box
      component="section"
      sx={sectionStyles}
      aria-label="How it works section"
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 } }}>
        <Box textAlign="center" mb={{ xs: 6, sm: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={titleStyles}
          >
            How It Works
          </Typography>
          
          <Typography
            variant="h6"
            component="p"
            sx={subtitleStyles}
          >
            Get started with your AI interview preparation in just a few simple steps
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 4, sm: 5, md: 6 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {FEATURES_DATA.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={idx}
            />
          ))}
        </Grid>

        {/* Call to Action */}
        <Box textAlign="center" mt={{ xs: 8, sm: 10 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.95)",
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2rem' },
              fontFamily: '"Inter", "Segoe UI", sans-serif',
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            Ready to ace your next interview?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.75)",
              mb: 4,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontFamily: '"Inter", "Segoe UI", sans-serif',
            }}
          >
            Join thousands of professionals who have improved their interview skills with AI Interview
          </Typography>
        </Box>
      </Container>
    </Box>
  );
});

HeroSection.displayName = 'HeroSection';
FeaturesSection.displayName = 'FeaturesSection';
FeatureCard.displayName = 'FeatureCard';

const HomePage = memo(() => {
  return (
    <main role="main" className="hero-background" style={{ minHeight: '100vh' }}>
      <HeroSection />
      <FeaturesSection />
    </main>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;