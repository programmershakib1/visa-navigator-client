import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";
import video4 from "../../assets/video4.mp4";
import video5 from "../../assets/video5.mp4";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FavoritePlace = () => {
  const { animationValue } = useContext(AuthContext);

  const videos = [
    {
      src: video1,
      title: "Cloud City, Ireland",
    },
    {
      src: video2,
      title: "Greenland, the green city",
    },
    {
      src: video3,
      title: "Magical city, Switzerland",
    },
    {
      src: video4,
      title: "Green mountains, Italy",
    },
    {
      src: video5,
      title: "Jungle city, Brazil",
    },
  ];

  return (
    <div className="mx-5 md:mx-0 lg:my-32 my-20">
      <motion.h2
        {...animationValue}
        className="text-center mb-5 text-4xl font-bold"
      >
        Some of the user&apos;s favorite places
      </motion.h2>
      <motion.p
        {...animationValue}
        className="text-center text-p font-semibold mb-10"
      >
        Take a journey through some of the most stunning destinations that
        travelers adore. These places are filled with beauty, adventure, and
        unforgettable moments waiting to be <br /> explored. Watch the videos
        and let them inspire your next getaway!
      </motion.p>
      <div className="lg:flex gap-10">
        <Swiper
          className="lg:w-1/2 h-64 lg:h-[550px] md:h-[400px] rounded-2xl"
          modules={[A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
        >
          {videos.map((video, idx) => (
            <SwiperSlide key={idx} className="relative">
              <motion.video
                {...animationValue}
                className="w-full h-full object-cover rounded-xl"
                src={video.src}
                muted
                autoPlay
                loop
                playsInline
              >
                Your browser does not support the video tag.
              </motion.video>
              <div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-60 p-4 mx-5 rounded-lg">
                <h2 className="text-xl md:text-2xl font-bold">{video.title}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="lg:w-1/2 mt-10 lg:mt-0 lg:text-center lg:flex lg:flex-col lg:justify-center lg:items-center">
          <motion.h2 {...animationValue} className="text-2xl font-bold mb-5">
            Explore the Beauty of Favorite Destinations
          </motion.h2>
          <motion.p {...animationValue}>
            Discover the breathtaking charm of some of the most beloved
            destinations around the globe. From serene mountain escapes to
            vibrant coastal cities, these handpicked locations showcase the
            natural and cultural wonders that captivate travelers&apos; hearts.
            Watch the enchanting videos that transport you to these picturesque
            spots and let the beauty of these places inspire your next
            adventure. Whether you&apos;re seeking tranquility, adventure, or
            unforgettable moments, these destinations have something special to
            offer. Let the journey begin here!
          </motion.p>
          <Link to="allVisas">
            <motion.button
              {...animationValue}
              className="bg-black text-white dark:bg-white dark:text-black font-bold py-2 px-6 mt-5"
            >
              Apply now
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoritePlace;
