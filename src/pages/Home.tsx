import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { useAnimation } from "framer-motion";
import { NoteData } from "src/components/ui/Note/Note.types";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Note from "../components/ui/Note/Note";
import SentenceAnimate from "../components/ui/SentenceAnimate/SentenceAnimate";
import { getRandomNote } from "../api/index";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const noteVariants = {
  hidden: (custom: number) => ({ opacity: 0, scale: 1.05, rotate: custom }),
  show: (custom: number) => ({
    opacity: 1,
    scale: 1,
    rotate: custom,
    transition: { ease: "easeOut", duration: 0.5 },
  }),
};

const viewportSize = (width: number) => {
  if (width < 640) return "sm";
  if (width < 768) return "md";
  return "lg";
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [_, setLoading] = useState(true);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const randomNotes = (await getRandomNote(20)).map((n: NoteData) => ({
          ...n,
          rotation: Math.random() * 6 - 3,
        }));
        setNotes(randomNotes);
      } catch (error) {
        console.error("Failed to fetch random notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const [filteredNotes, setFilteredNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const initialViewport = viewportSize(window.innerWidth);
    if (initialViewport === "sm") {
      setFilteredNotes(notes.slice(0, 5));
    } else if (initialViewport === "md") {
      setFilteredNotes(notes.slice(0, 7));
    } else {
      setFilteredNotes(notes);
    }
  }, [notes]);
  const controls = useAnimation();

  useEffect(() => {
    if (filteredNotes.length > 0) {
      controls.start("show");
    }
  }, [filteredNotes]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.div
        ref={containerRef}
        className="flex-1 relative w-full overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="absolute left-1/2 top-[calc(50%-4rem)] transform -translate-x-1/2 -translate-y-1/2 z-30 text-center flex flex-col items-center">
          <h1 className="text-8xl font-bold text-center" style={{ fontFamily: "Reenie Beanie, cursive", textAlign: "center" }}>
            nocturne
          </h1>
          <h2 className="text-2xl font-semibold mt-0 text-center" style={{ fontFamily: "Inter, sans-serif", textAlign: "center" }}>
            <SentenceAnimate text="collection of unspoken thoughts" />
          </h2>
          <div className="flex justify-center mt-4">
            <Button style={{ fontFamily: "Inter, sans-serif" }}>
              <Link to="/new" className="flex items-center">
                <Plus className="mr-1.5" /> New note
              </Link>
            </Button>
            <Button
              variant="secondary"
              style={{ fontFamily: "Inter, sans-serif" }}
              className="ml-4"
            >
              <Link to="/search" className="flex items-center">
              <Search className="mr-1.5"/>
                Browse notes
              </Link>
            </Button>
          </div>
        </div>

        <motion.div
          className="relative w-full h-full"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {filteredNotes.map((note) => (
            <Note
              id={note.id}
              message={note.message}
              author={note.author}
              color={note.color}
              dragConstraints={containerRef}
              variants={noteVariants}
              custom={note.rotation}
              useRandomPosition={true}
            />
          ))}
        </motion.div>

      </motion.div>
      <Footer />
    </div>
  );
}
