import { getTranslationWithExplanation } from "../../models/completion/completion"
import { NextFunction, Request, Response } from 'express'

export const getCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const MOCK_TO_TRANSLATE = 'I am a student X'

    const { query } = req.body

    console.log('I am request', req.body)
    console.log('query', query)

    const response = await getTranslationWithExplanation(query)

    console.log(response?.data)
    if (response?.data) {
        // const result = response.data.choices[0].text
        const result = response.data.choices[0].message?.content

        const mockResult = {
            text: result
        }

        res.status(200)
        res.send(mockResult)

        return
    }
}