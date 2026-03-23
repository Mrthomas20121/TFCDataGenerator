export class ResourceKey extends String {
    
    static of(modid: string, path: string): ResourceKey {
        return new ResourceKey(`${modid}:${path}`);
    }

    private namespace: string;
    private path: string;

    private constructor(location: string) {
        super();
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