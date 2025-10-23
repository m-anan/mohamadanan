import { MetadataRoute } from "next";
import useGlobalService from "@/core/hook/useGlobalService";
import ProductService from "@/modules/products/services/ProductService";

const rootUrl = `${process.env.NEXT_PUBLIC_URL}`;
async function fetchSlugs() {
  const productService = useGlobalService(ProductService);

  const Products = await productService.methods.getProducts({});
  const slugs = Products.map((data) => `${data.id}`);
  return slugs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await fetchSlugs();

  const productsListing: MetadataRoute.Sitemap = slugs.map((slug) => {
    return {
      url: `${rootUrl}/products/${slug}`,
      lastModified: new Date(),
      changeFrequency: "always",
    };
  });

  return [
    {
      url: rootUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${rootUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${rootUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    ...productsListing,
  ];
}
