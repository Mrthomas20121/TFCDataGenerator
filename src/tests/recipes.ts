import { List } from 'void-list';
import { ResourceKey } from '../datagen/resources.js';
import { Rules } from './constants.js';
import { JsonData, Metal, Tier } from './data.js';

export type FluidStack = {
        fluid: string,
        amount: number
};

export interface Ingredient {}

export interface FluidIngredient extends Ingredient {
        ingredient: string,
        amount: number
};

export interface TagIngredient extends Ingredient {
    tag: string
}

export interface ItemIngredient extends Ingredient {
    item: string;
}

export interface ItemStackIngredient extends Ingredient {
    ingredient: Ingredient,
    count: number
}

export interface ItemStack {
    item: string,
    count?: number
}

export class RecipeHelper {
    public static tag(t: string): TagIngredient {
        return {
            tag: t
        }
    }

    public static item(i: string): ItemIngredient {
        return {
            item: i
        }
    }

    public static fluid(i: string, amount: number = 1): FluidIngredient {
        return {
            ingredient: i,
            amount: amount
        }
    }
}

export abstract class Recipe implements JsonData {
    protected type: ResourceKey;

    constructor(type: ResourceKey) {
        this.type = type;
    }

    abstract toJson(): object;
}

export class AlloyBuilder extends Recipe {

    result: string;
    contents: List<{ metal: string, min: number, max: number }>;

    public static of(): AlloyBuilder {
        return new AlloyBuilder();
    }
    
    private constructor() {
        super(ResourceKey.full('tfc:alloy'));
        this.contents = new List();
    }

    public input(metal: Metal, min: number, max: number): this {
        this.contents.add({
            metal: metal.name.toString(),
            min: min,
            max: max
        })
        return this;
    }

    public output(metal: Metal): this {
        this.result = metal.name.toString();
        return this;
    }

    toJson(): object {
        return {
            type: this.type,
            result: this.result,
            contents: this.contents.toArray()
        }
    }
}

export class BlastFurnaceBuilder extends Recipe {
    fluid: FluidIngredient;
    result: FluidStack;
    catalystIngredient: Ingredient;

    public static of(): BlastFurnaceBuilder {
        return new BlastFurnaceBuilder();
    }

    private constructor() {
        super(ResourceKey.full('tfc:blast_furnace'));
        this.catalystIngredient = RecipeHelper.tag('tfc:flux');
    }

    input(metal: Metal): this {
        let name = metal.name;
        this.fluid = RecipeHelper.fluid(`${name.getNamespace()}:metal/${name.getPath()}`);
        return this;
    }

    output(metal: Metal): this {
        let name = metal.name;
        this.result = {
            fluid: `${name.getNamespace()}:metal/${name.getPath()}`,
            amount: 1
        }
        return this;
    }
    
    catalyst(ingredient: Ingredient): this {
        this.catalystIngredient = ingredient;
        return this;
    }

    toJson(): object {
        return {
            type: this.type,
            fluid: this.fluid,
            result: this.result,
            catalyst: this.catalystIngredient
        }
    }
}

export class AnvilBuilder {

    public static working(tier: Tier): AnvilWorkingBuilder {
        return AnvilWorkingBuilder.of(tier);
    }

    public static welding(tier: Tier): AnvilWeldingBuilder {
        return AnvilWeldingBuilder.of(tier);
    }
}

export class AnvilWeldingBuilder extends Recipe {

    private first_input: Ingredient;
    private second_input: Ingredient;
    private tier: Tier;
    private result: object;

    public static of(tier: Tier): AnvilWeldingBuilder {
        return new AnvilWeldingBuilder(tier);
    }

    private constructor(tier: Tier) {
        super(ResourceKey.full('tfc:welding'));
        this.tier = tier;
    }

    public firstInput(ingredient: Ingredient): this {
        this.first_input = ingredient;
        return this;
    }

    public secondInput(ingredient: Ingredient): this {
        this.second_input = ingredient;
        return this;
    }

