export interface Profession {
  slug: string;
  name: string;
  ctaTitle: string;
  nextSlug: string;
}

export const professions: Profession[] = [
  {
    slug: "graphic-designers",
    name: "Graphic Designers",
    ctaTitle: "Design Contract",
    nextSlug: "copywriters",
  },
  {
    slug: "copywriters",
    name: "Copywriters",
    ctaTitle: "Writing Agreement",
    nextSlug: "web-developers",
  },
  {
    slug: "web-developers",
    name: "Web Developers",
    ctaTitle: "Software Development Contract",
    nextSlug: "photographers",
  },
  {
    slug: "photographers",
    name: "Photographers",
    ctaTitle: "Photography Services Contract",
    nextSlug: "graphic-designers",
  },
];
