export type Subsection = {
    id: string;
    title: string;
};

export type Section = {
    id: string;
    title: string;
    subsections?: Subsection[];
};

export const INDEX: Section[] = [
  {
    id: "intro",
    title: "Introduction",
  },
  {
    id: "features",
    title: "Features",
    subsections: [
      { id: "feature1", title: "Feature 1" },
      { id: "feature2", title: "Feature 2" },
    ],
  },
  {
    id: "conclusion",
    title: "Conclusion",
  },
];