import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const itemVariants = {
    hidden: { opacity: 0, y: -10, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

function About() {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    return (
        <>
            <Navbar />
            <div className="my-10 mx-[6%]" style={{ fontFamily: "Inter, sans-serif" }}>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                >
                    <motion.h1
                        className="text-4xl text-center mb-10 flex justify-center items-center gap-3"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: "bold" }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        About <span className="text-5xl " style={{ fontFamily: "Reenie Beanie, cursive", fontWeight: "normal" }}>nocturne</span>
                    </motion.h1>

                    <motion.p
                        className="text-justify text-lg"
                        variants={itemVariants}
                    >
                        <a href="/" className="hover:underline"><strong>nocturne</strong></a> is a personal project built to let you create and share anonymous sticky notes — a quiet corner on the web to express what you feel, without filters.
                    </motion.p>
                    <motion.p
                        className="text-justify text-lg mt-3"
                        variants={itemVariants}
                    >
                        it's meant to be simple: no accounts, no filters, just you, and your thoughts. you can create a note, share it with a friend, or just leave it for someone to find. the notes can be anonymous, so you can express yourself freely without worrying about being judged.
                    </motion.p>
                    <motion.p
                        className="text-justify text-lg mt-3"
                        variants={itemVariants}
                    >
                        this project draws inspiration from <a href="https://sendthesong.xyz/" className="hover:underline"><strong>sendthesong.xyz</strong></a>, a website that lets you send anonymous messages and songs to your friends.
                    </motion.p>
                    <motion.p
                        className="text-justify text-lg mt-3"
                        variants={itemVariants}
                    >
                        i hope you enjoy using it as much as i enjoyed building it. if you have any feedback or suggestions, feel free to reach out to me on my email at <a href="mailto:me@dwnppo.dev" className="hover:underline"><strong>me@dwnppo.dev</strong></a>, or on my <a href="https://x.com/dwnpp0" className="hover:underline"><strong>X (formerly Twitter)</strong></a> account.
                    </motion.p>
                    <motion.p
                        className="text-justify text-lg mt-3"
                        variants={itemVariants}
                    >
                        if you want to support me or my projects, you can do so by buying me a coffee at <a href="https://ko-fi.com/dwnpp0" className="hover:underline"><strong>ko-fi</strong></a>. it would mean a lot to me and help me keep this project alive. thank you!
                    </motion.p>

                    <motion.p
                        className="text-right"
                        variants={itemVariants}
                    >
                        - dwnppo
                    </motion.p>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}


export default About;