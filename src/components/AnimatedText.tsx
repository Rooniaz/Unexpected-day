import { motion } from "framer-motion";

interface AnimatedTextProps {
    text: string;
    color?: string; 
    className?: string;
    onComplete?: () => void; // เพิ่ม prop onComplete
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
    const container = {
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const letter = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 1.5 } },
    };

    return (
        <motion.p
            className={`text-lg text-center ${className}`}
            variants={container}
            initial="hidden"
            animate="show"
            style={{ unicodeBidi: "plaintext" }} // ✅ ป้องกันบัคภาษาไทย
        >
            {text.split(/(เพิ่มโอกาสรอดชีวิต)/).map((char, index) => (
                char === "เพิ่มโอกาสรอดชีวิต" ? (
                    <motion.span 
                        key={index} 
                        className="text-[#e7d700]" 
                        variants={letter} 
                        style={{
                            display: "inline-block",  // ✅ แก้ปัญหาสระลอย
                            textShadow: "1px 0px 0px black",
                            filter: "drop-shadow(2px 1px 1px rgba(0, 0, 0, 0.75))"
                        }}
                    >
                        {char}
                    </motion.span>
                ) : (
                    <motion.span 
                        key={index} 
                        variants={letter} 
                        style={{ display: "inline-block" }} // ✅ ป้องกันตัวอักษรแยก
                    >
                        {char}
                    </motion.span>
                )
            ))}
        </motion.p>
    );
};

export const AnimatedText2: React.FC<AnimatedTextProps & { className?: string }> = ({ 
    text, 
    color = '#FA4901', 
    className = "" 
}) => {
    const container = {
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const letter = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 1.5 } },
    };

    return (
        <motion.p
            className={`text-lg text-white font-custom text-center ${className}`}
            variants={container}
            initial="hidden"
            animate="show"
            style={{ unicodeBidi: "plaintext" }} // ✅ ป้องกันบัคภาษาไทย
        >
            {text.split(/(canteen)/).map((char, index) => (
                <motion.span 
                    key={index} 
                    variants={letter} 
                    style={{
                        display: "inline-block", // ✅ ป้องกันตัวอักษรแยก
                        color: char === "canteen" ? "yellow" : color
                    }}
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
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
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
            style={{ unicodeBidi: "plaintext" }} // ✅ ป้องกันบัคภาษาไทย
        >
            {text.split("").map((char, index) => (
                <motion.span 
                    key={index} 
                    variants={letter} 
                    style={{ display: "inline-block" }} // ✅ ป้องกันสระและวรรณยุกต์ลอย
                >
                    {char}
                </motion.span>
            ))}
        </motion.p>
    );
};
