import { motion } from "framer-motion";

interface AnimatedTextProps {
    text: string;
    onComplete?: () => void; // เพิ่ม prop นี้
    color?: string; // เพิ่ม prop สำหรับสี
    className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
    const container = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const letter = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.1 } },
    };

    return (
        <motion.p
            className={`text-lg text-center ${className}`} // 👈 ใช้ className ที่รับมา
            variants={container}
            initial="hidden"
            animate="show"
        >
            {text.split(/(โอกาสรอดชีวิต)/).map((char, index) => (
                char === "โอกาสรอดชีวิต" ? (
                    <motion.span key={index} className="text-[#fa4901]" variants={letter}>
                        {char}
                    </motion.span>
                ) : (
                    char.split("").map((c, i) => (
                        <motion.span key={`${index}-${i}`} variants={letter}>
                            {c}
                        </motion.span>
                    ))
                )
            ))}
        </motion.p>
    );
};


export const AnimatedText2: React.FC<AnimatedTextProps> = ({ text, color = '#FA4901' }) => {
    const container = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
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
                <motion.span 
                    key={index} 
                    variants={letter} 
                    style={{ color: char === "canteen" ? 'yellow' : color }} // ใช้สีเหลืองเมื่อพบคำว่า "canteen"
                >
                    {char}
                </motion.span>
            ))}
        </motion.p>
    );
};

export const AnimatedText3: React.FC<AnimatedTextProps> = ({ text }) => {
    const container = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const letter = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.1 } },
    };

    return (
        <motion.p
            className="text-lg text-white font-custom text-center underline"
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

