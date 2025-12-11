import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Banner.css";

const Banner = () => {
  const slideData = [
    {
      title: "Book Your Journey",
      highlightedText: "Instantly",
      highlightColor: "text-blue-400",
      text: "Experience the fastest way to secure Bus, Train, Launch, and Flight tickets from the comfort of your home.",
      btnText: "Book Now",
      btnColor: "bg-blue-600 hover:bg-blue-700",
      bg: "https://i.ibb.co.com/xtTVYyQr/route-slide1.jpg",
    },
    {
      title: "Explore Scenic",
      highlightedText: "Routes",
      highlightColor: "text-green-400",
      text: "Discover new destinations and enjoy the journey. Connect with top-rated operators across the country.",
      btnText: "View Routes",
      btnColor: "bg-green-600 hover:bg-green-700",
      bg: "https://i.ibb.co.com/fddbw6dP/route-slide2.jpg",
    },
    {
      title: "Travel with",
      highlightedText: "Confidence",
      highlightColor: "text-cyan-400",
      text: "Secure payments, verified schedules, and 24/7 support. Your safe travel is our top priority.",
      btnText: "Learn More",
      btnColor: "bg-cyan-600 hover:bg-cyan-700",
      bg: "https://i.ibb.co.com/x860qPNg/route-slide3.jpg",
    },
  ];

  return (
    <div>
      <Swiper
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper shadow-2xl"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero min-h-[70vh] text-white"
              style={{
                backgroundImage: `url(${slide.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="hero-overlay bg-black/60"></div>
              <div className="hero-content text-center">
                <div className="max-w-lg md:max-w-3xl">
                  {/* Title with highlighted part */}
                  <h1 className="mb-5 text-4xl font-bold lg:text-6xl leading-tight">
                    {slide.title}{" "}
                    <span className={slide.highlightColor}>
                      {slide.highlightedText}
                    </span>
                  </h1>

                  {/* Description text */}
                  <p className="mb-5 text-base md:text-lg opacity-90">
                    {slide.text}
                  </p>

                  {/* Button with dynamic color */}
                  <button
                    className={`btn ${slide.btnColor} border-none text-white px-8 rounded-full font-bold shadow-lg`}
                  >
                    {slide.btnText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
