import React from "react";
import LatestTickets from "../../components/Home/LatestTickets";
import AdvertisementSection from "../../components/Home/AdvertisementSection";
import NewsletterCTA from "../../components/Home/NewsletterCTA";

const Home = () => {
  return (
    <>
      <AdvertisementSection />
      <LatestTickets />
      <NewsletterCTA />
    </>
  );
};

export default Home;
