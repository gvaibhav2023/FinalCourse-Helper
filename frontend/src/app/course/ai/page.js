// src/app/course/ai/page.js
// src/app/course/ai/page.js
import { Box, Typography } from '@mui/material';

const AICoursePage = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        padding: '20px',
        backgroundColor: 'white',
        backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1676842096847-fed08daa0c8f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Replace with your background image for AI
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Overlay for translucent effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Translucent white overlay
          zIndex: 1,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold', color: 'black' }}>
          Artificial Intelligence
        </Typography>

        {/* Description Box */}
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid black', // Thin black border
            boxShadow: 0, // Remove shadow
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
            Description
          </Typography>
          <Typography variant="body1" sx={{ color: 'black' }}>
            AI involves creating machines that can perform tasks that typically require human intelligence, such as understanding language and recognizing images.
          </Typography>
        </Box>

        {/* Credits Box */}
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid black', // Thin black border
            boxShadow: 0, // Remove shadow
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
            Credits
          </Typography>
          <Typography variant="body1" sx={{ color: 'black' }}>4 Credits</Typography>
        </Box>

        {/* Course Code Box */}
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid black', // Thin black border
            boxShadow: 0, // Remove shadow
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
            Course Code
          </Typography>
          <Typography variant="body1" sx={{ color: 'black' }}>CS103</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AICoursePage;
