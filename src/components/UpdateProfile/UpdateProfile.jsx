import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const UpdateProfile = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    if (name.length > 20) {
      return toast.error("name length max 20");
    }
    const photo = e.target.photo.value;
    e.target.reset();

    updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
      .then(() => {
        const email = auth.currentUser?.email;
        const updatedUser = { email, name, photo };

        fetch("https://assignment-10-b10-server.vercel.app/users", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => res.json())
          .then(() => {});
        toast.success("Profile update successful");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(error?.code);
      });
    setUser({ displayName: name, photoURL: photo });
  };

  return (
    <div>
      <Helmet>
        <title>VN | Update Profile</title>
      </Helmet>
      <div className="flex flex-col items-center lg:pt-10 md:pt-20">
        <h2 className="text-3xl font-bold text-primary dark:text-white pb-5">
          Update Profile
        </h2>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col items-center"
        >
          <label>
            <span className="mr-[246px] font-semibold">Name</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="name"
            className="w-72 py-1 border border-black dark:bg-c mt-1 mb-2 pl-3"
            required
          />
          <label>
            <span className="mr-[212px] font-semibold">Photo URL</span>
          </label>
          <input
            name="photo"
            type="text"
            placeholder="photo url"
            className="w-72 py-1 border border-black dark:bg-c mt-1 pl-3"
            required
          />
          <button className="bg-primary dark:bg-white dark:text-black py-0.5 px-6 text-white rounded-full font-bold mt-3">
            Update
          </button>
        </form>
        <button className="font-semibold mt-3">
          Back to{" "}
          <Link to="/profile" className="underline">
            Profile
          </Link>
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
