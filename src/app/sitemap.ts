import { MetadataRoute } from "next";
import useGlobalService from "@/core/hook/useGlobalService";

const rootUrl = `${process.env.NEXT_PUBLIC_URL}`;
//

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: rootUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
