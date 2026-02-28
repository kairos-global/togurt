export type Demographic = "directing" | "acting" | "writers" | "crew";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  area?: string;
  type: string;
  pay?: string;
  tags: string[];
  description: string;
  postedAt: string;
  rating?: number;
}
