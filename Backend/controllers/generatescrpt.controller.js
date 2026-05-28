import { generateScript } from "../services/ScriptService.js";
import { generateVoice } from "../services/voiceService.js";
import { generateSlides } from "../services/visualService.js";
import User from "../../Backend/schemas/user.schema.js"

export const generateVideoController = async (req, res) => {
  try {
    const { userid } = req.params;
    console.log(userid)
    const user = await User.findOne({ _id: userid }).select("-password")
    console.log("user founded is ")
    console.log(user?.name)
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: "User not found" })
      
    }
    
    if (user.creditAval <= 0) {
      res.status(400).json({ message: "No credit left to create video upgrade to pro" })
      return
    }
    
    const script = await generateScript(req.body);
    // combine JSON script into one text
    const fullScriptText = `
${script.hook}

${script.main_explanation}

${script.example}

${script.summary}

${script.ending_cta}
`;

const voiceFile = await generateVoice(
  fullScriptText,
  req.body.Tone
);

user.creditAval-=1;
user.totalVideos.push({
  videoName: req.body.topic,
  type: req.body.Video_Type,
  status: "Completed",
  duration: Number(req.body.Duration || req.body.Duartion || 60),
  niche: req.body.Niche,
  generatedAt: new Date(),
})
await user.save();
console.log("EVERYTHING IS DONE")
    // const slides = await generateSlides(script);

    res.status(200).json({
      success: true,
      script,
      voiceFile,
user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
