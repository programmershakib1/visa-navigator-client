import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, handleUserDelete } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center mx-5">
      <Helmet>
        <title>
          VN | Welcome {`${user?.displayName ? user.displayName : "User"}`}
        </title>
      </Helmet>
      <h2 className="text-2xl text-center font-bold font-sora mb-5 md:pt-10">
        Welcome {user?.displayName ? user.displayName : "User"}
      </h2>
      <div className="flex flex-col md:flex-row justify-center md:gap-5 mt-10 text-center md:text-left">
        <div className="flex justify-center items-center">
          {user?.photoURL ? (
            <img
              className="w-32 h-32 md:w-60 md:h-60 rounded-full animate__animated animate__zoomIn"
              src={user.photoURL}
              alt=""
            />
          ) : (
            <p>image not found</p>
          )}
        </div>
        <div className="flex flex-col justify-center mt-5 md:mt-0">
          <h2 className="font-bold">
            {user?.displayName ? user.displayName : "User"}
          </h2>
          <p className="text-p font-semibold">{user?.email}</p>
          <div className="flex flex-col gap-3 mt-5">
            <Link to="/updateProfile">
              <button className="w-full border rounded-full dark:bg-white dark:text-black border-black py-1 px-6 font-semibold">
                Update Profile
              </button>
            </Link>
            <Link to="/SignIn">
              <button className="w-full border rounded-full dark:bg-white dark:text-black border-black py-1 px-6 font-semibold">
                Change Account
              </button>
            </Link>
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="rounded-full py-1 px-6 font-semibold bg-error text-white"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <dialog
        id="my_modal_5"
        className="modal sm:modal-middle text-center dark:text-black"
      >
        <div className="modal-box dark:bg-neutral-950 dark:text-white">
          <h3 className="font-bold text-3xl">{user.displayName}</h3>
          <h4 className="py-4 text-error text-lg font-bold">
            You are in danger zone now
          </h4>
          <p className="font-medium">
            If you really want to delete your account, click Delete Account
          </p>
          <div className="modal-action">
            <form className="mx-auto" method="dialog">
              <button
                onClick={handleUserDelete}
                className="py-2 px-6 bg-error text-white font-semibold"
              >
                Delete Account
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form className="mx-auto" method="dialog">
              <button className="underline font-semibold">Back</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
