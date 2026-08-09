import React from 'react';
import { challengesList, challengesImpact, solutionsList } from '../data/aboutData';
import { AlertCircle, CheckCircle2, Award } from 'lucide-react';

export default function CompanySection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">


          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Navigating the Fast-Paced Technology World
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                At <span className="font-semibold text-gray-900">CityScene Global Private Limited</span>, we understand the challenges businesses face in navigating today's fast-paced, technology-driven world.
              </p>
            </div>

            {/* Challenges & Impacts Box */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="text-amber-500 shrink-0" size={20} />
                Common Enterprise Challenges
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Many companies struggle with outdated infrastructure, slow system performance, managing multiple IT solutions, and keeping up with Automation, Artificial Intelligence, and Blockchain.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {challengesList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Unaddressed, these issues can:
                </p>
                <div className="flex flex-wrap gap-2">
                  {challengesImpact.map((impact, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 bg-red-50 text-red-700 rounded-md text-xs font-medium border border-red-100"
                    >
                      {impact}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CityScene Global Solution */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600 shrink-0 mt-1">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    10+ Years of Engineering & Consulting Expertise
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    CityScene Global specializes in practical IT solutions, customized technology strategies, Automation, Artificial Intelligence, and Blockchain development. With over ten years of industry expertise, we deliver solutions engineered to streamline processes, enhance productivity, and support sustainable business success.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
                  alt="CityScene Global tech team collaborating"
                  className="w-full h-auto max-h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-block px-3 py-1 bg-orange-500 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
                    Empowering Innovation
                  </div>
                  <p className="text-sm font-medium text-white/90">
                    Transforming complex enterprise hurdles into seamless digital advantages.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
