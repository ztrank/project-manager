import { Status } from './enums';

export interface Itemizable extends Framable, Namable, Describable {
    status:Status;
}

export interface Framable {
    startTime:Date;
    endTime:Date;
}

export interface Namable {
    name:string;
}

export interface Describable {
    description:string;
}
