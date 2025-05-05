import { Variants } from "framer-motion";

export type NoteProps = {
    message: string;
    author?: string | null;
    color?: string;
    dragConstraints?: React.RefObject<HTMLDivElement | null>;
    variants?: Variants;
    useRandomPosition?: boolean;
    top?: number;
    left?: number;
    rotation?: number;
    id?: string;
    custom?: number;
    positionType?: "absolute" | "flex";
  };

export type NoteData = {
    message: string;
    author: string;
    color: string;
    rotation: number;
    id: string;
  };