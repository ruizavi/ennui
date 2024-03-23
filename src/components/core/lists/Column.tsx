import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UIList } from "@/libs/types";
import { CardModal } from "../cards/CardModal";
import { Each } from "@/components/utils/Each";
import { AddIcon } from "@/components/utils/icons/AddIcon";
import { MoveIcon } from "@/components/utils/icons/MoveIcon";
import { modal } from "@/components/utils/modal/observer";

export function Column({ name, id, metadata, ...props }: UIList) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const colorBg = metadata?.color ?? "#FFFFFF";

  return (
    <li
      style={{ ...style, backgroundColor: colorBg + "4D" }}
      className={`w-[270px] bg-opacity-30 rounded-lg h-auto`}
    >
      <header
        className={`flex justify-between bg-opacity-50 rounded-t-lg`}
        style={{ backgroundColor: colorBg + "33" }}
      >
        <h1 className="text-center py-2 font-semibold w-full">{name}</h1>
        <button
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="group px-4"
        >
          <MoveIcon
            height={16}
            width={16}
            className="fill-[#C11D5A] group-hover:fill-[#CD4A7B]"
          />
        </button>
      </header>
      <main>
        <ul>
          <Each of={props.card} render={(c) => <li>{c.title}</li>} />
        </ul>
      </main>
      <footer
        className={`flex justify-between bg-opacity-50 rounded-b-lg`}
        style={{ backgroundColor: colorBg + "33" }}
      >
        <button
          className="p-2 group flex gap-2 items-center hover:text-black/80 outline-none"
          onClick={() =>
            modal<{ listId: string }>(CardModal, {
              data: {
                listId: id,
              },
              classNames: {
                modal: "w-[512px] bg-white p-4 rounded-lg z-50",
                overlay: "z-50",
              },
            })
          }
        >
          <AddIcon
            height={16}
            width={16}
            className="fill-[#C11D5A] mx-auto group-hover:fill-[#CD4A7B]"
          />
          Add card
        </button>
      </footer>
    </li>
  );
}
