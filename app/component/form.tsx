"use client";

import { useState, useEffect, useRef } from "react";

type FormData = {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  elemento: string;
  apartamento: string;
};

type Errors = Partial<FormData>;

export default function EmprendedoresForm() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    elemento: "",
    apartamento: "",
  });
  useEffect(() => {
    console.log("isOpen:", isOpen);
    if (isOpen && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen]);

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors: Errors = {};

    // Nombre
    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (form.nombre.trim().length < 3) {
      newErrors.nombre = "Debe tener mínimo 3 caracteres";
    }

    // Apellido
    if (!form.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    } else if (form.apellido.trim().length < 3) {
      newErrors.apellido = "Debe tener mínimo 3 caracteres";
    }

    // Teléfono
    if (!form.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^[0-9]{10}$/.test(form.telefono)) {
      newErrors.telefono =
        "Debe contener exactamente 10 números";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        form.email
      )
    ) {
      newErrors.email = "Email inválido";
    }

    // Elemento
    if (!form.elemento.trim()) {
      newErrors.elemento = "El elemento es obligatorio";
    } else if (form.elemento.trim().length < 3) {
      newErrors.elemento =
        "Debe tener mínimo 3 caracteres";
    } else if (form.elemento.trim().length > 50) {
      newErrors.elemento =
        "Debe tener máximo 50 caracteres";
    }

    // Apartamento
    if (!form.apartamento.trim()) {
      newErrors.apartamento = "El apartamento es obligatorio";
    } else if (form.apartamento.trim().length < 3) {
      newErrors.apartamento =
        "Debe tener exactamente 3 caracteres";
    } else if (form.apartamento.trim().length > 3) {
      newErrors.apartamento =
        "Debe tener exactamente 3 caracteres";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSuccess("");
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/emprendedores`)

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/emprendedores`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar");
      }

      setSuccess("Formulario enviado correctamente");

      setForm({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        elemento: "",
        apartamento: "",
      });
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-8">
          <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-18 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-4 text-white dark:text-gray-900 transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[458px] my-4"
          >
          <span>{isOpen ? '▲' : '▼'}</span>
          <span>Regístrate <span className="text-[var(--color-secundary)]">aquí</span> antes del 24 de mayo para separar tu cupo y producto</span>
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
         className={`${isOpen ? 'block' : 'hidden'} mt-16 max-w-xl w-full mx-auto flex flex-col gap-4 mb-12`}
      >
        {/* Nombre */}
        <div ref={sectionRef}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border p-2 w-full rounded block text-sm/6 font-medium text-white"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">
              {errors.nombre}
            </p>
          )}
        </div>

        {/* Apellido */}
        <div>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.apellido && (
            <p className="text-red-500 text-sm">
              {errors.apellido}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.telefono && (
            <p className="text-red-500 text-sm">
              {errors.telefono}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        {/* Apartamento */}
        <div>
          <input
            type="text"
            name="apartamento"
            placeholder="Apartamento"
            value={form.apartamento}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.apartamento && (
            <p className="text-red-500 text-sm">
              {errors.apartamento}
            </p>
          )}
        </div>

        {/* Elemento */}
        <div>
          <input
            type="text"
            name="elemento"
            placeholder="Alimento"
            value={form.elemento}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.elemento && (
            <p className="text-red-500 text-sm">
              {errors.elemento}
            </p>
          )}
          <p className="mt-2 text-sm text-white-200">
            El alimento es el que se va a vender, El cupo se asigna por orden de registro. Si alguien ya registró el "Alimento", el siguiente deberá elegir uno diferente.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[var(--color-primary)] text-white h-16 p-2 rounded"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {success && (
          <p className="text-green-600">
            {success}
          </p>
        )}
      </form>
    </>
  );
}