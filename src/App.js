import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questionnaire from './Questionnaire';
import AboutMe from './AboutMe';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Questionnaire />} />
      <Route path="/about" element={<AboutMe />} />
    </Routes>
  </Router>
);

export default App;
