import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schemas/blockContent';
import product from './schemas/product';
import author from './schemas/author';
import homepage from './schemas/homepage';
import blog from './schemas/blog';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, author, blockContent, homepage, blog],
};
