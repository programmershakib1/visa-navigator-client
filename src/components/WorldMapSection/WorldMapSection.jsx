import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";

const WorldMapSection = () => {
  const { animationValue } = useContext(AuthContext);

  return (
    <div className="mx-5 md:mx-0">
      <div className="w-full h-60 md:h-96 lg:h-[600px]">
        <motion.h2
          {...animationValue}
          className="text-center text-4xl font-bold mb-5"
        >
          Explore your destination
        </motion.h2>
        <motion.p
          {...animationValue}
          className="text-center text-p font-semibold mb-6 md:mb-16 lg:mx-40"
        >
          Embark on a journey to discover the world&apos;s most captivating
          locations with our interactive map. Whether you&apos;re dreaming of
          serene beaches, bustling cities, or tranquil mountain retreats, this
          section lets you visualize your next adventure. Use the plus and minus
          buttons to zoom in and out, explore hidden gems, and plan your travels
          with ease. Your next unforgettable destination is just a click away!
        </motion.p>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={false}
          fullscreenControl={true}
          attributionControl={false}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default WorldMapSection;
