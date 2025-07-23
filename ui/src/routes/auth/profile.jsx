import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useAuthStore } from "../../store/useAuthStore";
import NavBar from "../../components/NavBar";
import { motion } from "framer-motion";

export const Route = createFileRoute("/auth/profile")({
  component: RouteComponent,
  //check if not logged in so send to login page
  beforeLoad: async () => {
    //check for the auth user, as whenever we will refresh that page that authUser is initially set to null in authStore so it will give us null back and send us to login
    //even if we are logged in so thats why we are doing this thing here
    const { authUser, checkAuth } = useAuthStore.getState();

    //if not found then find it
    if (!authUser) {
      await checkAuth(); // async check
    }

    const finalUser = useAuthStore.getState().authUser;
    if (!finalUser) {
      throw redirect({ to: "/auth/login" }); // or wherever your login page is
    }
  },
});

function RouteComponent() {
  const { authUser, logOut } = useAuthStore();
  // console.log(authUser);
  const navigate = useNavigate();

  if (!authUser) {
    return <div>Loading....</div>;
  }

  //logout function
  const handleLogout = async () => {
    try {
      await logOut();
      // console.log("You are logged out");
  
      navigate({ to: "/auth/login" });
    } catch (error) {
      
    }
  };

  return (
    <div className="bg-white h-screen text-black overflow-hidden">
      <NavBar />

      <div className="flex h-[100%]">
        {/* Left side */}
        <div className=" w-80 p-4 text-black text-xl border-l shadow-2xl">
          <ul className="flex flex-col gap-6 px-10 py-15">
            {authUser.role === "ADMIN" ? (
              <li className="transition-all duration-300 hover:bg-black hover:text-white rounded-2xl p-5">
                <Link to="/product/add">Add Product</Link>
              </li>
            ) : null}
            <li
              className="transition-all duration-300 hover:bg-black hover:text-white rounded-2xl p-5 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="grid grid-cols-2 gap-4 w-full p-10">
          <motion.div
            className="bg-white p-4 rounded shadow flex flex-col justify-center items-center hover:transform h-[60%] "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <h1 className="text-2xl">Name:- {authUser.name}</h1>
          </motion.div>
          <motion.div
            className="bg-white p-4 rounded shadow flex flex-col justify-center items-center hover:transform h-[60%]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <h1 className="text-2xl">Email:-{authUser.email}</h1>
          </motion.div>
          <motion.div
            className="bg-white p-4 rounded shadow flex flex-col justify-center items-center hover:transform h-[60%]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <h1 className="text-2xl">Role:-{authUser.role}</h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
