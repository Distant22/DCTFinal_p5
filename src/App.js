import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Collection from './pages/collection';
import Summary from './pages/summary';
import NewPage from './pages/newpage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<NewPage />} /> 
          <Route path="/collection" element={<Collection />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;