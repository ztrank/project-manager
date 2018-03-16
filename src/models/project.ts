import { Resolve, Reject } from './promise';
import { Itemizable } from './interfaces';
import { Status } from './enums';
import { Item, ItemResolve } from './item';

export interface ProjectsResolve extends Resolve {
    projects:Project[];
}

export class Project extends Item {
    private _items:Item[];

    constructor(
        name:string,
        startTime:Date,
        description:string,
        status?:Status,
        items?:Item[]
    ) {
        super(name, startTime, description, status);
        this._items = items ? items : [];
        this.sort();
    }

    sort():Item[] {
        this._items = this._items ? this._items : [];
        this._items.sort((a:Item, b:Item) => {
            return a.startTime.getTime() - b.startTime.getTime();
        });
        return this._items;
    }

    get items():Item[] {
        if(!this._items) {
           this._items = [];
        }
        return this._items;
    }

    addItem(item:Item):Promise<Project> {
        return new Promise((resolve, reject) => {
            this._items.push(item);
            this.sort();
            resolve(this);
        });
    }

    get endTime():Date {
        let endTime = new Date();
        this.items.forEach(item => {
            endTime = endTime < item.endTime ? item.endTime : endTime;
        });
        return endTime;
    }
}