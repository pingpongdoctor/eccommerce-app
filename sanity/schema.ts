import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import product from "./schemas/product";
import author from "./schemas/author";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, author, blockContent],
};
