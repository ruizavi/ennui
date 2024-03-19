import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { List } from "@prisma/client";

export const ListElement = (props: List) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="w-[270px] bg-white bg-opacity-30 rounded-lg"
    >
      <h1 className="text-center bg-white bg-opacity-50 rounded-t-lg py-2 font-semibold">
        {props.name}
      </h1>
    </li>
  );
};
