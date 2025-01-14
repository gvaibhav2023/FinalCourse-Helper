"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Added useRouter for navigation
import { Box, Typography, Paper, Button } from "@mui/material";

const CourseDetailsPage = () => {
  const params = useParams(); // Get params using `useParams()`
  const router = useRouter(); // For navigation
  const id = params?.id; // Access the `id` from params
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Course deleted successfully!");
        router.push("/landing"); // Redirect to homepage or course list
      } else {
        const errorData = await response.json();
        alert(`Failed to delete course: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("An error occurred while deleting the course.");
    }
  };

  if (!course) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${course.image_details || "https://via.placeholder.com/300"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "800px",
          width: "100%",
          boxShadow: 3,
        }}
      >
        <Typography sx={{ color: "black" }} variant="h4" gutterBottom>
          {course.name}
        </Typography>
        <Paper elevation={3} sx={{ padding: "10px", marginBottom: "10px" }}>
          <Typography variant="h6">Course Code:</Typography>
          <Typography>{course.course_code}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: "10px", marginBottom: "10px" }}>
          <Typography variant="h6">Credits:</Typography>
          <Typography>{course.credits}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: "10px", marginBottom: "10px" }}>
          <Typography variant="h6">Description:</Typography>
          <Typography>{course.description}</Typography>
        </Paper>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: "20px" }}
          onClick={handleDelete}
        >
          Delete Course
        </Button>
      </Box>
    </Box>
  );
};

export default CourseDetailsPage;
