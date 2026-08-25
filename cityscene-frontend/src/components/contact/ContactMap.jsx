import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const defaultMap = {
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.513233887208!2d75.72754637604473!3d26.9189874591522!2m3!1f00!2f00!3f00!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db350106fffff%3A0x8670fa929d91fbd0!2sSirsi%20Rd%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  directMapLink: 'https://maps.google.com/?q=S.P+Tower,+Sirsi+Rd,+Jaipur,+Rajasthan',
  buttonText: 'Open in Maps'
};

export default function ContactMap() {
  const [data, setData] = useState(defaultMap);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/contact-map')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.mapEmbedUrl) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching ContactMap API data:', err));
  }, []);

  const mapUrl = data.mapEmbedUrl || defaultMap.mapEmbedUrl;
  const directMapLink = data.directMapLink || defaultMap.directMapLink;
  const buttonText = data.buttonText || defaultMap.buttonText;

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
      {/* "Open in Maps" Overlay Button matching Screenshot 1 */}
      <a
        href={directMapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-blue-600 font-medium text-xs rounded-md shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <span>{buttonText}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>

      {/* Google Map iframe */}
      <iframe
        title="CityScene Global Office Location"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      />
    </div>
  );
}
