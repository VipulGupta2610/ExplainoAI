import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import VideoPreview from "../Components/VideoPreview";
import { api } from "../api/axios";
import { loginUser } from "../redux/authslice";
import toast from "react-hot-toast";

const aiSentences = [
  "Short videos between 30 and 60 seconds usually perform better for retention.",
  "Specific topics like Binary Search in Java perform better than broad topics like DSA.",
  "Strong hooks in the first 5 seconds can increase watch time significantly.",
  "Educational videos work better when examples are practical and relatable.",
  "Finance videos gain more trust when they use clear numbers and simple examples.",
  "Motivational content performs better with emotional storytelling and a strong ending.",
  "Technology videos get higher retention when complex ideas use simple analogies.",
  "Hindi voice with English-style subtitles can improve reach for Indian audiences.",
  "Videos longer than 90 seconds need a very strong hook to retain viewers.",
  "Ending with a strong CTA like Save this for later often performs well.",
  "A focused title improves clicks before the video even starts.",
  "Short, punchy sentences make subtitle-based videos easier to watch.",
];

const initialInfo = {
  Video_Type: "short",
  topic: "",
  Niche: "Education",
  Voice: "female",
  Duration: 60,
  Style: "Formal",
  Tone: "English",
  Subtitles: true,
  Background_Music: false,
  Auto_Highlight_Keywords: true,
};

