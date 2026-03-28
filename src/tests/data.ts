import { List } from 'void-list';
import { ResourceKey } from '../datagen/resources.js';
import { BiConsumer, Consumer, DataGenerator, ItemModelProvider } from '../datagen/datagenerator.js';
import { ItemModel } from './asset.js';

export enum Tier {
    I=1,
    II=2,
    III=3,
    IV=4,
    V=5,
    VI=6
}

export enum Type {
    PART,
    TOOL,
    ARMOR,
    ALL
}

export class Metal {
    public name: ResourceKey;
    public tier: Tier;
    public types: List<Type>;
    public heat_capacity_base: number;
    public melt_temperature: number;
    public isUsable: boolean;

    constructor(name: ResourceKey, tier: Tier, types: List<Type>, heat_capacity_base: number, melt_temp: number) {
        this.name = name;
        this.tier = tier;
        this.types = types;
        this.heat_capacity_base = heat_capacity_base;
        this.melt_temperature = melt_temp;
        this.isUsable = !types.isEmpty();
    }

    get specific_heat_capacity(): number {
        return Math.round(300 / this.heat_capacity_base) / 100000;
    }

    get ingot_heat_capacity(): number {
        return 1 / this.heat_capacity_base;
    }

    getItemName(item: MetalItem): ResourceKey {
        return ResourceKey.of(this.name.getNamespace(), `metal/${this.name.getPath()}/${item.name}`);
    }

    getModelItemName(item: MetalItem): ResourceKey {
        return ResourceKey.of(this.name.getNamespace(), `item/metal/${this.name.getPath()}/${item.name}`);
    }

    getBlockName(item: MetalItem): ResourceKey {
        return ResourceKey.of(this.name.getNamespace(), `metal/${this.name.getPath()}/${item.name}`);
    }

    getModelBlockName(item: MetalItem): ResourceKey {
        return ResourceKey.of(this.name.getNamespace(), `block/metal/${this.name.getPath()}/${item.name}`);
    }
}

export class MetalItem {
    public name: string;
    public type: Type;
    public smelt_amount: number;
    public mold: boolean;
    public durability: boolean;
    public tag: string;
    public consumer: BiConsumer<ItemModelProvider, ResourceKey>;

    constructor(name: ResourceKey, type: Type, smelt_amount: number, tag: string, mold: boolean, durability: boolean, model: BiConsumer<ItemModelProvider, ResourceKey> = (provider: ItemModelProvider, value) => { provider.addModel(value, ItemModel.generated(value)); }) {
        this.name = name.getPath();
        this.type = type;
        this.smelt_amount = smelt_amount;
        this.tag = tag;
        this.mold = mold;
        this.durability = durability;
        this.consumer = model;
    }
}

export class Ore {
    name: string;
    graded: boolean;
    metal: string;
    rockList: List<Rock> = new List();

    constructor(name: string, graded: boolean=false, metal: string, rockList: List<Rock>) {
        this.name = name;
        this.graded = graded;
        this.metal = metal;
        this.rockList = rockList;
    }
}

export class Rock {
    name: string
    category: RockCategory
    sand_type: string

    constructor(name: string, category: RockCategory, sand_type: string) {
        this.name = name;
        this.category = category;
        this.sand_type = sand_type;
    }
}

export enum RockCategory {
    igneous_intrusive='igneous_intrusive',
    igneous_extrusive='igneous_extrusive',
    sedimentary='sedimentary',
    metamorphic='metamorphic'
}

export interface Feature {
    configured(): object;
    placed(): object;
}

export interface JsonData {
    toJson(): object;
}

export interface JsonObject extends JsonData {
    name: ResourceKey;
}

export class OreIndicator {
    
    rarity: number;
    depth: number = 35;
    underground_rarity: number;
    underground_count: number;
    blocks: object;

    constructor(names: List<ResourceKey>, rarity: number, depth: number, underground_rarity: number, underground_count: number) {
        this.rarity = rarity;
        this.depth = depth;
        this.underground_rarity = underground_rarity;
        this.underground_count = underground_count;
        this.blocks = names.map(s => {
            return {
                block: `${s.getNamespace()}:ore/small_${s.getPath()}`
            };
        }).toArray();
    }

    toJson(): object {
        return {
            rarity: this.rarity,
            depth: this.depth,
            underground_rarity: this.underground_rarity,
            underground_count: this.underground_count,
            blocks: this.blocks
        }
    }
}

export class ClusterOreVein implements Feature {

    name: ResourceKey;
    rarity: number;
    density: number;
    min_y: number;
    max_y: number;
    size: number = 40;
    blocks: object;
    random_name: string;
    indicator: OreIndicator;

    constructor(name: ResourceKey, oreNames: List<ResourceKey>, rarity: number, density: number, min_y: number, max_y: number, rocks: List<Rock>, indicator: OreIndicator) {
        this.name = name;
        this.rarity = rarity;
        this.density = density;
        this.min_y = min_y;
        this.max_y = max_y;
        let namespace = name.getNamespace();
        this.blocks = rocks.map(rock => {
            if(oreNames.size() == 1) {
                let path = oreNames.get(0).getPath();
                return {
                    replace: [
                        `tfc:rock/raw/${rock.name}`
                    ],
                    with: [
                        {
                            weight: 35,
                            block: `${namespace}:ore/poor_${path}/${rock.name}`
                        },
                        {
                            weight: 40,
                            block: `${namespace}:ore/normal_${path}/${rock.name}`
                        },
                        {
                            weight: 25,
                            block: `${namespace}:ore/rich_${path}/${rock.name}`
                        }
                    ]
                }
            }
            else {
                let values = new List();

                for(let o of oreNames) {
                    let path = o.getPath()
                    values.add({
                        weight: 20,
                        block: `${namespace}:ore/poor_${path}/${rock.name}`
                    });
                    values.add({
                        weight: 25,
                        block: `${namespace}:ore/normal_${path}/${rock.name}`
                    });
                    values.add({
                        weight: 10
                        ,
                        block: `${namespace}:ore/rich_${path}/${rock.name}`
                    });
                }

                return {
                    replace: [
                        `tfc:rock/raw/${rock.name}`
                    ],
                    with: values.toArray()
                }
            }
        }).toArray();
        this.random_name = this.name.getPath();
        this.indicator = indicator;
    }

    configured(): object {
        return {
            type: 'tfc:cluster_vein',
            config: {
                rarity: this.rarity,
                density: this.density,
                min_y: this.min_y,
                max_y: this.max_y,
                size: this.size,
                random_name: this.random_name,
                blocks: this.blocks,
                indicator: this.indicator
            }
        }
    }

    placed(): object {
        return {
            feature: `${this.name.getNamespace()}:vein/${this.name.getPath()}`,
            placement: []
        }
    }
}