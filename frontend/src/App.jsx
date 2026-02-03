import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout';
import PredictPage from './pages/PredictPage';
import ModelAccuracy from './pages/ModelAccuracy';
import ModelDetail from './pages/ModelDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<PredictPage />} />
          <Route path="accuracy" element={<ModelAccuracy />} />
          <Route path="details" element={<ModelDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
