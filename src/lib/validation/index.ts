import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Nome Muito Curto"}),
    username: z.string().min(2, {message: "Nome De Usuário Muito Curto"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "A Senha Deve Possuir Pelo Menos 8 Caracteres"}),
  })