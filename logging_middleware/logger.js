import axios from "axios";
import dotenv from "dotenv";
import {
  VALID_STACKS,
  VALID_LEVELS,
  VALID_PACKAGES,
} from "./constants";

dotenv.config();
const ACCESS_TOKEN = process.env.LOG_ACCESS_TOKEN || "";

export const Log = async (stack, level, packageName, message) => {
  try {
    if (!VALID_STACKS.includes(stack)) throw new Error("Invalid Stack");

    if (!VALID_LEVELS.includes(level)) throw new Error("Invalid Level");

    if (!VALID_PACKAGES.includes(packageName)) throw new Error("Invalid Package");

    if (!ACCESS_TOKEN) console.warn("LOG_ACCESS_TOKEN not set; requests may be rejected");

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};