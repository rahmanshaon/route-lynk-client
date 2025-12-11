import React from "react";
import LatestTickets from "../../components/Home/LatestTickets";
import AdvertisementSection from "../../components/Home/AdvertisementSection";
import NewsletterCTA from "../../components/Home/NewsletterCTA";
import Banner from "../../components/Home/Banner";

const Home = () => {
  return (
    <>
      <Banner />
      <AdvertisementSection />
      <LatestTickets />
      <NewsletterCTA />
    </>
  );
};

export default Home;
