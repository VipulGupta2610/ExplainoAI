import { motion } from "framer-motion";
import {
  Check,
  Crown,
  Sparkles,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      icon: <Sparkles size={22} />,
      price: "₹0",
      period: "/month",
      description:
        "Perfect for students and beginners who want to explore Explaino AI.",
      features: [
        "5 videos per month",
        "Max 60 sec duration",
        "Basic AI voice",
        "Standard templates",
        "Watermarked exports",
        "Community support",
      ],
      button: "Start Free",
      highlight: false,
    },
    {
      name: "Pro",
      icon: <Crown size={22} />,
      price: "₹499",
      period: "/month",
      description:
        "Best for creators, developers, and serious learners who need more power.",
      features: [
        "Unlimited videos",
        "Up to 10 min duration",
        "Premium male & female voices",
        "No watermark",
        "Priority rendering",
        "Advanced templates",
        "Shorts + full videos",
        "Priority support",
      ],
      button: "Upgrade to Pro",
      highlight: true,
    },
    {
      name: "Business",
      icon: <Rocket size={22} />,
      price: "₹1499",
      period: "/month",
      description:
        "Built for teams, educators, and agencies managing high-volume content.",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Bulk video generation",
        "Custom branding",
        "API access",
        "Dedicated support",
        "Advanced analytics",
        "Admin controls",
      ],
      button: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <main className="min-h-screen mt-12 bg-white dark:bg-black text-black dark:text-white px-6 py-16">

      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-blue-500 font-medium mb-4">
            Pricing Plans
          </p>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Simple Pricing for Powerful
            <span className="text-blue-500"> AI Video Creation</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose the perfect plan for your learning, content creation,
            and business growth. Start free and upgrade when you’re ready.
          </p>
        </motion.div>
      </section>

      {/* PRICING CARDS */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mb-24">

        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6 }}
            className={`rounded-3xl border p-8 relative transition
              ${
                plan.highlight
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-xl scale-[1.02]"
                  : "border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900"
              }
            `}
          >
            {/* MOST POPULAR */}
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}

            {/* PLAN HEADER */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 text-blue-500">
                {plan.icon}
                <h2 className="text-2xl font-bold text-black dark:text-white">
                  {plan.name}
                </h2>
              </div>

              <p className="text-gray-500 text-sm mb-6">
                {plan.description}
              </p>

              <div className="flex items-end gap-1">
                <h3 className="text-5xl font-bold">
                  {plan.price}
                </h3>
                <span className="text-gray-500 mb-2">
                  {plan.period}
                </span>
              </div>
            </div>

            {/* FEATURES */}
            <div className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="text-blue-500 mt-1 shrink-0"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button
              className={`w-full py-3 rounded-2xl font-medium transition
                ${
                  plan.highlight
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white dark:bg-black border border-gray-300 dark:border-zinc-700 hover:border-blue-500"
                }
              `}
            >
              {plan.button}
            </button>
          </motion.div>
        ))}
      </section>

      {/* WHY UPGRADE */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why upgrade to Pro?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Crown className="text-blue-500" />,
              title: "Unlimited Creation",
              desc: "Generate as many videos as you need without worrying about limits.",
            },
            {
              icon: <Rocket className="text-blue-500" />,
              title: "Faster Workflow",
              desc: "Priority rendering means your videos are ready much faster.",
            },
            {
              icon: <ShieldCheck className="text-blue-500" />,
              title: "Premium Quality",
              desc: "Better voices, longer videos, advanced templates, and zero watermark.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          {[
            {
              q: "Can I start with the free plan?",
              a: "Yes. You can use Explaino AI for free and upgrade anytime when you need more features.",
            },
            {
              q: "Can I cancel my Pro subscription anytime?",
              a: "Absolutely. There are no lock-ins. You can upgrade, downgrade, or cancel anytime.",
            },
            {
              q: "Do you support team plans?",
              a: "Yes. Our Business plan is designed for teams, educators, and agencies.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gray-100 dark:bg-zinc-900"
            >
              <h3 className="font-semibold mb-2">
                {faq.q}
              </h3>
              <p className="text-gray-500">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Start creating videos smarter 🚀
        </h2>

        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          Whether you're a student, creator, or business,
          Explaino AI helps you turn ideas into premium videos faster.
        </p>

        <button onClick={()=>{window.history.back()}} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-medium transition hover:scale-105">
          Get Started Free
        </button>

      </section>

    </main>
  );
}