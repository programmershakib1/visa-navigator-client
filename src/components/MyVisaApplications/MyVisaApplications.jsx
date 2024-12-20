import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Zoom } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyVisaApplications = () => {
  const { user } = useContext(AuthContext);
  const [appliedVisa, setAppliedVisa] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const searchParam = searchValue.trim();
    fetch(
      `https://assignment-10-b10-server.vercel.app/appliedVisas/${user?.email}?search=${searchParam}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAppliedVisa(data);
        setFilteredVisas(data);
        setLoading(false);
      });
  }, [user, searchValue]);

  const handleCancel = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-b10-server.vercel.app/appliedVisas/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Canceled!",
                icon: "success",
              });
            }
            const remainingVisa = appliedVisa.filter(
              (visa) => visa._id !== _id
            );
            setAppliedVisa(remainingVisa);
            setFilteredVisas(remainingVisa);
          });
      }
    });
  };

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();
    setSearchValue(trimmedValue);
  };

  return (
    <div className="mx-5 md:mx-0 mt-0 md:mt-10 lg:mt-0">
      <Helmet>
        <title>VN | My Visa Applications</title>
      </Helmet>
      <div className="text-center mb-10 flex gap-3 justify-center mx-5">
        <input
          type="text"
          placeholder="Search by country name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border w-full md:w-1/2 lg:w-1/3 border-black px-4 py-2 rounded-sm dark:bg-c"
        />
        <button
          onClick={handleSearch}
          className="bg-primary border border-black text-white dark:bg-white dark:text-black py-2 px-6 font-bold rounded-sm"
        >
          Search
        </button>
      </div>
      {!appliedVisa.length && !loading && (
        <div className="text-center my-20">
          <div>
            <h2 className="font-semibold mb-3">
              No visas were found for your application, To add a visa, click on
              the All <br /> Visas button and see the next steps.
            </h2>
            <Link to="/allVisas">
              <button className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 font-bold rounded-sm">
                All Visas
              </button>
            </Link>
          </div>
        </div>
      )}
      {loading ? (
        <div className="text-center mt-16">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        ""
      )}
      <div className="grid lg:grid-cols-3 gap-5">
        {filteredVisas.map((visa, idx) => (
          <div key={idx}>
            <Zoom>
              <div className="shadow-xl rounded-xl p-5 dark:bg-c transition-transform hover:scale-105 hover:shadow-xl">
                <div>
                  <img
                    className="w-full lg:h-72 md:h-96 rounded-xl"
                    src={visa?.photo}
                    alt=""
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 justify-between mt-8">
                  <div className="flex gap-1 text-2xl font-bold">
                    <h2>{visa?.first_name}</h2>
                    <h2>{visa?.last_name}</h2>
                  </div>
                  <div>
                    <h5>{visa?.email}</h5>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 md:items-center mt-5">
                    <h2 className="text-2xl font-black">{visa?.name}</h2>
                    <h4 className="text-xl font-semibold">{visa?.visa_type}</h4>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:items-center my-2">
                    <p className="font-semibold">
                      Processing time : {visa?.processing_time}
                    </p>
                    <p className="font-semibold">Fee : $ {visa?.fee}</p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:items-center">
                    <p className="font-semibold">Validity : {visa?.validity}</p>
                    <p className="font-semibold">
                      Application method : {visa?.application_method}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold mt-2">
                      Applied date : {visa?.applied_date}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCancel(visa?._id)}
                    className="bg-primary text-white dark:bg-white dark:text-black py-1 px-4 font-bold mt-5 rounded-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Zoom>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVisaApplications;
