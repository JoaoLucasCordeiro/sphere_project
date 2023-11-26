import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


const SigninForm = () => {

  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount()

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      return toast({
        title: "Login deu errado. Por favor tente novamente.",
      })
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/')
    } else {
      return toast({
        title: "Login deu errado. Por favor tente novamente.",
      })
    }
  }

  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">

        <div className="flex items-center gap-2">
          <img src="/assets/images/logo.png" alt="Logo" width={100} height={100} />
          <h1 className="text-5xl font-bold">Sphere</h1>
        </div>


        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Entre na sua conta
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 text-center">Bem vindo de volta ao Sphere! Preencha com os seus dados.</p>

        <form onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4 p-3">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field}/>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="shad-button_primary"
          >
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                Carregando...
              </div>
            ) : (
              "Entrar"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Não possui uma conta?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Registre-se</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm