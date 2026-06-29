import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 bg-white border-b border-gray-100">
        <div className="font-display text-xl font-light tracking-widest uppercase">Vowed</div>
        <div className="flex items-center gap-8">
          <Link href="#features" className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors">
            Qué incluye
          </Link>
          <Link href="#how" className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors">
            Cómo funciona
          </Link>
          <Link href="/login" className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors">
            Acceder
          </Link>
          <Link href="/register" className="font-mono-custom text-xs tracking-widest uppercase bg-black text-white px-5 py-2.5 hover:bg-gray-900 transition-colors">
            Empezar gratis
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid grid-cols-2 min-h-screen">
        <div className="bg-[#0A0A0A] flex flex-col justify-between p-16 pt-32">
          <div />
          <div>
            <div className="font-mono-custom text-xs tracking-widest text-[#C9A84C] uppercase mb-8">
              Wedding Planner
            </div>
            <h1 className="font-display text-7xl font-light italic text-white leading-tight">
              Vuestra<br />boda<br /><em className="text-[#C9A84C] not-italic">perfecta.</em>
            </h1>
          </div>
          <div className="font-mono-custom text-xs text-gray-600 tracking-widest">
            VOWED · WEDDING PLANNER · 2025
          </div>
        </div>

        <div className="flex flex-col justify-center px-20 pt-24">
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-6">
            Organización nupcial
          </div>
          <h2 className="font-display text-4xl font-light leading-snug mb-6">
            Todo lo que necesitáis.<br />En un solo lugar.
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-10">
            Vowed os guía desde la primera decisión hasta el último detalle. Checklist por etapas, presupuesto, invitados y seating. Sin experiencia previa. Sin estrés.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/register" className="inline-flex items-center gap-4 bg-[#0A0A0A] text-white font-mono-custom text-xs tracking-widest uppercase px-8 py-4 w-fit hover:bg-gray-900 transition-colors">
              Empezar gratis
              <span className="w-6 h-px bg-[#C9A84C] relative after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-1.5 after:h-1.5 after:border-r after:border-t after:border-[#C9A84C] after:rotate-45" />
            </Link>
            <p className="font-mono-custom text-xs text-gray-400 tracking-wider">
              Sin tarjeta de crédito · Acceso inmediato
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 px-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-4">
            Todo incluido
          </div>
          <h2 className="font-display text-5xl font-light italic mb-20">
            Cada módulo, pensado<br />para vosotros.
          </h2>
          <div className="grid grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {[
              { num: '01', title: 'Checklist por etapas', desc: 'Desde 18 meses antes hasta el día de la boda. 30 tareas organizadas por periodo con progreso real.' },
              { num: '02', title: 'Presupuesto', desc: 'Control total de gastos. Presupuesto estimado, coste real y pagado. Estado de cada partida en tiempo real.' },
              { num: '03', title: 'Lista de invitados', desc: 'Gestión completa: reserva de fecha, invitación enviada y confirmación de asistencia.' },
              { num: '04', title: 'Seating', desc: 'Distribución de mesas. Asignad cada invitado a su mesa y visualizad la distribución al instante.' },
              { num: '05', title: 'Proveedores', desc: 'Todos los contactos en un lugar. Estado de cada proveedor: por contactar, negociando o contratado.' },
              { num: '06', title: 'Progreso visual', desc: 'Panel central con el porcentaje de planificación completada. Siempre sabéis dónde estáis.' },
            ].map(f => (
              <div key={f.num} className="bg-white p-10">
                <div className="font-display text-5xl font-light italic text-gray-100 mb-6">{f.num}</div>
                <div className="text-sm font-medium mb-3">{f.title}</div>
                <div className="text-xs text-gray-400 leading-relaxed font-mono-custom">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-32 px-16 bg-[#FDFAF2] border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-4">
            En tres pasos
          </div>
          <h2 className="font-display text-5xl font-light italic mb-20">
            Cómo funciona.
          </h2>
          <div className="grid grid-cols-3 gap-20">
            {[
              { num: '01', title: 'Creaos una cuenta', desc: 'Solo necesitáis un email. Sin tarjeta de crédito. Acceso inmediato al organizador completo.' },
              { num: '02', title: 'Responded el quiz', desc: 'Cinco preguntas sobre vuestra boda. Vowed genera un plan personalizado a vuestro estilo y fecha.' },
              { num: '03', title: 'Organizad juntos', desc: 'Acceded desde cualquier dispositivo. Cada cambio se guarda automáticamente en vuestra cuenta.' },
            ].map(s => (
              <div key={s.num}>
                <div className="font-display text-8xl font-light italic text-gray-100 leading-none mb-6">{s.num}</div>
                <div className="w-8 h-px bg-[#C9A84C] mb-5" />
                <div className="text-sm font-medium mb-3">{s.title}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-16 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-6">
            Empezad hoy
          </div>
          <h2 className="font-display text-6xl font-light italic text-white mb-8">
            Vuestra boda os espera.
          </h2>
          <p className="text-sm text-gray-500 mb-12 leading-relaxed">
            Acceso gratuito. Sin límites. Todo el organizador disponible desde el primer día.
          </p>
          <Link href="/register" className="inline-flex items-center gap-4 bg-white text-black font-mono-custom text-xs tracking-widest uppercase px-10 py-4 hover:bg-gray-100 transition-colors">
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 px-16 py-8 flex items-center justify-between">
        <div className="font-display text-lg font-light tracking-widest uppercase">Vowed</div>
        <div className="font-mono-custom text-xs text-gray-400 tracking-widest">
          WEDDING PLANNER · 2025
        </div>
      </footer>

    </main>
  )
}
