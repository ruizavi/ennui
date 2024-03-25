"use client";

import { AddIcon } from "@/components/utils/icons/AddIcon";
import { modal } from "@/components/utils/modal/observer";
import { BoardModal } from "../modals/BoardModal";

type ActionFunc = (data: FormData) => Promise<unknown>;
type Props = { action: ActionFunc };

export const createBoardModalCall = (action: ActionFunc) =>
  modal<Props>(BoardModal, {
    classNames: {
      modal: "w-[512px] bg-white p-4 rounded-lg",
    },
    data: { action },
  });

export function CreateBoardButton({ action }: Props) {
  return (
    <button
      className="py-4 w-full hover:[&>svg]:fill-[#CD4A7B] outline-none"
      onClick={() => createBoardModalCall(action)}
    >
      <AddIcon className="fill-[#C11D5A] mx-auto" width={24} height={24} />
    </button>
  );
}
