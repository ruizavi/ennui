"use client";
import { modal } from "@/components/modal/observer";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const [test, setTest] = useState<boolean>(true);

  return (
    <>
      <button
        onClick={() =>
          modal<{ hola: string; otra: boolean }>(
            ({ closeModal, hola, otra }) => (
              <p>
                holaaaaa{hola}
                <button onClick={closeModal}>x</button>
                <button onClick={() => setTest((value) => !value)}>
                  otro button
                </button>
                {JSON.stringify(otra)}
              </p>
            ),
            {
              data: {
                hola: crypto.randomUUID(),
                otra: test,
              },
              classNames: {
                modal: `w-1/2 ${test ? "bg-white" : ""}`,
              },
            }
          )
        }
      >
        que tal?
      </button>
      <code>{JSON.stringify(searchParams.getAll("id"))}</code>
    </>
  );
}
