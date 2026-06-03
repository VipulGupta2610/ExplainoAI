import { motion } from "framer-motion";
import { Sparkles, Video, Brain, Mic, Layers, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <main className="bg-white dark:bg-black text-black dark:text-white px-4 sm:px-6 pt-28 sm:pt-32 pb-16 overflow-hidden">

      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center mb-14 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Powerful Features to Create Videos Effortlessly
        </h1>
        <p className="text-gray-500 text-base sm:text-lg">
          Explaino AI handles everything—from idea to final video—so you can focus on learning and creating.
        </p>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mb-16 sm:mb-24">
        {[
          { icon: <Brain />, title: "AI Script Engine", desc: "Generates structured, engaging scripts automatically." },
          { icon: <Mic />, title: "Natural Voiceovers", desc: "Human-like voices with multiple styles." },
          { icon: <Video />, title: "Auto Video Creation", desc: "No editing required—videos are ready instantly." },
          { icon: <Layers />, title: "Smart Visuals", desc: "Slides, highlights, and visuals generated automatically." },
          { icon: <Zap />, title: "Fast Processing", desc: "Generate videos in seconds, not hours." },
          { icon: <Sparkles />, title: "AI Optimization", desc: "Content optimized for engagement and clarity." },
        ].map((f, i) => (
          <div key={i} className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900">
            <div className="text-blue-500 mb-4">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-500">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* DEEP FEATURE BREAKDOWN */}
      <section className="max-w-6xl mx-auto space-y-14 sm:space-y-20">

        {/* SCRIPT ENGINE */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              AI Script Generation that actually makes sense
            </h2>
            <p className="text-gray-500 mb-4">
              Explaino AI doesn’t generate random text—it creates structured explanations with hooks, examples, and summaries.
            </p>
            <ul className="space-y-2 text-gray-500">
              <li>✔ Hook-based introductions</li>
              <li>✔ Step-by-step explanations</li>
              <li>✔ Real examples included</li>
            </ul>
          </div>
          <div className="min-h-56 sm:h-72 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 overflow-hidden">

  <div className="flex items-center gap-2 mb-6">
    <div className="w-3 h-3 rounded-full bg-red-500"></div>
    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
    <div className="w-3 h-3 rounded-full bg-green-500"></div>

    <span className="ml-3 text-sm text-gray-500">
      Generated Script
    </span>
  </div>

  <div className="space-y-4">
    <div>
      <h3 className="font-semibold text-lg mb-2">
        Binary Search Explained
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Imagine searching for a word in a dictionary. Instead of checking
        every page one by one, you open near the middle...
      </p>
    </div>

    <div className="h-px bg-gray-200 dark:bg-gray-800"></div>

    <p className="text-gray-600 dark:text-gray-400">
      Binary Search repeatedly divides the search space into two halves,
      making it much faster than a linear search.
    </p>

    <div className="flex gap-2 mt-4">
      <span className="px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900">
        Intro
      </span>

      <span className="px-3 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900">
        Example
      </span>

      <span className="px-3 py-1 rounded-full text-xs bg-pink-100 dark:bg-pink-900">
        Summary
      </span>
    </div>
  </div>

</div>
        </div>

        {/* VOICE */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
         <div className="min-h-56 sm:h-72 rounded-2xl bg-slate-900 p-6 flex flex-col justify-center items-center order-2 lg:order-1 overflow-hidden">

  <div className="mb-8 text-center">
    <h3 className="text-white text-xl font-semibold">
      AI Voice Narration
    </h3>
    <p className="text-slate-400 text-sm mt-1">
      Natural-sounding voice generated for your video
    </p>
  </div>

  <div className="flex items-end gap-1 h-24">
    {[35, 60, 45, 80, 55, 90, 40, 70, 50, 95, 65, 45, 85, 55, 75, 40].map(
      (height, index) => (
        <div
          key={index}
          className="w-2 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 animate-pulse"
          style={{ height: `${height}px` }}
        />
      )
    )}
  </div>

  <div className="mt-8 flex items-center gap-3">
    <button className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition">
      ▶
    </button>

    <div>
      <p className="text-white text-sm">Narration Preview</p>
      <p className="text-slate-400 text-xs">00:45 / 02:13</p>
    </div>
  </div>

</div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Natural AI voice that feels human
            </h2>
            <p className="text-gray-500 mb-4">
              Choose from multiple voices and tones to match your content style.
            </p>
            <ul className="space-y-2 text-gray-500">
              <li>✔ Male & Female voices</li>
              <li>✔ Multiple tones</li>
              <li>✔ Clear pronunciation</li>
            </ul>
          </div>
        </div>

        {/* VIDEO */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Automatic video generation
            </h2>
            <p className="text-gray-500 mb-4">
              No editing, no timeline, no complexity. Just input → output.
            </p>
            <ul className="space-y-2 text-gray-500">
              <li>✔ Slides + visuals auto-generated</li>
              <li>✔ Subtitles included</li>
              <li>✔ Ready-to-share format</li>
            </ul>
          </div>
      <div className="min-h-56 sm:h-72 rounded-2xl overflow-hidden relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

  {/* Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

  {/* Video Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">

    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 ml-1"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>

    <h3 className="mt-6 text-xl font-bold">
      How Binary Search Works
    </h3>

    <p className="mt-2 text-gray-300 text-sm">
      AI Generated Explanatory Video
    </p>

  </div>

  {/* Timeline */}
  <div className="absolute bottom-0 left-0 right-0 p-4">
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
    </div>

    <div className="flex justify-between text-xs text-gray-400 mt-2">
      <span>1:24</span>
      <span>3:12</span>
    </div>
  </div>

</div>
        </div>

      </section>

      {/* WORKFLOW */}
      <section className="py-16 sm:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10 sm:mb-12">
          Simple workflow, powerful results
        </h2>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center gap-3 sm:gap-6 text-sm">
          <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl">Topic</div>
          <div>→</div>
          <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl">AI Processing</div>
          <div>→</div>
          <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl">Final Video</div>
        </div>
      </section>

      {/* ADVANCED FEATURES */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6 lg:gap-10 mb-16 sm:mb-24">
        {[
          "Multi-language support",
          "Shorts + long video formats",
          "Auto subtitles",
          "Content optimization",
          "Smart highlights",
          "Fast rendering engine",
        ].map((f, i) => (
          <div key={i} className="p-6 bg-gray-100 dark:bg-gray-900 rounded-xl">
            ⚡ {f}
          </div>
        ))}
      </section>

      {/* USE CASES */}
      <section className="max-w-6xl mx-auto mb-16 sm:mb-24">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-16">
          Who is this for?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {[
            { title: "Students", desc: "Understand concepts visually faster." },
            { title: "Creators", desc: "Generate content without editing." },
            { title: "Developers", desc: "Explain logic and code easily." },
          ].map((u, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900">
              <h3 className="font-semibold text-lg">{u.title}</h3>
              <p className="text-gray-500 mt-2">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="max-w-5xl mx-auto text-center mb-16 sm:mb-24">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10 sm:mb-12">
          Why Explaino AI?
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-red-100 dark:bg-red-900 rounded-xl">
            ❌ Traditional Video Creation
            <ul className="mt-4 space-y-2 text-sm">
              <li>Time-consuming</li>
              <li>Editing required</li>
              <li>Complex tools</li>
            </ul>
          </div>

          <div className="p-6 bg-green-100 dark:bg-green-900 rounded-xl">
            ✅ Explaino AI
            <ul className="mt-4 space-y-2 text-sm">
              <li>Instant videos</li>
              <li>No editing needed</li>
              <li>Simple workflow</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to create your first video?
        </h2>

        <p className="text-gray-500 mb-8">
          Start turning your ideas into videos instantly.
        </p>

   <Link to={"/GeneratePage"}>
        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-base sm:text-lg">
          Get Started Free 🚀
        </button>
   </Link>
      </section>

    </main>
  );
}
