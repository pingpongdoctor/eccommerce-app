import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";
export const builder = imageUrlBuilder({ projectId, dataset });
