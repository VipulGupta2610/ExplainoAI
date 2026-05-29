import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { api } from "../api/axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authslice";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Signup() {

  const {
    register, handleSubmit, formState: { isSubmitting }
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const info = {
      name: data.name,
      email: data.email,
      password: data.password
    }

    try {
      const res = await api.post("/user/signup", info)
      dispatch(loginUser(res.data.sending_user))
      console.log(res)
      toast.success("Signup successfully")
      navigate(`/Dashboard/${res.data.sending_user._id}`)
    } catch (error) {
      console.log("error at onsubmit function while sending info to backend")
      console.log(error)
      toast.error("Signup failed")
    }

  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-black dark:text-white">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-md text-center px-8">
          <h1 className="text-4xl font-bold mb-6">
            Explaino <span className="text-blue-500">AI</span>
          </h1>

          <p className="text-gray-500 text-lg">
            Create powerful educational videos with just a topic.
          </p>

          {/* Benefits */}
          <div className="mt-10 space-y-4 text-sm text-gray-400">
            <p>⚡ Generate videos in seconds</p>
            <p>🎙️ AI voice + visuals included</p>
            <p>📈 Built for creators & learners</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >

          {/* TITLE */}
          <h2 className="text-3xl font-semibold mb-2">
            Create your account 🚀
          </h2>

          <p className="text-gray-500 mb-8">
            Start generating AI videos today
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="space-y-5">

              {/* NAME */}
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("name", { required: true })}
                />
              </div>

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", { required: true })}
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", { required: true })}
                />
              </div>

              {/* PASSWORD HINT */}
              <p className="text-xs text-gray-500">
                Must be at least 8 characters
              </p>

              {/* TERMS */}
              <label className="flex items-start gap-2 text-sm text-gray-500">
                <input type="checkbox" className="mt-1" />
                I agree to the Terms & Privacy Policy
              </label>

              {/* BUTTON */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                {isSubmitting ? "Craeting your account" : " Create Account"}
              </motion.button>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                OR
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
              </div>

              {/* GOOGLE */}
              <GoogleLogin
                onSuccess={(credentialResponse) => {

                  const user = jwtDecode(credentialResponse.credential);

                  console.log(user);

                  toast.success("Google Login Successful");

                  dispatch(loginUser(user));

                  navigate("/Dashboard/");
                }}

                onError={() => {
                  toast.error("Google Login Failed");
                }}
              />

            </div>

          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to={"/user/Login"}>
              <span className="text-blue-500 cursor-pointer hover:underline">
                Login
              </span>
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
}