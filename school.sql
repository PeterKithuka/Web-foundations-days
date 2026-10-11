-- Create tables
CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL
);

CREATE TABLE enrolments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  grade TEXT,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  UNIQUE (student_id, course_id) -- prevents duplicate enrolments
);

-- Insert sample students
INSERT INTO students (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Carol Lee', 'carol@example.com');

-- Insert sample courses
INSERT INTO courses (title) VALUES
('Mathematics'),
('History'),
('Computer Science');

-- Insert sample enrolments
INSERT INTO enrolments (student_id, course_id, grade) VALUES
(1, 1, 'A'),
(1, 2, 'B'),
(2, 1, 'B+'),
(2, 3, 'A-'),
(3, 3, 'B');

-- Queries

-- 1. All courses for one student (by name)
SELECT c.title
FROM courses c
JOIN enrolments e ON c.id = e.course_id
JOIN students s ON s.id = e.student_id
WHERE s.name = 'Alice Johnson';

-- 2. All students on one course
SELECT s.name
FROM students s
JOIN enrolments e ON s.id = e.student_id
JOIN courses c ON c.id = e.course_id
WHERE c.title = 'Mathematics';

-- 3. Number of students per course
SELECT c.title, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrolments e ON c.id = e.course_id
GROUP BY c.id;

-- 4. Students who have no enrolments
SELECT s.name
FROM students s
LEFT JOIN enrolments e ON s.id = e.student_id
WHERE e.id IS NULL;

-- 5. Update one enrolment's grade
UPDATE enrolments
SET grade = 'A+'
WHERE id = 2;