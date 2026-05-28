import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const checkModels = async () => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${process.env.gemini}`;

    const response = await axios.get(url);

    console.log("Available Models:\n");

    response.data.models.forEach((model) => {
      console.log(model.name);
    });
  } catch (error) {
    console.log("Error checking models:");

    console.log(
      error.response?.data || error.message
    );
  }
};

checkModels();