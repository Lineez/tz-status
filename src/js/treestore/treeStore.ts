import { TreeItem } from "./inteface";

export default class TreeStore {
    constructor(private items: TreeItem[]) {};
    
    getAll() {
        return this.items;
    }
    
    getItem(id: number) {
        // * в идеале, прямой доступ к элементам без поиска их в массиве.
        // Что-то типо такого?
        if(id > this.items.length || id < 1) throw new Error('Id is not in range');
        return this.items[id - 1];
        // return this.items.find((item) => item.id === id);
    }

    getChildren(id: number) {
        return this.items.filter((item) => item.parent === id);
    }

    getAllChildren(id: number) {
        const result: TreeItem[] = [];
        let childs = this.getChildren(id);
        
        while(childs.length) {
            result.push(...childs);

            const r: TreeItem[] = [];
            for (const child of childs) {
                r.push(...this.getChildren(child.id));
            }
            childs = r;
        }

        return result;
    }

    getAllParents(id: number) {
        const result: TreeItem[] = [];
        let parent = this.getItem(id);
        
        while(typeof parent.parent === 'number') {
            parent = this.getItem(parent.parent);
            result.push(parent);
        }
        return result;
    }
}
