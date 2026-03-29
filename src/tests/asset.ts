import { ResourceKey } from "../datagen/resources.js";
import { JsonData, Metal } from "./data.js";

export interface Model {
    toJson(): object
}

export interface MultiModel extends Model {
    others(): {
        [key: string]: object
    }
}

class ItemBlockModel implements Model {
    parent: string;

    constructor(parent: string) {
        this.parent = parent;
    }

    toJson(): object {
        return {
            parent: this.parent
        }
    }
}

export class ItemModel implements Model {
    parent: string;
    textures: { layer0?: string, particle?: string };

    public static generated(texture: ResourceKey): ItemModel {
        return new ItemModel('minecraft:item/generated', {
            layer0: texture.toString()
        });
    }

    public static particle(parent: ResourceKey, texture: ResourceKey): ItemModel {
        return new ItemModel(parent.toString(), {
            particle: texture.toString()
        });
    }

    public static handheld(texture: ResourceKey): ItemModel {
        return new ItemModel('minecraft:item/handheld', {
            layer0: texture.toString()
        });
    }

    public static handheldFlipped(texture: ResourceKey): ItemModel {
        return new ItemModel('tfc:item/handheld_flipped', {
            layer0: texture.toString()
        });
    }

    public static withParent(parent: ResourceKey, texture: ResourceKey): ItemModel {
        return new ItemModel(parent.toString(), {
            layer0: texture.toString()
        });
    }


    public static block(parent: ResourceKey): ItemBlockModel {
        return new ItemBlockModel(parent.toString());
    }


    constructor(parent: string, textures: { layer0?: string, particle?: string }) {
        this.parent = parent;
        this.textures = textures;
    }

    toJson(): object {
        return {
            parent: this.parent,
            textures: this.textures
        }
    }
}

export class JavelinModel implements MultiModel {

    private name: ResourceKey;

    constructor(metal: ResourceKey) {
        this.name = metal;
    }

    toJson(): object {
        return {
            "loader": "forge:separate_transforms",
            "textures": {
                "particle": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}`
            },
            "gui_light": "front",
            "overrides": [
                {
                "predicate": {
                    "tfc:throwing": 1
                },
                "model": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_throwing`
                }
            ],
            "base": {
                "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_in_hand`
            },
            "perspectives": {
                "none": {
                    "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_gui`
                },
                "fixed": {
                    "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_gui`
                },
                "ground": {
                    "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_gui`
                },
                "gui": {
                    "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_gui`
                }
            }
        }
    }

    private inHand(): object {
        return ItemModel.particle(ResourceKey.mc('item/trident_in_hand'), ResourceKey.full(`${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}`));
    }

    private gui(): object {
        return ItemModel.generated(ResourceKey.full(`${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}`));
    }

    private throwingBase(): object {
        return ItemModel.particle(ResourceKey.mc('item/trident_throwing'), ResourceKey.full(`${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}`));
    }

    private throwing(): object {
        return {
            "loader": "forge:separate_transforms",
            "gui_light": "front",
            "base": {
                "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_throwing_base`
            },
            "perspectives": {
                "none": {
                    "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_gui`
                },
                "fixed": {
                    "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_gui`
                },
                "ground": {
                    "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_gui`
                },
                "gui": {
                    "parent": `${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_gui`
                }
            }
        }
    }

    others(): { [key: string]: object; } {
        let obj = {};

        obj[`${this.name.getNamespace()}:metal/javelin/${this.name.getPath()}_gui`] = this.gui(); 
        obj[`${this.name.getNamespace()}:metal/javelin/${this.name.getPath()}_in_hand`] = this.inHand(); 
        obj[`${this.name.getNamespace()}:metal/javelin/${this.name.getPath()}_throwing_base`] = this.throwingBase(); 
        obj[`${this.name.getNamespace()}:metal/javelin/${this.name.getPath()}_throwing`] = this.throwing(); 

        return obj;
    }
}

export interface BlockState extends JsonData {};

export class DefaultBlockState implements BlockState {

    name: ResourceKey;

    constructor(blockName: ResourceKey) {
        this.name = ResourceKey.of(blockName.getNamespace(), `block/${blockName.getPath()}`);
    }

    toJson(): object {
        return {
            variants: {
                "": {
                    model: this.name.toString()
                }
            }
        }
    }
}

export class AnvilBlockState implements BlockState {

    name: ResourceKey;

    constructor(blockName: ResourceKey) {
        this.name = ResourceKey.of(blockName.getNamespace(), `block/${blockName.getPath()}`);
    }

    toJson(): object {
        return {
            variants: {
                "facing=north": {
                    model: this.name.toString(),
                y: 90
                },
                "facing=east": {
                    model: this.name.toString(),
                y: 180
                },
                "facing=south": {
                    model: this.name.toString(),
                y: 270
                },
                "facing=west": {
                    model: this.name.toString()
                }
            }
        }
    }
}

export class TrapdoorBlockState implements BlockState {

    top: ResourceKey;
    bottom: ResourceKey;
    open: ResourceKey;

    constructor(blockName: ResourceKey) {
        let path = blockName.getPath();
        let namespace = blockName.getNamespace();

        this.top = ResourceKey.of(namespace, `block/${path}_top`);
        this.bottom = ResourceKey.of(namespace, `block/${path}_bottom`);
        this.open = ResourceKey.of(namespace, `block/${path}_open`);
    }

    toJson(): object {
        return {
            "variants": {
                "facing=north,half=bottom,open=false": {
                    "model": this.bottom.toString()
                },
                "facing=south,half=bottom,open=false": {
                    "model": this.bottom.toString(),
                    "y": 180
                },
                "facing=east,half=bottom,open=false": {
                    "model": this.bottom.toString(),
                    "y": 90
                },
                "facing=west,half=bottom,open=false": {
                    "model": this.bottom.toString(),
                    "y": 270
                },
                "facing=north,half=top,open=false": {
                    "model": this.top.toString()
                },
                "facing=south,half=top,open=false": {
                    "model": this.top.toString(),
                    "y": 180
                },
                "facing=east,half=top,open=false": {
                    "model": this.top.toString(),
                    "y": 90
                },
                "facing=west,half=top,open=false": {
                    "model": this.top.toString(),
                    "y": 270
                },
                "facing=north,half=bottom,open=true": {
                    "model": this.open.toString()
                },
                "facing=south,half=bottom,open=true": {
                    "model": this.open.toString(),
                    "y": 180
                },
                "facing=east,half=bottom,open=true": {
                    "model": this.open.toString(),
                    "y": 90
                },
                "facing=west,half=bottom,open=true": {
                    "model": this.open.toString(),
                    "y": 270
                },
                "facing=north,half=top,open=true": {
                "model": this.open.toString(),
                    "x": 180,
                    "y": 180
                },
                "facing=south,half=top,open=true": {
                "model": this.open.toString(),
                    "x": 180,
                    "y": 0
                },
                "facing=east,half=top,open=true": {
                "model": this.open.toString(),
                    "x": 180,
                    "y": 270
                },
                "facing=west,half=top,open=true": {
                "model": this.open.toString(),
                    "x": 180,
                    "y": 90
                }
            }
        }
    }
}