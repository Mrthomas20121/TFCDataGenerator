import path from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { ResourceKey } from './resources.js';
import { List } from 'void-list';
import { Feature } from '../tests/data.js';
import { Recipe } from '../tests/recipes.js';
import { Model, MultiModel } from '../tests/asset.js';

export enum Type {
    ASSETS='assets',
    DATA='data'
}

export class DataGenerator {

    protected type: string;
    protected pathToFolder: string;
    protected data: Map<ResourceKey, object> = new Map();

    constructor(type: Type, pathToFolder: string) {
        this.type = type;
        this.pathToFolder = pathToFolder;
    }

    protected saveFile(fileName: ResourceKey, json: object): void {
        this.data.set(fileName, json);
    }

    protected createTagPath(pathTo: string) {
        let split = pathTo.includes('/') ? '/' : '\\';
        let tempPath = pathTo.split(split);

        // remove the file name from the path
        tempPath.pop();
        let p = tempPath.join(split);
        if(!existsSync(p)) {
            mkdirSync(p, { recursive:true });
        }
        return pathTo;
    }

    public run(): void {
        for(const [fileName, json] of this.data) {
            let jsonObject = this.mergeObjects({
                __comment__: 'this file was automatically created by tfcdatagenerator.ts'
            }, json);
            let fullPath = path.join('output', this.type, fileName.getNamespace().replace('#', ''), this.pathToFolder, `${fileName.getPath()}.json`);
            writeFileSync(this.createTagPath(fullPath), JSON.stringify(jsonObject, null, 2), 'utf8');
        }
    }

    private mergeObjects(...objects: object[]): object {
        let result = {};

        for(let object of objects) {
            for(let [key, value] of Object.entries(object)) {
                result[key] = value;
            }
        }

        return result;
    }
}

export class AbstractTagProvider extends DataGenerator {

    protected tagData: Map<ResourceKey, List<ResourceKey>> = new Map();

    constructor(tagType: string) {
        super(Type.DATA, `tags/${tagType}`);
    }

    public add(tagKey: ResourceKey, value: ResourceKey) {
        // check if the map has the tag key
        if(this.tagData.has(tagKey)) {
            let list = this.tagData.get(tagKey);
            // we have to check for undefined because map.get() can return undefined
            if(typeof list !== 'undefined') {
                list.add(value);
            }
            else {
                // create a new list in the rare case where it doesn't exists or list return undefined
                list = List.from(value);
            }
            this.tagData.set(tagKey, list);
        }
        else {
            let list = List.from(value);
            this.tagData.set(tagKey, list);
        }
    }

    public run(): void {
        
        for(const [key, list] of this.tagData) {
            let json = {
                replace:false,
                values:list.map(k => k.toString()).toArray()
            }

            this.data.set(key, json);
        }

        // run the datagen
        super.run();
    }
}

export class ItemTagProvider extends AbstractTagProvider {

    constructor() {
        super('items');
    }
}

export class BlockTagProvider extends AbstractTagProvider {

    constructor() {
        super('blocks');
    }
}

export class RecipeProvider extends DataGenerator {


    constructor() {
        super(Type.DATA, 'recipes');
    }

    public addRecipe<T extends Recipe>(name: ResourceKey, recipe: T): void {
        this.saveFile(name, recipe.toJson());
    }
}

export type Consumer<T extends DataGenerator> = (provider: T) => void;
export type BiConsumer<T extends DataGenerator, B> = (provider: T, value: B) => void;

export class FeatureProvider extends DataGenerator {

    constructor() {
        super(Type.DATA, 'worldgen');
    }

    public addFeature<T extends Feature>(name: ResourceKey, feature: T) {
        this.saveFile(ResourceKey.of(name.getNamespace(), `configured_feature/${name.getPath()}`), feature.configured());
        this.saveFile(ResourceKey.of(name.getNamespace(), `placed_feature/${name.getPath()}`), feature.placed());
    }

    public addFeatureWithDiffName<T extends Feature>(name1: ResourceKey, name2: ResourceKey, feature: T) {
        this.saveFile(ResourceKey.of(name1.getNamespace(), `configured_feature/${name1.getPath()}`), feature.configured());
        this.saveFile(ResourceKey.of(name2.getNamespace(), `placed_feature/${name2.getPath()}`), feature.placed());
    }
}

export class ItemModelProvider extends DataGenerator {

    constructor() {
        super(Type.ASSETS, 'models/item');
    }

    public addModel<T extends Model>(name: ResourceKey, model: T) {
        this.saveFile(name, model.toJson());
    }

    public addMultiModel<T extends MultiModel>(name: ResourceKey, model: T) {
        this.addModel(name, model);

        for(let [key, value] of Object.entries(model.others())) {
            this.saveFile(ResourceKey.full(key), value);
        }
    }
}

export class BlockModelProvider extends DataGenerator {

    constructor() {
        super(Type.ASSETS, 'models/block');
    }
}

export class BlockstateProvider extends DataGenerator {

    blockmodels: BlockModelProvider = new BlockModelProvider();

    constructor() {
        super(Type.ASSETS, 'blockstate');
    }
}