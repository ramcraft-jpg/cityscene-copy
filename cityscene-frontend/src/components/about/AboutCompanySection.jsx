import React from 'react';
import { challengesList, challengesImpact, solutionsList } from '../../data/aboutData';
import { AlertCircle, CheckCircle2, Award } from 'lucide-react';

export default function AboutCompanySection() {
  return (
    <section className="w-full bg-white py-12 md:py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-6 text-gray-700 text-base md:text-lg leading-relaxed font-normal">
        <p>
          At <strong className="font-semibold text-gray-900">CityScene Global Private Limited</strong>, we understand the challenges businesses face in navigating today’s fast-paced, technology-driven world. Many companies grapple with outdated infrastructure, slow system performance, and the complexity of managing multiple IT solutions—all while trying to keep up with the latest advancements in Automation, AI, and Blockchain. These obstacles can hinder growth, drain resources, and create inefficiencies that disrupt operations.
        </p>
        <br />
        <p>
          We are here to help. <strong className="font-semibold text-gray-900">At CityScene Global</strong>, we specialize in delivering clear, practical, and customized IT solutions, leveraging cutting-edge technologies to empower your business. With more than Ten years of expertise, we have built a reputation as a trusted partner, providing innovative solutions that streamline processes, enhance productivity, and drive business success.
        </p>
      </div>
    </section>
  );
}
