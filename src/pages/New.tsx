import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Note from "../components/ui/Note/Note";
import {PuffLoader} from "react-spinners";
import { useRef, useState } from "react";
import { TurnstileComponent } from "../components/ui/Turnstile/Turnstile";
import { addNote } from "../api/index";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

export default function New() {
    const [message, setMessage] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [color, setColor] = useState<string>("#fffec8");
    const [token, setToken] = useState<string | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const containerRef = useRef<HTMLDivElement>(null);

    const handleTokenObtained = (token: string) => {
        setToken(token); 
        setLoading(false);
    };

    return (
        <div>
            <Navbar />
            <div
                className="relative flex flex-col items-center justify-center z-[10] min-h-screen space-y-6 md:space-y-0 md:flex-row md:space-x-8 p-4 sm:pt-8 sm:pb-8 md:pt-0 md:pb-0 overflow-y-auto md:overflow-hidden"
            >
                <div
                    ref={containerRef}
                    className="relative w-49 h-49 md:w-59 md:h-59 border-2 border-dashed border-gray-400 rounded-lg align-middle justify-center flex items-center sm:w-40 sm:h-40"
                >
                    <Note
                        message={message}
                        author={author}
                        color={color}
                        dragConstraints={containerRef}
                        positionType="absolute" 
                    />
                </div>

                <div className="w-full max-w-md p-4 md:w-96 md:p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{ fontFamily: "Reenie Beanie, cursive" }}>
                        Create a Note
                    </h1>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="message" className="mb-2">Message</Label>
                            <Input
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                maxLength={100}
                                className="w-full p-2"
                                autoComplete="off"
                            />
                            <p
                                className={`text-sm mt-1 text-right ${
                                    message.length >= 85 ? 'text-red-500' : 'text-muted-foreground'
                                }`}
                            >
                                {100 - message.length}/100
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="author" className="mb-2">Author</Label>
                            <Input
                                id="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}     
                                className="w-full p-2"
                                autoComplete="off"
                                maxLength={20}
                            />
                            <p
                                className={`text-sm mt-1 text-right ${
                                    author.length >= 15 ? 'text-red-500' : 'text-muted-foreground'
                                }`}
                            >
                                {20 - author.length}/20
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="color" className="mb-2">Color</Label>
                            <Input
                                type="color"
                                id="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full p-2"
                            />
                        </div>
                    </form>
                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="flex flex-col md:flex-row items-center mt-6 space-y-4 md:space-y-0 ">
                        <TurnstileComponent onTokenObtained={handleTokenObtained} />
                        <Button
                            disabled={!token || loading || !message}
                            className="w-full md:w-auto"
                            onClick={async () => {
                                if (!token) return;  
                                setLoading(true); 
                                setError(null);  
                                try {
                                    const req = await addNote(message, color, author, token); 
                                    navigate(`/note/${req.id}`);
                                } catch (error) {
                                    console.error("Error submitting note:", error);
                                    setError("Failed to submit note. Please try again.");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        >
                            {loading ? (
                                <PuffLoader size={20} color="#fff" loading={loading} />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
