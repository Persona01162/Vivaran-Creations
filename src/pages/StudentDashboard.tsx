import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, set, get } from 'firebase/database';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudentForm {
  name: string;
  email: string;
  mobile: string;
  college: string;
  course: string;
  cgpa: string;
  specialization: string;
}

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<StudentForm>({
    name: '',
    email: currentUser?.email || '',
    mobile: '',
    college: '',
    course: '',
    cgpa: '',
    specialization: ''
  });

  const specializations = [
    'UI/UX',
    'AI',
    'ML',
    'AIML',
    'DATA SCIENCE',
    'DATA ANALYTICS',
    'FULL STACK WEB DEVELOPMENT',
    'ANDROID APP DEVELOPMENT',
    'AWS CLOUD COMPUTING',
    'CYBER SECURITY',
    'PYTHON',
    'JAVA',
    'C / C++',
    'HEV',
    'EMBEDDED SYSTEMS',
    'VLSI',
    'IOT & ROBOTICS',
    'AUTOCAD',
    'IC ENGINES',
    'CONSTRUCTION PLANNING',
    'HR',
    'FINANCE',
    'DIGITAL MARKETING',
    'STOCK MARKETING',
    'BUSINESS ANALYST'
  ];

  const certificationPartners = [
    {
      name: 'TechCorp Academy',
      logo: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'SkillForge Institute',
      logo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'Digital Learning Hub',
      logo: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'Innovation Academy',
      logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    }
  ];

  useEffect(() => {
    if (currentUser) {
      const studentRef = ref(database, `students/${currentUser.uid}`);
      get(studentRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFormSubmitted(true);
          setFormData(snapshot.val());
        }
        setLoading(false);
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    try {
      await set(ref(database, `students/${currentUser.uid}`), {
        ...formData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });
      setFormSubmitted(true);
      setShowSuccessModal(true);
      
      // Auto close modal and redirect after 4 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/');
      }, 4000);
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pt-20 bg-dark-400 px-4">
      <div className="container mx-auto max-w-4xl py-12">
        {!formSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Complete Your Certification Profile</h2>
            <p className="text-gray-400 text-center mb-8">
              Fill out the form below to get started with your certification journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Mobile & College */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">College/University *</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    placeholder="Enter your college/university name"
                  />
                </div>
              </div>

              {/* Course & CGPA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Course *</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  >
                    <option value="">Select Course</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.E">B.E</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="M.E">M.E</option>
                    <option value="BSc">BSc</option>
                    <option value="MSc">MSc</option>
                    <option value="MBA">MBA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">CGPA/Percentage *</label>
                  <input
                    type="text"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    placeholder="e.g., 8.5 or 85%"
                  />
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Certification Specialization *</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
              >
                Submit Application
              </button>
            </form>

            {/* Certification Partners */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-xl font-semibold mb-6 text-center">Our Certification Partners</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {certificationPartners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-gray-600">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-400">{partner.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-xl p-8 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
            <p className="text-gray-400 mb-6">
              Thank you for your interest in our certification programs. We'll get back to you soon with further details.
            </p>
            <div className="bg-dark-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Application Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <span className="ml-2 font-medium">{formData.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Course:</span>
                  <span className="ml-2 font-medium">{formData.course}</span>
                </div>
                <div>
                  <span className="text-gray-400">College:</span>
                  <span className="ml-2 font-medium">{formData.college}</span>
                </div>
                <div>
                  <span className="text-gray-400">Specialization:</span>
                  <span className="ml-2 font-medium">{formData.specialization}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 rounded-2xl p-8 max-w-md mx-4 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
              <p className="text-gray-400 mb-6">
                We have received your application. We'll get back to you soon with further details about your certification program.
              </p>
              <div className="text-sm text-gray-500">
                Redirecting to home page in a few seconds...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;