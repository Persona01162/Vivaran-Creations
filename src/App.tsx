import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServiceDetails from './components/ServiceDetails';
import ContactForm from './components/ContactForm';
import AboutPage from './components/AboutPage';
import Collaborations from './components/Collaborations';
import AccessDenied from './pages/AccessDenied';
import SignupLogin from './pages/SignupLogin';
import UserTypeSelection from './pages/UserTypeSelection';
import AssetsPage from './pages/AssetsPage';
import StartupDashboard from './pages/StartupDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import PrivateRoute from './components/PrivateRoute';
import AuthenticatedHomePage from './components/AuthenticatedHomePage';
import Portfolio from './components/Portfolio';
import PortfolioDetails from './components/PortfolioDetails';
import TermsServices from './components/TermsServices';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-dark-400 to-dark-300 text-white overflow-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<AuthenticatedHomePage />} />
            <Route path="/services" element={
              <PrivateRoute>
                <ServiceDetails />
              </PrivateRoute>
            } />
            <Route path="/portfolio" element={
              <PrivateRoute>
                <Portfolio />
              </PrivateRoute>
            } />
            <Route path="/portfolios" element={
              <PrivateRoute>
                <PortfolioDetails />
              </PrivateRoute>
            } />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/colaborations" element={
              <PrivateRoute>
                <Collaborations />
              </PrivateRoute>
            } />
            <Route path="/assets" element={
              <PrivateRoute>
                <AssetsPage />
              </PrivateRoute>
            } />
            <Route path="/about" element={
              <PrivateRoute>
                <AboutPage />
              </PrivateRoute>
            } />
            <Route path="/selection" element={<UserTypeSelection />} />
            <Route path="/auth" element={<SignupLogin />} />
            <Route path="/terms" element={<TermsServices />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/startup-dashboard" element={<StartupDashboard />} />
            <Route path="/investor-dashboard" element={<InvestorDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;