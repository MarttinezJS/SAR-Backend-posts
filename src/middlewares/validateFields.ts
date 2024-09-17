import { validator } from "hono/validator";
import { z, ZodEffects } from "zod";

const validateFields = (
  schema: z.ZodObject<any> | ZodEffects<z.ZodObject<any>>
) =>
  validator("json", (value, context) => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      return context.json({
        error: true,
        message: "Campos no válidos.",
        body: parsed.error,
      });
    }
    return parsed.data;
  });

export { validateFields };
