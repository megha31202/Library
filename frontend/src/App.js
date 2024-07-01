// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import BookList from "./BookList"; // Import your BookList component
import "./App.css"; // Optional: Add global styles if needed
import BookForm from "./BookForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add-book" element={<BookForm />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
