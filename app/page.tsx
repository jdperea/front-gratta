"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Search from "@/app/ui/search";
import Menu from "@/app/ui/menu";
import Form from "@/app/component/form";

import {
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("isOpen:", isOpen);
    if (isOpen && sectionRef.current) {
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [isOpen]);
  return (
    <>
      <Menu />
      <div className="flex flex-col items-center justify-start min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <h1 className="w-[87.5%] md:w-4/6 text-center text-6xl font-bold text-zinc-950 dark:text-zinc-50 my-16">
          ¡El <span className="font-bold text-[var(--color-primary)]">7 de Junio</span> nos espera una mañana de <span className="text-[var(--color-secundary)]">Aerorumba y Sabor</span> en la <span className="font-bold text-[var(--color-primary)]">Unidad Gratta</span>!
        </h1>
        <p className="w-[87.5%] md:w-4/6 text-center text-3xl leading-8 my-6 px-4 text-white">
          <span className="text-[var(--color-primary)]">9:00 AM</span>: Arrancamos con toda la energía en la Aerorumba.
        </p>
        <p className="w-[87.5%] md:w-4/6 text-center text-3xl leading-8 my-6 px-4 text-white">
          <span className="text-[var(--color-primary)]">10:30 AM en adelante</span>: Gran Kermés de Emprendedores.
        </p>
        <p className="w-[87.5%] md:w-4/6 text-center text-3xl leading-8 my-6 px-4 text-white">
          Ven a desayunar o almorzar en familia. Variedad de comida, juegos y apoyo a nuestros vecinos emprendedores.
        </p>
        <p className="w-[87.5%] md:w-4/6 text-center text-3xl leading-8 my-6 px-4 text-white">
          Importante: &nbsp;
          <span className="text-red-700 font-bold">
            Recuerda que con la compra de tus bebidas estás aportando al fondo del comité de convivencia para subsidiar las actividades en nuestra unidad, que son de gran importancia para la comunidad.
          </span>
        </p>
        <button
          onClick={() => {
            setIsOpen(prev => !prev);
          }}
          className="flex z-50 h-12 w-full items-center justify-center gap-2 text-xl rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[458px] my-4 py-2"
        >
          <span>¿Eres emprendedor? </span><span className="text-[var(--color-primary)]">&nbsp; da click aqui</span>
        </button>
        <div ref={sectionRef} className={isOpen ? "flex flex-col items-center justify-center gap-4 mt-2" : "hidden"}>
          <h2 className="w-3/4 md:w-4/6 text-center text-4xl font-bold text-zinc-950 dark:text-zinc-50 my-16">
            ¡Emprende en tu Conjunto!<br />Participa en nuestra Primera <span className="text-[var(--color-primary)]">Kermés</span> <span className="text-[var(--color-secundary)]">Gratta</span>.
          </h2>
          <p className="w-3/4 md:w-4/6 text-center text-3xl leading-8 my-6 text-white">
            Una oportunidad para mostrar tu <span className="font-bold text-[var(--color-primary)]">talento</span> y <span className="font-bold text-[var(--color-secundary)]">sazón</span> a tus vecinos.
          </p>
          <p className="w-3/4 md:w-4/6 text-center text-3xl leading-8 text-zinc-950 dark:text-zinc-50 mt-8">
            Reglas Claras:
          </p>
          <ul className="w-3/4 md:w-4/6 text-center text-xl leading-8 text-zinc-950 dark:text-zinc-50 space-y-5 py-5">
            <li className="flex items-start gap-2 text-white">
              <CheckCircleIcon className="text-[var(--color-primary)] w-8 h-8 mt-1" />
              <span className="text-white">Cupos limitados y exclusivos para <b className="text-[var(--color-primary)]">residentes</b> de la unidad <b className="text-[var(--color-primary)]">Gratta</b> (<span className="text-[var(--color-primary)]">10</span>-<span className="text-[var(--color-primary)]">15</span> <span className="text-[var(--color-secundary)]">stands</span>)</span>
            </li>
            <li className="flex items-start gap-2 text-white">
              <CheckCircleIcon className="text-[var(--color-primary)] w-8 h-8 mt-1" />
              <span className="text-white">Exclusividad de producto (<span className="text-[var(--color-primary)]">¡</span><span className="text-[var(--color-primary)]">No habrá competencia directa</span> <span className="text-[var(--color-secundary)]">!</span>)</span>
            </li>
            <li className="flex items-start gap-2 text-white">
              <CheckCircleIcon className="text-[var(--color-primary)] w-8 h-8 mt-1" />
              <span className="text-white">El comité de convivencia de la unidad se encarga de la <span className="text-[var(--color-primary)]">hidratación</span> y <span className="text-[var(--color-secundary)]">bebidas</span>.</span>
            </li>
          </ul>

          <Form />
        </div>
      </div>
    </>
  );
}
