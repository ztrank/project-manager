import { Resolve, Reject } from './promise';
export enum Status {
    Waiting,
    InProgress,
    Completed,
    Cancelled
}

export interface TaskResolve extends Resolve {
    task:Task;
}

export class Task {
    private _startTime:Date;
    private _duration:number;

    private _name:string;
    private _description:string;

    private _status:Status;

    constructor(
        name:string,
        startTime:Date,
        duration:number = 60,
        status:Status = Status.Waiting
    ) {
        this._startTime = new Date(startTime.getTime());
        this._name = name;
        this._status = status;
    }

    get startTime():Date {
        return this._startTime;
    }

    set startTime(start:Date) {
        this._startTime = start;
    }

    get endTime():Date {
        let startTime = new Date(this.startTime.getTime());
        return new Date(startTime.setMinutes(startTime.getMinutes() + this.duration));
    }

    get duration():number {
        return this._duration || 60;
    }

    set duration(minutes:number) {
        this._duration = minutes;
    }

    get name():string {
        return this._name;
    }

    set name(name:string) {
        this._name = name;
    }

    get description():string {
        return this._description;
    }

    set description(description:string) {
        this._description = description;
    }

    get status():Status {
        return this._status;
    }
    startTask(startTime?:Date):Promise<TaskResolve> {
        return new Promise<TaskResolve>((resolve, reject) => {
            if(this.status !== Status.Waiting) {
                reject(incorrectTaskStatus(Status.Waiting, this.status));
            }
            else {
                
            }
        });
    }
    
}

function incorrectTaskStatus(expected:Status, actual:Status):Reject {

    return {
        statusCode:500,
        status:'INCORRECT_TASK_STATUS',
        message: ''
    } as Reject;
}