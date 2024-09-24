import { z } from "zod";

export const partnerRegisterSchema = z.object({
  companyName: z.string({
    required_error: "Se requiere el nombre de la empresa",
  }),
  nit: z
    .string({
      required_error: "Se requiere el nit de la empresa",
    })
    .max(10, "Debe ser de máximo 10 números."),
  contact: z.string({
    required_error: "Se requiere el nombre del representante de la empresa",
  }),
  contactNumber: z
    .string({
      required_error: "Se requiere el numero del representante de la empresa",
    })
    .max(10, "Debe ser de máximo 10 números."),
  email: z
    .string({
      required_error: "Se requiere el correo de la empresa",
    })
    .email("Email no válido."),
});
