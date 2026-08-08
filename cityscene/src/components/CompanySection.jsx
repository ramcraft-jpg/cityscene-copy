import React from 'react';

export default function CompanySection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 font-normal leading-relaxed text-base sm:text-lg space-y-6">
        {/* Paragraph 1 */}
        <p>
          At <strong className="font-bold text-gray-900">CityScene Global Private Limited</strong>, we understand the challenges businesses face in navigating today's fast-paced, technology-driven world. Many companies grapple with outdated infrastructure, slow system performance, and the complexity of managing multiple IT solutions—all while trying to keep up with the latest advancements in Automation, AI, and Blockchain. These obstacles can hinder growth, drain resources, and create inefficiencies that disrupt operations.
        </p>

        {/* Paragraph 2 */}
        <p>
          We are here to help. At <strong className="font-bold text-gray-900">CityScene Global</strong>, we specialize in delivering clear, practical, and customized IT solutions, leveraging cutting-edge technologies to empower your business. With more than Ten years of expertise, we have built a reputation as a trusted partner, providing innovative solutions that streamline processes, enhance productivity, and drive business success.
        </p>
      </div>
    </section>
  );
}
