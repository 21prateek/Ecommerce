import { useForm } from "react-hook-form";
import { loginSchema } from "../schema/authSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/useAuthStore.js";
import { Globe, Key, Loader, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const isLogIn = useAuthStore((state) => state.isLogIn);
  const logIn = useAuthStore((state) => state.logIn);
  const authUser = useAuthStore((state) => state.authUser);
  const [loginError, setLoginError] = useState("");
  const googleLogin = useAuthStore((state) => state.googleLogin);
  const googleCheck = useAuthStore((state) => state.googleCheck);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkGoogle = async () => {
      const res = await googleCheck();
      if (res.success) navigate({ to: "/" });
    };
    checkGoogle();
  }, []);

  // runs when authUser change
  useEffect(() => {
    if (authUser) {
      navigate({ to: "/" });
    }
  }, [authUser]);

  const onSubmit = async (data) => {
    try {
      //   console.log(data);
      const { status, message } = await logIn(data);

      if (!status) {
        setLoginError(message);
        return;
      }
    } catch (error) {
      console.log("Error while signing in", error);
    }
  };

  // const handleGoogleLogin = () => {};
  return (
    <div className="bg-white h-screen flex justify-center items-center text-black flex-col gap-4">
      <div className="text-3xl">Welcome Back, Please login here</div>
      <div className="bg-gray-200 shadow-2xl rounded-md p-4 w-96 ">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            disabled={isLogIn}
          >
            {isLogIn ? (
              <>
                <Loader className="h-5 w-5 animate-spin bg-blue" />
                Loading...
              </>
            ) : (
              "Log In"
            )}
          </button>

          {loginError && (
            <p className="text-red-500 text-center text-sm mt-4 ">
              {loginError}
            </p>
          )}

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
          <p className="flex justify-center items-center gap-2">
            Dont have an account
            <Link to="/auth/register" className="text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
