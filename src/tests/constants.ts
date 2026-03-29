import { List } from "void-list";
import { Metal, MetalItem, Ore, Rock, RockCategory, Tier, Type } from "./data.js";
import { ItemModel, JavelinModel } from "./asset.js";
import { ResourceKey } from "../datagen/resources.js";
import { BlockModelProvider, ItemModelProvider } from "../datagen/datagenerator.js";

export const AllRocks: List<Rock> = List.from(
    new Rock('granite', RockCategory.igneous_intrusive, 'white'),
    new Rock('diorite', RockCategory.igneous_intrusive, 'white'),
    new Rock('gabbro', RockCategory.igneous_intrusive, 'black'),
    new Rock('shale', RockCategory.sedimentary, 'black'),
    new Rock('claystone', RockCategory.sedimentary, 'brown'),
    new Rock('limestone', RockCategory.sedimentary, 'white'),
    new Rock('conglomerate', RockCategory.sedimentary, 'green'),
    new Rock('dolomite', RockCategory.sedimentary, 'black'),
    new Rock('chert', RockCategory.sedimentary, 'yellow'),
    new Rock('chalk', RockCategory.sedimentary, 'white'),
    new Rock('rhyolite', RockCategory.igneous_extrusive, 'red'),
    new Rock('basalt', RockCategory.igneous_extrusive, 'red'),
    new Rock('andesite', RockCategory.igneous_extrusive, 'red'),
    new Rock('dacite', RockCategory.igneous_extrusive, 'red'),
    new Rock('quartzite', RockCategory.metamorphic, 'white'),
    new Rock('slate', RockCategory.metamorphic, 'brown'),
    new Rock('phyllite', RockCategory.metamorphic, 'brown'),
    new Rock('schist', RockCategory.metamorphic, 'green'),
    new Rock('gneiss', RockCategory.metamorphic, 'green'),
    new Rock('marble', RockCategory.metamorphic, 'yellow')
);

export const IgneousExtrusiveRocks: List<Rock> = AllRocks.filter(rock => rock.category == RockCategory.igneous_extrusive);
export const IgneousIntrusiveRocks: List<Rock> = AllRocks.filter(rock => rock.category == RockCategory.igneous_intrusive);
export const SedimentaryRocks: List<Rock> = AllRocks.filter(rock => rock.category == RockCategory.sedimentary);
export const MetamorphicRocks: List<Rock> = AllRocks.filter(rock => rock.category == RockCategory.metamorphic);

export const TFCMetals: List<Metal> = List.from(
    new Metal(ResourceKey.of('tfc', 'bismuth'), 1, List.from(Type.ALL, Type.PART), 0.14, 270),
    new Metal(ResourceKey.of('tfc', 'bismuth_bronze'), 2, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 985),
    new Metal(ResourceKey.of('tfc', 'black_bronze'), 2, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1070),
    new Metal(ResourceKey.of('tfc', 'brass'), 1, List.from(Type.ALL, Type.PART), 0.35, 930),
    new Metal(ResourceKey.of('tfc', 'bronze'), 2, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 950),
    new Metal(ResourceKey.of('tfc', 'copper'), 1, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1080),
    new Metal(ResourceKey.of('tfc', 'gold'), 1, List.from(Type.ALL, Type.PART), 0.6, 1060),
    new Metal(ResourceKey.of('tfc', 'nickel'), 1, List.from(Type.ALL, Type.PART), 0.48, 1453),
    new Metal(ResourceKey.of('tfc', 'rose_gold'), 1, List.from(Type.ALL, Type.PART), 0.35, 960),
    new Metal(ResourceKey.of('tfc', 'silver'), 1, List.from(Type.ALL, Type.PART), 0.48, 961),
    new Metal(ResourceKey.of('tfc', 'tin'), 1, List.from(Type.ALL, Type.PART), 0.14, 230),
    new Metal(ResourceKey.of('tfc', 'zinc'), 1, List.from(Type.ALL, Type.PART), 0.21, 420),
    new Metal(ResourceKey.of('tfc', 'sterling_silver'), 1, List.from(Type.ALL, Type.PART), 0.35, 900),
    new Metal(ResourceKey.of('tfc', 'wrought_iron'), 3, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1535),
    new Metal(ResourceKey.of('tfc', 'cast_iron'), 1, List.from(Type.ALL, Type.PART), 0.35, 1535),
    new Metal(ResourceKey.of('tfc', 'pig_iron'), 3, List.from(Type.ALL), 0.35, 1535),
    new Metal(ResourceKey.of('tfc', 'steel'), 4, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'black_steel'), 5, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1485),
    new Metal(ResourceKey.of('tfc', 'blue_steel'), 6, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'red_steel'), 6, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'weak_steel'), 4, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'weak_blue_steel'), 5, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'weak_red_steel'), 5, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'high_carbon_steel'), 3, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'high_carbon_black_steel'), 4, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'high_carbon_blue_steel'), 5, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'high_carbon_red_steel'), 5, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc', 'unknown'), 6, List.from(Type.ALL), 0.35, 1540)
)

