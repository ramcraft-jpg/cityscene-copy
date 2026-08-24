import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultCompanyData = {
  paragraph1: 'At CityScene Global Private Limited, we understand the challenges businesses face in navigating today’s fast-paced, technology-driven world. Many companies grapple with outdated infrastructure, slow system performance, and the complexity of managing multiple IT solutions—all while trying to keep up with the latest advancements in Automation, AI, and Blockchain. These obstacles can hinder growth, drain resources, and create inefficiencies that disrupt operations.',
  paragraph2: 'We are here to help. At CityScene Global, we specialize in delivering clear, practical, and customized IT solutions, leveraging cutting-edge technologies to empower your business. With more than Ten years of expertise, we have built a reputation as a trusted partner, providing innovative solutions that streamline processes, enhance productivity, and drive business success.',
  image: ''
};

export default function AboutCompanySection() {
  const [data, setData] = useState(defaultCompanyData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/about-company')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && (resData.content.paragraph1 || resData.content.paragraph2)) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching AboutCompanySection API data:', err));
  }, []);

  return (
    <section className="w-full bg-white py-12 md:py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-6 text-gray-700 text-base md:text-lg leading-relaxed font-normal">
        <p>
          {data.paragraph1 || defaultCompanyData.paragraph1}
        </p>
        <br />
        <p>
          {data.paragraph2 || defaultCompanyData.paragraph2}
        </p>
        {data.image && (
          <div className="mt-8 flex justify-center">
            <img src={getMediaUrl(data.image)} alt="Company section visual" className="rounded-2xl max-h-[400px] object-cover shadow-md" />
          </div>
        )}
      </div>
    </section>
  );
}
