import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

const VisaCard = ({ visa }) => {
  const { _id, name, photo, visa_type, fee } = visa;

  return (
    <Zoom>
      <div className="text-center flex flex-col justify-center items-center gap-5 shadow-xl rounded-xl py-8 px-5 dark:bg-c transition-transform hover:scale-105 hover:shadow-xl">
        <div>
          <img className="w-40 h-40 rounded-full" src={photo} alt="" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <h4 className="text-xl font-semibold">{visa_type}</h4>
          <p className="font-semibold mb-5">$ {fee}</p>
          <Link
            to={`/visaDetails/${_id}`}
            className="bg-primary text-white dark:bg-white dark:text-black py-1 px-4 font-bold my-3 rounded-sm"
          >
            See Details
          </Link>
        </div>
      </div>
    </Zoom>
  );
};

VisaCard.propTypes = {
  visa: PropTypes.object,
};

export default VisaCard;
