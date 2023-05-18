import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv'

dotenv.config();

const configuration = new Configuration({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPEN_AI_API_KEY,
});

export const openai = new OpenAIApi(configuration);