import { Button } from "@/components/ui/button";

export function AudienceCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h2 className="text-2xl font-bold text-text">¿Cómo quieres comprar?</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Sin mayoreo
          </p>
          <h3 className="mt-2 text-xl font-bold text-text">Consultorio y compras menores</h3>
          <p className="mt-3 text-text-muted">
            Ideal si no compras por volumen: agrega productos al carrito de cotización y envía tu
            solicitud en minutos.
          </p>
          <Button href="/cotizacion" className="mt-6">
            Ir a cotización
          </Button>
        </article>
        <article className="rounded-2xl border-2 border-brand-700 bg-brand-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Mayoreo
          </p>
          <h3 className="mt-2 text-xl font-bold text-text">Clínicas, hospitales y distribuidores</h3>
          <p className="mt-3 text-text-muted">
            Compras recurrentes, licitaciones o surtido para reventa. Te asignamos ejecutivo,
            precios por contrato y logística dedicada.
          </p>
          <Button href="/mayoreo" variant="primary" className="mt-6">
            Compra mayoreo
          </Button>
        </article>
      </div>
    </section>
  );
}
