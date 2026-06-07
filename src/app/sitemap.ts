import { MetadataRoute } from "next";
import { getNegocios } from "@/lib/queries";

const BASE = "https://curiociudad.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const negocios = await getNegocios();

  const negocioUrls: MetadataRoute.Sitemap = negocios.map((n) => ({
    url: `${BASE}/negocios/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    { url: BASE,                        lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/registrar`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/tarifas`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/destacar`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/nosotros`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/faqs`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contacto`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/suscribirse`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/terminos`,          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/privacidad`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    ...negocioUrls,
  ];
}
