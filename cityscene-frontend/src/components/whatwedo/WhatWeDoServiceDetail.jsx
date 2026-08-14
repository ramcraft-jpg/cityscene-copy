import React from 'react';
import WhatWeDoDetailHero from './WhatWeDoDetailHero';
import WhatWeDoDetailIntro from './WhatWeDoDetailIntro';
import WhatWeDoDetailWhyChooseUs from './WhatWeDoDetailWhyChooseUs';
import WhatWeDoDetailExpertise from './WhatWeDoDetailExpertise';
import WhatWeDoDetailProcess from './WhatWeDoDetailProcess';
import WhatWeDoDetailFaq from './WhatWeDoDetailFaq';

export default function WhatWeDoServiceDetail({ service }) {
  if (!service) return null;

  return (
    <>
      <WhatWeDoDetailHero service={service} />
      <WhatWeDoDetailIntro service={service} />
      <WhatWeDoDetailWhyChooseUs service={service} />
      <WhatWeDoDetailExpertise service={service} />
      <WhatWeDoDetailProcess service={service} />
      <WhatWeDoDetailFaq service={service} />
    </>
  );
}