export default function GeneratePage() {
  const [info, setInfo] = useState(initialInfo);
  const [generatedData, setGeneratedData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiIndex, setAiIndex] = useState(0);

  const navigate = useNavigate();
  const { userid } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);

  const updateInfo = (key, value) => {
    setInfo((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const onsubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate("/Login");
      return;
    }

    if (!info.topic.trim()) {
      toast.error("Please enter a topic first");
      return;
    }

    try {
      setIsGenerating(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const payload = {
        ...info,
        topic: info.topic.trim(),
        Duration: Number(info.Duration),
        Duartion: Number(info.Duration),
      };

      const res = await api.post(
        `/generate/GeneratePage/${userid}`,
        payload
      );

      dispatch(loginUser(res.data.user));
      setGeneratedData({
        ...res.data,
        settings: payload,
      });

      toast.success("Video assets generated successfully");
    } catch (error) {
      console.log("Error at generate page", error);
      toast.error(
        error.response?.data?.message ||
        "Video generation failed"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAiIndex((prev) =>
        prev === aiSentences.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen px-6 mt-15 py-16 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Create Your AI Video
        </h1>
        <p className="text-gray-500">
          Customize every detail and generate high-quality videos instantly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        <form onSubmit={onsubmit}>
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Video Type
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {["reel", "short", "full"].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => updateInfo("Video_Type", type)}
                    className={`p-4 rounded-xl border ${info.Video_Type === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-900"
                      }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                Topic
              </h2>
              <input
                type="text"
                value={info.topic}
                placeholder="e.g. Binary Search"
                className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-900"
                onChange={(event) => updateInfo("topic", event.target.value)}
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                Niche
              </h2>
              <select
                value={info.Niche}
                onChange={(event) => updateInfo("Niche", event.target.value)}
                className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-900"
              >
                <option value="Education">Education</option>
                <option value="Technology">Technology</option>
                <option value="Motivation">Motivation</option>
                <option value="Finance">Finance</option>
              </select>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                Voice
              </h2>
              <div className="flex gap-4">
                {["female", "male"].map((voice) => (
                  <button
                    type="button"
                    key={voice}
                    onClick={() => updateInfo("Voice", voice)}
                    className={`px-6 py-3 rounded-xl ${info.Voice === voice
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-900"
                      }`}
                  >
                    {voice.toUpperCase()}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                Duration ({info.Duration}s)
              </h2>
              <input
                type="range"
                min="15"
                max="300"
                value={info.Duration}
                onChange={(event) =>
                  updateInfo("Duration", Number(event.target.value))
                }
                className="w-full"
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                Style & Language
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={info.Style}
                  onChange={(event) => updateInfo("Style", event.target.value)}
                  className="p-4 rounded-xl bg-gray-100 dark:bg-gray-900"
                >
                  <option value="Formal">Formal</option>
                  <option value="Casual">Casual</option>
                  <option value="Engaging">Engaging</option>
                </select>

                <select
                  value={info.Tone}
                  onChange={(event) => updateInfo("Tone", event.target.value)}
                  className="p-4 rounded-xl bg-gray-100 dark:bg-gray-900"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">
                Advanced Settings
              </h2>
              <div className="space-y-4 text-sm text-gray-500">
                <label className="flex justify-between gap-4">
                  Subtitles
                  <input
                    type="checkbox"
                    checked={info.Subtitles}
                    onChange={(event) =>
                      updateInfo("Subtitles", event.target.checked)
                    }
                  />
                </label>

                <label className="flex justify-between gap-4">
                  Background Music
                  <input
                    type="checkbox"
                    checked={info.Background_Music}
                    onChange={(event) =>
                      updateInfo("Background_Music", event.target.checked)
                    }
                  />
                </label>

                <label className="flex justify-between gap-4">
                  Auto Highlight Keywords
                  <input
                    type="checkbox"
                    checked={info.Auto_Highlight_Keywords}
                    onChange={(event) =>
                      updateInfo("Auto_Highlight_Keywords", event.target.checked)
                    }
                  />
                </label>
              </div>
            </section>

            <div className="mt-16 max-w-4xl mx-auto">
              <motion.button
                type="submit"
                disabled={isGenerating}
                whileHover={!isGenerating ? { scale: 1.01 } : {}}
                className={`w-full py-4 text-lg rounded-xl font-semibold transition ${isGenerating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
              >
                {isGenerating ? "Generating Video..." : "Generate Video"}
              </motion.button>
            </div>
          </div>
        </form>

        <div className="space-y-8">
          {isGenerating ? (
            <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900">
              <h3 className="font-semibold mb-4">
                Generating Your Video...
              </h3>
              <div className="animate-pulse space-y-4">
                <div className="h-[400px] rounded-2xl bg-gray-300 dark:bg-gray-800"></div>
                <div className="h-12 rounded-xl bg-gray-300 dark:bg-gray-800"></div>
                <div className="h-12 rounded-xl bg-gray-300 dark:bg-gray-800"></div>
              </div>
            </div>
          ) : !generatedData ? (
            <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900">
              No video generated yet
            </div>
          ) : (
            <VideoPreview
              script={generatedData.script}
              voiceFile={generatedData.voiceFile}
              videoType={generatedData.settings.Video_Type}
              niche={generatedData.settings.Niche}
              topic={generatedData.settings.topic}
              showSubtitles={generatedData.settings.Subtitles}
              highlightKeywords={generatedData.settings.Auto_Highlight_Keywords}
              backgroundMusic={generatedData.settings.Background_Music}
              style={generatedData.settings.Style}
            />
          )}

          <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900">
            <h3 className="font-semibold mb-4">
              Summary
            </h3>
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <li>Type: {info.Video_Type}</li>
              <li>Voice: {info.Voice}</li>
              <li>Duration: {info.Duration}s</li>
              <li>Niche: {info.Niche}</li>
              <li>Language: {info.Tone}</li>
              <li>Style: {info.Style}</li>
              <li>Subtitles: {info.Subtitles ? "On" : "Off"}</li>
              <li>Background Music: {info.Background_Music ? "On" : "Off"}</li>
              <li>
                Keyword Highlights: {info.Auto_Highlight_Keywords ? "On" : "Off"}
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => navigate("/PricingPage")}
            className="bg-blue-600 mt-12 w-full p-3 hover:scale-101 transition-all rounded-2xl text-white font-semibold"
          >
            Upgrade to Pro
          </button>

          <div className="p-6 rounded-2xl bg-blue-100 dark:bg-blue-900">
            <h3 className="font-semibold mb-2">
              AI Suggestion
            </h3>
            <p className="text-sm">
              {aiSentences[aiIndex]}
            </p>
          </div>
        </div>
      </div>

      <section className="mt-20 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Tips for better videos
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-500">
          <div>Keep topics specific for better results</div>
          <div>Use shorter durations for social media</div>
          <div>Choose engaging tone for higher retention</div>
        </div>
      </section>
    </main>
  );
}
