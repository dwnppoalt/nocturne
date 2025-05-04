import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Note from "../components/ui/Note/Note";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const noteVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.5 } },
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
    const notes = [
        { message: "i know it'd be easier if i just didnt ask", author: "niki", color: "#ffffff" },
        { message: "but it'd also be easier if she wasn't your last", color: "#fffec8" },
        { message: "sometimes the hardest part is letting go", author: "sam", color: "#ffcbc8" },
        { message: "i miss the way we used to talk until sunrise", color: "#d3f8e2" },
        { message: "wish i could tell you how much you meant to me", author: "elle", color: "#e2d5f9" },
        { message: "remember when we danced in the rain?", color: "#c8e6ff" },
        { message: "your smile still lights up my darkest days", author: "kai", color: "#fcdec9" },
        { message: "i wonder if you think about me too", color: "#e9ffdb" },
        { message: "i'm sorry for the words i never said", author: "mia", color: "#ffd9eb" },
        { message: "some nights i still reach for my phone to text you", color: "#d4f0f0" },
        { message: "i found your old sweater today", author: "leo", color: "#f2fac8" },
        { message: "i'm learning to be okay without you", color: "#f9e0fd" },
        { message: "do you remember our promises?", author: "ash", color: "#ffc8dc" },
        { message: "i hope you found what you were looking for", color: "#c8fdff" },
        { message: "the song we danced to still makes me cry", author: "jay", color: "#f0e8ff" },
        { message: "i still keep your letter in my drawer", color: "#eeffcc" },
        { message: "i've forgiven you. i hope you've forgiven me too", author: "tia", color: "#ffefd1" },
        { message: "i'm proud of the person you've become", color: "#e1f0c4" },
        { message: "i wish we had more time", author: "river", color: "#f6daff" },
        { message: "you taught me how to love myself", color: "#cce5ff" },
        { message: "i reread our messages more than i should", author: "nico", color: "#e8fff2" },
        ];

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

        <div className="absolute left-1/2 top-[calc(50%-4rem)] transform -translate-x-1/2 -translate-y-1/2 z-1000">

            <h1 className="text-8xl font-bold" style={{fontFamily: "Reenie Beanie, cursive"}}>nocturne</h1>
            <div className="flex">
              <Button style={{fontFamily: "Inter, sans-serif"}}>
                <Link to="/new" className="flex items-center">
                  <Plus className="mr-1.5" /> New note
                </Link>
              </Button>
              <Button variant="secondary" style={{fontFamily: "Inter, sans-serif"}} className="ml-4">
                <Link to="/browse" className="flex items-center">
                  Browse notes
                </Link>
              </Button>
            </div>
          </div>

          {notes.map((note, index) => (
            <Note
              key={index}
              message={note.message}
              author={note.author}
              color={note.color}
              dragConstraints={containerRef}
              variants={noteVariants}
                useRandomPosition={true}
            />
          ))}
        </motion.div>
        <Footer />
    </div>
  );
}
