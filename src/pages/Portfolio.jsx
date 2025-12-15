import { useMemo, useState } from "react";

const ALL = [
  { id: 1, t: "Industrial", img: 1 },
  { id: 2, t: "Residential", img: 2 },
  { id: 3, t: "Commercial", img: 3 },
  { id: 4, t: "Industrial", img: 4 },
  { id: 5, t: "Residential", img: 5 },
  { id: 6, t: "Commercial", img: 6 },
  { id: 7, t: "Industrial", img: 7 },
  { id: 8, t: "Residential", img: 8 },
  { id: 9, t: "Commercial", img: 9 },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const list = useMemo(
    () => (filter === "All" ? ALL : ALL.filter((x) => x.t === filter)),
    [filter]
  );

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-24 text-[var(--fg)]">
      <h1 className="text-5xl font-light mb-6">Portfolio</h1>
      <p className="opacity-70 mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        {["All", "Industrial", "Residential", "Commercial"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border text-sm hover:opacity-80 transition ${
              filter === cat ? "opacity-100" : "opacity-70"
            }`}
            style={{
              borderColor: "color-mix(in oklab, var(--fg) 20%, transparent)",
              color: "var(--fg)",
              backdropFilter: "blur(10px)",
              background: "color-mix(in oklab, var(--bg) 40%, transparent)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((p) => (
          <div key={p.id} className="group">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={`https://picsum.photos/900/600?random=${p.img}`}
                alt=""
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <h3 className="font-medium">Project #{p.id}</h3>
              <span className="text-xs opacity-60">{p.t}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
