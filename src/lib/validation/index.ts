import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Nome Muito Curto"}),
    username: z.string().min(2, {message: "Nome De Usuário Muito Curto"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "A Senha Deve Possuir Pelo Menos 8 Caracteres"}),
  })

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "A Senha Deve Possuir Pelo Menos 8 Caracteres"}),
  })

  export const PostValidation = z.object({
   caption: z.string().min(5).max(2200),
   file: z.custom<File[]>(),
   location: z.string().min(2).max(100),
   tags: z.string(),
  })