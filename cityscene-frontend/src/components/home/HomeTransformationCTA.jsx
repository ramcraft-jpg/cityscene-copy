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
    <section className="w-full bg-white text-black py-16 px-4 md:px-[10%] flex flex-col md:flex-row items-center justify-center relative min-h-[60vh]">
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-left md:ml-[40px] lg:ml-[80px] space-y-4">
        <span className="text-xs sm:text-sm font-medium tracking-widest text-orange-600 uppercase block">
          {data.badge || defaultTransformationData.badge}
        </span>

        <h2 className="text-3xl md:text-[2.8rem] font-medium text-black leading-tight">
          {data.heading || defaultTransformationData.heading}
        </h2>

        <p className="text-lg md:text-[1.2rem] text-black my-2 font-light">
          {data.subtitle || defaultTransformationData.subtitle}
        </p>

        <div className="pt-2">
          <Link
            to={data.buttonLink || '/contact'}
            className="inline-block px-5 py-2.5 bg-none border border-black text-black font-medium text-base rounded-[20px] hover:bg-black hover:text-white transition-all duration-300"
          >
            {data.buttonText || 'Connect With Us'}
          </Link>
        </div>
      </div>

      {/* Vertical Divider Line */}
      <div className="hidden md:block w-[2px] h-[70%] bg-black mx-4 relative left-[-30px] lg:left-[-60px] shrink-0" />

      {/* Right Content */}
      <div className="w-full md:w-1/2 text-left text-black text-base relative left-0 md:left-[-15px] lg:left-[-30px] max-w-[400px] mt-8 md:mt-0 space-y-4">
        <p className="text-base text-black mb-4 leading-relaxed">
          {data.description || defaultTransformationData.description}
        </p>

        <ul className="space-y-2 font-medium text-black">
          {features.map((feat, idx) => (
            <li key={idx} className="text-base font-semibold text-black">
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
