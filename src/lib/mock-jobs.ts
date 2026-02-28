import type { Job } from "./types";

export const DEMOGRAPHICS = [
  { value: "directing", label: "Directing" },
  { value: "acting", label: "Acting" },
  { value: "writers", label: "Writers" },
  { value: "crew", label: "Crew" },
] as const;

export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Short Film Director",
    company: "Indie Lens Collective",
    location: "Los Angeles, CA 90028",
    area: "Hollywood",
    type: "Project-based",
    pay: "$2,500 – $4,000",
    tags: ["Short film", "2-week shoot", "SAG micro-budget"],
    description:
      "Seeking director for 15-min drama short. Fully funded, shooting March. Must have at least one completed short. Send reel and one-page vision.",
    postedAt: "2 days ago",
    rating: 4.2,
  },
  {
    id: "2",
    title: "Lead Actor – Drama Short",
    company: "Pocket Films Co",
    location: "Austin, TX 78701",
    area: "Downtown",
    type: "Paid",
    pay: "Deferred + backend",
    tags: ["Male, 25–35", "3-week commitment", "Reel material"],
    description:
      "Lead role in 20-min character drama. In-person audition in Austin. Shooting April. Union and non-union considered.",
    postedAt: "1 day ago",
    rating: 4.0,
  },
  {
    id: "3",
    title: "Screenwriter – Horror Short",
    company: "Night Frame Productions",
    location: "Brooklyn, NY 11201",
    area: "Williamsburg",
    type: "Writing gig",
    pay: "$800 flat",
    tags: ["10–12 pages", "Contained location", "Submission by 3/15"],
    description:
      "We need a punchy horror short script, single location, 2–3 characters. Option to stay on as script consultant during shoot.",
    postedAt: "3 days ago",
  },
  {
    id: "4",
    title: "DP / Cinematographer",
    company: "Frame One Studios",
    location: "El Paso, TX 79902",
    area: "Northwest",
    type: "Crew",
    pay: "Day rate negotiable",
    tags: ["ARRI preferred", "5-day shoot", "March"],
    description:
      "Experienced DP for narrative short. Must have own camera package or ability to source. Mood references: Fincher, Deakins.",
    postedAt: "5 hours ago",
    rating: 4.5,
  },
  {
    id: "5",
    title: "Production Assistant",
    company: "News-Press & Gazette Company",
    location: "El Paso, TX 79902",
    area: "Northwest",
    type: "Crew",
    pay: "Pay information not provided",
    tags: ["8 hour shift", "On-set experience preferred"],
    description:
      "Support production on indie short and commercial spots. Runs, set dressing, crowd control. Opportunity to move into other roles.",
    postedAt: "1 day ago",
    rating: 3.3,
  },
  {
    id: "6",
    title: "Sound Mixer / Boom Op",
    company: "Quiet Set Audio",
    location: "Albuquerque, NM 87102",
    type: "Crew",
    pay: "Up to $350/day",
    tags: ["Location sound", "Short film", "April shoot"],
    description:
      "Location sound for 12-day narrative short. Own gear required. Travel to Santa Fe for 2 days.",
    postedAt: "4 days ago",
  },
];

export function getJobsForLocationAndDemographic(
  location: string,
  demographic: string
): Job[] {
  const loc = location.toLowerCase();
  const demo = demographic.toLowerCase();
  return MOCK_JOBS.filter((job) => {
    const matchLocation =
      !loc || job.location.toLowerCase().includes(loc) || job.area?.toLowerCase().includes(loc);
    const matchDemo =
      !demo ||
      job.title.toLowerCase().includes(demo) ||
      job.type.toLowerCase().includes(demo) ||
      job.tags.some((t) => t.toLowerCase().includes(demo));
    return matchLocation && matchDemo;
  });
}
