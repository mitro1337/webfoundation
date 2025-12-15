import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [list, setList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Industrial",
    client_name: "",
    location: "",
    year: new Date().getFullYear(),
    budget: "",
    description: "",
    status: "active",
    cover_url: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    fetchProjects();
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signInWithEmail() {
    const email = prompt("Email pentru magic link:");
    if (!email) return;
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Verifică emailul pentru link-ul de login.");
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setList(data || []);
  }

  async function createProject(e) {
    e.preventDefault();
    const { error } = await supabase.from("projects").insert(form);
    if (error) return alert(error.message);
    setForm({
      title: "",
      category: "Industrial",
      client_name: "",
      location: "",
      year: new Date().getFullYear(),
      budget: "",
      description: "",
      status: "active",
      cover_url: "",
    });
    fetchProjects();
  }

  async function del(id) {
    if (!confirm("Ștergi proiectul?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return alert(error.message);
    fetchProjects();
  }

  async function onUploadCover(file) {
    try {
      setUploading(true);
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from("projects").upload(fileName, file);
      if (error) throw error;
      const { data: pub } = supabase.storage.from("projects").getPublicUrl(data.path);
      setForm((f) => ({ ...f, cover_url: pub.publicUrl }));
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  }

  if (!session) {
    return (
      <div className="min-h-[60svh] flex flex-col items-center justify-center gap-4 text-[var(--fg)]">
        <h1 className="text-3xl font-light">Admin</h1>
        <p className="opacity-70">Autentificare necesară.</p>
        <button
          onClick={signInWithEmail}
          className="px-5 py-2 rounded-full border hover:opacity-80"
          style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
        >
          Trimite magic link
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 text-[var(--fg)]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light">Admin Panel</h1>
        <button
          onClick={signOut}
          className="px-4 py-2 rounded-full border hover:opacity-80"
          style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
        >
          Sign out
        </button>
      </div>

      <form
        onSubmit={createProject}
        className="grid md:grid-cols-2 gap-6 bg-[var(--card)] p-6 rounded-2xl mb-10"
      >
        <div>
          <label className="block text-sm mb-2 opacity-80">Title</label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2 opacity-80">Category</label>
          <select
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {["Industrial", "Residential", "Commercial", "Infrastructure", "Other"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 opacity-80">Client</label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
            value={form.client_name}
            onChange={(e) => setForm({ ...form, client_name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-2 opacity-80">Locație</label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-2 opacity-80">Anul</label>
          <input
            type="number"
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
            value={form.year}
            onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm mb-2 opacity-80">Buget (EUR)</label>
          <input
            type="number"
            step="0.01"
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-2 opacity-80">Description</label>
          <textarea
            rows="4"
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-2 opacity-80">Status</label>
          <select
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{ borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)" }}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            {["active", "archived", "draft"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 opacity-80">Upload main image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && onUploadCover(e.target.files[0])}
          />
          {uploading && <p className="text-xs opacity-70 mt-1">Loading...</p>}
        </div>

        <div className="md:col-span-2">
          <button
            className="px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Salvează proiect
          </button>
        </div>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {list.map((p) => (
          <div key={p.id} className="bg-[var(--card)] rounded-2xl overflow-hidden">
            {p.cover_url && <img src={p.cover_url} alt="" className="w-full h-40 object-cover" />}
            <div className="p-4">
              <h3 className="font-medium text-lg">{p.title}</h3>
              <p className="opacity-70 text-sm mt-1">{p.category} • {p.year}</p>
              {p.location && <p className="opacity-70 text-sm mt-1">{p.location}</p>}
              <p className="opacity-70 text-sm mt-2 line-clamp-3">{p.description}</p>
              <p className="text-xs mt-2 opacity-60 italic">
                {p.client_name ? `Client: ${p.client_name}` : ""} {p.budget ? `• ${p.budget} EUR` : ""}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs opacity-60">{p.status}</span>
                <button
                  onClick={() => del(p.id)}
                  className="text-xs underline opacity-80 hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
