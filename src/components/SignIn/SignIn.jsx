import { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const {
    handleSignIn,
    handleGoogleLogin,
    handleGithubLogin,
    setUser,
    setEmailValue,
    locations,
    setLocations,
  } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    handleSignIn(email, password)
      .then((result) => {
        e.target.reset();
        setUser(result?.user);
        const lastSignInTime = result?.user?.metadata?.lastSignInTime;
        const loginInfo = { email, lastSignInTime };
        fetch("https://assignment-10-b10-server.vercel.app/users/login", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              toast.success("User signin successful");
            }
          });
        if (locations) {
          navigate(locations);
        } else {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        toast.error(error?.code);
      });
  };

  const handleEmail = () => {
    setEmailValue("");
    const email = emailRef.current.value;
    if (!email.includes("@") && !email == "") {
      return toast.error("Please provide a valid mail");
    } else {
      setEmailValue(email);
    }
  };

  const handleLocations = () => {
    setLocations(location.state);
  };

  return (
    <div className="flex flex-col items-center lg:pt-10 md:pt-20">
      <Helmet>
        <title>VN | Sign In</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-primary dark:text-white  pb-5">
        Sign In
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label>
          <span className="mr-[250px] font-semibold">Email</span>
        </label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="w-72 py-1 border border-black mt-1 mb-2 pl-3 dark:bg-c"
          required
        />
        <label>
          <span className="mr-[222px] font-semibold">Password</span>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-72 py-1 border border-black mt-1 pl-3 dark:bg-c"
          required
        />
        <button>
          <Link
            onClick={handleEmail}
            to="/forgetPassword"
            className="text-xs py-2 hover:underline"
          >
            Forget password?
          </Link>
        </button>
        <button className="bg-primary py-0.5 px-6 text-white dark:bg-white dark:text-black rounded-full font-bold">
          Sign In
        </button>
      </form>
      <div>
        <p className="pt-2 text-center text-sm font-semibold">
          Don&apos;t have an Account?
          <Link to="/signUp" onClick={handleLocations} className="underline">
            {" "}
            Sign Up
          </Link>
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={() => {
              handleGoogleLogin()
                .then((result) => {
                  setUser(result.user);
                  const email = result?.user?.email;
                  const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                  const loginInfo = { email, lastSignInTime };
                  fetch(
                    "https://assignment-10-b10-server.vercel.app/users/login",
                    {
                      method: "PATCH",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(loginInfo),
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.modifiedCount) {
                        toast.success("User signin successful");
                      }
                    });
                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="bg-primary py-2 px-6 text-white dark:bg-white dark:text-black rounded-full font-bold mt-5"
          >
            <i className="fa-brands fa-google text-white dark:text-black pr-2"></i>
            Continue with Google
          </button>
          <button
            onClick={() => {
              handleGithubLogin()
                .then((result) => {
                  setUser(result.user);
                  const email = result?.user?.email;
                  const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                  const loginInfo = { email, lastSignInTime };
                  fetch(
                    "https://assignment-10-b10-server.vercel.app/users/login",
                    {
                      method: "PATCH",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(loginInfo),
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.modifiedCount) {
                        toast.success("User signin successful");
                      }
                    });
                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="bg-primary py-2 px-6 text-white dark:bg-white dark:text-black rounded-full font-bold md:mt-5"
          >
            <i className="fa-brands fa-github text-white dark:text-black pr-2"></i>
            Continue with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
