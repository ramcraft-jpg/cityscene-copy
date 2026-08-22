import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const defaultTransformationData = {
  badge: 'Digital Leadership',
  heading: 'Transformation starts here',
  subtitle: 'Reimagine your future.',
  description: 'Be part of an innovative team driving AI, Blockchain, and Smart City solutions. Work on global projects, grow with cutting-edge training, and shape the future of digital transformation.',
  features: [
    'Exciting global opportunities',
    'AI & smart tech innovation',
    'Career growth & learning.'
  ],
  buttonText: 'Connect With Us',
  buttonLink: '/contact'
};

export default function HomeTransformationCTA() {
  const [data, setData] = useState(defaultTransformationData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/transformation')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeTransformation API data:', err));
  }, []);

  const features = data.features && data.features.length > 0 ? data.features : defaultTransformationData.features;

  return (
    <section className="w-full bg-white text-gray-900 py-8 sm:py-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          
          {/* Left Column */}
          <div className="md:col-span-5 text-left space-y-4">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-600 uppercase block">
              {data.badge || defaultTransformationData.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              {data.heading || defaultTransformationData.heading}
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 font-light">
              {data.subtitle || defaultTransformationData.subtitle}
            </p>

            <div className="pt-2">
              <Link
                to={data.buttonLink || '/contact'}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                {data.buttonText || 'Connect With Us'}
              </Link>
            </div>
          </div>

          {/* Vertical Line Divider */}
          <div className="hidden md:block md:col-span-1 flex justify-center">
            <div className="w-[2px] h-44 bg-gray-900/80 mx-auto" />
          </div>

          {/* Right Column */}
          <div className="md:col-span-6 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {data.description || defaultTransformationData.description}
            </p>

            <ul className="space-y-3 font-medium text-gray-900 pt-2">
              {features.map((feat, idx) => (
                <li key={idx} className="text-base sm:text-lg font-semibold text-gray-900">
                  {feat}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
