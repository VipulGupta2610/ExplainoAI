import { motion } from "framer-motion";
import {
  Video,
  Sparkles,
  Crown,
  Clock,
  Plus,
  ArrowUpRight,
  UserRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const getNextMonthResetDate = () => {
  const today = new Date();
  const resetDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  return resetDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function Dashboard() {
  const selector = useSelector((state) => state?.auth?.user);
  const videos = Array.isArray(selector?.totalVideos)
    ? selector.totalVideos
    : [];
  const resetDate = getNextMonthResetDate();

  return (
    <main className="min-h-screen mt-18 bg-white dark:bg-black text-black dark:text-white px-6 py-10">
      <section className="max-w-7xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {selector?.name || "Creator"}
            </h1>
            <p className="text-gray-500">
              Manage your videos, credits, and content generation from one place.
            </p>
          </div>

          <Link to={`/GeneratePage/${selector?._id}`}>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition hover:scale-105">
              <Plus size={18} />
              Create New Video
            </button>
          </Link>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-500">Total Videos</h3>
            <Video className="text-blue-500" />
          </div>
          <h2 className="text-4xl font-bold">{videos.length}</h2>
          <p className="text-sm text-gray-500 mt-2">
            Videos generated so far
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-500">Remaining Credits</h3>
            <Sparkles className="text-blue-500" />
          </div>
          <h2 className="text-4xl font-bold">{selector?.creditAval ?? 0}</h2>
          <p className="text-sm text-gray-500 mt-2">
            Free generation credits left
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-500">Current Plan</h3>
            <Crown className="text-blue-500" />
          </div>
          <h2 className="text-4xl font-bold">{selector?.package || "Free"}</h2>
          <p className="text-sm text-gray-500 mt-2">
            Upgrade anytime for more power
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                Recent Videos
              </h2>
            </div>

            <div className="space-y-4">
              {videos.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No videos generated yet.
                </p>
              ) : (
                [...videos].reverse().map((video, index) => (
                  <div
                    key={`${video.videoName}-${video.generatedAt}-${index}`}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-zinc-800"
                  >
                    <div>
                      <h3 className="font-medium">{video.videoName}</h3>
                      <p className="text-sm text-gray-500">
                        {video.type || "Video"} - {new Date(video.generatedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                        {video.status || "Completed"}
                      </span>
                      <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800">
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900">
            <h2 className="text-xl font-semibold mb-3">
              Quick Tips for Better Videos
            </h2>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>Keep topics specific for better AI results</li>
              <li>Short videos perform better for social media</li>
              <li>Use an engaging voice tone for higher retention</li>
              <li>Add subtitles for better viewer experience</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-6">
              Account Summary
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <UserRound className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">{selector?.name || "Creator"}</h3>
                <p className="text-sm text-gray-500">{selector?.email}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subscription</span>
                <span>{selector?.package || "Free"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Reset Date</span>
                <span>{resetDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Credits Left</span>
                <span>{selector?.creditAval ?? 0}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <h2 className="text-xl font-semibold mb-3">
              Upgrade to Pro
            </h2>
            <p className="text-sm text-blue-100 mb-6">
              Unlock unlimited videos, premium voices, longer durations, and advanced features.
            </p>

            <Link to="/PricingPage">
              <button className="w-full bg-white text-blue-700 font-medium py-3 rounded-2xl hover:scale-105 transition">
                Upgrade Now
              </button>
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={18} className="text-blue-500" />
              <h3 className="font-medium">
                Credit Reset
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              Your free credits reset on {resetDate}.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
