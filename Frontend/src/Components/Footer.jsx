// import {  Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-gray-600 dark:text-gray-400">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Explaino <span className="text-blue-500">AI</span>
          </h2>
          <p className="mt-3 text-sm">
            Turn topics into videos instantly with AI-powered explanations.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-sm font-semibold text-black dark:text-white mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Features</a></li>
            <li><a href="#">How it Works</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Roadmap</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm font-semibold text-black dark:text-white mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Docs</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold text-black dark:text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 px-6 flex flex-col md:flex-row justify-between items-center">

        <p className="text-sm">
          © {new Date().getFullYear()} Explaino AI. All rights reserved.
        </p>

        <div className="flex gap-4 mt-3 md:mt-0">
          {/* <gith size={18} className="cursor-pointer hover:text-black dark:hover:text-white" /> */}
          {/* <Twitter size={18} className="cursor-pointer hover:text-black dark:hover:text-white" />
          <Linkedin size={18} className="cursor-pointer hover:text-black dark:hover:text-white" /> */}
        </div>

      </div>
    </footer>
  );
}