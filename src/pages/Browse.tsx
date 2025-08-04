import Navbar from "../components/layout/Navbar";
import Note from "../components/ui/Note/Note";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { searchNotes } from "../api";
import { NoteData } from "../components/ui/Note/Note.types";
import { Input } from "@/components/ui/input";

function Browse() {
    const [query, setQuery] = useState<string>("");
    const [notes, setNotes] = useState<NoteData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        loadNotes();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page]);

    const loadNotes = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const data = await searchNotes(query, page);
            setNotes((prevNotes) => [...prevNotes, ...data]);
            setHasMore(data.length > 0);
        } catch (error) {
            console.error("Error loading notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setNotes([]);
        setPage(1);
        setHasMore(true);
        loadNotes();
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-[80%] flex flex-col mx-auto my-20" style={{ fontFamily: "Inter, sans-serif" }}>
                <h1 className="text-5xl font-bold text-center mb-10" style={{ fontFamily: "Reenie Beanie, cursive" }}>
                    Browse Notes
                </h1>
                <div className="flex flex-col align-middle justify-center items-center">
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-[50%] items-center">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e => e.key === 'Enter' && handleSearch())}
                            style={{ fontFamily: "Inter, sans-serif" }} 
                        />
                        <Button className="text-white rounded p-2" onClick={handleSearch}>
                            Search
                        </Button>
                    </div>
                </div>
                <div className="container mx-auto mt-10">
                    <div
                        className="grid gap-x-6 gap-y-8 justify-center"
                        style={{
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        }}
                    >
                        {notes.map((note, index) => (
                            <Note key={`${note.id}-${index}`} {...note} positionType="flex" />
                        ))}
                        {loading &&
                            Array.from({ length: 10 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="w-full max-w-[280px] h-48 mx-auto rounded-md shadow-md"
                                />
                            ))}
                    </div>
                </div>
                <p className="text-center mt-10 text-gray-500">
                    {loading && (
                        <span className="animate-pulse">Loading more notes...</span>
                    )}
                    {!loading && notes.length === 0 && !hasMore && (
                        <span>No notes found.</span>
                    )}
                    {!loading && !hasMore && notes.length > 0 && (
                        <span>No more notes to load.</span>
                    )}
                    {!loading && hasMore && notes.length > 0 && (
                        <span>Scroll down to load more notes.</span>
                    )}
                </p>
            </div>
            <Footer />
        </>
    );
}

export default Browse;
