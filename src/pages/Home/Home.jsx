import React from "react";
import LatestTickets from "../../components/Home/LatestTickets";
import AdvertisementSection from "../../components/Home/AdvertisementSection";
import NewsletterCTA from "../../components/Home/NewsletterCTA";
import Banner from "../../components/Home/Banner";
import PopularRoutes from "../../components/Home/PopularRoutes";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <>
      <Banner />
      <PopularRoutes />
      <AdvertisementSection />
      <LatestTickets />
      <WhyChooseUs />
      <NewsletterCTA />
    </>
  );
};

export default Home;
