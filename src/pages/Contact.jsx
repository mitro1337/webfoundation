export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto px-6 md:px-10 py-24 text-[var(--fg)]">
      <h1 className="text-5xl font-light mb-6">Contact</h1>
      <p className="opacity-70 mb-10">
        Send us a message and we'll be back soon.
      </p>

      <form
        action="https://formspree.io/f/your_form_id"
        method="POST"
        className="space-y-5"
      >
        <div>
          <label className="block text-sm mb-2 opacity-80">Nume</label>
          <input
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{
              borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)",
              color: "var(--fg)",
            }}
            placeholder="Name"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 opacity-80">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none"
            style={{
              borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)",
              color: "var(--fg)",
            }}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 opacity-80">Message</label>
          <textarea
            name="message"
            rows="6"
            required
            className="w-full px-4 py-3 rounded-xl bg-transparent border outline-none resize-none"
            style={{
              borderColor: "color-mix(in oklab, var(--fg) 25%, transparent)",
              color: "var(--fg)",
            }}
            placeholder="Send the message."
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          style={{ background: "var(--accent)", color: "var(--bg)" }}
        >
          Trimite
        </button>
      </form>

      <p className="text-xs opacity-60 mt-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </main>
  );
}
