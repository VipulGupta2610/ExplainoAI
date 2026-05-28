import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

export const generateSlides = async (script) => {
  try {
    const slides = [
      script.hook,
      script.main_explanation,
      script.example,
      script.summary,
      script.ending_cta,
    ];

    if (!fs.existsSync("slides")) {
      fs.mkdirSync("slides");
    }

    const templatePath = path.join(
      "templates",
      "slideTemplate.html"
    );

    const template = fs.readFileSync(
      templatePath,
      "utf-8"
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
   await page.setViewport({
  width: 1280,
  height: 720,
  deviceScaleFactor: 1,
});

    const generatedSlides = [];

    for (let i = 0; i < slides.length; i++) {
      const slideContent = template.replace(
        "{{CONTENT}}",
        slides[i]
      );

      await page.setContent(slideContent);

      const outputPath = path.join(
        "slides",
        `slide-${i + 1}.png`
      );

     await page.screenshot({
  path: outputPath,
  fullPage: false,
  omitBackground: false,
});

      generatedSlides.push(outputPath);
    }

    await browser.close();

    console.log("Slides generated successfully");

    return generatedSlides;
  } catch (error) {
    console.log("Error generating slides");
    console.log(error);
  }
};