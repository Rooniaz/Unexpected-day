import { motion } from "framer-motion";

interface AnimatedTextProps {
    text: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
    const container = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
    };

    const letter = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.1 } },
    };

    return (
    <motion.p
        className="text-lg text-white font-custom text-center"
        variants={container}
        initial="hidden"
        animate="show"
    >
        {text.split("").map((char, index) => (
        <motion.span key={index} variants={letter}>
            {char}
        </motion.span>
        ))}
    </motion.p>
    );
};
