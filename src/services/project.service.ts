import { Project, ProjectsResolve } from '../models/project';
import { Item } from '../models/item';
import { Resolve, Reject } from '../models/promise';

export class ProjectService {
    private _projects:Project[];

    constructor(http:any) {

    }

    loadProjects():Promise<ProjectsResolve> {
        
        return new Promise<ProjectsResolve>((resolve, reject) => {
            /* do the async call */
            let projects = [];
            let err;
            if(err) {
                reject({
                    status:'ERROR',
                    statusCode:400,
                    message:err
                });
            }
            else {
                resolve({
                    status:'SUCCESS',
                    statusCode:200,
                    message:'',
                    projects:projects
                });
            }
        });
    }
}