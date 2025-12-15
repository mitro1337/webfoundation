import { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export default function RootLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [navSolid, setNavSolid] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    const initial = hour >= 8 && hour < 20 ? "light" : "dark";
    const saved = localStorage.getItem("theme");
    const t = saved || initial;
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const toggleTheme = () => {
    setFade(true);
    setTimeout(() => {
      const next = theme === "dark" ? "light" : "dark";
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      setFade(false);
    }, 200);
  };

  const { scrollY } = useScroll();
  const solidRange = useTransform(scrollY, [0, 120], [0, 1]);
  useEffect(() => {
    const unsub = solidRange.on("change", (v) => setNavSolid(v > 0.1));
    return () => unsub();
  }, [solidRange]);

  const navRef = useRef(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  useEffect(() => {
    const id =
      pathname === "/" ? "home" : pathname.replace("/", ""); 
    const el = navRef.current?.querySelector(`a[data-id='${id}']`);
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const parentLeft = navRef.current.getBoundingClientRect().left;
    setUnderline({ left: left - parentLeft, width });
  }, [pathname, theme, navSolid]);

  return (
    <div className="min-h-dvh font-sans relative">
      {fade && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] pointer-events-none"
          style={{
            background:
              theme === "dark"
                ? "rgba(255,255,255,0.7)"
                : "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
          }}
        />
      )}

      <motion.nav
        animate={{
          backgroundColor: navSolid
            ? "color-mix(in oklab, var(--bg) 80%, transparent)"
            : "transparent",
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
          <div
            className="text-lg font-semibold tracking-tight select-none cursor-pointer"
            style={{ color: "var(--fg)" }}
            onClick={() => navigate("/")}
          >
            Lorem<span style={{ opacity: 0.6 }}>Ipsum</span>
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:block relative">
            <div
              ref={navRef}
              className="flex gap-8 text-xs uppercase tracking-[0.14em]"
              style={{
                color: "color-mix(in oklab, var(--fg) 70%, transparent)",
              }}
            >
              <NavLink
                data-id="home"
                to="/"
                end
                className={({ isActive }) =>
                  `pb-2 ${isActive ? "text-[var(--fg)]" : "hover:opacity-70"}`
                }
              >
                Home
              </NavLink>
              <NavLink
                data-id="portofoliu"
                to="/portofoliu"
                className={({ isActive }) =>
                  `pb-2 ${isActive ? "text-[var(--fg)]" : "hover:opacity-70"}`
                }
              >
                Portfolio
              </NavLink>
              <NavLink
                data-id="contact"
                to="/contact"
                className={({ isActive }) =>
                  `pb-2 ${isActive ? "text-[var(--fg)]" : "hover:opacity-70"}`
                }
              >
                Contact
              </NavLink>
            </div>
            <motion.div
              animate={{ left: underline.left, width: underline.width }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="absolute -bottom-0.5 h-[2px] rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-full text-xs border hover:opacity-80 transition"
              style={{
                color: "var(--fg)",
                borderColor:
                  "color-mix(in oklab, var(--fg) 25%, transparent)",
              }}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-4 py-2 rounded-full text-xs font-medium hover:opacity-90 transition"
              style={{
                color: "var(--fg)",
                backdropFilter: "blur(12px)",
                background:
                  "color-mix(in oklab, var(--bg) 40%, transparent)",
                border:
                  "1px solid color-mix(in oklab, var(--fg) 12%, transparent)",
              }}
            >
              Hire us
            </button>
          </div>
        </div>
      </motion.nav>

      <div className="pt-20 fade-transition">
        <Outlet />
      </div>
    </div>
  );
}
