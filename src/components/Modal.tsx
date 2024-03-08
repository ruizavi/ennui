import { useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";
import { Show } from "./Show";
import { toBool } from "@/libs/utils";

interface Props {
  listen: string;
}

export function Modal({ listen, children }: PropsWithChildren<Props>) {
  const searchParams = useSearchParams();

  const listenedQuery = searchParams.get(listen);

  return (
    <Show>
      <Show.When isTrue={toBool(listenedQuery)}>
        <div className="absolute">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <p className="p-4">Modal Component</p>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      </Show.When>
    </Show>
  );
}
