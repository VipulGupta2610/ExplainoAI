import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateScript = async (data) => {
  try {
    const {
      Video_Type,
      topic,
      Niche,
      Voice,
      Duration,
      Duartion,
      Style,
      Tone,
      Subtitles,
      Background_Music,
      Auto_Highlight_Keywords,
    } = data;

    const selectedDuration = Number(Duration || Duartion || 60);
    const subtitleInstruction = Subtitles
      ? "Write short subtitle-friendly sentences."
      : "Do not optimize for subtitles; write natural spoken paragraphs.";
    const highlightInstruction = Auto_Highlight_Keywords
      ? "Include clear key terms that can be highlighted on screen."
      : "Avoid keyword-heavy phrasing.";
    const musicInstruction = Background_Music
      ? "Make the pacing suitable for soft background music."
      : "Keep the pacing strong without relying on background music.";

    let nicheType = "";

    if (Niche === "Education") {
      nicheType = "educational";
    } else if (Niche === "Technology") {
      nicheType = "technological";
    } else if (Niche === "Motivation") {
      nicheType = "motivational";
    } else if (Niche === "Finance") {
      nicheType = "financial";
    } else {
      nicheType = "general";
    }

const prompt = `
Create a highly engaging YouTube-style ${nicheType} video script.

Topic: ${topic}
Video Type: ${Video_Type}
Duration: ${selectedDuration} seconds
Language: ${Tone}
Style: ${Style}
Voice: ${Voice}
Subtitles Enabled: ${Boolean(Subtitles)}
Background Music Enabled: ${Boolean(Background_Music)}
Auto Highlight Keywords: ${Boolean(Auto_Highlight_Keywords)}

Rules:
- Natural human tone
- Strong hook
- No robotic language
- Simple and engaging
- Real relatable examples
- High retention style
- No labels like [Intro]
- Match the script length to about ${selectedDuration} seconds.
- ${subtitleInstruction}
- ${highlightInstruction}
- ${musicInstruction}

IMPORTANT:
Return ONLY valid JSON format like this:

{
  "hook": "",
  "main_explanation": "",
  "example": "",
  "summary": "",
  "ending_cta": ""
}

Do not return anything outside JSON.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const finalScript =
      response.data.choices[0].message.content;

    console.log("Generated Script:");
    console.log(finalScript);

    const parsedScript = JSON.parse(finalScript);
    console.log(parsedScript)

    return parsedScript;
  } catch (error) {
    console.log("Error in OpenRouter");

    console.log(
      error.response?.data || error.message
    );
  }
};
