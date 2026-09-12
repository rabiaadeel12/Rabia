import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Stack from "./components/Stack.jsx";
import Projects from "./components/Projects.jsx";
import Research from "./components/Research.jsx";
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
        <Research />

        <section className="shell section" id="currently">
          <div className="stack-col" style={{ gap: "1.6rem" }}>
            <div className="stack-col" style={{ gap: "0.8rem" }} data-reveal>
              <h2 className="h-lg">Off the clock</h2>
              <p className="prose-soft">
                What's on while I build, and a game you can actually play.
              </p>
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
