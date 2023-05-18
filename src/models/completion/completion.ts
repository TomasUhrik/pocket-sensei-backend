import { openai } from "../../utils/open-ai/open-ai"

const PROMPT_INTRODUCTION = 'Translate this text into Japanese, then separate the words and explain their meaning'

const getPrompt = (toTranslate: string) => {
    return `${PROMPT_INTRODUCTION}: "${toTranslate}"`
}

export const getTranslationWithExplanation = async (toTranslate: string) => {
    return openai.createCompletion({
        model: "text-davinci-003",
        prompt: getPrompt(toTranslate),
        max_tokens: 1000,
        temperature: 0,
    }).catch((err) => {
        console.log(err)
    })
}