import { auth } from "../../firebase/firebase.config";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AddVisa = () => {
  const [requiredDocuments, setRequiredDocuments] = useState([]);

  const email = auth.currentUser.email;

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setRequiredDocuments((prev) => [...prev, value]);
    } else {
      setRequiredDocuments((prev) => prev.filter((doc) => doc !== value));
    }
  };

  const handleAddVisa = (e) => {
    e.preventDefault();

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
      email,
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

    fetch("https://assignment-10-b10-server.vercel.app/visas", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(visaInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          e.target.reset();
          Swal.fire("Visa added successfully");
          setRequiredDocuments([]);
        }
      });
  };

  return (
    <div className="mx-5 md:mx-20 lg:mx-40 mt-0 md:mt-10 lg:mt-0">
      <Helmet>
        <title>VN | Add Visa</title>
      </Helmet>
      <form onSubmit={handleAddVisa}>
        <div className="md:grid md:gap-2">
          <div className="flex flex-col">
            <label>
              <span className="font-semibold">Country name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Country name"
              className="w-full py-2 border border-black mt-1 mb-2 pl-3 dark:bg-c"
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
              className="w-full py-2 border border-black mt-1 mb-2 pl-3 dark:bg-c"
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
              className="w-full py-2 border border-black mt-1 mb-2 pl-3 dark:bg-c"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>
              <span className="font-semibold">Age restriction</span>
            </label>
            <input
              type="number"
              name="age_restriction"
              placeholder="Age restriction"
              className="w-full py-2 border border-black mt-1 mb-2 pl-3 dark:bg-c"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>
              <span className="font-semibold">Visa type</span>
            </label>
            <select
              name="visa_type"
              required
              defaultValue={""}
              className="w-full py-2 border border-black mt-1 mb-2 pl-3 dark:bg-c"
            >
              <option value={""} disabled>
                Please Select
              </option>
              <option value="Tourist visa">Tourist visa</option>
              <option value="Student visa">Student visa</option>
              <option value="Official visa">Official visa</option>
              <option value="Business visa">Business visa</option>
              <option value="Other visa">Other visa</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>
              <span className="font-semibold">Processing time</span>
            </label>
            <select
              name="processing_time"
              required
              defaultValue={""}
              className="w-full py-2 border border-black mt-1 mb-2 pl-3 dark:bg-c"
            >
              <option value={""} disabled>
                Please Select
              </option>
              <option value="2 Days">2 Days</option>
              <option value="5 Days">5 Days</option>
              <option value="10 Days">10 Days</option>
              <option value="20 Days">20 Days</option>
              <option value="1 Month">1 Month</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>
              <span className="font-semibold">Application method</span>
            </label>
            <select
              name="application_method"
              required
              defaultValue={""}
              className="w-full py-2 border border-black mt-1 mb-2 pl-3 dark:bg-c"
            >
              <option value={""} disabled>
                Please Select
              </option>
              <option value="online">Online application</option>
              <option value="in-person">In person application</option>
              <option value="on-arrival">Visa on arrival</option>
              <option value="postal">Postal application</option>
              <option value="travel-agency">Through travel agency</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>
              <span className="font-semibold">Validity</span>
            </label>
            <select
              name="validity"
              required
              defaultValue={""}
              className="w-full py-2 border border-black mt-1 mb-2 pl-3 dark:bg-c"
            >
              <option value={""} disabled>
                Please Select
              </option>
              <option value="1 Month">1 Month</option>
              <option value="5 Month">3 Month</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="5 Year">5 Year</option>
            </select>
          </div>

          <div className="flex flex-col col-span-2">
            <label>
              <span className="font-semibold">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="w-full h-28 border border-black mt-1 mb-2 pl-3 pt-2 dark:bg-c"
              required
            ></textarea>
          </div>
        </div>
        <div>
          <label>
            <span className="font-semibold">Required documents</span>
          </label>
          <div className="flex gap-2">
            <span>Valid passport</span>
            <input
              type="checkbox"
              value="Valid passport"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex gap-2">
            <span>Invitation letter</span>
            <input
              type="checkbox"
              value="Invitation Letter"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex gap-2">
            <span>Bank statement</span>
            <input
              type="checkbox"
              value="Bank Statement"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex gap-2">
            <span>Travel insurance</span>
            <input
              type="checkbox"
              value="Travel Insurance"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex gap-2">
            <span>Health certificate</span>
            <input
              type="checkbox"
              value="Health Certificate"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex gap-2">
            <span>Proof of enrollment</span>
            <input
              type="checkbox"
              value="Proof of Enrollment"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex gap-2">
            <span>Visa application form</span>
            <input
              type="checkbox"
              value="Visa application form"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex gap-2">
            <span>Police clearance certificate</span>
            <input
              type="checkbox"
              value="Police Clearance Certificate"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex gap-2">
            <span>Employment verification letter</span>
            <input
              type="checkbox"
              value="Employment Verification Letter"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex gap-2">
            <span>Recent passport sized photograph</span>
            <input
              type="checkbox"
              value="Recent passport-sized photograph"
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <button className="bg-primary text-white dark:bg-white dark:text-black mt-5 py-2 px-10 font-bold">
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default AddVisa;
