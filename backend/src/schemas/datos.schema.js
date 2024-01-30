import { z } from "zod";

export const validacionDatosEsfuerzo = z.object({
  diasTrabajados: z
    .number({
      required_error: "Días trabajados son requeridos",
    })
    .int()
    .positive({ message: "Días trabajados deben ser un número positivo" })
    .max(31, { message: "Días trabajados no pueden ser más de 31" }),

  horasPF: z
    .number({
      required_error: "Horas PF son requeridas",
    })
    .int()
    .positive({ message: "Horas PF deben ser un número positivo" }),

  horasDia: z
    .number({
      required_error: "Horas por día son requeridas",
    })
    .int()
    .positive({ message: "Horas por día deben ser un número positivo" })
    .max(24, { message: "Horas por día no pueden ser más de 24" }),
});


export const validacionCantidad = z.object({
    cantidad: z
      .number({
        required_error: "Cantidad es requeridos",
      })
      .int()
      .positive({ message: "La cantidad debe ser un número positivo" })
  });
  
  export const involucradoControl = z.object({
    nombre: z.string({
      required_error: "Nombre es requerido",
    }),
    rol: z.string({
      required_error: "Apellido es requerido",
    }),
    sueldo: z
      .number({
        required_error: "Sueldo es requerido",
      })
      .positive({ message: "El sueldo debe ser un valor superior a 0" })
  });
  