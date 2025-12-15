import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, letterSpacing: "0.22em" }}
        transition={{ duration: 0.6 }}
        className="text-xs md:text-sm uppercase tracking-[0.22em]"
      >
        Lorem Ipsum
      </motion.div>
    </motion.div>
  );
}