    public output(output: object): this {
        this.result = output;
        return this;
    }

    toJson(): object {
        return {
            type: this.type,
            first_input: this.first_input,
            second_input: this.second_input,
            tier: this.tier,
            result: this.result
        }
    }
}

export class AnvilWorkingBuilder extends Recipe {

    input: object;
    result: object;
    tier: Tier;
    rules: Rules[];
    apply_forging_bonus: boolean;

    public static of(tier: Tier): AnvilWorkingBuilder {
        return new AnvilWorkingBuilder(tier);
    }

    private constructor(tier: Tier) {
        super(ResourceKey.full('tfc:anvil'));
        this.tier = tier;
    }

    public ingredient(ingredient: object): this {
        this.input = ingredient;
        return this;
    }

    public output(output: object): this {
        this.result = output;
        return this;
    }

    public anvilRules(...rules: Rules[]): this {
        this.rules = rules;
        return this;
    }

    public applyForgingBonus(): this {
        this.apply_forging_bonus = true;
        return this;
    }

    toJson(): object {
        return {
            type: this.type,
            input: this.input,
            result: this.result,
            tier: this.tier,
            rules: this.rules,
            apply_forging_bonus: this.apply_forging_bonus
        }
    }
}

export class CastingBuilder extends Recipe {

    mold: Ingredient;
    fluid: FluidIngredient;
    result: ItemStack;
    break_chance: number;

    public static of(): CastingBuilder {
        return new CastingBuilder();
    }

    private constructor() {
        super(ResourceKey.full('tfc:casting'))
    }

    chanceToBreak(chance: number) {
        this.break_chance = chance;
    }

    inputMold(mold: Ingredient) {
        this.mold = mold;
    }

    inputFluid(fluid: FluidIngredient) {
        this.fluid = fluid;
    }

    output(itemStack: ItemStack) {
        this.result = itemStack;
    }

    toJson(): object {
        return {
            type: this.type,
            mold: this.mold,
            fluid: this.fluid,
            result: this.result,
            break_chance: this.break_chance
        }
    }
}

export class HeatingBuilder extends Recipe {

    ingredient: Ingredient;
    result_fluid: FluidIngredient;
    result: ItemStack;
    temperature: number;
    durability: boolean;

    public static of(): HeatingBuilder {
        return new HeatingBuilder();
    }

    private constructor() {
        super(ResourceKey.full('tfc:heating'));
    }

    useDurability() {
        this.durability = true;
    }

    /**
     * A number, which is the Temperature above which this item will convert to it’s outputs. 
     * @param temp Heating Temperature
     */
    temp(temp: number) {
        this.temperature = temp;
    }

    input(ingredient: Ingredient) {
        this.ingredient = ingredient;
    }

    output(fluid: FluidIngredient) {
        this.result_fluid = fluid;
    }

    toJson(): object {
        if(this.durability) {
            return {
                type: this.type,
                ingredient: this.ingredient,
                result_fluid: this.result_fluid,
                temperature: this.temperature,
                use_durability: this.useDurability
            }
        }
        else {
            return {
                type: this.type,
                ingredient: this.ingredient,
                result_fluid: this.result_fluid,
                temperature: this.temperature
            }
        }
    }
}

export class BloomeryBuilder extends Recipe {

    result: ItemStack;
    fluid: FluidIngredient;
    catalyst: Ingredient;
    duration: number;

    public static of(duration: number): BloomeryBuilder {
        return new BloomeryBuilder(duration);
    }

    private constructor(duration: number) {
        super(ResourceKey.full('tfc:bloomery'));
        this.catalyst = RecipeHelper.item('minecraft:charcoal');
        this.duration = duration;
    }

    input(fluid: FluidIngredient) {
        this.fluid = fluid; 
    }

    output(out: ItemStack) {
        this.result = out;
    }

    toJson(): object {
        return {
            type: this.type,
            result: this.result,
            fluid: this.fluid,
            catalyst: this.catalyst,
            duration: this.duration
        }
    }
}