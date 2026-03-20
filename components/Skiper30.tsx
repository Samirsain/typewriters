"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const images = [
  "/image.png",
  "/image copy.png",
  "/image copy 2.png",
  "/image copy 3.png",
  "/image copy 4.png",
  "/image copy 5.png",
  "/image copy 6.png",
  "/image copy 7.png",
  "/image copy 8.png",
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="skiper-container">
      <div className="intro-section">
        <div className="scroll-hint-wrapper">
          <span className="scroll-hint">
            ↓ explore the gallery
          </span>
        </div>
      </div>

      <div ref={gallery} className="gallery-grid">
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[0], images[4], images[7]]} y={y4} />
      </div>

      <div className="intro-section">
        <div className="scroll-hint-wrapper">
          <span className="scroll-hint">
            ↑ back to the beginning
          </span>
        </div>
      </div>
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div className="gallery-column" style={{ y }}>
      {images.map((src, i) => (
        <div key={i} className="gallery-image-wrapper">
          <img
            src={`${src}`}
            alt="gallery image"
            className="gallery-image"
          />
        </div>
      ))}
    </motion.div>
  );
};

export default Skiper30;
