import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Zoom } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visaValue, setVisaValue] = useState("");

  useEffect(() => {
    fetch(`https://assignment-10-b10-server.vercel.app/my_visas/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setVisas(data);
        setLoading(false);
      });
    if (visaValue?.required_documents) {
      setRequiredDocuments(visaValue.required_documents);
    }
  }, [user, visaValue]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setRequiredDocuments((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((doc) => doc !== value);
      }
    });
  };

  const handleUpdateVisa = (e) => {
    e.preventDefault();

    const id = visaValue._id;

    const photo = e.target.photo.value;
    const name = e.target.name.value;
    const visa_type = e.target.visa_type.value;
    const processing_time = e.target.processing_time.value;
    const description = e.target.description.value;
    const age_restriction = e.target.age_restriction.value;
    const fee = e.target.fee.value;
    const validity = e.target.validity.value;
    const application_method = e.target.application_method.value;
    const required_documents = requiredDocuments;

    const visaInfo = {
      photo,
      name,
      visa_type,
      processing_time,
      description,
      age_restriction,
      fee,
      validity,
      application_method,
      required_documents,
    };

    fetch(`https://assignment-10-b10-server.vercel.app/visas/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(visaInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire("Visa update successful");
          setVisas((prevVisas) =>
            prevVisas.map((visa) =>
              visa._id === id ? { ...visa, ...visaInfo } : visa
            )
          );
          setRequiredDocuments([]);
          e.target.reset();
          setVisaValue("");
        }
      });
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-10-b10-server.vercel.app/visas/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                icon: "success",
              });
            }
            const remainingVisa = visas.filter((visa) => visa._id !== _id);
            setVisas(remainingVisa);
          });
      }
    });
  };

  return (
    <div className="md:mt-10 mx-5 md:mx-0">
      <Helmet>
        <title>VN | My Added Visas</title>
      </Helmet>
      {loading ? (
        <div className="text-center mt-20">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        ""
      )}
      {!visas.length && !loading && (
        <div className="text-center my-20">
          <div>
            <h2 className="font-semibold mb-3">
              No visas were found for the visa you added. To add a visa, click
              <br />
              on the Add Visa button.
            </h2>
            <Link to="/addVisa">
              <button className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 font-bold rounded-sm">
                Add Visa
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {visas.map((visa, idx) => (
          <div key={idx}>
            <Zoom>
              <div className="shadow-xl rounded-xl p-5 dark:bg-c transition-transform hover:scale-105 hover:shadow-xl">
                <div>
                  <img
                    className="w-full h-52 lg:h-72 md:h-96 rounded-xl"
                    src={visa?.photo}
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 md:items-center mt-8">
                    <h2 className="text-2xl font-black">{visa?.name}</h2>
                    <h4 className="text-xl font-semibold">{visa?.visa_type}</h4>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 md:items-center md:my-5 my-3">
                    <p className="font-semibold">
                      Processing time : {visa?.processing_time}
                    </p>
                    <p className="font-semibold">Fee : $ {visa?.fee}</p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 md:items-center">
                    <p className="font-semibold">validity : {visa?.validity}</p>
                    <p className="font-semibold">
                      Application method : {visa?.application_method}
                    </p>
                  </div>
                  <div className="flex justify-between mt-5">
                    <button
                      onClick={() => {
                        setVisaValue(visa);
                        document.getElementById("my_modal_4").showModal();
                      }}
                      className="bg-primary text-white dark:bg-white dark:text-black py-1 px-4 font-bold rounded-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(visa._id)}
                      className="bg-primary text-white dark:bg-white dark:text-black py-1 px-4 font-bold rounded-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <dialog id="my_modal_4" className="modal">
                  <div className="modal-box w-11/12 max-w-5xl dark:bg-neutral-950">
                    <form onSubmit={handleUpdateVisa} id="applyForm">
                      <div className="md:grid gap-2">
                        <div className="flex flex-col">
                          <label>
                            <span className="font-semibold">Country name</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Country name"
                            defaultValue={visaValue?.name}
                            className="w-full py-2 border border-black dark:bg-c mt-1 mb-2 pl-3"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label>
                            <span className="font-semibold">Country image</span>
                          </label>
                          <input
                            name="photo"
                            type="text"
                            placeholder="Country image"
                            defaultValue={visaValue?.photo}
                            className="w-full py-2 border border-black dark:bg-c mt-1 mb-2 pl-3"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label>
                            <span className="font-semibold">Fee</span>
                          </label>
                          <input
                            type="number"
                            name="fee"
                            placeholder="Fee"
                            defaultValue={visaValue?.fee}
                            className="w-full py-2 border border-black dark:bg-c mt-1 mb-2 pl-3"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label>
                            <span className="font-semibold">
                              Age restriction
                            </span>
                          </label>
                          <input
                            type="number"
                            name="age_restriction"
                            placeholder="Age restriction"
                            defaultValue={visaValue?.age_restriction}
                            className="w-full py-2 border border-black dark:bg-c mt-1 mb-2 pl-3"
                            required
                          />
                        </div>
                        {visaValue.visa_type && (
                          <div className="flex flex-col">
                            <label>
                              <span className="font-semibold">Visa type</span>
                            </label>
                            <select
                              name="visa_type"
                              required
                              defaultValue={visaValue.visa_type}
                              className="w-full py-2 border border-black dark:bg-c mt-1 mb-2 pl-3"
                            >
                              <option value="Tourist visa">Tourist visa</option>
                              <option value="Student visa">Student visa</option>
                              <option value="Official visa">
                                Official visa
                              </option>
                              <option value="Business visa">
                                Business visa
                              </option>
                              <option value="Other visa">Other visa</option>
                            </select>
                          </div>
                        )}
                        {visaValue.processing_time && (
                          <div className="flex flex-col">
                            <label>
                              <span className="font-semibold">
                                Processing time
                              </span>
                            </label>
                            <select
                              name="processing_time"
                              required
                              defaultValue={visaValue.processing_time}
                              className="w-full py-2 border border-black dark:bg-c mt-1 mb-2 pl-3"
                            >
                              <option value="2 Days">2 Days</option>
                              <option value="5 Days">5 Days</option>
                              <option value="10 Days">10 Days</option>
                              <option value="20 Days">20 Days</option>
                              <option value="1 Month">1 Month</option>
                            </select>
                          </div>
                        )}
                        {visaValue.application_method && (
                          <div className="flex flex-col">
                            <label>
                              <span className="font-semibold">
                                Application method
                              </span>
                            </label>
                            <select
                              name="application_method"
                              required
                              defaultValue={visaValue.application_method}
                              className="w-full py-2 border border-black dark:bg-c mt-1 mb-2 pl-3"
                            >
                              <option value="online">Online application</option>
                              <option value="in-person">
                                In person application
                              </option>
                              <option value="on-arrival">
                                Visa on arrival
                              </option>
                              <option value="postal">Postal application</option>
                              <option value="travel-agency">
                                Through travel agency
                              </option>
                            </select>
                          </div>
                        )}

                        {visaValue?.validity && (
                          <div className="flex flex-col">
                            <label>
                              <span className="font-semibold">Validity</span>
                            </label>
                            <select
                              name="validity"
                              required
                              defaultValue={visaValue.validity}
                              className="w-full py-2 border border-black dark:bg-c mt-1 mb-2 pl-3"
                            >
                              <option value="1 Month">1 Month</option>
                              <option value="5 Month">3 Month</option>
                              <option value="1 Year">1 Year</option>
                              <option value="2 Year">2 Year</option>
                              <option value="5 Year">5 Year</option>
                            </select>
                          </div>
                        )}

                        <div className="flex flex-col col-span-2">
                          <label>
                            <span className="font-semibold">Description</span>
                          </label>
                          <textarea
                            type="text"
                            name="description"
                            placeholder="Description"
                            defaultValue={visaValue?.description}
                            className="w-full h-20 py-2 border border-black dark:bg-c mt-1 mb-2 pl-3"
                            required
                          />
                        </div>
                      </div>
                      {visaValue.required_documents && (
                        <div>
                          <label>
                            <span className="font-semibold">
                              Required documents
                            </span>
                          </label>
                          <div className="flex gap-1.5">
                            <span>Valid passport</span>
                            <input
                              type="checkbox"
                              value="Valid passport"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Valid passport"
                              )}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span>Invitation letter</span>
                            <input
                              type="checkbox"
                              value="Invitation Letter"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Invitation Letter"
                              )}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span>Bank statement</span>
                            <input
                              type="checkbox"
                              value="Bank Statement"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Bank Statement"
                              )}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span>Travel insurance</span>
                            <input
                              type="checkbox"
                              value="Travel Insurance"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Travel Insurance"
                              )}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span>Health certificate</span>
                            <input
                              type="checkbox"
                              value="Health Certificate"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Health Certificate"
                              )}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span>Proof of enrollment</span>
                            <input
                              type="checkbox"
                              value="Proof of Enrollment"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Proof of Enrollment"
                              )}
                            />
                          </div>
                          <div className="flex gap-1.5">
                            <span className="flex">Visa application form</span>
                            <input
                              type="checkbox"
                              value="Visa application form"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Visa application form"
                              )}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span>Police clearance certificate</span>
                            <input
                              type="checkbox"
                              value="Police Clearance Certificate"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Police Clearance Certificate"
                              )}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span>Employment verification letter</span>
                            <input
                              type="checkbox"
                              value="Employment Verification Letter"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Employment Verification Letter"
                              )}
                            />
                          </div>
                          <div className="flex gap-1.5">
                            <span className="flex">
                              Recent passport sized photograph
                            </span>
                            <input
                              type="checkbox"
                              value="Recent passport-sized photograph"
                              onChange={handleCheckboxChange}
                              checked={requiredDocuments.includes(
                                "Recent passport-sized photograph"
                              )}
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex justify-center mt-5">
                        <button
                          onClick={() => {
                            const form = document.getElementById("applyForm");
                            if (form.checkValidity()) {
                              document.getElementById("my_modal_4").close();
                            }
                          }}
                          className="bg-primary text-white dark:bg-white dark:text-black py-2 px-6 font-bold rounded-md"
                        >
                          Apply
                        </button>
                      </div>
                    </form>
                    <div className="flex items-center justify-between mt-5">
                      <p className="font-semibold hidden md:block">
                        Note : Please review all information carefully as it
                        will be updated.
                      </p>
                      <p className="block md:hidden font-semibold">
                        Carefully, it will be updated
                      </p>
                      <button
                        onClick={() => {
                          setVisaValue("");
                          document.getElementById("my_modal_4").close();
                        }}
                        className="bg-primary text-white dark:bg-white dark:text-black py-2 px-6 font-bold rounded-md"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </dialog>
              </div>
            </Zoom>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedVisas;
