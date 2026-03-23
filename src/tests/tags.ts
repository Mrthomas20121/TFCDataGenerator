import { BlockTagProvider, Consumer, ItemTagProvider } from "../datagen/datagenerator.js";
import { ResourceKey } from "../datagen/resources.js";

export function itemTags(provider: ItemTagProvider) {
    provider.add(ResourceKey.of('tfc', 'test'), ResourceKey.of('tfc', 'tfc_test_item'))
}

export function blockTags(provider: BlockTagProvider) {

}