import { motion } from "framer-motion";
import { useMemo, useState, forwardRef } from "react";
import { NoteProps } from "./Note.types";
import { invertColor } from "../../../utils/colorUtils";
import { useNavigate } from "react-router-dom";

let zIndexCounter = 10;

const Note = forwardRef<HTMLDivElement, NoteProps>(({
  message,
  author,
  color = "#fffec8",
  dragConstraints,
  variants,
  useRandomPosition = false,
  top,
  id,
  left,
  rotation,
  positionType = "absolute",
}, ref) => {
  const random = useMemo(() => {
    const maxLeft = window.innerWidth - 232;
    const maxTop = window.innerHeight - 232;
    return {
      top: Math.random() * maxTop,
      left: Math.random() * maxLeft,
      rotation: Math.random() * 6 - 3,
    };
  }, []);
  const navigate = useNavigate();

  const finalTop = useRandomPosition ? random.top : top ?? 0;
  const finalLeft = useRandomPosition ? random.left : left ?? 0;
  const finalRotation = useRandomPosition ? random.rotation : rotation ?? 0;
  const [zIndex, setZIndex] = useState(() => Math.floor(Math.random() * 10));
  const [isDragging, setIsDragging] = useState(false);

  const bringToFront = () => {
    zIndexCounter += 1;
    setZIndex(zIndexCounter);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    bringToFront();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
      navigate("/note/" + id);
    }
  };

  const flexStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  };

  return (
    <motion.div
      ref={ref}
      drag
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      dragElastic={0.3}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      className="p-4 rounded-md shadow-md break-words w-48 sm:w-48 md:w-58 h-48 md:h-58 text-2xl relative cursor-move mx-auto"
      variants={variants}
      custom={finalRotation}
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
});

Note.displayName = "Note";

export default Note;
