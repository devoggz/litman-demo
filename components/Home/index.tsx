import Newsletter from "../Common/Newsletter";

import Categories from "./Categories";
import Hero from "./Hero";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";

import BestSeller from "@/components/Home/BestSeller";

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrival />
      <PromoBanner />
      <BestSeller />
      <Newsletter />
    </main>
  );
};

export default Home;
