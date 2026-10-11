# School Database Design

## Tables
- **students**: Holds student records with a unique email for each student.
- **courses**: Holds course records with a title.
- **enrolments**: Join table linking students to courses, with an optional grade.

## Relationships
- One student can enrol in many courses (one-to-many).
- One course can have many students (one-to-many).
- Together, this forms a **many-to-many** relationship between students and courses.
- The **enrolments** table is the join table needed to represent this many-to-many relationship.

## Index
I would add an index on `enrolments(student_id)` because queries often filter by student to list their courses. This speeds up lookups for a student’s enrolments.

## SQL vs NoSQL
For this system, **SQL** is the better choice. The relationships between students, courses, and enrolments are structured and relational, with constraints like foreign keys and uniqueness. SQL ensures data integrity (e.g. preventing duplicate enrolments) and supports complex joins for queries such as “all courses for a student” or “all students in a course.” NoSQL would be less suitable here because the data is highly relational and benefits from the consistency guarantees of a relational database.