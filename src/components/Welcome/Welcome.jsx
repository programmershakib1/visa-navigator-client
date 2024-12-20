import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Tooltip } from "react-tooltip";
const Welcome = () => {
  return (
    <div className="text-center mt-10 mb-20 mx-5 lg:mx-48">
      <h2 className="text-5xl font-black font-mono min-h-36 md:min-h-28 lg:min-h-20">
        <Typewriter
          words={[
            "Welcome to Visa Navigator",
            "Explore new horizons",
            "Plan your journey today",
          ]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>
      <div className="text-center space-y-4"></div>
      <p className="text-p font-semibold">
        Are you dreaming of exploring new places, experiencing vibrant cultures,
        or reuniting with loved ones? Visa Navigator is here to make your travel
        seamless and stress-free. We simplify the visa application process, so
        you can focus on your journey. With our user-friendly platform, you can
        apply for a visa, upload documents, and track your progress in real
        time. Our dedicated team is always ready to assist, ensuring a smooth
        and efficient experience. Start your application today and turn your
        travel dreams into reality!
      </p>
      <button
        data-tooltip-id="tooltip"
        data-tooltip-content="Click here to Started"
        className="bg-primary text-xl text-white dark:bg-white dark:text-black font-black py-2 mt-5 rounded-sm font-sora"
      >
        <Link to="allVisas" className="px-8">
          GET STARTED
        </Link>
      </button>
      <Tooltip id="tooltip" place="top" type="dark" effect="float" />
    </div>
  );
};

export default Welcome;
