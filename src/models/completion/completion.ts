import { query } from "express"
import { openai } from "../../utils/open-ai/open-ai"

const PROMPT_INTRODUCTION = 'Translate the following text to Japanese, then separate each word and describe in English what the word means and why you used it.'

const getPrompt = (toTranslate: string) => {
    return `${PROMPT_INTRODUCTION}: "${toTranslate}"`
}

// export const getTranslationWithExplanation = async (toTranslate: string) => {
//     return openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: getPrompt(toTranslate),
//         max_tokens: 1000,
//         temperature: 0,
//     }).catch((err) => {
//         console.log(err)
//     })
// }

export const getTranslationWithExplanation = async (toTranslate: string) => {
    return openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // prompt: getPrompt(toTranslate),
        messages: [{role: "system", content: "You are a Japanese language teacher, a student asks you a sentence, you translate it to Japanese and then you separate the words and describe them in English."}, {role: 'user', content: toTranslate}],
        max_tokens: 1000,
        temperature: 0,
    }).catch((err) => {
        console.log(err)
    })
}