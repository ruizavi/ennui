"use client";
import { ModalContainer } from "@/components/modal/ModalContainer";
import { modal } from "@/components/modal/observer";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  return (
    <>
      <button
        onClick={() =>
          modal<{ hola: string }>(
            ({ closeModal, hola }) => (
              <p onClick={closeModal}>holaaaaa{hola}</p>
            ),
            {
              data: {
                hola: crypto.randomUUID(),
              },
            }
          )
        }
      >
        que tal?
      </button>
      <code>{JSON.stringify(searchParams.getAll("id"))}</code>
      <ModalContainer />
    </>
  );
}
