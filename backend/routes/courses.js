const express = require("express");
const pool = require("../db/connection");

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).send("Server Error");
  }
});

// Add a new course
router.post("/", async (req, res) => {
  const { name, course_Code, credits, description, image_Landing, image_Details } = req.body;
  try {
    await pool.query(
      "INSERT INTO courses (name, course_Code, credits, description, image_Landing, image_Details) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, course_Code, credits, description, image_Landing, image_Details]
    );
    res.status(201).send("Course added");
  } catch (err) {
    console.error("Error adding course:", err); // Log the error
    res.status(500).send("Server Error");
  }
});
// Get a course by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Extract the 'id' from the route parameters

  try {
    // Query the database for the course with the specified ID
    const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);

    // If no course is found, return a 404 status
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Respond with the course data
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching course:", err.message); // Log the error
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});
// Delete a course by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM courses WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).send("Course not found");
    }
    res.status(200).send("Course deleted successfully");
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
