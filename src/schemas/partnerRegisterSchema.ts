import { z } from "zod";

// zod 4: `required_error` ya no existe; el mensaje va en `error`.
export const partnerRegisterSchema = z.object({
  companyName: z.string({
    error: "Se requiere el nombre de la empresa",
  }),
  nit: z
    .string({
      error: "Se requiere el nit de la empresa",
    })
    .max(10, "Debe ser de máximo 10 números."),
  contact: z.string({
    error: "Se requiere el nombre del representante de la empresa",
  }),
  contactNumber: z
    .string({
      error: "Se requiere el numero del representante de la empresa",
    })
    .max(10, "Debe ser de máximo 10 números."),
  email: z.email({
    error: "Se requiere un correo válido para la empresa",
  }),
});
