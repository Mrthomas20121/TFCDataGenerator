import { DataLoader } from "../index.js";
import { ItemTagProvider, BlockTagProvider, ItemModelProvider } from "../datagen/datagenerator.js";
import { ResourceKey } from "../datagen/resources.js";
import { blockTags, itemTags } from "./tags.js";
import { TFC_Metal_Items, TFC_METALLUM_METALS } from "./constants.js";

let loader = new DataLoader();

loader.registerDataProvider(new ItemTagProvider(), itemTags);
loader.registerDataProvider(new BlockTagProvider(), blockTags);
loader.registerDataProvider(new ItemModelProvider(), (provider) => {
    for(let metal of TFC_METALLUM_METALS) {
        for(let part of TFC_Metal_Items) {
            if(metal.types.contain(part.type)) {
                if(part.name=='javelin') {
                    part.consumer(provider, metal.name);
                }
                else {
                    part.consumer(provider, metal.getItemName(part));
                }
            }
        }
    }
});