"use client";

import LinkTransition from "@/components/LinkTransition";
import { NewUser } from "@/libs/types";
import { NewUserSchema } from "@/libs/zod";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<NewUser>({
    resolver: zodResolver(NewUserSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "post",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  });

  const password = watch("password");

  return (
    <main className="h-dvh md:flex">
      <aside className="hidden transition-all md:block md:w-1/2 lg:w-8/12 bg-slate-600"></aside>
      <section className="grid w-full md:w-1/2 lg:w-4/12">
        <form onSubmit={onSubmit}>
          <h1 className="my-12 text-4xl font-bold text-center">
            Create Account
          </h1>

          <div className="mx-12 my-8">
            <label className="block">Name</label>
            <input
              className="w-full p-3 bg-gray-200"
              type="text"
              {...register("name")}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="text-xs text-red-500">{message}</p>
              )}
            />
          </div>
          <div className="mx-12 my-8">
            <label className="block">Email</label>
            <input
              className="w-full p-3 bg-gray-200"
              type="email"
              {...register("email")}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="text-xs text-red-500">{message}</p>
              )}
            />
          </div>
          <div className="mx-12 my-8">
            <label className="block">Password</label>
            <input
              className="w-full p-3 bg-gray-200"
              type="password"
              {...register("password")}
            />
            <ul className="text-xs text-red-500">
              <li>
                {/([A-Z])/.test(password)
                  ? ""
                  : "Debe de contener al menos una letra mayuscula"}
              </li>
              <li>
                {/([a-z])/.test(password)
                  ? ""
                  : "Debe contener letras minusculas"}
              </li>
              <li>
                {/([0-9])/.test(password)
                  ? ""
                  : "Debe contener al menos un numero"}
              </li>
              <li>
                {/([*.!@$%^&])/.test(password)
                  ? ""
                  : "Debe de contener al uno de los siguientes [*.!@$%^&]"}
              </li>
              <li>
                {/^.{8,32}$/.test(password)
                  ? ""
                  : "Debe tener entre 8 y 32 caracteres"}
              </li>
            </ul>
          </div>
          <div className="mx-12 my-8">
            <label className="block">Confirm Password</label>
            <input
              className="w-full p-3 bg-gray-200"
              type="password"
              {...register("confirmPassword")}
            />
            <ErrorMessage
              errors={errors}
              name="confirmPassword"
              render={({ message }) => (
                <p className="text-xs text-red-500">{message}</p>
              )}
            />
          </div>

          <button
            type="submit"
            className="block w-1/2 p-4 mx-auto mt-16 bg-green-300 rounded-full hover:bg-green-400"
          >
            Register
          </button>
        </form>
        <p className="flex mt-auto p-4">
          You have an account?
          <LinkTransition
            href="/auth/login"
            className="text-green-600 font-semibold px-4 hover:text-green-500"
          >
            Log In
          </LinkTransition>
        </p>
      </section>
    </main>
  );
}
