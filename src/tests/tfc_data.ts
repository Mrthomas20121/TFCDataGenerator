import { JsonData } from "./data.js";
import { Ingredient } from "./recipes.js";

export class ItemHeatBuilder implements JsonData {

    ingredient: Ingredient;
    heat_capacity: number;
    forging_temperature: number;
    welding_temperature: number;

    input(item: Ingredient): this {
        this.ingredient = item;
        return this;
    }

    heatCapacity(cap: number): this {
        this.heat_capacity = cap;
        return this;
    }

    forgingTemp(temp: number): this {
        this.forging_temperature = temp;
        return this;
    }

    weldingTemp(temp: number): this {
        this.welding_temperature = temp;
        return this;
    }

    toJson(): object {
        return {
            ingredient: this.ingredient,
            heat_capacity: this.heat_capacity,
            forging_temperature: this.forging_temperature,
            welding_temperature: this.welding_temperature
        }    
    }
}

