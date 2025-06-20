import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-dark-400">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-3/5"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>

              <div className="text-lg text-gray-400 space-y-6">
                <p>
                  Welcome to the official website of{' '}
                  <strong>Vivaran Creations Private Limited</strong> ("we", "us", or "our"). We are committed to protecting the privacy and security of your personal information in compliance with applicable laws, including the Information Technology Act, 2000 (India), and other relevant regulations.
                </p>

                <p>
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      <strong>Personal Information You Provide:</strong> Name, email address, phone number, mailing address, company name, designation, project inquiries or messages via contact forms.
                    </li>
                    <li>
                      <strong>Automatically Collected Information:</strong> IP address, browser type, device information, pages visited, time spent on site, referring website or search engine, cookies and tracking technologies.
                    </li>
                    <li>
                      <strong>Information from Third Parties:</strong> In some cases, we may receive information about you from third-party platforms or partners such as social media sites or recruitment agencies.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>To respond to your inquiries and provide requested services.</li>
                    <li>To communicate updates, newsletters, or promotional content (with your consent).</li>
                    <li>To improve our website functionality and user experience.</li>
                    <li>To manage client relationships and project deliverables.</li>
                    <li>To comply with legal obligations or enforce our Terms & Conditions.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">3. Sharing of Information</h2>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>We do not sell or rent your personal information to third parties.</li>
                    <li>We may share your data with service providers, vendors, or partners who assist us in operating our business.</li>
                    <li>If required by law, regulation, or court order.</li>
                    <li>In connection with a merger, acquisition, or sale of assets.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Retention</h2>
                  <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. When no longer needed, we securely delete or anonymize your data.</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">5. Cookies and Tracking Technologies</h2>
                  <p>
                    Our website uses cookies and similar technologies to enhance user experience, analyze traffic, and provide personalized content. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the website.
                  </p>
                  <ul className="list-disc ml-6 mt-2">
                    <li>
                      <strong>Essential Cookies:</strong> For basic site functionality.
                    </li>
                    <li>
                      <strong>Performance & Analytics Cookies:</strong> To understand how users interact with the site.
                    </li>
                    <li>
                      <strong>Third-Party Cookies:</strong> From tools like Google Analytics or social media plugins.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">6. Security Measures</h2>
                  <p>We implement reasonable technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure.</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">7. Children’s Privacy</h2>
                  <p>Our website is not directed toward individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have collected such information, please contact us so it can be removed.</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">8. International Data Transfers</h2>
                  <p>If you access our website from outside India, your information may be transferred to servers located in India or other jurisdictions. By using our services, you consent to such transfers in accordance with this Privacy Policy.</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">9. Your Rights</h2>
                  <p>Depending on your jurisdiction, you may have the right to:</p>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Access the personal information we hold about you.</li>
                    <li>Request correction or deletion of your data.</li>
                    <li>Object to or restrict certain types of processing.</li>
                    <li>Withdraw consent where applicable.</li>
                  </ul>
                  <p className="mt-2">
                    To exercise these rights, please contact us at{' '}
                    <a href="mailto:privacy@vivarancreations.com" className="text-primary-500 underline">
                      Adminoffice@vivarancreations.com
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">10. Changes to This Policy</h2>
                  <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised effective date.</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-6 mb-3">11. Contact Us</h2>
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <ul className="list-disc ml-6 mt-2">
                    <li>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:privacy@vivarancreations.com" className="text-primary-500 underline">
                        Adminoffice@vivarancreations.com
                      </a>
                    </li>
                    <li>
                      <strong>Address:</strong> Saroornagar, Trimurti Colony, Doctors Colony, Hyderabad, Telangana 500035
                    </li>
                    <li>
                      <strong>Phone:</strong> +91 80741 71058
                    </li>
                  </ul>
                </div>

                <p className="mt-6">
                  Thank you for trusting <strong>Vivaran Creations Private Limited</strong>. We value your privacy and strive to maintain your trust through transparency and accountability.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl"></div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;