CREATE TABLE courses(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  course_Code VARCHAR(100) NOT NULL UNIQUE, 
  credits INT NOT NULL,
  description TEXT NOT NULL,
  image_Landing TEXT NOT NULL,
  image_Details TEXT NOT NULL
);

