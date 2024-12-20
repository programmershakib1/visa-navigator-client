import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { motion } from "framer-motion";

const LatestVisas = ({ visa }) => {
  const { animationValue } = useContext(AuthContext);
  const {
    _id,
    name,
    photo,
    visa_type,
    processing_time,
    fee,
    validity,
    application_method,
  } = visa;

  return (
    <motion.div
      {...animationValue}
      className="shadow-xl rounded-xl p-5 dark:bg-c"
    >
      <div>
        <img
          className="w-full h-52 md:h-96 lg:h-72 rounded-xl"
          src={photo}
          alt=""
        />
      </div>
      <div>
        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:items-center mt-8">
          <h2 className="text-2xl font-black">{name}</h2>
          <h4 className="text-xl font-semibold">{visa_type}</h4>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between md:items-center mt-3 mb-2">
          <p className="font-semibold">Processing time : {processing_time}</p>
          <p className="font-semibold">Fee : $ {fee}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between md:items-center mb-5">
          <p className="font-semibold">Validity : {validity}</p>
          <p className="font-semibold">
            Application method : {application_method}
          </p>
        </div>
        <Link
          to={`/visaDetails/${_id}`}
          className="bg-primary text-white dark:bg-white dark:text-black py-1 px-4 font-bold my-3 rounded-sm"
        >
          See Details
        </Link>
      </div>
    </motion.div>
  );
};

LatestVisas.propTypes = {
  visa: PropTypes.object,
};

export default LatestVisas;
