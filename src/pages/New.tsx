import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Note from "../components/ui/Note/Note";
import { useRef, useState } from "react";

export default function New() {
    const [message, setMessage] = useState("");
    const [author, setAuthor] = useState("");
    const [color, setColor] = useState("#fffec8");

    // Ref for the drag constraint container
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <Navbar />
            <div className="fixed inset-0 flex items-center justify-center z-1000">
                <div className="flex space-x-8">
                    <div
                        ref={containerRef}
                        className="relative w-58 h-58 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden"
                    >
                            <Note
                                message={message}
                                author={author}
                                color={color}
                                dragConstraints={containerRef}
                                positionType="absolute" // Important for drag constraints
                            />
                        
                    </div>

                    {/* Form */}
                    <div className="w-96 p-6">
                        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "Reenie Beanie, cursive" }}>
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
                                {message.length >= 80 && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {100 - message.length} characters remaining
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="author" className="mb-2">Author</Label>
                                <Input
                                    id="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}     
                                    className="w-full p-2"
                                    autoComplete="off"
                                />
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
                        <Button
                            onClick={() => {
                                console.log("Note Created:", { message, author, color });
                            }}
                            className="mt-4"
                        >
                            Create Note
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
