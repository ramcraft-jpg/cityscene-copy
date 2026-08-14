import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-6 text-left">
      {/* Section Title matching Screenshot 1 */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
        Contact Us
      </h2>

      <div className="space-y-5 text-base sm:text-lg text-gray-800 font-medium pt-2">
        {/* Address */}
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
          <p className="leading-snug text-gray-800">
            Second Floor, S.p Tower, 150, Sirsi Rd, <br />
            Officers Campus Colony, Jaipur, Rajasthan, India
          </p>
        </div>

        {/* Phone 1 */}
        <div className="flex items-center gap-4">
          <Phone className="w-6 h-6 text-gray-900 flex-shrink-0" />
          <a
            href="tel:+917689999377"
            className="text-gray-900 font-bold hover:text-blue-600 transition-colors"
          >
            +91-7689999377
          </a>
        </div>

        {/* Phone 2 */}
        <div className="flex items-center gap-4">
          <Phone className="w-6 h-6 text-gray-900 flex-shrink-0" />
          <a
            href="tel:+971528225509"
            className="text-gray-900 font-bold hover:text-blue-600 transition-colors"
          >
            +971-528225509
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <Mail className="w-6 h-6 text-gray-900 flex-shrink-0" />
          <a
            href="mailto:info@citysceneglobal.com"
            className="text-gray-900 font-bold hover:text-blue-600 transition-colors"
          >
            info@citysceneglobal.com
          </a>
        </div>
      </div>
    </div>
  );
}
