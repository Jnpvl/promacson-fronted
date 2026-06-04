export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold text-text sm:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-2 text-text-muted">{subtitle}</p> : null}
    </header>
  );
}
