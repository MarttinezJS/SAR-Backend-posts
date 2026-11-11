import { validator } from "hono/validator";
import { z } from "zod";

const validateFields = (schema: z.ZodType) =>
  validator("json", (value, context) => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      return context.json(
        {
          error: true,
          message: "Campos no válidos.",
          body: parsed.error,
        },
        400,
      );
    }
    return parsed.data;
  });

export { validateFields };
