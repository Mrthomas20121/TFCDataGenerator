import { ResourceKey } from "../datagen/resources.js";
import { Metal } from "./data.js";

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

    constructor(metal: Metal) {
        this.name = metal.name;
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

        obj[`${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_gui`] = this.gui(); 
        obj[`${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_in_hand`] = this.inHand(); 
        obj[`${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_throwing_base`] = this.throwingBase(); 
        obj[`${this.name.getNamespace()}:item/metal/javelin/${this.name.getPath()}_throwing`] = this.throwing(); 

        return obj;
    }
}