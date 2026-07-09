import { useState } from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';

function Home() {
  const [search, setSearch] = useState('');

  return (
    <>
      <Hero />

      <Categories />

      <FeaturedProducts search={search} />

      <HowItWorks />

      <WhyChooseUs />
    </>
  );
}

export default Home;
