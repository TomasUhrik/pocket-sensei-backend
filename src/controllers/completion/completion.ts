import { getTranslationWithExplanation, getTranslationWithExplanationJp } from "../../models/completion/completion"
import { NextFunction, Request, Response } from 'express'

export const getCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.body

    const response = await getTranslationWithExplanation(query)

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

export const getCompletionJp = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.body

    const response = await getTranslationWithExplanationJp(query)

    if (response) {
        // const result = response.data.choices[0].text
        const result = response

        const mockResult = {
            text: result
        }

        res.status(200)
        res.send(mockResult)

        return
    }
}