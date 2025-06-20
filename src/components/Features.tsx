import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, Layers, Zap } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // 3D effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  // Spring physics for smooth animation
  const springConfig = { damping: 30, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Floating animation
  const floatAnimation = useAnimation();

  // Track if component is mounted
  const isMounted = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<Promise<any> | null>(null);

  // Define features array outside of render to prevent recreation
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee to keep your business running smoothly.',
      strength: 85,
      color: 'from-gray-800 to-gray-900',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'Scalable Architecture',
      description: 'Our solutions grow with your business, from startup to enterprise, without missing a beat.',
      strength: 92,
      color: 'from-gray-800 to-gray-900',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast',
      description: 'Optimized for performance with global CDN and edge caching for lightning-fast load times.',
      strength: 96,
      color: 'from-gray-800 to-gray-900',
      image: 'https://images.pexels.com/photos/7531991/pexels-photo-7531991.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ];

  // Memoized mouse handlers to prevent recreation on every render
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageRef.current || !isMounted.current) return;

    try {
      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    } catch (error) {
      console.warn('Error in mouse move handler:', error);
    }
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    if (!isMounted.current) return;

    try {
      x.set(0);
      y.set(0);
    } catch (error) {
      console.warn('Error in mouse leave handler:', error);
    }
  }, [x, y]);

  // Floating animation with proper cleanup
  useEffect(() => {
    isMounted.current = true;

    const startFloatingAnimation = async () => {
      try {
        while (isMounted.current) {
          if (!isMounted.current) break;

          animationRef.current = floatAnimation.start({
            y: [0, -15, 0, 15, 0],
            transition: {
              duration: 6,
              ease: "easeInOut",
              repeat: 0, // Don't use infinite repeat in the animation itself
            }
          });

          await animationRef.current;

          // Small delay between cycles to prevent overwhelming the browser
          if (isMounted.current) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      } catch (error) {
        // Animation was cancelled or component unmounted
        console.warn('Floating animation stopped:', error);
      }
    };

    startFloatingAnimation();

    return () => {
      isMounted.current = false;
      if (animationRef.current) {
        floatAnimation.stop();
      }
    };
  }, [floatAnimation]);

  // Auto-cycle through features with proper cleanup
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isMounted.current) {
        setActiveFeature(prev => (prev + 1) % features.length);
      }
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [features.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationRef.current) {
        floatAnimation.stop();
      }
    };
  }, [floatAnimation]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        mass: 1
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: `${features[i].strength}%`,
      transition: {
        duration: 1.2,
        delay: 0.6 + (i * 0.1),
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="Why Choose Us"
          title="Powerful Features"
          description="Our platform comes packed with features designed to elevate your digital presence and drive results."
        />
        <div className="mt-20 flex flex-col lg:flex-row gap-16">
          {/* Left side: Features list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative group ${index === activeFeature ? 'scale-[1.02]' : 'scale-100'} transform transition-all duration-500`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`p-6 rounded-xl backdrop-blur-md ${index === activeFeature ? 'bg-white/10' : 'bg-white/5'}
                  border border-white/10 transition-all duration-500 hover:border-white/20 cursor-pointer`}>
                  <div className="flex items-start gap-5">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white/90 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                      <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${feature.color}`}
                          custom={index}
                          variants={progressVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Active indicator */}
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-transparent via-white to-transparent"
                  animate={{
                    height: index === activeFeature ? '80%' : '0%',
                    opacity: index === activeFeature ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Right side: 3D interactive graphic */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              ref={imageRef}
              className="relative w-full max-w-lg aspect-square"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* 3D floating element */}
              <motion.div
                style={{
                  rotateX: springRotateX,
                  rotateY: springRotateY,
                  transformPerspective: 1000,
                  transformStyle: "preserve-3d"
                }}
                animate={floatAnimation}
                className="w-full h-full relative"
              >
                {/* Feature spotlight based on active feature */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br shadow-2xl shadow-white/5
                    ${features[activeFeature].color} p-8 flex flex-col items-center justify-center text-white
                    before:absolute before:inset-0 before:bg-black/40 before:z-0`}
                  animate={{
                    rotateZ: [0, 2, 0, -2, 0],
                    scale: [1, 1.01, 1, 0.99, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
                  </div>
                  {/* Image container */}
                  <motion.div
                    className="relative z-10 w-full h-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1, 1.05, 1]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <div className="relative w-4/5 h-4/5 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <img
                        src={features[activeFeature].image}
                        alt={features[activeFeature].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          console.warn('Image failed to load:', features[activeFeature].image);
                          // Fallback to a solid color background
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </motion.div>
                  <motion.h3
                    className="mt-8 text-2xl font-bold text-center relative z-10"
                    animate={{ y: [0, -5, 0, 5, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    {features[activeFeature].title}
                  </motion.h3>
                  <div className="mt-4 w-24 h-1 bg-white/30 rounded-full"></div>
                </motion.div>
                {/* Highlight effect */}
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 blur-sm transition-all duration-1000 opacity-70"></div>
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-white/5 to-transparent blur-md"></div>
                {/* Simplified floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/30"
                    initial={{
                      x: (i % 3) * 100 - 100,
                      y: Math.floor(i / 3) * 100 - 100,
                      opacity: 0.3,
                      scale: 0.5
                    }}
                    animate={{
                      x: [(i % 3) * 100 - 100, (i % 3) * 120 - 120, (i % 3) * 100 - 100],
                      y: [Math.floor(i / 3) * 100 - 100, Math.floor(i / 3) * 120 - 120, Math.floor(i / 3) * 100 - 100],
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 8 + (i * 0.5),
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-900 to-transparent"></div>
      <div className="absolute top-1/4 right-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Features;