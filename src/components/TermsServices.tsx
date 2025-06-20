import React from 'react';
import { motion } from 'framer-motion';

const TermsServices: React.FC = () => {
    return (
        <div className="min-h-screen pt-20 bg-dark-400">
            {/* Hero Section with Interactive Image */}
            <section className="relative py-20 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-3/5"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                Terms & Conditions
                            </h1>

                            <div className="text-lg text-gray-400 space-y-6">
                                <p>
                                    <strong>Introduction</strong><br />
                                    Welcome to the official website of Vivaran Creations Private Limited. By accessing this website, you agree to be bound by the following terms and conditions. If you do not accept these terms, please refrain from using our services.
                                </p>

                                <div>
                                    <strong>Intellectual Property</strong>
                                    <ul className="list-disc ml-6 mt-2">
                                        <li>All content on this website, including but not limited to logos, trademarks, text, graphics, images, animations, videos, and software, is the property of Vivaran Creations or its licensors.</li>
                                        <li>Unauthorized use or reproduction is strictly prohibited.</li>
                                    </ul>
                                </div>

                                <div>
                                    <strong>User Conduct</strong>
                                    <ul className="list-disc ml-6 mt-2">
                                        <li>You agree not to use the website for any unlawful purpose.</li>
                                        <li>To solicit others to perform or participate in unlawful acts.</li>
                                        <li>To infringe upon our intellectual property or the rights of others.</li>
                                        <li>To transmit malicious code or interfere with the functionality of the site.</li>
                                    </ul>
                                </div>

                                <div>
                                    <strong>Privacy Policy</strong>
                                    <ul className="list-disc ml-6 mt-2">
                                        <li>We collect limited personal information (such as name, contact details, and inquiries) solely for providing our services or communication.</li>
                                        <li>We do not sell or share your data with third parties except as necessary to deliver services or comply with legal obligations.</li>
                                    </ul>
                                    {/* <p className="mt-2">
                                        View full privacy policy <a href="/privacy-policy" className="text-primary-500 underline">here</a>.
                                    </p> */}
                                </div>

                                <div>
                                    <strong>Third-Party Links</strong>
                                    <ul className="list-disc ml-6 mt-2">
                                        <li>Our website may contain links to third-party websites.</li>
                                        <li>We do not take responsibility for the content or practices of these websites.</li>
                                        <li>We encourage users to review their respective privacy and policy terms.</li>
                                    </ul>
                                </div>

                                <div>
                                    <strong>Payments and Refunds</strong>
                                    <ul className="list-disc ml-6 mt-2">
                                        <li>All payments for services offered by Vivaran Creations are final unless otherwise stated in a contractual agreement.</li>
                                        <li>Refunds will be issued only under exceptional circumstances and at the discretion of management.</li>
                                    </ul>
                                </div>

                                <div>
                                    <strong>Service Delivery</strong>
                                    <ul className="list-disc ml-6 mt-2">
                                        <li>Vivaran Creations provides creative, technical, and digital services.</li>
                                        <li>Timelines, deliverables, and ownership are governed by written agreements.</li>
                                        <li>All digital assets are handed over post-completion and full payment.</li>
                                    </ul>
                                </div>

                                <div>
                                    <strong>Changes to Terms</strong>
                                    <ul className="list-disc ml-6 mt-2">
                                        <li>Vivaran Creations reserves the right to update or modify these terms at any time without prior notice.</li>
                                        <li>Users are encouraged to periodically review the latest terms on our website.</li>
                                    </ul>
                                </div>

                                <div>
                                    <strong>Limitation of Liability</strong>
                                    <ul className="list-disc ml-6 mt-2">
                                        <li>We are not liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services or content.</li>
                                    </ul>
                                </div>

                                <div>
                                    <strong>Governing Law</strong>
                                    <ul className="list-disc ml-6 mt-2">
                                        <li>These terms are governed by and construed in accordance with the laws of India.</li>
                                        <li>Any disputes arising shall be resolved under the jurisdiction of Hyderabad, Telangana.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl"></div>
            </section>
        </div>
    );
};

export default TermsServices;