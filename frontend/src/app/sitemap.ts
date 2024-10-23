import { MetadataRoute } from "next";

export default async function sitemap():Promise<MetadataRoute.Sitemap> {

    const locationRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packagelocations`);
    const locations = await locationRes.json()

    const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoryItem`);
    const categories = await categoryRes.json()


    const locationEntries:MetadataRoute.Sitemap = locations.map((item:any)=> ({
        url: `https://trouvailler.com/packages/location/${item.location}`
    })) 

    const categoryEntries:MetadataRoute.Sitemap = categories.map((item:any)=> ({
        url: `https://trouvailler.com/packages/category/${item.title}`
    })) 

    return [
        {
            url: "https://trouvailler.com"
        },
        ...locationEntries,
        ...categoryEntries

    ]

}