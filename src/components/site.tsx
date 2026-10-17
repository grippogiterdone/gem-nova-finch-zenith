import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Menu,
  Phone,
  Shield,
  Star,
  Video,
  X,
} from "lucide-react";
import { Cairn, Wordmark } from "@/components/logo";
import {
  endorsements,
  focusTags,
  links,
  modalities,
  nav,
  nextSteps,
  payments,
  practice,
  reviews,
  specialties,
} from "@/lib/practice";

const fieldClass =
  "h-12 w-full rounded-2xl border border-stone bg-paper px-4 text-base text-forest placeholder:text-muted/70";

function External({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-clay" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-clay" aria-hidden="true" />
      ))}
    </span>
  );
}

function PrimaryLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-clay-light px-6 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-cream";
  if (external) {
    return (
      <External href={href} className={className}>
        {children}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </External>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function SecondaryLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-forest/15 bg-paper px-6 text-sm font-semibold text-forest transition-colors hover:bg-sand";
  if (external) {
    return (
      <External href={href} className={className}>
        {children}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </External>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

type Seeking = "" | "individual" | "couples" | "unsure";

type Inquiry = {
  name: string;
  email: string;
  phone: string;
  seeking: Seeking;
  note: string;
};

const emptyInquiry: Inquiry = {
  name: "",
  email: "",
  phone: "",
  seeking: "",
  note: "",
};

function composeNote(form: Inquiry) {
  const seeking =
    form.seeking === "individual"
      ? "Individual therapy"
      : form.seeking === "couples"
        ? "Couples counseling"
        : "Not sure yet";
  return [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : null,
    `Seeking: ${seeking}`,
    form.note ? `Note: ${form.note}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function Site() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Inquiry>(emptyInquiry);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [readyNote, setReadyNote] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const baseId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function update<K extends keyof Inquiry>(key: K, value: Inquiry[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter an email you check.";
    }
    if (!form.seeking) next.seeking = "Choose what you’re looking for.";
    if (!consent) next.consent = "Please confirm this is not an emergency.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setReadyNote(composeNote({ ...form, name: form.name.trim(), email: form.email.trim() }));
    setCopied(false);
  }

  async function copyNote() {
    if (!readyNote) return;
    try {
      await navigator.clipboard.writeText(readyNote);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div id="top" className="bg-cream text-forest">
      <a
        href="#main"
        className="absolute -top-16 left-4 z-50 rounded-full bg-forest px-4 py-2 text-sm text-cream focus:top-4"
      >
        Skip to content
      </a>

      <div className="border-t-4 border-clay bg-forest text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 text-sm leading-relaxed">
          <p>
            Virtual only. Now accepting new individual and couples clients across New York — no office visits.
          </p>
          <External
            href={links.portal}
            className="inline-flex min-h-11 items-center gap-1 font-semibold text-clay-light underline decoration-clay-light/50 underline-offset-4"
          >
            Schedule a free 15-minute consultation
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </External>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-stone/80 bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="min-w-0" aria-label="Waystone Mental Health Counseling, home">
            <Wordmark />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition-colors hover:text-forest"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <External
              href={links.portal}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-clay-light px-4 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-cream sm:px-6"
            >
              <span className="md:hidden">Book</span>
              <span className="hidden md:inline">Book free consult</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </External>
            <button
              type="button"
              className="inline-flex size-12 items-center justify-center rounded-full border border-stone text-forest lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
        {open ? (
          <nav
            id="mobile-nav"
            className="border-t border-stone bg-cream px-5 py-4 lg:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex min-h-12 items-center border-b border-stone/70 text-lg font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#consult"
                  className="flex min-h-12 items-center text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  Consultation
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>

      <main id="main">
        <section className="relative isolate overflow-hidden">
          <img
            src="/path.jpg"
            alt=""
            width={1792}
            height={1008}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-cream/90" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-widest text-sage-dark uppercase">
              Virtual-only psychotherapy in New York
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-none font-medium text-forest md:text-6xl">
              A grounded space for{" "}
              <em className="font-medium text-sage-dark italic">clarity, self-trust,</em> and
              meaningful change.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              You may look like you have it all together while privately feeling anxious, stuck,
              overwhelmed, or unsure of what comes next. Therapy here is a place to slow down,
              understand what’s underneath, and choose what comes after.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href={links.portal} external>
                Request free 15-min consult
              </PrimaryLink>
              <SecondaryLink href={links.zocdoc} external>
                Book via Zocdoc
              </SecondaryLink>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-stone pt-6">
              <div>
                <dt className="text-xs tracking-wide text-muted uppercase">Rating</dt>
                <dd className="mt-1 font-serif text-2xl">5.00</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-muted uppercase">Reviews</dt>
                <dd className="mt-1 font-serif text-2xl">16+</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-muted uppercase">Format</dt>
                <dd className="mt-1 font-serif text-2xl">Video</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6">
            <figure className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-3xl border border-stone" aria-hidden="true" />
              <img
                src="/liane.jpg"
                width={400}
                height={400}
                alt="Liane Brust, smiling outdoors with autumn trees behind her."
                className="relative aspect-square w-full rounded-3xl object-cover"
              />
              <figcaption className="mt-5 text-center text-sm text-muted">
                {practice.clinician}
                <span className="mt-1 block">{practice.license}</span>
              </figcaption>
            </figure>
          </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-forest text-cream">
          <img
            src="/path.jpg"
            alt=""
            width={1792}
            height={1008}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-forest/88" />
          <blockquote className="relative mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
            <Cairn className="mx-auto mb-8 size-10 text-clay-light" />
            <p className="font-serif text-3xl leading-snug font-medium md:text-5xl">
              “Therapy is not about fixing anything, because you’re not broken. It’s about
              understanding yourself deeply enough to choose what comes next.”
            </p>
            <footer className="mt-8 text-sm tracking-widest text-clay-light uppercase">
              Liane Brust, MA, LMHC
            </footer>
          </blockquote>
        </section>

        <section id="specialties" className="scroll-mt-24 bg-sand">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest text-sage-dark uppercase">
                Specialties
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight font-medium md:text-5xl">
                Where the work usually begins.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Top specialties are anxiety, relationship issues, and life transitions. The rest of
                the practice is just as welcome — including affirming care, grief, and the body.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {specialties.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col rounded-3xl border border-stone bg-paper p-7"
                >
                  <p className="font-serif text-3xl text-clay">{item.index}</p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight font-medium">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                </article>
              ))}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {focusTags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-stone bg-cream px-4 py-2 text-sm text-forest"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              Queer-allied and affirming of lesbian, gay, bisexual, transgender, non-binary, and
              intersex people. Also allied with racial justice, single parents, and sex workers.
              Sessions are in English and virtual only, for people physically in New York,
              including Brooklyn, Long Island, New York City, and Westchester. There is no
              in-person office.
            </p>
          </div>
        </section>

        <section id="approach" className="scroll-mt-24 bg-cream">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="overflow-hidden rounded-3xl bg-forest text-cream">
              <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-12 lg:p-14">
                <div className="lg:col-span-5">
                  <p className="text-xs font-semibold tracking-widest text-clay-light uppercase">
                    Clinical approach
                  </p>
                  <h2 className="mt-3 font-serif text-4xl leading-tight font-medium md:text-5xl">
                    Integrative, trauma-informed, and paced with you.
                  </h2>
                  <p className="mt-5 leading-relaxed text-cream">
                    I draw from relational and psychodynamic therapy, coherence therapy, parts
                    work, mindfulness, and somatic awareness. You’ll be heard as we uncover
                    patterns and practice tools to quiet the inner critic, build self-compassion,
                    and feel more grounded.
                  </p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                  {modalities.map((item) => (
                    <li key={item.title} className="rounded-2xl bg-sage-dark p-5">
                      <h3 className="font-serif text-2xl font-medium text-cream">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-cream">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 bg-cream">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest text-sage-dark uppercase">
                About Liane
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight font-medium md:text-5xl">
                Thoughtful care for people who already understand a lot — and still feel stuck.
              </h2>
            </div>
            <div className="mt-8 grid gap-10 lg:grid-cols-12">
              <div className="space-y-4 text-lg leading-relaxed text-muted lg:col-span-7">
                <p>
                  I work with introspective adults, and with couples, who want to understand
                  themselves more honestly. Together we look beneath the surface — anxiety,
                  relationships, self-criticism, the sense that insight hasn’t been enough — with
                  curiosity and compassion.
                </p>
                <p>
                  Sessions are a place to get curious without judgment. We explore how past
                  experience and familiar patterns may be shaping how you feel, relate, and decide
                  now, and we make room for something more workable.
                </p>
                <p>
                  If you’ve been living with negative self-talk or overthinking, you don’t have to
                  navigate that alone. A free 15-minute consultation is simply a chance to see
                  whether we’re the right fit.
                </p>
              </div>
              <ul className="grid content-start gap-3 lg:col-span-5">
                {[
                  "M.A., Counseling for Mental Health & Wellness, NYU, 2022",
                  "B.A., Stony Brook University",
                  `NPI ${practice.npi}`,
                  "Virtual only — there is no office",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-forest">
                    <Check className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-24 bg-sage-tint">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-widest text-sage-dark uppercase">
                  Reviews
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-tight font-medium md:text-5xl">
                  A 5.0, from people who wanted to feel less alone in session.
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Stars />
                <p className="text-sm text-muted">16 verified Zocdoc reviews</p>
              </div>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {reviews.map((review) => (
                <figure
                  key={review.name}
                  className="flex flex-col rounded-3xl border border-stone bg-paper p-7"
                >
                  <Stars />
                  <blockquote className="mt-4 flex-1 leading-relaxed text-forest">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-muted">
                    <span className="font-semibold text-forest">{review.name}</span>
                    {" · "}
                    {review.when}
                    <span className="mt-1 block">Verified patient review · Zocdoc</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <h3 className="mt-16 font-serif text-3xl font-medium">What colleagues notice</h3>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {endorsements.map((item) => (
                <figure key={item.name} className="rounded-3xl bg-cream p-7">
                  <blockquote className="leading-relaxed text-forest">“{item.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="block font-semibold">{item.name}</span>
                    <span className="text-muted">{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="next" className="scroll-mt-24 bg-cream">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest text-sage-dark uppercase">
                What happens next
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight font-medium md:text-5xl">
                Three steps. All of them on video.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Waystone is a virtual practice. You will never be asked to come into an office.
                Fees are shared on the consultation, not on this page.
              </p>
            </div>
            <ol className="mt-12 grid gap-5 md:grid-cols-3">
              {nextSteps.map((step) => (
                <li key={step.index} className="rounded-3xl border border-stone bg-paper p-7">
                  <p className="font-serif text-3xl text-clay">{step.index}</p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight font-medium">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
            <details className="mt-8 rounded-2xl border border-stone bg-sand/70 px-5 py-4">
              <summary className="cursor-pointer text-sm font-medium text-forest">
                Insurance and payment
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                Waystone is out of network. You pay the session fee, then receive a monthly
                superbill — or Liane can file it — if you want to request reimbursement. A limited
                sliding scale is available case by case, and you can ask for a Good Faith Estimate.
                Accepted payments: {payments.join(", ")}.
              </p>
            </details>
          </div>
        </section>

        <section id="consult" className="scroll-mt-24 bg-sand">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-widest text-sage-dark uppercase">
                Consultation
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight font-medium md:text-5xl">
                Start with fifteen unrushed minutes.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Scheduling lives on the secure client portal. Use the note below to gather what
                you want to say, then continue there — or call directly.
              </p>
              <a
                href={practice.phoneHref}
                className="mt-8 inline-flex items-center gap-3 font-serif text-4xl text-forest"
              >
                <Phone className="size-7 text-clay" aria-hidden="true" />
                {practice.phoneDisplay}
              </a>
              <ul className="mt-8 space-y-3 text-sm leading-relaxed text-muted">
                <li className="flex gap-3">
                  <Shield className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden="true" />
                  Nothing typed here is stored or emailed. Paste it into the portal yourself.
                </li>
                <li className="flex gap-3">
                  <Video className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden="true" />
                  100% virtual. Secure video only — no office. You need to be located in New York
                  at the time of session.
                </li>
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-forest">
                If you or someone else is in immediate danger, call{" "}
                <a className="font-semibold underline" href={links.emergency}>
                  911
                </a>
                . For emotional crisis support, call or text{" "}
                <a className="font-semibold underline" href={links.crisis}>
                  988
                </a>
                . This page is not monitored for emergencies.
              </p>
            </div>

            <div className="rounded-3xl border border-stone bg-paper p-6 md:p-8 lg:col-span-7">
              {readyNote ? (
                <div>
                  <h3 className="font-serif text-3xl font-medium">Your note is ready.</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    It has not been sent. Copy it, then open the secure portal and paste it into
                    your consultation request.
                  </p>
                  <textarea
                    readOnly
                    value={readyNote}
                    className="mt-5 h-48 w-full resize-none rounded-2xl border border-stone bg-cream p-4 text-sm leading-relaxed text-forest"
                  />
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={copyNote}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-cream"
                    >
                      {copied ? "Copied" : "Copy my note"}
                    </button>
                    <PrimaryLink href={links.portal} external>
                      Open client portal
                    </PrimaryLink>
                  </div>
                  <button
                    type="button"
                    className="mt-4 text-sm text-muted underline"
                    onClick={() => {
                      setReadyNote(null);
                      setCopied(false);
                    }}
                  >
                    Edit the note
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3 className="font-serif text-3xl font-medium">Prepare a consultation note</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium" htmlFor={`${baseId}-name`}>
                      Name
                      <input
                        id={`${baseId}-name`}
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) => update("name", event.target.value)}
                        className={`${fieldClass} mt-2`}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
                      />
                      {errors.name ? (
                        <span id={`${baseId}-name-error`} className="mt-1 block text-sm font-medium text-sage-dark">
                          {errors.name}
                        </span>
                      ) : null}
                    </label>
                    <label className="block text-sm font-medium" htmlFor={`${baseId}-email`}>
                      Email
                      <input
                        id={`${baseId}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(event) => update("email", event.target.value)}
                        className={`${fieldClass} mt-2`}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
                      />
                      {errors.email ? (
                        <span id={`${baseId}-email-error`} className="mt-1 block text-sm font-medium text-sage-dark">
                          {errors.email}
                        </span>
                      ) : null}
                    </label>
                    <label className="block text-sm font-medium" htmlFor={`${baseId}-phone`}>
                      Phone <span className="font-normal text-muted">(optional)</span>
                      <input
                        id={`${baseId}-phone`}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(event) => update("phone", event.target.value)}
                        className={`${fieldClass} mt-2`}
                      />
                    </label>
                    <label className="block text-sm font-medium" htmlFor={`${baseId}-seeking`}>
                      I’m looking for
                      <select
                        id={`${baseId}-seeking`}
                        name="seeking"
                        value={form.seeking}
                        onChange={(event) => update("seeking", event.target.value as Seeking)}
                        className={`${fieldClass} mt-2`}
                        aria-invalid={Boolean(errors.seeking)}
                        aria-describedby={errors.seeking ? `${baseId}-seeking-error` : undefined}
                      >
                        <option value="">Select one</option>
                        <option value="individual">Individual therapy</option>
                        <option value="couples">Couples counseling</option>
                        <option value="unsure">Not sure yet</option>
                      </select>
                      {errors.seeking ? (
                        <span
                          id={`${baseId}-seeking-error`}
                          className="mt-1 block text-sm font-medium text-sage-dark"
                        >
                          {errors.seeking}
                        </span>
                      ) : null}
                    </label>
                  </div>
                  <label className="mt-4 block text-sm font-medium" htmlFor={`${baseId}-note`}>
                    Anything you’d like her to know{" "}
                    <span className="font-normal text-muted">(optional)</span>
                    <textarea
                      id={`${baseId}-note`}
                      name="note"
                      rows={4}
                      value={form.note}
                      onChange={(event) => update("note", event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-stone bg-paper px-4 py-3 text-base text-forest placeholder:text-muted/70"
                      placeholder="A sentence or two is plenty. Skip clinical detail if you’d rather share it live."
                    />
                  </label>
                  <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 accent-sage-dark"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                    />
                    <span>
                      I understand this form does not send a message, is not for emergencies, and
                      that I’ll finish the request in the secure portal.
                    </span>
                  </label>
                  {errors.consent ? (
                    <p className="mt-2 text-sm font-medium text-sage-dark">{errors.consent}</p>
                  ) : null}
                  <button
                    type="submit"
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-clay-light px-6 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-cream"
                  >
                    Prepare my portal note
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone bg-forest text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="inline-flex items-center gap-3">
              <Cairn className="size-9 text-clay-light" />
              <span className="font-sans text-sm font-semibold tracking-widest">WAYSTONE</span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
              {practice.name}. Telehealth psychotherapy with {practice.clinician}.{" "}
              {practice.domain}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-clay-light uppercase">Visit</p>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a className="text-cream/80 hover:text-cream" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-clay-light uppercase">
              Connect
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <External className="text-cream/80 hover:text-cream" href={links.portal}>
                  Client portal
                </External>
              </li>
              <li>
                <External className="text-cream/80 hover:text-cream" href={links.zocdoc}>
                  Zocdoc
                </External>
              </li>
              <li>
                <External className="text-cream/80 hover:text-cream" href={links.psychologyToday}>
                  Psychology Today
                </External>
              </li>
              <li>
                <External className="text-cream/80 hover:text-cream" href={links.linkedin}>
                  LinkedIn
                </External>
              </li>
              <li>
                <a className="text-cream/80 hover:text-cream" href={practice.phoneHref}>
                  {practice.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/15">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs leading-relaxed text-cream/65 md:flex-row md:items-center md:justify-between">
            <p>
              {practice.clinician} · {practice.license} · NPI {practice.npi}
              <span className="mt-1 block">Out of network. Superbills available on request.</span>
            </p>
            <p>
              Crisis support: call or text{" "}
              <a className="text-clay-light underline" href={links.crisis}>
                988
              </a>
              . Emergencies:{" "}
              <a className="text-clay-light underline" href={links.emergency}>
                911
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
