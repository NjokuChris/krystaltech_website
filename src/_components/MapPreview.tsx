import React from "react";

const MapPreview: React.FC = () => {
  const googleMapLink: string =
    "https://www.google.com/maps/search/?api=1&query=54+Old+Factory+Road+Elelenwo+Port+Harcourt+Rivers+State+Nigeria";

  const embedLink: string =
    "https://www.google.com/maps?q=54+Old+Factory+Road+Elelenwo+Port+Harcourt+Rivers+State+Nigeria&output=embed";

  return (
    <div className="w-[200px] h-[200px] rounded-xl overflow-hidden shadow-md border border-gray-300 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300">
      <a href={googleMapLink} target="_blank" rel="noreferrer">
        <iframe
          src={embedLink}
          width="200"
          height="200"
          loading="lazy"
          allowFullScreen
          className="w-full h-full"
          title="Map preview — 54 Old Factory Road, Elelenwo, Port Harcourt"
        ></iframe>
      </a>
    </div>
  );
};

export default MapPreview;
