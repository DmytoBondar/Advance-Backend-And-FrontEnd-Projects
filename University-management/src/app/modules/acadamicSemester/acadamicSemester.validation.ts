import { z } from 'zod';
import { academicSemesterCode, academicSemesterTitles, academicStartMonth } from './acadamicSemester.constant';

const createSemesterValidation = z.object({
    body: z.object({
        title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
            required_error: "Title is required !",
        }),
        code: z.enum([...academicSemesterCode] as [string, ...string[]], {
            required_error: "Code is required !",
        }),
        year: z.string({
            required_error: "Year is required !",
        }),
        startMonth: z.enum([...academicStartMonth] as [string, ...string[]], {
            required_error: "Start is required !",
        }),
        endMonth: z.enum([...academicStartMonth] as [string, ...string[]], {
            required_error: "End is required !",
        }),
    })

})

export const ZodValidation = {
    createSemesterValidation
};