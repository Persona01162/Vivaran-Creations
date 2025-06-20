import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser, loading, userType } = useAuth();
  const navigate = useNavigate();
  const [formCompleted, setFormCompleted] = useState<boolean | null>(null);
  const [checkingForm, setCheckingForm] = useState(true);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/auth');
      return;
    }

    if (currentUser && userType) {
      checkFormCompletion();
    }
  }, [currentUser, loading, navigate, userType]);

  const checkFormCompletion = async () => {
    if (!currentUser || !userType) return;

    try {
      let dataRef;
      
      switch (userType) {
        case 'startup':
          dataRef = ref(database, `startups/${currentUser.uid}`);
          break;
        case 'investor':
          dataRef = ref(database, `investors/${currentUser.uid}`);
          break;
        case 'student':
          dataRef = ref(database, `students/${currentUser.uid}`);
          break;
        default:
          setFormCompleted(true);
          setCheckingForm(false);
          return;
      }

      const snapshot = await get(dataRef);
      const completed = snapshot.exists();
      setFormCompleted(completed);

      // If form is not completed, redirect to appropriate dashboard
      if (!completed) {
        switch (userType) {
          case 'startup':
            navigate('/startup-dashboard');
            break;
          case 'investor':
            navigate('/investor-dashboard');
            break;
          case 'student':
            navigate('/student-dashboard');
            break;
        }
      }
    } catch (error) {
      console.error('Error checking form completion:', error);
      setFormCompleted(false);
    } finally {
      setCheckingForm(false);
    }
  };

  if (loading || checkingForm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  // If user hasn't completed their form, don't render the protected content
  if (formCompleted === false) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;