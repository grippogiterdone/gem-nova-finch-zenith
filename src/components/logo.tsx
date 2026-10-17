export function Cairn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden="true">
      <path
        d="M7 49h34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path fill="currentColor" d="M20 49V20l4-8 4 8v29Z" />
      <path fill="currentColor" d="M14 49V34l3-5v20Z" opacity="0.55" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3 text-forest">
      <Cairn className="size-9 shrink-0 text-sage-dark" />
      <span className="flex flex-col leading-none">
        <span className="font-sans text-xs font-semibold tracking-widest sm:text-sm">WAYSTONE</span>
        {compact ? null : (
          <span className="mt-1 hidden font-sans text-xs tracking-widest text-muted sm:block">
            MENTAL HEALTH
          </span>
        )}
      </span>
    </span>
  );
}
