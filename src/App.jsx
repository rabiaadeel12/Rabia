import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Stack from "./components/Stack.jsx";
import Projects from "./components/Projects.jsx";
import Writing from "./components/Writing.jsx";
import NowPlaying from "./components/NowPlaying.jsx";
import BlobCatch from "./components/BlobCatch.jsx";
import Contact from "./components/Contact.jsx";
import { useReveal } from "./hooks.js";

export default function App() {
  useReveal();

  return (
    <>
      <div className="aura-field" aria-hidden="true">
        <div className="aura aura--1" />
        <div className="aura aura--2" />
        <div className="aura aura--3" />
      </div>

      <div className="page">
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Projects />
        <Writing />

        <section className="shell section" id="currently">
          <div className="stack-col" style={{ gap: "1.6rem" }}>
            <div className="stack-col" style={{ gap: "0.8rem" }} data-reveal>
              <p className="eyebrow">currently</p>
              <h2 className="h-lg">What's on, and something to play with.</h2>
            </div>
            <div className="currently">
              <div data-reveal>
                <NowPlaying />
              </div>
              <div data-reveal data-reveal-delay="120">
                <BlobCatch />
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </div>
    </>
  );
}
