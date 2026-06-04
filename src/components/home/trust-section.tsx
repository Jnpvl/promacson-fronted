export function TrustSection() {
  const items = [
    "Cumplimiento regulatorio",
    "Marcas autorizadas",
    "Atención a instituciones públicas y privadas",
    "Entrega a nivel nacional",
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl bg-brand-700 px-5 py-8 text-center text-white sm:px-12 sm:py-10">
        <h2 className="text-lg font-bold sm:text-xl">Confianza para el sector salud</h2>
        <ul className="mt-5 flex flex-col items-center gap-3 text-sm text-brand-100 sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
