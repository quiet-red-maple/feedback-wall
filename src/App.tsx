import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SubmitFeedback } from './pages/SubmitFeedback';
import { useFeedbackStore } from './store/useFeedbackStore';

function App() {
  const { fetchFeedbacks } = useFeedbackStore();

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitFeedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
