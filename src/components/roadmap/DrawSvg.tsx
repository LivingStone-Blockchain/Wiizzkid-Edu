import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useLayoutEffect } from "react";
import { useRef } from "react";
import Vector from "./Vector";



const DrawSvg = () => {
  const ref = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let element = ref.current;
    if (!element) return;
    let svg = document.getElementsByClassName("svg-path")[0];
    if (!svg) return;

    const length = (svg as SVGPathElement).getTotalLength();

    //start positioning of svg drawing
     //Hide svg before scrolling
    svg.setAttribute("style", `stroke-dasharray: ${length}; stroke-dashoffset: ${length};`);

    //svg.style.strokeDasharray = length;

   
    //svg.style.strokeDashoffset = length;

    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom bottom",
        onUpdate: (self) => {
          const draw = length * self.progress;

          //also reverse the drawing when scroll goes up
          //svg.style.strokeDashoffset = length - draw;
          svg.setAttribute(
            "style",
            `stroke-dasharray: ${length}; stroke-dashoffset: ${length - draw};`
          );
        },
        onToggle: (self) => {
          if (self.isActive) {
            //ballRef.current?.style.display = "none";
            ballRef.current?.setAttribute("style", "display: none;");
          } else {
            //ballRef.current?.style.display = "inline-block";
            ballRef.current?.setAttribute("style", "display: inline-block;");
          }
        },
      },
    });

    return () => {
      if (t1) t1.kill();
    };
  }, []);

  return (
    <>
      <div className="absolute top-6 lg:left-1/2 left-4 transform -translate-x-1/2 w-6 h-6 bg-navy rounded-full animate-ball border-2 border-teal" ref={ballRef}></div>
      <div  className="absolute top-16 lg:left-1/2 left-4 transform -translate-x-1/2 w-full h-full overflow-hidden" ref={ref}>
        <Vector />
      </div>
    </>
  );
};

export default DrawSvg;
