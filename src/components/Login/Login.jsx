import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { signIn, signInWithGoogle, signInWithGithub, resetPassword } =
    useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.email, data.password);
    signIn(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
      toast.success("user logged in Successful");
      navigate(from, { replace: true });
    });
  };

  const handleSignWithGoogle = () => {
    signInWithGoogle().then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      toast.success("user logged in successful with Google");
      navigate(from, { replace: true });
    });
  };

  const handleSignWithGithub = () => {
    signInWithGithub().then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      toast.success("user logged in successful with Github");
      navigate(from, { replace: true });
    });
  };

  // password reset

  const handleResetPassword = () => {
    if (emailForReset) {
      resetPassword(emailForReset)
        .then(() => {
            
            toast.success("Password reset email sent!");
         
        
        })
        .catch((error) => {
            toast.error(error.message);
       
           
        });
    } else {
        toast.error("Please enter your email for password reset.");
        
    }
  };

  return (
    <>
      <section className="bg-gray-50 pt-14 bg-gradient-to-b text-white from-white to-stone-600 font-golos ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-stone-800 dark:border-stone-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-stone-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
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
                <div className="relative">
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
                <div className="flex flex-col gap-x-3 md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                  <input
                    type="email"
                    {...register("emailForReset")}
                    name="emailForReset"
                    id="emailForReset"
                    className="input input-bordered"
                    placeholder="Enter your Email for Password Reset"
                    value={emailForReset}
                    onChange={(e) => setEmailForReset(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="btn bg-stone-500"
                  >
                    Reset Password
                  </button>
                  <Toaster position="top-right" reverseOrder={false} />
                </div>

                <input
                  type="submit"
                  className="btn border-none hover:bg-stone-900 bg-stone-500"
                  value="Sing In"
                />
                <div className="m-2 font-bold">Or</div>
                <div className="flex mt-4 md:mt-0">
                  <button
                    onClick={handleSignWithGoogle}
                    type="button"
                    className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
                  >
                    Google
                  </button>
                  <button
                    onClick={handleSignWithGithub}
                    type="button"
                    className="bg-stone-500 hover:bg-stone-900 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  >
                    Github
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="text-stone-600 dark:text-stone-500"
                  >
                    Sign up
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

export default Login;
