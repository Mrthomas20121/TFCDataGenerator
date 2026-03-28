export class ResourceKey {
    
    static of(modid: string, path: string): ResourceKey {
        return new ResourceKey(`${modid}:${path}`);
    }

    static full(path: string): ResourceKey {
        return new ResourceKey(path);
    }

    static mc(path: string): ResourceKey {
        return new ResourceKey(`minecraft:${path}`);
    }

    private namespace: string;
    private path: string;

    private constructor(location: string) {
        if(location.includes(':')) {
            let split = location.split(':');
            this.namespace = split[0];
            this.path = split[1];
        }
        else {
            this.namespace = 'minecraft';
            this.path = location;
        }
    }

    public getNamespace(): string {
        return this.namespace
    }

    public getPath(): string {
        return this.path
    }

    public toString(): string {
       return `${this.namespace}:${this.path}`
    }
}