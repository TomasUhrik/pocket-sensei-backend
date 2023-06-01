import { query } from "express"
import { openai } from "../../utils/open-ai/open-ai"

const PROMPT_INTRODUCTION = 'Translate the following text to Japanese, then separate each word and describe it.'

const getPrompt = (toTranslate: string) => {
    return `${PROMPT_INTRODUCTION}: "${toTranslate}"`
}

const PROMPT_JP_TO_ENG_TRANSLATION = 'Translate the following sentence from Japanese to English'

const getPromptJapaneseToEnglish = (toTranslate: string) => {
    return `${PROMPT_JP_TO_ENG_TRANSLATION}: "${toTranslate}"`
}

// const PROMPT_GRAMMAR = '文法を説明してください'
const PROMPT_GRAMMAR = 'この文の文法を説明してください'

//文法を説明してください。
const getPromptGrammarExplain = (toTranslate: string) => {
    return `${PROMPT_GRAMMAR}: "${toTranslate}"`
}

const PROMPT_EXPLANATION_JP = "言葉を分けて、一つ一つ説明してください"

const getPromptExplanationJp = (toTranslate: string) => {
    return `${PROMPT_EXPLANATION_JP}: "${toTranslate}"`
}

// const PROMPT_INTRODUCTION = 'Translate the following text to Japanese, then separate each word and describe in English what the word means and why you used it.'

// const getPrompt = (toTranslate: string) => {
//     return `${PROMPT_INTRODUCTION}: "${toTranslate}"`
// }

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
        messages: [{role: "system", content: "You are a Japanese language teacher"}, {role: 'user', content: getPrompt(toTranslate)}],
        max_tokens: 1000,
        temperature: 0,
    }).catch((err) => {
        console.log(err)
    })
}

export const getTranslationWithExplanationJp = async (toTranslate: string) => {
    const translatedSentence = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // prompt: getPrompt(toTranslate),
        messages: [{role: "system", content: "You translate stuff from Japanese to English"}, {role: 'user', content: getPromptJapaneseToEnglish(toTranslate)}],
        max_tokens: 1000,
        temperature: 0,
    }).catch((err) => {
        console.log(err)
    })

    if (!translatedSentence || !translatedSentence.data) {
        return
    }

    const translatedSentenceResult = translatedSentence.data.choices[0].message?.content

    // const second = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     // prompt: getPrompt(toTranslate),
    //     messages: [{role: "system", content: "You explain grammar of English sentences to Japanese students"}, {role: 'user', content: getPromptGrammarExplain(translatedSentenceResult || '')}],
    //     max_tokens: 1000,
    //     temperature: 0,
    // }).catch((err) => {
    //     console.log(err)
    // })

    // if (!second || !second.data) {
    //     return
    // }

    const third = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // prompt: getPrompt(toTranslate),
        messages: [{role: "system", content: "You explain grammar of English words to Japanese students"}, {role: 'user', content: getPromptExplanationJp(translatedSentenceResult || '')}],
        max_tokens: 1000,
        temperature: 0,
    }).catch((err) => {
        console.log(err)
    })

    if (!third || !third.data) {
        return
    }

    return translatedSentenceResult + '\n \n' + third.data.choices[0].message?.content
}