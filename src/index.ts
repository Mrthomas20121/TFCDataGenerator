import { Consumer, DataGenerator } from "./datagen/datagenerator.js";

export class DataLoader {

    public registerDataProvider<T extends DataGenerator>(dataProvider: T, consumer: Consumer<T>): DataLoader {

        // add data to the provider
        consumer(dataProvider);

        // call the provider
        dataProvider.run();

        return this;
    }
}
