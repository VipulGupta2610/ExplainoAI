import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../api/axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authslice";
import toast from "react-hot-toast";

export default function Login() {

  const dispatch = useDispatch()
const navigate = useNavigate()
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const info ={
      email:data.email,
      password:data.password
    }
    try {
      const res = await api.post("/user/login",info)
      dispatch(loginUser(res.data.info))
      console.log(res)
      toast.success("Login successfully")
      navigate(`/Dashboard/${res.data.info._id}`)
    } catch (error) {
      console.log("Error at login at onsubmit")
      console.log(error)
      toast.error("Login failed")
    }
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-black dark:text-white">

      {/* LEFT SIDE (BRANDING) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">

        {/* Gradient Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-md text-center px-8">
          <h1 className="text-4xl font-bold mb-6">
            Explaino <span className="text-blue-500">AI</span>
          </h1>

          <p className="text-gray-500 text-lg">
            Turn ideas into powerful videos with AI.
            Fast. Simple. Stunning.
          </p>

          <div className="mt-10 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10">
            <p className="text-sm text-gray-400">
              “Create educational videos in seconds — no editing required.”
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >

          {/* TITLE */}
          <h2 className="text-3xl font-semibold mb-2">
            Welcome back 👋
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue creating videos
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email",{required:true})}
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password",{required:true})}
                />
              </div>

              {/* OPTIONS */}
              <div className="flex justify-between text-sm text-gray-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button className="hover:text-blue-500">
                  Forgot password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <motion.button

              type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                {
                  isSubmitting ? "Logging In" : "Login"
                }
              </motion.button>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                OR
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
              </div>

              {/* GOOGLE LOGIN */}
              <button className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition">
                Continue with Google
              </button>

            </div>

          </form>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to={"/user/Signup"}>
              <span className="text-blue-500 cursor-pointer hover:underline">
                Sign up
              </span>
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
}