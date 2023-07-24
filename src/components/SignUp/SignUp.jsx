import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { createUser } = useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Create user using the AuthContext's createUser function
      await createUser(data.email, data.password).then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      });

      // Send additional user information to the backend API
      const userInfo = {
        name: data.name,
        email: data.email,
        college: data.college,
        address: data.address,
        imageUrl: data.imageUrl,
      };

      const response = await axios.post(
        "https://college-hive-server.vercel.app/userInfo",
        userInfo
      );
      console.log("User information submitted:", response.data);

      toast.success("User sign up successful");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error occurred while signing up:", error);
      toast.error("Error occurred while signing up");
    }
  };

  return (
    <>
      <section className="bg-gray-50 text-white pt-14 bg-gradient-to-b from-white to-stone-600 font-golos  ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-stone-800 dark:border-stone-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-stone-900 md:text-2xl dark:text-white">
                Sign up for an account
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label className="label">
                    <span className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">
                      Your Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    id="name"
                    className="input input-bordered"
                    placeholder="Enter your Name"
                  />
                  {errors.name && (
                    <span className="text-red-600 mt-2">Name is required</span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">
                      Your Email
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    id="email"
                    className="input input-bordered"
                    placeholder="Enter your Email"
                  />
                  {errors.email && (
                    <span className="text-red-600 mt-2">Email is required</span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">
                      Your Password
                    </span>
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    {...register("password", { required: true })}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="input input-bordered"
                    required
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600 mt-2">Password is required</p>
                  )}
                </div>
                {/* College field */}
                <div>
                  <label className="label">
                    <span className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">
                      College
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("college", { required: true })}
                    name="college"
                    id="college"
                    className="input input-bordered"
                    placeholder="Enter your College"
                  />
                  {errors.college && (
                    <span className="text-red-600 mt-2">
                      College is required
                    </span>
                  )}
                </div>

                {/* Address field */}
                <div>
                  <label className="label">
                    <span className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">
                      Address
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    name="address"
                    id="address"
                    className="input input-bordered"
                    placeholder="Enter your Address"
                  />
                  {errors.address && (
                    <span className="text-red-600 mt-2">
                      Address is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">
                      Image URL
                    </span>
                  </label>
                  <input
                    type="url"
                    {...register("imageUrl", { required: true })}
                    name="imageUrl"
                    id="imageUrl"
                    className="input input-bordered"
                    placeholder="Enter image URL"
                  />
                  {errors.imageUrl && (
                    <span className="text-red-600 mt-2">
                      Image URL is required
                    </span>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={showPassword}
                    className="ml-2 py-0"
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className="text-stone-400" />
                    ) : (
                      <FaEye className="text-stone-400" />
                    )}
                  </button>
                </div>
                <input
                  type="submit"
                  className="btn border-none hover:bg-stone-900 bg-stone-500"
                  value="Sign Up"
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-stone-600  dark:text-stone-500"
                  >
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
