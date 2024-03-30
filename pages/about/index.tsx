import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./About.css";

// Replace with an actual placeholder image URL
const placeholderImage =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/820b8d27-7da5-43f0-803c-906d843190aa/dg6bnxk-38a9dcbb-5aae-4b7b-94fc-43a88c3b0c8f.png/v1/fit/w_828,h_994/cat_hacker__programmer_coder___developer_programmi_by_eaudepassion_dg6bnxk-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgyMGI4ZDI3LTdkYTUtNDNmMC04MDNjLTkwNmQ4NDMxOTBhYVwvZGc2Ym54ay0zOGE5ZGNiYi01YWFlLTRiN2ItOTRmYy00M2E4OGMzYjBjOGYucG5nIiwiaGVpZ2h0IjoiPD0xNTM2Iiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvODIwYjhkMjctN2RhNS00M2YwLTgwM2MtOTA2ZDg0MzE5MGFhXC9lYXVkZXBhc3Npb24tNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.IYD9AtvarWRJRHD2zQtyxSdnCLLbAFqfewW4I5ZMf3k";

const About = () => {
  const linkedInLink = "https://www.linkedin.com/in/shivankanchal/";
  const email = "shivaja295@gmail.com";
  const githubLink = "https://github.com/frozenmafia";
  const youtubeLink =
    "https://www.youtube.com/channel/UCGH_eH-Nxn3OLlDMqx4hF7Q";

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        position: "relative",
        overflow: "hidden",
        // background: "#f0f0f0",
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        textAlign="center"
        sx={{
          padding: 4,
          // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            order: { xs: 2, md: 1 },
            maxWidth: { xs: "100%", md: "400px" },
            mt: { xs: 4, md: 0 },
            // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={placeholderImage}
            alt="Sample"
            style={{
              width: "100%",
              borderRadius: "8px",
              // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            marginLeft: { md: 4 },
            alignItems: "center",
          }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Hello, I'm Shivank Anchal
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            I am a seasoned Software Engineer with a passion for creating
            forward-thinking solutions. My expertise lies in crafting innovative
            and efficient applications with a focus on providing an exceptional
            user experience. I have a strong foundation in Data Structures and
            Algorithms, enabling me to solve problems with precision. Committed
            to continuous learning, I stay updated on the latest tech trends to
            deliver cutting-edge solutions.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              href={linkedInLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<LinkedInIcon />}
              sx={{ backgroundColor: "#0077B5", color: "#FFFFFF" }}
            >
              Connect on LinkedIn
            </Button>
            <Button
              href={`mailto:${email}`}
              variant="contained"
              startIcon={<EmailIcon />}
              sx={{ backgroundColor: "#D14836", color: "#FFFFFF" }}
            >
              Email me
            </Button>
            <Button
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<GitHubIcon />}
              sx={{ backgroundColor: "#000000", color: "#FFFFFF" }}
            >
              Follow me on GitHub!
            </Button>
            <Button
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<YouTubeIcon />}
              sx={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}
            >
              Subscribe on YouTube
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default About;