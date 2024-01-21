import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({
    required_error: "Nombre es requerido",
  }),
  lastname: z.string({
    required_error: "Apellido es requerido",
  }),
  email: z
    .string({
      required_error: "Correo electrónico es requerido",
    })
    .email({
      message: "Correo electrónico no válido",
    }),
  password: z
    .string({
      required_error: "Contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener más de 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "La contraseña debe tener más de 6 caracteres",
  }),
});


export const cambiodatosSchema = z.object({
  name: z.string({
    required_error: "Nombre es requerido",
  }),
  lastname: z.string({
    required_error: "Apellido es requerido",
  }),
  email: z
    .string({
      required_error: "Correo electrónico es requerido",
    })
    .email({
      message: "El correo electrónico no es válido",
    }),
});

export const cambioContra = z.object({
  password: z
    .string({
      required_error: "Contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener más de 6 caracteres",
    }),
});