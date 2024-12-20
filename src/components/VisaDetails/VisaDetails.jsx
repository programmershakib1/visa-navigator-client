import { useLoaderData } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const VisaDetails = () => {
  const singleVisa = useLoaderData();
  const {
    name,
    photo,
    visa_type,
    processing_time,
    description,
    age_restriction,
    fee,
    validity,
    application_method,
    required_documents,
  } = singleVisa;

  const handleApply = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const applied_date = e.target.applied_date.value;
    const fee = e.target.fee.value;
    const applyData = {
      email,
      first_name,
      last_name,
      applied_date,
      fee,
      name,
      photo,
      visa_type,
      processing_time,
      validity,
      application_method,
    };

    e.target.reset();
    fetch("https://assignment-10-b10-server.vercel.app/appliedVisas", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(applyData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Visa apply successful");
        }
      });
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="shadow-xl rounded-xl p-5 md:p-10 dark:bg-c md:mt-10 mx-5 md:mx-0 lg:mx-40">
      <Helmet>
        <title>VN | Visa Details</title>
      </Helmet>
      <div className="h-60 md:h-96 lg:h-[500px] col-span-3">
        <img className="w-full h-full rounded-xl" src={photo} alt="" />
      </div>
      <div className="col-span-2">
        <h2 className="text-2xl font-black mt-8">{name}</h2>
        <h4 className="text-xl font-semibold">{visa_type}</h4>
        <div className="border border-black dark:border-white mt-5"></div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 md:gap-0 mt-3 md:mt-5">
          <p className="font-semibold">Processing time : {processing_time}</p>
          <p className="font-semibold">Age restriction : {age_restriction}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between md:items-center mt-3 md:mt-5">
          <p className="font-semibold">Fee : $ {fee}</p>
          <p className="font-semibold">Validity : {validity}</p>
        </div>
        <p className="font-semibold mt-3 md:mt-5">
          Application method : {application_method}
        </p>
        <p className="text-p font-semibold py-3">
          <span className="text-black dark:text-white">Description :</span>{" "}
          {description}
        </p>
        <p className="font-semibold">Required documents</p>
        <p className="ml-3">
          {required_documents?.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </p>
        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="bg-primary text-white dark:bg-white dark:text-black py-1 px-4 font-bold my-3 rounded-sm"
        >
          Apply for the visa
        </button>
      </div>
      <dialog id="my_modal_5" className="modal sm:modal-middle">
        <div className="modal-box py-10 dark:bg-neutral-950">
          <form id="applyForm" onSubmit={handleApply}>
            <label>
              <span className="font-semibold">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={auth?.currentUser?.email}
              className="w-full py-1 border border-black dark:bg-c mt-1 mb-2 pl-3"
              required
            />
            <div className="grid md:grid-cols-2 md:gap-5">
              <div>
                <label>
                  <span className="font-semibold">FirstName</span>
                </label>
                <input
                  name="first_name"
                  type="text"
                  placeholder="FirstName"
                  className="w-full py-1 border border-black dark:bg-c mt-1 mb-2 pl-3"
                  required
                />
              </div>
              <div>
                <label>
                  <span className="font-semibold">LastName</span>
                </label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="LastName"
                  className="w-full py-1 border border-black dark:bg-c mt-1 mb-2 pl-3"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-5">
              <div>
                <label>
                  <span className="font-semibold">Applied date</span>
                </label>
                <input
                  name="applied_date"
                  type="text"
                  placeholder="Applied date"
                  defaultValue={formattedDate}
                  className="w-full py-1 border border-black dark:bg-c mt-1 mb-2 pl-3"
                  required
                />
              </div>
              <div>
                <label>
                  <span className="font-semibold">Fee</span>
                </label>
                <input
                  name="fee"
                  type="text"
                  placeholder="Fee"
                  defaultValue={fee}
                  className="w-full py-1 border border-black dark:bg-c mt-1 mb-2 pl-3"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={() => {
                  const form = document.getElementById("applyForm");
                  if (form.checkValidity()) {
                    document.getElementById("my_modal_5").close();
                  }
                }}
                className="bg-primary text-white dark:bg-white dark:text-black py-2 px-6 font-bold rounded-md"
              >
                Apply
              </button>
            </div>
          </form>
          <button
            onClick={() => document.getElementById("my_modal_5").close()}
            className="bg-primary text-white dark:bg-white dark:text-black py-2 px-6 font-bold rounded-md"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default VisaDetails;
