import guarantees from "../../assets/guarantees.png";
import convenient from "../../assets/convenient.png";
import service from "../../assets/service.png";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Contact = () => {
  const { animationValue } = useContext(AuthContext);

  const handleQuestions = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const registration_number = e.target.registration_number.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const question = e.target.question.value;

    const questionInfo = { name, registration_number, phone, email, question };

    fetch("https://assignment-10-b10-server.vercel.app/users/question", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(questionInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          e.target.reset();
          toast.success("Question submit successful");
        }
      });
  };

  return (
    <div className="mx-5 md:mx-0 mt-[420px] md:mt-72">
      <motion.h2
        {...animationValue}
        className="text-center font-bold text-4xl mb-5"
      >
        Why contact Visa Navigator
      </motion.h2>
      <motion.p
        {...animationValue}
        className="mx-0 lg:mx-40 text-p font-semibold mb-10 text-center"
      >
        When it comes to navigating the complexities of visa applications, Visa
        Navigator stands out as your trusted partner. We combine expertise,
        convenience, and exceptional service to make your visa journey smooth
        and stress-free. Whether you&apos;re planning to explore new
        destinations, reconnect with loved ones, or <br /> advance your career,
        Visa Navigator simplifies every step of the process.
      </motion.p>
      <div className="grid md:grid-cols-3 gap-5 text-center">
        <motion.div {...animationValue}>
          <img className="mx-auto" src={guarantees} alt="" />
          <h4 className="font-bold text-xl my-2">Guarantees</h4>
          <p>We are liable for the quality of services under the contract</p>
        </motion.div>
        <motion.div {...animationValue}>
          <img className="mx-auto" src={convenient} alt="" />
          <h4 className="font-bold text-xl my-2">Convenient application</h4>
          <p>
            With our visa application service you can get your visa in a couple
            of clicks
          </p>
        </motion.div>
        <motion.div {...animationValue}>
          <img className="mx-auto" src={service} alt="" />
          <h4 className="font-bold text-xl my-2">High-quality service</h4>
          <p>
            Visa delivery by courier service, online registration and any form
            of payment
          </p>
        </motion.div>
      </div>
      <motion.div {...animationValue} className="mt-20 text-center">
        <h2 className="font-bold text-lg">
          Have questions about your visa application?
        </h2>
        <p className="text-p font-semibold mb-10">
          Send us your question and we will try to answer you quickly.
        </p>
      </motion.div>
      <motion.form
        onSubmit={handleQuestions}
        className="lg:mx-40"
        {...animationValue}
      >
        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-5">
          <div className="w-full">
            <span className="font-semibold text-left">Name</span>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full py-1 border border-black mt-1 mb-2 pl-3  dark:bg-c"
              required
            />
          </div>
          <div className="w-full">
            <span className="font-semibold">Registration number</span>
            <input
              name="registration_number"
              type="number"
              placeholder="Registration number (if available)"
              className="w-full py-1 border border-black mt-1 mb-2 pl-3  dark:bg-c"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-5">
          <div className="w-full">
            <span className="font-semibold">Phone</span>
            <input
              name="phone"
              type="number"
              placeholder="Phone"
              className="w-full py-1 border border-black mt-1 mb-2 pl-3  dark:bg-c"
              required
            />
          </div>
          <div className="w-full">
            <span className="font-semibold">Email</span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full py-1 border border-black mt-1 mb-2 pl-3  dark:bg-c"
              required
            />
          </div>
        </div>
        <div>
          <span className="font-semibold">Question</span>
          <textarea
            className="border border-black w-full h-40 pl-3 pt-3  dark:bg-c mt-1 mb-2"
            name="question"
            placeholder="Question"
            required
          ></textarea>
        </div>
        <button className="bg-black text-white dark:bg-white dark:text-black py-2 px-10 rounded-sm font-bold mt-3">
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default Contact;