export const TFC_METALLUM_METALS: List<Metal> = List.from(
    new Metal(ResourceKey.of('tfc_metallum', 'antimony'), Tier.I, List.from(Type.ALL, Type.PART), 0.14, 250),
    new Metal(ResourceKey.of('tfc_metallum', 'aluminum'), Tier.II, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1180),
    new Metal(ResourceKey.of('tfc_metallum', 'florentine_bronze'), Tier.III, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1000),
    new Metal(ResourceKey.of('tfc_metallum', 'boron'), Tier.II, List.from(Type.ALL, Type.PART), 0.22, 575),
    new Metal(ResourceKey.of('tfc_metallum', 'ferroboron'), Tier.III, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1500),
    new Metal(ResourceKey.of('tfc_metallum', 'cobalt'), Tier.III, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1535),
    new Metal(ResourceKey.of('tfc_metallum', 'constantan'), Tier.II, List.from(Type.ALL, Type.PART), 0.35, 1453),
    new Metal(ResourceKey.of('tfc_metallum', 'electrum'), Tier.II, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1060),
    new Metal(ResourceKey.of('tfc_metallum', 'invar'), Tier.III, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1330),
    new Metal(ResourceKey.of('tfc_metallum', 'lead'), Tier.II, List.from(Type.ALL, Type.PART), 0.14, 328),
    new Metal(ResourceKey.of('tfc_metallum', 'britannium'), Tier.III, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.22, 850),
    new Metal(ResourceKey.of('tfc_metallum', 'purple_gold'), Tier.III, List.from(Type.ALL, Type.PART), 0.35, 1060),
    new Metal(ResourceKey.of('tfc_metallum', 'iridium'), Tier.III, List.from(Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1535),
    new Metal(ResourceKey.of('tfc_metallum', 'osmium'), Tier.III, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1535),
    new Metal(ResourceKey.of('tfc_metallum', 'osmiridium'), Tier.III, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1535),
    new Metal(ResourceKey.of('tfc_metallum', 'platinum'), Tier.V, List.from(Type.ALL, Type.PART), 0.35, 1535),
    new Metal(ResourceKey.of('tfc_metallum', 'platine_steel'), Tier.VI, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1540),
    new Metal(ResourceKey.of('tfc_metallum', 'weak_platine_steel'), Tier.V, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc_metallum', 'titanium'), Tier.V, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1540),
    new Metal(ResourceKey.of('tfc_metallum', 'titan_steel'), Tier.VI, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1540),
    new Metal(ResourceKey.of('tfc_metallum', 'weak_titan_steel'), Tier.VI, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc_metallum', 'tungsten'), Tier.V, List.from(Type.ALL, Type.PART), 0.35, 1540),
    new Metal(ResourceKey.of('tfc_metallum', 'tungsten_steel'), Tier.VI, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.35, 1540),
    new Metal(ResourceKey.of('tfc_metallum', 'weak_tungsten_steel'), Tier.VI, List.from(Type.ALL), 0.35, 1540),
    new Metal(ResourceKey.of('tfc_metallum', 'uranium'), Tier.III, List.from(Type.ALL, Type.PART), 0.35, 1500),
    new Metal(ResourceKey.of('tfc_metallum', 'pewter'), Tier.II, List.from(Type.ALL, Type.PART, Type.TOOL, Type.ARMOR), 0.14, 270)
);

export const TFC_METALLUM_ORES: List<Ore> = List.from(
    new Ore('stibnite', true, 'antimony', SedimentaryRocks),
    new Ore('bauxite', true, 'aluminum', SedimentaryRocks),
    new Ore('boracite', true, 'boron', SedimentaryRocks),
    new Ore('cobaltite', true, 'cobalt', MetamorphicRocks),
    new Ore('galena', true, 'lead', List.merge(SedimentaryRocks.filter(rock => rock.name == 'limestone' || rock.name == 'marble'), MetamorphicRocks)),
    new Ore('native_iridium', true, 'iridium', List.merge(IgneousExtrusiveRocks, IgneousIntrusiveRocks)),
    new Ore('native_osmium', true, 'osmium', List.merge(IgneousExtrusiveRocks, IgneousIntrusiveRocks)),
    new Ore('native_platinum', true, 'platinum', MetamorphicRocks),
    new Ore('rutile', true, 'titanium', List.merge(MetamorphicRocks, IgneousExtrusiveRocks, IgneousIntrusiveRocks)),
    new Ore('wolframite', true, 'tungsten', MetamorphicRocks),
    new Ore('uraninite', true, 'uranium', List.merge(IgneousExtrusiveRocks, IgneousIntrusiveRocks))
);

export const TFC_Metal_Items: List<MetalItem> = List.from(
    new MetalItem(ResourceKey.full('tfc:ingot'), Type.ALL, 100, 'forge:ingots', true, false),
    new MetalItem(ResourceKey.full('tfc:double_ingot'), Type.PART, 200, 'forge:double_ingots', false, false),
    new MetalItem(ResourceKey.full('tfc:sheet'), Type.PART, 200, 'forge:sheets', false, false),
    new MetalItem(ResourceKey.full('tfc:double_sheet'), Type.PART, 400, 'forge:double_sheets', false, false),
    new MetalItem(ResourceKey.full('tfc:rod'), Type.PART, 50, 'forge:rods', false, false),

    new MetalItem(ResourceKey.full('tfc:unfinished_lamp'), Type.TOOL, 100, null, false, false),
    new MetalItem(ResourceKey.full('tfc:tuyere'), Type.TOOL, 400, 'forge:tuyeres', false, true),
    new MetalItem(ResourceKey.full('tfc:fish_hook'), Type.TOOL, 200, null, false, false),
    new MetalItem(ResourceKey.full('tfc:fishing_rod'), Type.TOOL, 200, 'forge:fishing_rods', false, true),
    new MetalItem(ResourceKey.full('tfc:pickaxe'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:pickaxe_head'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:shovel'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:shovel_head'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:axe'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:axe_head'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:hoe'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:hoe_head'), Type.TOOL, 100, null, true, false, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:chisel'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:chisel_head'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:sword'), Type.TOOL, 200, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:sword_blade'), Type.TOOL, 200, null, true, false),
    new MetalItem(ResourceKey.full('tfc:mace'), Type.TOOL, 200, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:mace_head'), Type.TOOL, 200, null, true, false),
    new MetalItem(ResourceKey.full('tfc:saw'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheldFlipped(value)); }),
    new MetalItem(ResourceKey.full('tfc:saw_blade'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:javelin'), Type.TOOL, 10, null, false, true, (provider, value) => { provider.addMultiModel(ResourceKey.of(value.getNamespace(), `metal/javelin/${value.getPath()}`), new JavelinModel(value)); }),
    new MetalItem(ResourceKey.full('tfc:javelin_head'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:hammer'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:hammer_head'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:propick'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:propick_head'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:knife'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheldFlipped(value)); }),
    new MetalItem(ResourceKey.full('tfc:knife_blade'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:scythe'), Type.TOOL, 100, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),
    new MetalItem(ResourceKey.full('tfc:scythe_blade'), Type.TOOL, 100, null, true, false),
    new MetalItem(ResourceKey.full('tfc:shears'), Type.TOOL, 200, null, false, true, (provider, value) => { provider.addModel(value, ItemModel.handheld(value)); }),

    new MetalItem(ResourceKey.full('tfc:unfinished_helmet'), Type.ARMOR, 400, null, false, false),
    new MetalItem(ResourceKey.full('tfc:helmet'), Type.ARMOR, 600, null, false, true),
    new MetalItem(ResourceKey.full('tfc:unfinished_chestplate'), Type.ARMOR, 400, null, false, false),
    new MetalItem(ResourceKey.full('tfc:chestplate'), Type.ARMOR, 800, null, false, true),
    new MetalItem(ResourceKey.full('tfc:unfinished_greaves'), Type.ARMOR, 400, null, false, false),
    new MetalItem(ResourceKey.full('tfc:greaves'), Type.ARMOR, 600, null, false, true),
    new MetalItem(ResourceKey.full('tfc:unfinished_boots'), Type.ARMOR, 200, null, false, false),
    new MetalItem(ResourceKey.full('tfc:boots'), Type.ARMOR, 400, null, false, true),

    new MetalItem(ResourceKey.full('tfc:shield'), Type.ARMOR, 400, null, false, true)
);

export const TFC_Metal_Blocks: List<MetalItem> = List.from(
    new MetalItem(ResourceKey.full('tfc:anvil'), Type.TOOL, 1400, null, false, false),
    new MetalItem(ResourceKey.full('tfc:block'), Type.PART, 100, 'forge:storage_blocks', false, false),
    new MetalItem(ResourceKey.full('tfc:block_slab'), Type.PART, 50, null, false, false),
    new MetalItem(ResourceKey.full('tfc:block_stairs'), Type.PART, 75, null, false, false),
    new MetalItem(ResourceKey.full('tfc:bars'), Type.TOOL, 25, null, false, false),
    new MetalItem(ResourceKey.full('tfc:chain'), Type.TOOL, 6, null, false, false),
    new MetalItem(ResourceKey.full('tfc:lamp'), Type.TOOL, 100, null, false, false),
    new MetalItem(ResourceKey.full('tfc:trapdoor'), Type.PART, 200, null, false, false),
)

export const TOOL_TAGS = {
    'axe': 'axes',
    'hammer': 'hammers',
    'hoe': 'hoes',
    'javelin': 'javelins',
    'knife': 'knives',
    'shovel': 'shovels',
    'pickaxe': 'pickaxes',
    'chisel': 'chisels',
    'mace': 'maces',
    'sword': 'swords',
    'saw': 'saws',
    'propick': 'propicks',
    'scythe': 'scythes',
    'shears': 'shears',
    'tuyere': 'tuyeres'
};

export enum Rules {
    hit_any = 'hit_any',
    hit_not_last = 'hit_not_last',
    hit_last = 'hit_last',
    hit_second_last = 'hit_second_last',
    hit_third_last = 'hit_third_last',
    draw_any = 'draw_any',
    draw_last = 'draw_last',
    draw_not_last = 'draw_not_last',
    draw_second_last = 'draw_second_last',
    draw_third_last = 'draw_third_last',
    punch_any = 'punch_any',
    punch_last = 'punch_last',
    punch_not_last = 'punch_not_last',
    punch_second_last = 'punch_second_last',
    punch_third_last = 'punch_third_last',
    bend_any = 'bend_any',
    bend_last = 'bend_last',
    bend_not_last = 'bend_not_last',
    bend_second_last = 'bend_second_last',
    bend_third_last = 'bend_third_last',
    upset_any = 'upset_any',
    upset_last = 'upset_last',
    upset_not_last = 'upset_not_last',
    upset_second_last = 'upset_second_last',
    upset_third_last = 'upset_third_last',
    shrink_any = 'shrink_any',
    shrink_last = 'shrink_last',
    shrink_not_last = 'shrink_not_last',
    shrink_second_last = 'shrink_second_last',
    shrink_third_last = 'shrink_third_last'
};