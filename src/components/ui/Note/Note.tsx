import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { NoteProps } from "./Note.types";
import { invertColor } from "../../../utils/colorUtils";

let zIndexCounter = 100;

const Note: React.FC<NoteProps> = ({
  message,
  author,
  color = "#fffec8",
  dragConstraints,
  variants,
  useRandomPosition = false,
  top,
  left,
  rotation,
  positionType = "absolute", // Default to absolute positioning
}) => {
  const random = useMemo(() => {
    const maxLeft = window.innerWidth - 232;
    const maxTop = window.innerHeight - 232;
    return {
      top: Math.random() * maxTop,
      left: Math.random() * maxLeft,
      rotation: Math.random() * 6 - 3,
    };
  }, []);

  const finalTop = useRandomPosition ? random.top : top ?? 0;
  const finalLeft = useRandomPosition ? random.left : left ?? 0;
  const finalRotation = useRandomPosition ? random.rotation : rotation ?? 0;
  const [zIndex, setZIndex] = useState(() => Math.floor(Math.random() * 10));

  const bringToFront = () => {
    zIndexCounter += 1;
    setZIndex(zIndexCounter);
  };

  // Flex-specific styles
  const flexStyles = {
    display: "flex",
    flexDirection: "column", // Stack content vertically
    justifyContent: "flex-start", // Align content to the top
    alignItems: "flex-start", // Align content to the left
  };

  return (
    <motion.div
      drag
      onDragStart={bringToFront}
      whileDrag={{ scale: 1.05 }}
      dragElastic={0.3}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      className="p-4 rounded-md shadow-md break-words w-58 h-58 text-2xl relative cursor-move"
      variants={variants}
      initial={{ opacity: 0, scale: 1.05, rotate: finalRotation }}
      animate={{ opacity: 1, scale: 1, rotate: finalRotation }}
      style={{
        backgroundColor: color,
        color: invertColor(color),
        fontFamily: "Reenie Beanie, cursive",
        zIndex,
        ...(positionType === "absolute"
          ? {
              position: "absolute",
              top: `${finalTop}px`,
              left: `${finalLeft}px`,
            }
          : flexStyles as React.CSSProperties),
      }}
    >
      <p className="text-hand top-1">{message}</p>
      <p className="absolute bottom-0 right-0 text-right p-4 text-2xl/5">
        – {author == "" ? "anon" : author}
      </p>
    </motion.div>
  );
};

export default Note;
