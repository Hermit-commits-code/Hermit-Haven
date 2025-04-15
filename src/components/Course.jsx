import React from 'react';

const Course = ({ course }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">{course.title}</h3>
      <p className="text-sm text-gray-400">{course.instructors}</p>
      <p className="mt-2">Status: {course.status}</p>
      <p className="mt-2">Progress: {course.progress}%</p>
      <p className="mt-2">Priority: {course.priority}</p>
      <p className="mt-2">Tags: {course.tags}</p>
    </div>
  );
};

export default Course;
