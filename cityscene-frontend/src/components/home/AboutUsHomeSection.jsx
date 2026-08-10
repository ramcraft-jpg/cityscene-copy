import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUsHomeSection() {
  return (
    <section className="w-full bg-[#222222] text-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-2 border-white pl-6 sm:pl-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Us
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            <p>
              At CityScene Global Private Limited, we are committed to transforming urban landscapes with cutting-edge technology and sustainable solutions. In an era where businesses face challenges such as outdated infrastructure, slow system performance, and complex IT management, we provide future-ready solutions that drive efficiency, security, and innovation.
            </p>
            <p>
              We specialize in Automation, Artificial Intelligence (AI), Blockchain, Smart City Solutions, and Digital Infrastructure, enabling businesses and governments to navigate the fast-paced digital world seamlessly. Our expertise ensures the integration of intelligent, scalable, and efficient systems tailored to your needs. Whether it's modernizing IT systems, securing digital assets, deploying cloud solutions, or enhancing smart city infrastructure, CityScene Global is your trusted partner in driving technological transformation. With a strong focus on innovation, security, and efficiency, we empower businesses and communities to thrive in the digital age.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white text-white font-semibold text-sm hover:bg-white hover:text-gray-900 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
