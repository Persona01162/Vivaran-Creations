import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ref, set, get, onValue } from 'firebase/database';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import PricingStartup from '../components/PricingStartup';

interface StartupForm {
  startupName: string;
  domain: string;
  description: string;
  fundingNeeded: string;
  teamSize: string;
  stage: string;
  location: string;
  website: string;
}

interface Investor {
  name: string;
  email: string;
  interestedDomains: string[];
  id: string;
}

const StartupDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [potentialInvestors, setPotentialInvestors] = useState<Investor[]>([]);
  const [formData, setFormData] = useState<StartupForm>({
    startupName: '',
    domain: '',
    description: '',
    fundingNeeded: '',
    teamSize: '',
    stage: '',
    location: '',
    website: ''
  });

  useEffect(() => {
    if (currentUser) {
      const startupRef = ref(database, `startups/${currentUser.uid}`);
      get(startupRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFormSubmitted(true);
          setFormData(snapshot.val());
        }
        setLoading(false);
      });

      // Listen for potential investors
      const investorsRef = ref(database, 'investors');
      onValue(investorsRef, (snapshot) => {
        const investors: Investor[] = [];
        snapshot.forEach((childSnapshot) => {
          const investor = childSnapshot.val();
          if (investor.interestedDomains?.includes(formData.domain)) {
            investors.push({
              ...investor,
              id: childSnapshot.key
            });
          }
        });
        setPotentialInvestors(investors);
      });
    }
  }, [currentUser, formData.domain]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      await set(ref(database, `startups/${currentUser.uid}`), {
        ...formData,
        userId: currentUser.uid,
        email: currentUser.email,
        createdAt: new Date().toISOString()
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error saving startup data:', error);
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
            <h2 className="text-3xl font-bold mb-6">Complete Your Startup Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Startup Name & Domain */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Startup Name</label>
                  <input
                    type="text"
                    name="startupName"
                    value={formData.startupName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Domain</label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  >
                    <option value="">Select Domain</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white resize-none"
                ></textarea>
                <p className="text-right text-sm text-gray-400 mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Funding Needed & Team Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Funding Needed</label>
                  <input
                    type="number"
                    name="fundingNeeded"
                    value={formData.fundingNeeded}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 500000"
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Team Size</label>
                  <input
                    type="number"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  />
                </div>
              </div>

              {/* Stage & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Stage</label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  >
                    <option value="">Select Stage</option>
                    <option value="Idea">Idea</option>
                    <option value="MVP">MVP</option>
                    <option value="Early Traction">Early Traction</option>
                    <option value="Growth">Growth</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Website (optional)</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  placeholder="https://"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 group"
              >
                Submit Profile
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Your Startup Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Startup Details</h3>
                  <dl className="space-y-2">
                    <dt className="text-gray-400">Name</dt>
                    <dd className="font-medium">{formData.startupName}</dd>
                    <dt className="text-gray-400">Domain</dt>
                    <dd className="font-medium">{formData.domain}</dd>
                    <dt className="text-gray-400">Stage</dt>
                    <dd className="font-medium">{formData.stage}</dd>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Funding Details</h3>
                  <dl className="space-y-2">
                    <dt className="text-gray-400">Funding Needed</dt>
                    <dd className="font-medium">${formData.fundingNeeded}</dd>
                    <dt className="text-gray-400">Team Size</dt>
                    <dd className="font-medium">{formData.teamSize}</dd>
                    <dt className="text-gray-400">Location</dt>
                    <dd className="font-medium">{formData.location}</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Potential Investors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {potentialInvestors.length > 0 ? (
                  potentialInvestors.map((investor) => (
                    <motion.div
                      key={investor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-dark-700/50 rounded-lg p-6"
                    >
                      <h3 className="text-lg font-semibold mb-2">{investor.name}</h3>
                      <p className="text-gray-400 mb-4">Interested in: {investor.interestedDomains.join(', ')}</p>
                      <button
                        className="text-primary-400 hover:text-primary-300 font-medium"
                        onClick={() => window.location.href = `mailto:${investor.email}`}
                      >
                        Contact Investor
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-2 text-center py-8">
                    No potential investors found for your domain yet. Check back later!
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <PricingStartup />
    </div>
  );
};

export default StartupDashboard;