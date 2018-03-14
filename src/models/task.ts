export class Task {
    private _startTime:Date;
    private _endTime:Date;

    private _name:string;
    private _description:string;

    constructor(
        name:string,
        startTime:Date,
        duration:number
    ) {
        this._startTime = startTime;
        this._name = name;
    }

    get startTime():Date {
        return this._startTime;
    }

    get endTime():Date {
        return this._endTime;
    }
}