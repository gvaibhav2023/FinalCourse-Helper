// src/app/page.js
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <Box sx={{ backgroundColor: 'blue', color: 'white', padding: '20px', textAlign: 'center', fontSize: '32px', fontWeight: 'bold', borderRadius: '5px' }}>
        Welcome to Course Helper
      </Box>

      {/* Main Section */}
      <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ marginBottom: '20px',color: 'black' }}>
          Get ready to explore a variety of courses designed to enhance your skills.
        </Typography>
        {/* Button to navigate to Landing Page */}
        <Link href="/landing" passHref>
          <Button variant="contained" color="primary" sx={{ fontSize: '18px' }}>
            Explore Courses
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default HomePage;
