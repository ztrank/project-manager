import { Resolve, Reject } from './promise';
import { Itemizable } from './interfaces';
import { Status } from './enums';
import { Item, ItemResolve } from './item';


export class Task extends Item {
    
    private _duration:number;

    constructor(
        name:string,
        startTime:Date,
        description:string,
        status?:Status,
        duration?:number
    ) {
        super(name, startTime, description, status);
        this._duration = duration || 60;
    }

    get duration():number {
        return this._duration || 60;
    }

    set duration(minutes:number) {
        this._duration = minutes;
    }

    get endTime():Date {
        let startTime = new Date(this.startTime.getTime());
        return new Date(startTime.setMinutes(startTime.getMinutes() + this.duration));
    }

    start():Promise<ItemResolve> {
        return this.statusChange(
            [Status.Waiting, Status.Paused],
            Status.InProgress,
            'TASK_STARTED',
            'INCORRECT_TASK_STATUS'
        );
    }

    pause():Promise<ItemResolve> {
        return this.statusChange(
            [Status.InProgress],
            Status.Paused,
            'TASK_PAUSED',
            'INCORRECT_TASK_STATUS'
        );
    }

    cancel():Promise<ItemResolve> {
        return this.statusChange(
            [Status.InProgress, Status.Paused, Status.Waiting],
            Status.Cancelled,
            'TASK_CANCELLED',
            'INCORRECT_TASK_STATUS'
        );
    }

    complete():Promise<ItemResolve> {
        return this.statusChange(
            [Status.InProgress, Status.Paused, Status.Waiting],
            Status.Completed,
            'TASK_COMPLETED',
            'INCORRECT_TASK_STATUS'
        );
    }
}