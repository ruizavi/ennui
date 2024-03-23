"use client";

import RichText from "@/components/utils/editor/RichText";
import { CloseIcon } from "@/components/utils/icons/CloseIcon";
import { ModalProps } from "@/components/utils/modal/types";

export function CardModal({
  closeModal,
  listId,
}: ModalProps<{ listId: string }>) {
  return (
    <div>
      <header className="flex gap-4 items-center py-2">
        <button onClick={closeModal}>
          <CloseIcon width={24} height={24} className="hover:fill-[#C11D5A]" />
        </button>
        <h1>Add Card</h1>
      </header>
      <RichText />
    </div>
  );
}
