import { getTranslationWithExplanation } from "../../models/completion/completion"
import { NextFunction, Request, Response } from 'express'

export const getCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const MOCK_TO_TRANSLATE = 'I am a student X'

    const response = await getTranslationWithExplanation(MOCK_TO_TRANSLATE)

    console.log(response?.data)
    if (response?.data) {
        const result = response.data.choices[0].text

        res.status(200)
        res.send(result)

        return
    }
}