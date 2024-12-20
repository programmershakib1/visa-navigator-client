import { Link, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-center justify-center py-40 mx-5 md:mx-0 text-center">
      <h2 className="text-4xl md:text-7xl font-bold text-primary font-sora">
        Not Found Page
      </h2>
      <h4 className="text-3xl font-bold pt-10">Oops!</h4>
      <p className="pt-5 font-medium">
        Your current route is <span className="underline">{pathname}</span> This
        is not a valid route Or The server is Down
      </p>
      <Link to="/">
        <button className="py-1.5 px-10 rounded-full mt-5 text-white bg-primary font-bold">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
