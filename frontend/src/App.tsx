import { useEffect, useMemo, useRef, useState } from "react";
import { fetchMemories } from "./api";
import type { Memory } from "./types";
import "./App.css";

const MAX_NOS = 3;

function photosForAttempt(memories: Memory[], attempt: number) {
  if (memories.length === 0) return [];
  const start = ((attempt - 1) * 2) % memories.length;
  return [memories[start], memories[(start + 1) % memories.length]];
}

function App() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loadError, setLoadError] = useState("");
  const [noCount, setNoCount] = useState(0);
  const [convinceOpen, setConvinceOpen] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const galleryRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetchMemories()
      .then(setMemories)
      .catch(() => setLoadError("Could not load memories yet. Is the API running?"));
  }, []);

  useEffect(() => {
    if (saidYes) {
      galleryRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [saidYes]);

  const convincePhotos = useMemo(
    () => photosForAttempt(memories, Math.max(noCount, 1)),
    [memories, noCount]
  );

  const noGone = noCount >= MAX_NOS;

  function handleNo() {
    if (noGone || saidYes) return;
    setNoCount((count) => count + 1);
    setConvinceOpen(true);
  }

  function closeConvince() {
    setConvinceOpen(false);
  }

  function handleYes() {
    setConvinceOpen(false);
    setSaidYes(true);
  }

  return (
    <div className="page">
      <div className="glow" aria-hidden="true" />

      <section className="hero">
        <p className="eyebrow">a little question</p>
        <h1>
          Want to be
          <br />
          <em>my Valentine?</em>
        </h1>
        <p className="sub">
          {saidYes
            ? "Scroll down. I kept a few of our favorite pieces."
            : noGone
              ? "I think you already know the answer."
              : "Two buttons. One of them is the right one."}
        </p>

        {!saidYes && (
          <div className={`actions ${noGone ? "actions-yes-only" : ""}`}>
            <button className="btn yes" type="button" onClick={handleYes}>
              Yes
            </button>
            {!noGone && (
              <button className="btn no" type="button" onClick={handleNo}>
                No
              </button>
            )}
          </div>
        )}
      </section>

      {convinceOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="convince-title">
          <div className="overlay-card">
            <p className="eyebrow">wait</p>
            <h2 id="convince-title">Let me convince you</h2>
            <p className="overlay-copy">
              Look at these. This is us. This is why the answer is yes.
            </p>

            <div className="polaroids">
              {convincePhotos.map((memory, index) => (
                <figure key={memory._id} className={`polaroid tilt-${index}`}>
                  <img src={memory.imageUrl} alt={memory.title} />
                  <figcaption>
                    <strong>{memory.title}</strong>
                    <span>{memory.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <button className="btn yes" type="button" onClick={closeConvince}>
              {noGone ? "Okay… ask me again" : "Alright, ask me again"}
            </button>
          </div>
        </div>
      )}

      {saidYes && (
        <section className="gallery" ref={galleryRef}>
          <p className="eyebrow">our memories</p>
          <h2>Every little piece of us</h2>
          {loadError && <p className="error">{loadError}</p>}

          <div className="masonry">
            {memories.map((memory, index) => (
              <article key={memory._id} className={`memory n-${index % 3}`}>
                <img src={memory.imageUrl} alt={memory.title} />
                <div className="memory-copy">
                  <h3>{memory.title}</h3>
                  <p>{memory.caption}</p>
                </div>
              </article>
            ))}
          </div>

          <footer className="finale">
            <p className="eyebrow">the next chapter</p>
            <h2>
              Let’s build
              <br />
              <em>more of them</em>
            </h2>
            <p>New days, new photos, same us.</p>
          </footer>
        </section>
      )}
    </div>
  );
}

export default App;
