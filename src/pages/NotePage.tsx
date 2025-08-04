import { getNote } from "../api/index";
import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Download, Share, ClipboardCheck } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Note from "../components/ui/Note/Note";
import Footer from "../components/layout/Footer";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { toPng } from 'html-to-image';
import { Skeleton } from "@/components/ui/skeleton";

function NotePage() {
  const [note, setNote] = useState<{ message: string; author?: string; color: string; "created_at"?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [_, setError] = useState<string | null>(null);
  const { noteId } = useParams<{ noteId: string }>();
  const noteRef = useRef<HTMLDivElement>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [shareState, setShareState] = useState<"idle" | "sharing" | "shared">("idle");

  const handleSaveAsImage = async () => {
    if (!noteRef.current) return;
    setSaveState("saving");
  
    try {
      const dataUrl = await toPng(noteRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: noteRef.current.offsetWidth,
        height: noteRef.current.offsetHeight
      });
      noteRef.current.style.position = 'static';
      const link = document.createElement("a");
      link.download = "note.png";
      link.href = dataUrl;
      link.click();
  
      setSaveState("saved");
    } catch (err) {
      console.error("Failed to export image:", err);
      setSaveState("idle");
      return;
    }
  
    setTimeout(() => setSaveState("idle"), 2000);
  };

  const handleShare = async () => {
    setShareState("sharing");

    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setShareState("shared");
    } catch (err) {
      console.error("Error copying URL to clipboard:", err);
    }

    setTimeout(() => setShareState("idle"), 2000);
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!noteId) {
          throw new Error("Note ID is undefined");
        }
        const noteData = await getNote(noteId);
        setNote(noteData);
      } catch (err) {
        setError("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }} className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="fixed inset-0 z-[999]">
        <div className="fixed inset-0 flex flex-col items-center justify-center z-[999] space-y-6 md:space-y-0 md:flex-row md:space-x-8 p-4 pt-20 md:p-0">

          <div className="relative w-48 h-48 md:w-58 md:h-58" ref={noteRef}>
            <div className="relative w-48 h-48 md:w-58 md:h-58" ref={noteRef}>
              {loading ? (
                <Skeleton className="w-full h-full rounded-md" />
              ) : note ? (
                <Note
                  message={note.message}
                  author={note.author}
                  color={note.color}
                  dragConstraints={noteRef}
                  positionType="absolute"
                  id={noteId}
                />
              ) : null}
            </div>
          </div>
          <div className="w-full max-w-md p-4 md:w-96 md:p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{ fontFamily: 'Reenie Beanie, cursive' }}>
              Note Details
            </h1>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0 items-center justify-center">
                <Button
                  variant="default"
                  className="w-full md:w-auto"
                  onClick={handleSaveAsImage}
                  disabled={saveState === "saving"}
                >
                  {saveState === "saving" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : saveState === "saved" ? (
                    <>
                      <Check className="w-4 h-4" /> Saved!
                    </>
                  ) : (
                    <>
                      <Download /> Save as image
                    </>

                  )}
                </Button>

                <Button
                  variant="secondary"
                  className="w-full md:w-auto"
                  onClick={handleShare}
                  disabled={shareState === "sharing"}
                >
                  {shareState === "sharing" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : shareState === "shared" ? (
                    <>
                      <ClipboardCheck className="w-4 h-4" /> Copied to clipboard!
                    </>
                  ) : (
                    <>
                      <Share /> Share
                    </>
                  )}
                </Button>

              </div>
              <div className="flex flex-col items-start">
                {loading ? (
                  <div className="flex items-center space-x-4 mt-2">
                    <p className="text-sm text-gray-500">Created at:</p>
                    <Skeleton className="w-24 h-4" />
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    Created at: {note && note["created_at"] ? new Date(note["created_at"]).toLocaleString() : "Unknown"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default NotePage;