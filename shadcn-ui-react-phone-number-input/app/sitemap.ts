import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shadcn-phone-input.vercel.app/",
      lastModified: new Date(),
    },
  ];
}
