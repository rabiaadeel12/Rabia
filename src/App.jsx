import { useState } from "react";
import Cursor from "./components/Cursor.jsx";
import IntroSplash from "./components/IntroSplash.jsx";
import FloatingPlayer from "./components/FloatingPlayer.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Stack from "./components/Stack.jsx";
import Projects from "./components/Projects.jsx";
import Research from "./components/Research.jsx";
import Contact from "./components/Contact.jsx";
import { useReveal } from "./hooks.js";

export default function App() {
  useReveal();
  const [showIntro, setShowIntro] = useState(true);
  const [listening, setListening] = useState(false);

  return (
    <>
      {showIntro && (
        <IntroSplash
          onDone={(wantsListen) => {
            setListening(wantsListen);
            setShowIntro(false);
          }}
        />
      )}

      <Cursor />
      {listening && <FloatingPlayer onClose={() => setListening(false)} />}

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
        <Contact />
      </div>
    </>
  );
}
