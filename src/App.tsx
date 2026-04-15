import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Home } from './pages/Home';
import { SubmitFeedback } from './pages/SubmitFeedback';
import { useFeedbackStore } from './store/useFeedbackStore';

function App() {
  const { fetchFeedbacks } = useFeedbackStore();

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s · 生活吐槽墙"
        defaultTitle="生活吐槽墙"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<SubmitFeedback />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
