import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const Banner = () => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    fetch("slider.json")
      .then((res) => res.json())
      .then((data) => setSlider(data));
  }, []);

  return (
    <div className="mx-5 md:mx-0">
      <Swiper
        className="h-64 lg:h-[600px] md:h-[400px] mx-auto mt-5 md:mt-10 lg:mt-5 rounded-2xl relative"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slider.map((s, idx) => (
          <SwiperSlide key={idx} className="relative">
            <img
              className="w-full h-full object-cover"
              src={s.image}
              alt={s.title}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/20 to-black/80 flex flex-col justify-center text-white p-10">
              <h2 className="text-3xl lg:text-5xl font-bold mb-1 md:mb-5 ml-5">
                {s.title}
              </h2>
              <p className="text-lg lg:text-xl mb-5 ml-5">{s.description}</p>
              <ul className="hidden md:block list-disc list-inside text-md lg:text-lg ml-5">
                {s.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
