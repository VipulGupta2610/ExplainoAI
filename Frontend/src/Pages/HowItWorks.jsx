import { motion } from "framer-motion";
import {
  FileText,
  Mic,
  PlayCircle,
  Download,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FileText size={36} />,
      title: "Enter Your Topic",
      description:
        "Provide your video topic, niche, duration, tone, language, and style.",
    },
    {
      icon: <Sparkles size={36} />,
      title: "AI Generates Script",
      description:
        "Our AI creates an engaging script with hooks, explanations, examples, and conclusions.",
    },
    {
      icon: <Mic size={36} />,
      title: "Voice Creation",
      description:
        "Convert your script into natural-sounding voiceovers in multiple languages and voices.",
    },
    {
      icon: <PlayCircle size={36} />,
      title: "Preview & Export",
      description:
        "Preview your AI-generated video instantly and export it for social media.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold"
        >
          How <span className="text-blue-500">Explaino AI</span> Works
        </motion.h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Turn any topic into a professional AI-generated video in minutes.
          No editing skills required.
        </p>
      </section>

      {/* STEPS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="relative p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm"
            >
              <div className="text-blue-500 mb-6">
                {step.icon}
              </div>

              <div className="absolute top-6 right-6 text-4xl font-bold text-blue-500/20">
                0{index + 1}
              </div>

              <h3 className="text-xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            What Happens Behind The Scenes?
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Explaino AI automates the complete content creation workflow.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-950/30">
            <h3 className="text-2xl font-bold mb-4">
              AI Script Writing
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Advanced language models create engaging educational,
              motivational, technology, and finance content based on your
              inputs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-purple-50 dark:bg-purple-950/30">
            <h3 className="text-2xl font-bold mb-4">
              Voice Synthesis
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Convert scripts into realistic voices with support for
              multiple languages and narration styles.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-green-50 dark:bg-green-950/30">
            <h3 className="text-2xl font-bold mb-4">
              Dynamic Subtitles
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Automatically synchronized subtitles make videos more
              engaging and easier to consume.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-orange-50 dark:bg-orange-950/30">
            <h3 className="text-2xl font-bold mb-4">
              Export Anywhere
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Publish your generated videos to YouTube, Instagram,
              LinkedIn, TikTok, and more.
            </p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Why Choose Explaino AI?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-xl mb-3">
              Save Hours
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Generate videos in minutes instead of spending hours writing,
              recording, and editing.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-xl mb-3">
              No Experience Needed
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Perfect for creators, students, teachers, marketers,
              and businesses.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-xl mb-3">
              Scale Content Fast
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Create more videos, reach more people, and grow faster.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 px-6">

        <div className="max-w-4xl mx-auto text-center rounded-3xl p-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">

          <Download size={48} className="mx-auto mb-6" />

          <h2 className="text-4xl font-bold mb-6">
            Ready To Create Your First AI Video?
          </h2>

          <p className="mb-8 text-lg opacity-90">
            Generate scripts, voices, subtitles and videos in one place.
          </p>

          <button className="px-8 py-4 rounded-2xl bg-white text-black font-semibold inline-flex items-center gap-2 hover:scale-105 transition">
            Get Started
            <ArrowRight size={18} />
          </button>

        </div>

      </section>
    </div>
  );
}