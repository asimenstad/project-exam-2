import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" sx={{ paddingBlock: 4, marginTop: 4 }}>
      <Container>
        <Typography variant="body1"> &copy; 2023 Holidaze</Typography>
      </Container>
    </Box>
  );
}

export default Footer;
