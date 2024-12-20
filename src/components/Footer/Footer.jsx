import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="pt-20 md:pt-20 mx-5 md:mx-0">
      <img className="mx-auto" src={logo} alt="" />
      <h2 className="md:text-5xl text-2xl font-bold text-center text-primary font-sora dark:text-white">
        VISA NAVIGATOR
      </h2>
      <p className="text-center text-p font-semibold mb-10 md:pb-8 mt-8">
        Explore a world of opportunities with Visa Navigator. Your one-stop
        solution for visa applications, requirements, and guidance. Stay
        informed, <br /> make informed decisions, and embark on your next
        journey with ease.
      </p>
      <div className="grid md:grid-cols-3">
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-2xl font-bold py-5">Subscribe</h4>
          <input
            type="text"
            className="border border-black pl-3 py-1 px-10 rounded-sm"
            placeholder="enter your email"
          />
          <button className="bg-primary py-1 px-4 dark:bg-white dark:text-black text-white mt-1 font-semibold rounded-sm">
            Subscribe
          </button>
        </div>
        <div>
          <h4 className="text-2xl font-bold py-5 text-center">Follow Us</h4>
          <div className="flex items-center gap-2 justify-center">
            <a
              href="https://www.facebook.com/programmershakibbangladesh"
              target="_blank"
            >
              <i className="fa-brands fa-square-facebook text-5xl"></i>
            </a>
            <a
              href="https://www.instagram.com/programmershakib/"
              target="_blank"
            >
              <i className="fa-brands fa-square-instagram text-5xl"></i>
            </a>
            <a href="https://x.com/programershakib" target="_blank">
              <i className="fa-brands fa-square-x-twitter text-5xl"></i>
            </a>
          </div>
        </div>
        <div className="text-center font-semibold">
          <h4 className="text-2xl font-bold py-5">Contact Us</h4>
          <p>
            <i className="fa-solid fa-envelope"></i> Email:
            support@visanavigator.com
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> Phone: +1-800-VISA
          </p>
        </div>
      </div>
      <p className="text-center py-10 font-medium">
        © 2024 VISA NAVIGATOR. All rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
