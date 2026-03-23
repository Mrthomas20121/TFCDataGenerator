import { DataLoader } from "../index.js";
import { ItemTagProvider, BlockTagProvider } from "../datagen/datagenerator.js";
import { ResourceKey } from "../datagen/resources.js";
import { blockTags, itemTags } from "./tags.js";

let loader = new DataLoader();

loader.registerDataProvider(new ItemTagProvider(), itemTags);
loader.registerDataProvider(new BlockTagProvider(), blockTags);