import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultCompanyData = {
  paragraph1: 'At CityScene Global Private Limited, we understand the challenges businesses face in navigating today’s fast-paced, technology-driven world. Many companies grapple with outdated infrastructure, slow system performance, and the complexity of managing multiple IT solutions—all while trying to keep up with the latest advancements in Automation, AI, and Blockchain. These obstacles can hinder growth, drain resources, and create inefficiencies that disrupt operations.',
  paragraph2: 'We are here to help. At CityScene Global, we specialize in delivering clear, practical, and customized IT solutions, leveraging cutting-edge technologies to empower your business. With more than Ten years of expertise, we have built a reputation as a trusted partner, providing innovative solutions that streamline processes, enhance productivity, and drive business success.',
  image: ''
};

const renderFormattedText = (text) => {
  if (!text) return null;
  const parts = text.split(/(CityScene Global Private Limited|CityScene Global)/g);
  return parts.map((part, index) => {
    if (part === 'CityScene Global Private Limited' || part === 'CityScene Global') {
      return <strong key={index} className="font-bold text-neutral-900">{part}</strong>;
    }
    return part;
  });
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

  const p1 = data.paragraph1 || defaultCompanyData.paragraph1;
  const p2 = data.paragraph2 || defaultCompanyData.paragraph2;

  return (
    <section className="w-full bg-white py-12 px-6 sm:px-[10vw] lg:px-[15vw] relative shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
      <div className="space-y-6 text-[#333] text-[18px] leading-[1.7] text-justify font-normal">
        <p className="break-words">
          {renderFormattedText(p1)}
        </p>
        <p className="break-words">
          {renderFormattedText(p2)}
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
