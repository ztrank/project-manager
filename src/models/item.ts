import { Status } from './enums';
import { Itemizable } from './interfaces';
import { Resolve } from './promise';

export interface ItemResolve extends Resolve  {
    item:Item
}

export abstract class Item implements Itemizable {
    private _startTime:Date;
    private _name:string;
    private _description:string;
    protected _status:Status;

    constructor(
        name:string,
        startTime:Date,
        description:string,
        status?:Status
    ) {
        this._name = name;
        this._description = description;
        this._startTime = startTime;
        this._status = status ? status : Status.Waiting;
    }

    abstract get endTime():Date;

    get startTime():Date {
        return this._startTime;
    }

    set startTime(start:Date) {
        this._startTime = start;
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

    protected statusChange(
        expectedCurrentStatus:Status[], 
        newStatus:Status, 
        successStatusString:string, 
        failureStatusString:string, 
        successCode:number = 200,
        failureCode:number = 500,
        successMessage?:string, 
        failureMessage?:string
    ):Promise<ItemResolve> {
        return new Promise<ItemResolve>((resolve, reject) => {
            if(!Array.isArray(expectedCurrentStatus)) {
                reject({
                    statusCode:500,
                    status:'INVALID_PARAMETERS',
                    message:'Expecting Status[]' 
                });
            }
            else if(expectedCurrentStatus.find(status => {
                return this.status === status;
            })) {
                reject({
                    statusCode:failureCode,
                    status:failureStatusString,
                    message: failureMessage
                });
            }
            else {
                this._status = Status.InProgress;
                resolve({
                    statusCode:successCode,
                    status:successStatusString,
                    message:successMessage,
                    item:this
                } as ItemResolve);
            }
        });
    }
}