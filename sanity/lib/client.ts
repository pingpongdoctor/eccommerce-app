import { createClient } from '@sanity/client/stega';
import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: process.env.NEXT_PUBLIC_SANITY_API_READ_WRITE_TOKEN,
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
});
