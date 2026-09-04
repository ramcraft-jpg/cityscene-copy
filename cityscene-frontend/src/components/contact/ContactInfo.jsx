import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { flashApiFetch } from '../../config/api';

const defaultDetails = {
  title: 'Contact Us',
  address: 'Second Floor, S.p Tower, 150, Sirsi Rd,\nOfficers Campus Colony, Jaipur, Rajasthan, India',
  phone1: '+91-7689999377',
  phone2: '+971-528225509',
  email: 'info@citysceneglobal.com'
};

export default function ContactInfo() {
  const [data, setData] = useState(defaultDetails);

  useEffect(() => {
    flashApiFetch('/home-content/contact-details')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.address) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching ContactInfo API data:', err));
  }, []);

  return (
    <div className="space-y-6 text-left">
      {/* Section Title matching Screenshot 1 */}
      <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 tracking-tight">
        {data.title || defaultDetails.title}
      </h2>

      <div className="space-y-5 text-base sm:text-lg text-gray-800 font-normal pt-2">
        {/* Address */}
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
          <p className="leading-snug text-gray-800 font-normal whitespace-pre-line">
            {data.address || defaultDetails.address}
          </p>
        </div>

        {/* Phone 1 */}
        {data.phone1 && (
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-gray-900 flex-shrink-0" />
            <a
              href={`tel:${data.phone1.replace(/[^0-9+]/g, '')}`}
              className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
            >
              {data.phone1}
            </a>
          </div>
        )}

        {/* Phone 2 */}
        {data.phone2 && (
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-gray-900 flex-shrink-0" />
            <a
              href={`tel:${data.phone2.replace(/[^0-9+]/g, '')}`}
              className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
            >
              {data.phone2}
            </a>
          </div>
        )}

        {/* Email */}
        {data.email && (
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-gray-900 flex-shrink-0" />
            <a
              href={`mailto:${data.email}`}
              className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
            >
              {data.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
