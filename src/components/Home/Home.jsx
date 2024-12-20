import { Link, useLoaderData } from "react-router-dom";
import Banner from "../Bannar/Bannar";
import LatestVisas from "../LatestVisas/LatestVisas";
import Welcome from "../Welcome/Welcome";
import Contact from "../Contact/Contact";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import FavoritePlace from "../FavoritePlace/FavoritePlace";
import WorldMapSection from "../WorldMapSection/WorldMapSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { animationValue } = useContext(AuthContext);
  const allVisas = useLoaderData();

  return (
    <div>
      <Helmet>
        <title>VISA NAVIGATOR</title>
      </Helmet>
      <Banner></Banner>
      <Welcome></Welcome>
      <div className="mx-5 md:mx-0">
        <motion.h2
          {...animationValue}
          className="text-center text-3xl font-bold"
        >
          Latest Visas
        </motion.h2>
        <motion.p
          {...animationValue}
          className="text-p font-semibold text-center py-5"
        >
          The Our Latest Visas section highlights the newest visa options added
          to the platform. It provides essential details at a glance, like
          country, visa type, <br /> and fees, along with easy navigation for
          further details or exploring all visas.
        </motion.p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {allVisas.map((visa, idx) => (
            <LatestVisas key={idx} visa={visa}></LatestVisas>
          ))}
        </div>
        <motion.button {...animationValue} className="mt-10 mx-5 md:mx-0">
          <Link
            to="/allVisas"
            className="bg-primary text-white dark:bg-white dark:text-black font-bold rounded-sm py-2 px-10"
          >
            See all visas
          </Link>
        </motion.button>
      </div>
      <FavoritePlace></FavoritePlace>
      <WorldMapSection></WorldMapSection>
      <Contact></Contact>
    </div>
  );
};

export default Home;
