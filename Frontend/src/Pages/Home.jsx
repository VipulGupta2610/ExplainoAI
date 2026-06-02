import { motion } from "framer-motion";
import { Sparkles, Video, Brain, Zap } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {

const selector = useSelector(state=>state?.auth?.user?._id)


  return (
    <main className="bg-white dark:bg-black text-black dark:text-white overflow-hidden">

      {/* HERO */}
      <section className="min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-28 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight max-w-4xl"
        >
          Turn Any Topic Into a{" "}
          <span className="text-blue-500">Stunning Video</span> in Seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
        >
          Explaino AI generates scripts, voice, and visuals automatically.
          Learn faster or create content effortlessly.
        </motion.p>

        {/* Input Box */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xl">
          <input
            type="text"
            placeholder="Enter topic e.g. Binary Search"
            className="min-w-0 flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 outline-none"
          />
         <Link to={`/Dashboard/${selector}`} className="sm:shrink-0">
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition">
            Generate Video
          </button>
         </Link>
        </div>

        {/* Demo Card */}
    <div className="mt-10 sm:mt-12 w-full max-w-4xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
    <h2 className="text-4xl font-bold text-blue-600">100+</h2>
    <p className="text-gray-600 dark:text-gray-400">
      Topics Explained
    </p>
  </div>

  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
    <h2 className="text-4xl font-bold text-purple-600">95%</h2>
    <p className="text-gray-600 dark:text-gray-400">
      Faster Learning
    </p>
  </div>

  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
    <h2 className="text-4xl font-bold text-green-600">24/7</h2>
    <p className="text-gray-600 dark:text-gray-400">
      AI Assistance
    </p>
  </div>
  
</div>

      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-16">
          How it works
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 text-center">
          {[
            {
              icon: <Sparkles />,
              title: "Enter Topic",
              desc: "Type any concept you want to learn or explain.",
            },
            {
              icon: <Brain />,
              title: "AI Generates",
              desc: "Script, voice, and visuals are created instantly.",
            },
            {
              icon: <Video />,
              title: "Get Video",
              desc: "Download or share your ready-to-use video.",
            },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900">
              <div className="mb-4 flex justify-center text-blue-500">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
              Everything you need to create videos
            </h2>

            <ul className="space-y-6 text-gray-600 dark:text-gray-400">
              <li>🎙️ Natural AI voice narration</li>
              <li>🧠 Structured concept explanations</li>
              <li>🎬 Automatic video generation</li>
              <li>⚡ Fast and optimized workflow</li>
            </ul>
          </div>

        <div className="h-auto min-h-[22rem] sm:h-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">

  {/* Top Bar */}
  <div className="h-12 bg-gray-100 dark:bg-gray-800 flex items-center px-4 gap-2">
    <div className="w-3 h-3 rounded-full bg-red-500"></div>
    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
    <div className="w-3 h-3 rounded-full bg-green-500"></div>
  </div>

  {/* Main Content */}
  <div className="p-4 sm:p-6 h-full">
    <div className="flex gap-3 sm:gap-4 h-full min-w-0">

      {/* Sidebar */}
      <div className="w-1/4 min-w-[3.75rem] space-y-3">
        <div className="h-10 bg-blue-500 rounded-lg"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>

      {/* Main Section */}
      <div className="flex-1">
        <div className="h-10 w-2/3 bg-purple-500 rounded-lg mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
          <div className="h-20 bg-blue-100 dark:bg-blue-900 rounded-xl"></div>
          <div className="h-20 bg-purple-100 dark:bg-purple-900 rounded-xl"></div>
          <div className="h-20 bg-pink-100 dark:bg-pink-900 rounded-xl"></div>
        </div>
      </div>

    </div>
  </div>
</div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-16">
          Built for everyone
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {[
            { title: "Students", desc: "Understand concepts visually faster." },
            { title: "YouTubers", desc: "Create content without editing." },
            { title: "Developers", desc: "Explain code and logic easily." },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

<section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center">
  <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
    Creating educational videos is slow and painful
  </h2>

  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
    Writing scripts, recording voice, editing visuals—it takes hours.
    Most people give up before they even start.
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
    {[
      "Hours spent writing scripts",
      "Editing videos is complex",
      "Low-quality content doesn’t perform",
    ].map((item, i) => (
      <div key={i} className="p-6 rounded-xl bg-gray-100 dark:bg-gray-900">
        ❌ {item}
      </div>
    ))}
  </div>
</section>

<section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50 dark:bg-[#0a0a0a] text-center">
  <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
    Explaino AI fixes all of this
  </h2>

  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
    Just enter a topic and get a complete video—script, voice, and visuals—ready in seconds.
  </p>
</section>

<section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
  <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-16">
    Built for powerful video creation
  </h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
    {[
      {
        title: "AI Script Engine",
        desc: "Structured explanations with hooks, examples, and summaries.",
      },
      {
        title: "Voice Generation",
        desc: "Natural voiceovers that sound human and engaging.",
      },
      {
        title: "Visual Builder",
        desc: "Auto-generated slides, code snippets, and visuals.",
      },
      {
        title: "Instant Rendering",
        desc: "Get your video in seconds, not hours.",
      },
      {
        title: "Multi-format Output",
        desc: "Long videos + shorts ready for social media.",
      },
      {
        title: "Smart Optimization",
        desc: "Content optimized for engagement and retention.",
      },
    ].map((f, i) => (
      <div key={i} className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900">
        <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
        <p className="text-gray-500">{f.desc}</p>
      </div>
    ))}
  </div>
</section><section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50 dark:bg-[#0a0a0a] text-center">
  <h2 className="text-2xl sm:text-3xl font-semibold mb-10 sm:mb-12">
    From idea to video in seconds
  </h2>

  <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center gap-3 sm:gap-6 text-sm">
    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl">Topic</div>
    <div>→</div>
    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl">Script</div>
    <div>→</div>
    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl">Voice</div>
    <div>→</div>
    <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl">Video</div>
  </div>
</section>
<section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
  <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-12">
    See it in action
  </h2>

<div className="min-h-[34rem] sm:min-h-96 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 text-white flex items-center justify-center p-4 sm:p-6">

  <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 w-full">

    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
      <h3 className="font-bold text-lg">Input Topic</h3>
      <p className="mt-2">Binary Search</p>
    </div>

    <div className="text-3xl sm:text-5xl rotate-90 lg:rotate-0">→</div>

    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
      <h3 className="font-bold text-lg">AI Processing</h3>
      <p className="mt-2">Generating Script...</p>
    </div>

    <div className="text-3xl sm:text-5xl rotate-90 lg:rotate-0">→</div>

    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
      <div className="text-4xl mb-2">🎥</div>
      <h3 className="font-bold text-lg">Explainer Video</h3>
    </div>

  </div>

</div>
</section>
<section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50 dark:bg-[#0a0a0a]">
  <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-16">
    Loved by creators and learners
  </h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
    {[
      "Saved me hours of editing time!",
      "Perfect for explaining coding concepts.",
      "My YouTube workflow is now 10x faster.",
    ].map((t, i) => (
      <div key={i} className="p-6 rounded-xl bg-white dark:bg-black border">
        <p>"{t}"</p>
      </div>
    ))}
  </div>
</section>
<section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center">
  <h2 className="text-2xl sm:text-3xl font-semibold mb-10 sm:mb-12">
    Why choose Explaino AI?
  </h2>

  <div className="grid md:grid-cols-2 gap-6 text-left">
    <div className="p-6 bg-red-100 dark:bg-red-900 rounded-xl">
      ❌ Traditional Video Creation
      <ul className="mt-4 space-y-2 text-sm">
        <li>Time-consuming</li>
        <li>Requires editing skills</li>
        <li>Expensive tools</li>
      </ul>
    </div>

    <div className="p-6 bg-green-100 dark:bg-green-900 rounded-xl">
      ✅ Explaino AI
      <ul className="mt-4 space-y-2 text-sm">
        <li>Instant generation</li>
        <li>No editing needed</li>
        <li>Simple and fast</li>
      </ul>
    </div>
  </div>
</section>
<section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
  <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-12">
    Frequently Asked Questions
  </h2>

  <div className="space-y-6">
    {[
      {
        q: "How long does it take to generate a video?",
        a: "Usually within seconds to a minute depending on complexity.",
      },
      {
        q: "Can I download the videos?",
        a: "Yes, you can download and share them anywhere.",
      },
      {
        q: "Is it free?",
        a: "We offer a free plan with optional premium features.",
      },
    ].map((faq, i) => (
      <div key={i}>
        <h3 className="font-semibold">{faq.q}</h3>
        <p className="text-gray-500 mt-2">{faq.a}</p>
      </div>
    ))}
  </div>
</section>

      {/* DEMO / INTERACTIVE */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 text-center bg-gray-50 dark:bg-[#0a0a0a]">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Try a sample instantly
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {["Binary Search", "Stack", "Recursion"].map((topic) => (
            <button
              key={topic}
              className="px-5 py-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>

      

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Start creating videos in seconds
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          No editing. No complexity. Just ideas → videos.
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg transition">
          Get Started Free
        </button>
      </section>

    </main>
  );
}
