// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { unknown } from "zod";

type ElementAlign = "left" | "center" | "right" | "justify";
type ElementType =
  | "paragraph"
  | "block-quote"
  | "heading-one"
  | "heading-two"
  | "list-item"
  | "numbered-list";

type CustomElement = {
  [key: string]: unknown;
  type: ElementType;
  align?: ElementAlign;
  children: CustomText[];
};
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
