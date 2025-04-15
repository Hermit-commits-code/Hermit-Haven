// src/App.jsx
import React, { useEffect, useState } from 'react';

import { usePapaParse } from 'react-papaparse';

const LOCAL_STORAGE_KEY = 'hermit_courses';

const App = () => {
  const { readString } = usePapaParse();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setCourses(JSON.parse(saved));
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result;
      readString(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCourses(results.data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(results.data));
        },
      });
    };
    reader.readAsText(file);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-600';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📚 My Courses</h1>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-8 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-5 space-y-3"
            >
              <h2 className="text-xl font-semibold">{course.Title}</h2>
              <p className="text-sm text-gray-400">👤 {course.Instructor}</p>

              {parseInt(course.Progress) > 0 ? (
                <>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-indigo-500"
                      style={{ width: `${course.Progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400">
                    Progress: {course.Progress}%
                  </p>
                </>
              ) : (
                <p className="text-xs text-gray-500 italic mt-2">
                  Not started yet
                </p>
              )}
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded ${getPriorityColor(
                  course.Priority || '',
                )}`}
              >
                {course.Priority}
              </span>

              <p className="text-sm text-indigo-300 mt-1">
                Status: {course.Status}
              </p>

              {course.Tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {course.Tags.split(',').map((tag, i) => (
                    <span
                      key={i}
                      className="bg-indigo-800 text-indigo-100 px-2 py-1 rounded-full text-xs"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
