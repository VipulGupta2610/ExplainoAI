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
          <div className="min-h-56 sm:h-72 bg-gray-200 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-center px-4">
            Script Preview
          </div>
        </div>

        {/* VOICE */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="min-h-56 sm:h-72 bg-gray-200 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-center px-4 order-2 lg:order-1">
            Voice Waveform
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
          <div className="min-h-56 sm:h-72 bg-gray-200 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-center px-4">
            Video Preview
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
