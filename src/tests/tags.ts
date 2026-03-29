import { BlockTagProvider, Consumer, ItemTagProvider } from "../datagen/datagenerator.js";
import { ResourceKey } from "../datagen/resources.js";
import { TFC_Metal_Blocks, TFC_Metal_Items, TFC_METALLUM_METALS } from "./constants.js";

export const tags: { [value:string]: ResourceKey } = {
    'anvil': ResourceKey.full('tfc:anvils'),
    'ingot': ResourceKey.full('forge:ingots'),
    'double_ingot': ResourceKey.full('forge:double_ingots'),
    'double_sheet': ResourceKey.full('forge:double_sheets'),
    'lamp': ResourceKey.full('tfc:lamps'),
    'fishing_rod': ResourceKey.full('forge:fishing_rods'),
    'pickaxe': ResourceKey.full('tfc:pickaxes'),
    'propick': ResourceKey.full('tfc:propicks'),
    'axe': ResourceKey.full('tfc:axes'),
    'shovel': ResourceKey.full('tfc:shovels'),
    'hoe': ResourceKey.full('tfc:hoes'),
    'hammer': ResourceKey.full('tfc:hammers'),
    'saw': ResourceKey.full('tfc:saws'),
    'javelin': ResourceKey.full('tfc:javelins'),
    'sword': ResourceKey.full('tfc:swords'),
    'mace': ResourceKey.full('tfc:maces'),
    'scythe': ResourceKey.full('tfc:scythes'),
    'shield': ResourceKey.full('tfc:shields'),
    'shears': ResourceKey.full('tfc:shears'),
    'tuyere': ResourceKey.full('tfc:tuyeres'),
    'block': ResourceKey.full('forge:storage_blocks')
}

export function itemTags(provider: ItemTagProvider) {
    for(let metal of TFC_METALLUM_METALS) {
        for(let part of TFC_Metal_Items) {
            if(tags.hasOwnProperty(part.name) && metal.types.contain(part.type)) {
                provider.add(tags[part.name], metal.getItemName(part));
            }
        }
    }
}

export function blockTags(provider: BlockTagProvider) {
    for(let metal of TFC_METALLUM_METALS) {
        for(let part of TFC_Metal_Blocks) {
            if(tags.hasOwnProperty(part.name) && metal.types.contain(part.type)) {
                provider.add(tags[part.name], metal.getItemName(part));
            }
        }
    }
}