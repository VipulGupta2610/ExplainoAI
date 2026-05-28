import gTTS from "gtts";
import fs from "fs";
import path from "path";

export const generateVoice = async ( scriptText,
  selectedLanguage) => {
  try {
    const outputPath = path.join(
      "uploads",
      `voice-${Date.now()}.mp3`
    );

    // create uploads folder if not exists
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }

   const language =
  selectedLanguage === "Hindi"
    ? "hi"
    : "en";

const gtts = new gTTS(scriptText, language);

    await new Promise((resolve, reject) => {
      gtts.save(outputPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log("Voice generated successfully");

    return outputPath;
  } catch (error) {
    console.log("Error in Voice Generation");
    console.log(error);
  }
};