"use client";

import Image from "next/image";
import Github from "../../../assets/github.svg";
import Gmail from "../../../assets/gmail.svg";
import { useForm } from "react-hook-form";
import { LoginUser } from "@/libs/types";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema } from "@/libs/zod";
import LinkTransition from "@/components/LinkTransition";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: zodResolver(LoginUserSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.ok) throw new Error();

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <main className="h-dvh md:flex">
      <section className="grid w-full md:w-1/2 lg:w-4/12">
        <header>
          <h1 className="my-12 text-4xl font-bold text-center">Log In</h1>
          <p className="text-xl font-bold text-center">Or</p>
          <div className=" mt-12 flex justify-center gap-8">
            <button
              className="w-12 p-1 border rounded-full"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              <Image src={Github} alt="Github Log In" />
            </button>
            <Image
              src={Gmail}
              alt="Gmail Log In"
              className="w-12 p-1 border rounded-full"
            />
          </div>
        </header>
        <form onSubmit={onSubmit}>
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
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="text-xs text-red-500">{message}</p>
              )}
            />
          </div>
          <button
            type="submit"
            className="block w-1/2 p-4 mx-auto mt-16 bg-green-300 rounded-full hover:bg-green-400"
          >
            Log In
          </button>
        </form>
        <p className="flex mt-auto p-4">
          Dont have an account?
          <LinkTransition
            href="/auth/register"
            className="text-green-600 font-semibold px-4 hover:text-green-500"
          >
            Register Now
          </LinkTransition>
        </p>
      </section>
      <aside className="hidden transition-all md:block md:w-1/2 lg:w-8/12 bg-slate-600"></aside>
    </main>
  );
}
