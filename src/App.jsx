import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import OtpVerify from './pages/OtpVerify';
import Home from './pages/Home';
import RestroDetail from './components/RestroDetail';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('fastorToken');

  if (token) {
    return children;
  } else {
    return <Navigate to='/' replace />;
  }
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/otp' element={<OtpVerify />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/restaurant/:restaurantId'
          element={
            <ProtectedRoute>
              <RestroDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
