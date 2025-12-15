import { motion } from "framer-motion";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function Home() {
  useSmoothScroll({ ease: 0.085 });

  return (
    <div className="bg-[var(--bg)] text-[var(--fg)] overflow-hidden">
      <section className="relative h-[100svh] flex flex-col items-center justify-center text-center select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="https://cdn.coverr.co/videos/coverr-construction-site-hero-3451/1080p.mp4"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--bg) 70%, transparent), color-mix(in oklab, var(--bg) 20%, transparent), var(--bg))",
          }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative z-10 text-6xl md:text-8xl font-semibold tracking-tight leading-[1.06]"
        >
          Lorem <span style={{ opacity: 0.7 }}>ipsum</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="relative z-10 mt-6 text-lg md:text-xl max-w-xl mx-auto"
          style={{ color: "color-mix(in oklab, var(--fg) 75%, transparent)" }}
        >
          dolor sit amet, consectetur adipiscing elit,
        </motion.p>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="min-h-[100svh] flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-light mb-8"
        >
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-lg md:text-xl max-w-3xl leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </motion.p>
      </section>

      {/* PARALLAX */}
      <section
        className="relative h-[120svh] bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "color-mix(in oklab, var(--bg) 55%, transparent)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="text-5xl md:text-6xl font-semibold tracking-tight text-center max-w-2xl"
          >
            Form follows <span style={{ opacity: 0.7 }}>function</span>.
          </motion.h3>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="py-36 px-6"
        style={{ background: "var(--card)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-light text-center mb-16">
            Selected Works
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.06 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={`https://picsum.photos/900/600?random=${i}`}
                    alt=""
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h4 className="mt-5 text-lg font-medium group-hover:opacity-70 transition">
                  Project #{i}
                </h4>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  Luxury & precision.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 text-center px-6">
        <h2 className="text-5xl font-light mb-8">Let’s build your vision.</h2>
        <p
          className="text-lg max-w-2xl mx-auto mb-10"
          style={{ color: "var(--muted)" }}
        >
          Duis aute irure dolor in reprehenderit in voluptate 
          velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <a
          href="/contact"
          className="inline-block px-10 py-4 rounded-full text-lg font-medium hover:opacity-90 transition"
          style={{ background: "var(--accent)", color: "var(--bg)" }}
        >
          Contact
        </a>
      </section>

      <footer
        className="text-center py-10 text-sm opacity-60"
        style={{ color: "var(--muted)" }}
      >
        © {new Date().getFullYear()} mitro1337, all rights reserved.
      </footer>
    </div>
  );
}
