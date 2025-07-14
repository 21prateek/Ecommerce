import { useForm } from "react-hook-form";
import { signUpSchema } from "../schema/authSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/useAuthStore.js";
import { FolderPen, Globe, Key, Loader, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const isSignUp = useAuthStore((state) => state.isSignUp);
  const signUp = useAuthStore((state) => state.signUp);
  const authUser = useAuthStore((state) => state.authUser);
  const googleLogin = useAuthStore((state) => state.googleLogin);
  const googleCheck = useAuthStore((s) => s.googleCheck);

  useEffect(() => {
    const checkGoogle = async () => {
      const res = await googleCheck();
      if (res.success) navigate({ to: "/" });
    };
    checkGoogle();
  }, []);

  useEffect(() => {
    if (authUser) {
      navigate({ to: "/" });
    }
  }, [authUser]);

  const onSubmit = async (data) => {
    try {
      signUp(data);
      // console.log(data)
    } catch (error) {
      console.log("Error while signing in", error);
    }
  };

  // const handleGoogleLogin = () => {};
  return (
    <div className="bg-white h-screen flex justify-center items-center text-black flex-col gap-4">
      <div className="text-3xl">Welcome, Please register yourself</div>
      <div className="bg-gray-200 shadow-2xl rounded-md p-4 w-96 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-control ">
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>

            {/* relative positioning to contain the absolute icon */}
            <div className="relative">
              {/* Icon placement */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <FolderPen className="h-5 w-5 text-gray-500" />
              </div>

              {/* Input with left padding to give room for icon */}
              <input
                type="text"
                {...register("name")}
                className={`input input-bordered w-full pl-10 bg-white border-2 ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="John Legend"
              />
            </div>

            {/* Validation error message */}
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control pt-5">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>

              <input
                type="text"
                {...register("email")}
                className={`input input-bordered w-full pl-10 bg-white border-2 ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="johnlegend@gamil.com"
              />
            </div>
            {/* Validation error message */}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-control pt-5">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Key className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`input input-bordered w-full pl-10 bg-white border-2 ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder=""
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 z-10"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Validation error message */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-5 text-black"
            disabled={isSignUp}
          >
            {isSignUp ? (
              <>
                <Loader className="h-5 w-5 animate-spin bg-blue" />
                Loading...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <button
            type="button"
            onClick={googleLogin}
            className="flex items-center justify-center gap-2 w-full mt-6 bg-white border border-gray-300 text-black px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
          >
            <Globe className="text-xl" />
            Continue with Google
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="flex justify-center items-center gap-3">
            Already have an account
            <Link to="/auth/login" className="text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
