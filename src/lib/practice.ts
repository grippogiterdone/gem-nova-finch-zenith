export const practice = {
  name: "Waystone Mental Health Counseling, PLLC",
  short: "Waystone",
  domain: "waystonemhc.com",
  clinician: "Liane Brust, MA, LMHC",
  license: "New York License #015532",
  npi: "1932849817",
  phoneDisplay: "(347) 830-7451",
  phoneHref: "tel:+13478307451",
};

export const links = {
  portal: "https://liane-brust.clientsecure.me/",
  zocdoc: "https://www.zocdoc.com/professional/liane-brust-ma-lmhc-805002",
  psychologyToday:
    "https://www.psychologytoday.com/us/therapists/liane-brust-brooklyn-ny/1050607",
  linkedin: "https://www.linkedin.com/in/liane-brust",
  crisis: "tel:988",
  emergency: "tel:911",
};

export const nav = [
  { href: "#specialties", label: "Specialties" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#next", label: "Next" },
] as const;

export const specialties = [
  {
    index: "01",
    title: "Anxiety & perfectionism",
    body: "The high-functioning kind: overthinking, a loud inner critic, low mood, and the private strain of looking like you have it handled.",
  },
  {
    index: "02",
    title: "Relationship dynamics",
    body: "Patterns in partnership, family, and friendship — communication, trust, codependency, and the wish to feel more like yourself with other people.",
  },
  {
    index: "03",
    title: "Childhood trauma & life transitions",
    body: "Earlier experiences that still organize the present, and the seasons that ask you to become someone new: work, identity, loss, parenthood, a move.",
  },
] as const;

export const focusTags = [
  "ADHD & autism affirming",
  "OCD",
  "Burnout & stress",
  "Chronic pain / illness",
  "Grief",
  "Queer-allied",
  "Women’s issues",
  "Depression",
  "Self-esteem",
] as const;

export const modalities = [
  {
    title: "Relational & psychodynamic",
    body: "How earlier relationships and patterns show up now — explored with curiosity, not a verdict.",
  },
  {
    title: "Coherence & parts work",
    body: "Meeting the parts of you that protect, strive, and hurt, and helping them stop working against each other.",
  },
  {
    title: "Mindfulness & somatic",
    body: "Attention to breath, body, and the nervous system, so insight is something you can feel, not only think.",
  },
  {
    title: "ACT & compassion-focused",
    body: "Practical tools for the inner critic: values, acceptance, and a kinder relationship with yourself.",
  },
] as const;

export const reviews = [
  {
    quote:
      "Liane is a breath of fresh air. She is incredibly knowledgeable and open minded, making me feel at peace when talking to her about anything on my mind. She deeply understands my struggles of navigating the corporate world while balancing motherhood.",
    name: "RK",
    when: "Less than 6 months ago",
  },
  {
    quote:
      "Liane makes me feel so seen and so heard. She is incredibly non-judgmental and makes our sessions a safe place to share anything I’m going through. I feel so lucky to have found her.",
    name: "KA",
    when: "Less than 6 months ago",
  },
  {
    quote:
      "I’ve had a great experience talking with Liane. She is incredibly empathetic, patient, and easy to talk to. She remembers the small details from our conversations, which makes me feel like she truly cares about me as a person.",
    name: "AP",
    when: "Less than 6 months ago",
  },
] as const;

export const endorsements = [
  {
    quote:
      "Liane is an incredibly warm, calm, and empathetic therapist. She is the best listener and offers thoughtful, insightful help that can offer new perspectives and help you see yourself in a whole new way.",
    name: "Kim Houghton, LPC",
    role: "Licensed Professional Counselor",
  },
  {
    quote:
      "Liane is an incredibly empathetic clinician. She holds a safe space for all parts of a client, meets each client where they are, with a lens of compassion and curiosity.",
    name: "Tina French, MS, LMFT",
    role: "Marriage & Family Therapist",
  },
  {
    quote:
      "Liane is an incredibly thoughtful, caring, creative, and empathetic therapist. She meets each person where they are at, creating a deeply safe, collaborative, and understanding space to promote exploration, growth, and healing with strong clinical skills.",
    name: "Ariel Katz, LMHC-D",
    role: "Licensed Mental Health Counselor",
  },
] as const;

export const payments = [
  "Visa",
  "Mastercard",
  "American Express",
  "HSA / FSA",
  "Zelle",
] as const;

export const nextSteps = [
  {
    index: "01",
    title: "A free 15-minute video consult",
    body: "You talk. She listens. It’s a chance to see if you’re a fit — no commitment, and nowhere to drive. The practice does not see clients in person.",
  },
  {
    index: "02",
    title: "If it’s a fit, you book the first session",
    body: "Weekday video sessions, usually 45–50 minutes, from wherever you feel most comfortable. You need to be physically in New York.",
  },
  {
    index: "03",
    title: "The work stays virtual",
    body: "Same secure link, same person. Fees, superbills, and sliding scale are discussed on the consult. Exact rates are not posted here.",
  },
] as const;
