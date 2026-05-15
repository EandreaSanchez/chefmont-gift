"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [showGift, setShowGift] = useState(false);
  const [showClasses, setShowClasses] = useState(false);
  const [scratchCount, setScratchCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {

    if(!showGift) return;

    const canvas = canvasRef.current;

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    if(!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Metallic gradient

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );

    gradient.addColorStop(0, "#d4d4d8");
    gradient.addColorStop(.5, "#a1a1aa");
    gradient.addColorStop(1, "#71717a");

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Text

    ctx.fillStyle = "#000";

    ctx.font = "bold 28px sans-serif";

    ctx.textAlign = "center";

    ctx.fillText(
      "✨ Descubre tu regalo",
      canvas.width / 2,
      canvas.height / 2
    );

  }, [showGift]);

  function revealGift(){

    setShowClasses(true);

    setTimeout(() => {

      window.scrollTo({
        top: window.innerHeight * 1.4,
        behavior:"smooth"
      });

    }, 700);

  }

  function reserve(className:string){

    const message =
`Hola Chef Mont 👋

Soy Diego.

Quiero reservar la experiencia:
${className}

Este regalo fue obsequiado por Andrés y Erika.`;

    window.open(
`https://wa.me/573052444768?text=${encodeURIComponent(message)}`
    );

  }

  return (

    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">

      {/* VIDEO BACKGROUND */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/grill.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}

      <div className="fixed inset-0 bg-black/45"></div>

      {/* HERO */}

      <section className="relative z-10 flex items-center justify-center min-h-screen px-5">

        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2 }}
          className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-[32px] p-6 w-full max-w-md text-center shadow-2xl"
        >

          <p className="tracking-[5px] text-xs text-orange-400 mb-5">
            CHEF MONT EXPERIENCE
          </p>

          <h1 className="text-4xl font-bold leading-tight mb-6">
            Diego,
            <br />
            Andrés y Erika quieren regalarte
            una experiencia para recordar.
          </h1>

          <p className="text-white/70 text-base leading-relaxed">
            Una experiencia gastronómica pensada especialmente para ti.
          </p>

          <button
            onClick={() => {

              setShowGift(true);

              setTimeout(() => {

                window.scrollTo({
                  top: window.innerHeight,
                  behavior:"smooth"
                });

              }, 300);

            }}
            className="mt-10 w-full py-4 rounded-full bg-orange-500 hover:bg-orange-400 transition text-lg font-semibold"
          >
            Abrir regalo
          </button>

        </motion.div>

      </section>

      {/* SCRATCH CARD */}

      {
        showGift && (

          <section className="relative z-10 px-5 py-20">

            <motion.div
              initial={{ opacity:0, scale:.9 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:.8 }}
              className="w-full max-w-md mx-auto"
            >

              <div className="overflow-hidden rounded-[32px]">

                <div className="relative h-[280px] bg-black border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">

                  {/* SCRATCH LAYER */}

                  <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 z-20 rounded-[32px] transition-opacity duration-700 ${
                      scratchCount >= 40
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }`}

                    onMouseDown={() => {
                      isDrawing.current = true;
                    }}

                    onMouseUp={() => {
                      isDrawing.current = false;
                    }}

                    onMouseMove={(e) => {

                      if(!isDrawing.current) return;

                      const canvas = canvasRef.current;

                      if(!canvas) return;

                      const ctx = canvas.getContext("2d");

                      if(!ctx) return;

                      const rect = canvas.getBoundingClientRect();

                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;

                      ctx.globalCompositeOperation = "destination-out";

                      ctx.beginPath();
                      ctx.arc(x,y,35,0,Math.PI * 2);
                      ctx.fill();

                      setScratchCount(prev => {

                        const value = prev + 1;

                        if(value >= 40){
                          revealGift();
                        }

                        return value;

                      });

                    }}

                    onTouchStart={() => {
                      isDrawing.current = true;
                    }}

                    onTouchEnd={() => {
                      isDrawing.current = false;
                    }}

                    onTouchMove={(e) => {

                      if(!isDrawing.current) return;

                      const touch = e.touches[0];

                      const canvas = canvasRef.current;

                      if(!canvas) return;

                      const ctx = canvas.getContext("2d");

                      if(!ctx) return;

                      const rect = canvas.getBoundingClientRect();

                      const x = touch.clientX - rect.left;
                      const y = touch.clientY - rect.top;

                      ctx.globalCompositeOperation = "destination-out";

                      ctx.beginPath();
                      ctx.arc(x,y,40,0,Math.PI * 2);
                      ctx.fill();

                      setScratchCount(prev => {

                        const value = prev + 1;

                        if(value >= 40){
                          revealGift();
                        }

                        return value;

                      });

                    }}

                  />

                  {/* REWARD */}

                  <motion.div
                    initial={{ opacity:0, scale:.8 }}
                    animate={{
                      opacity: scratchCount >= 40 ? 1 : 0,
                      scale: scratchCount >= 40 ? 1 : .8
                    }}
                    transition={{
                      duration:1.4,
                      ease:"easeOut"
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
                  >

                    <p className="tracking-[5px] text-orange-400 text-xs mb-4">
                      CHEF MONT EXPERIENCE
                    </p>

                    <h2 className="text-6xl mb-4">
                      🎟️
                    </h2>

                    <h3 className="text-3xl font-bold text-orange-400 mb-4">
                      🎉 ¡Es tu regalo!
                    </h3>

                    <p className="text-white/70 text-lg leading-relaxed">
                      Andrés y Erika quieren invitarte
                      a vivir una experiencia gastronómica Chef Mont.
                    </p>

                    <p className="text-white/40 text-sm mt-6 italic">
                      Porque las mejores experiencias siempre se comparten.
                    </p>

                  </motion.div>

                </div>

              </div>

            </motion.div>

          </section>

        )
      }

      {/* EXPERIENCIAS */}

      {
        showClasses && (

          <section className="relative z-10 px-5 pb-32">

            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:1 }}
              className="max-w-md mx-auto"
            >

              <h2 className="text-4xl font-bold text-center mb-12">
                Escoge tu regalo
              </h2>

              <div className="flex flex-col gap-6">

                {
                  [
                    {
                      title:"🍔 Hamburguesas & Caipiriña",
                      date:"20 mayo · Presencial",
                    },
                    {
                      title:"🍱 Almuerzos para la semana",
                      date:"20 mayo · Virtual",
                    },
                    {
                      title:"🍟 Fast Food con amigos",
                      date:"22 mayo · Virtual",
                    },
                    {
                      title:"🔥 Parrilla vs Barril",
                      date:"23 mayo · Presencial",
                    }
                  ].map((item,index)=>(

                    <motion.div
                      key={index}
                      whileTap={{ scale:.98 }}
                      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl"
                    >

                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"></div>

                      <div className="relative z-10">

                        <h3 className="text-2xl font-bold mb-4 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-white/60 text-base mb-8">
                          {item.date}
                        </p>

                        <button
                          onClick={() => reserve(item.title)}
                          className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-400 transition font-semibold"
                        >
                          Reservar experiencia
                        </button>

                      </div>

                    </motion.div>

                  ))
                }

              </div>

            </motion.div>

          </section>

        )
      }

    </main>

  );

}