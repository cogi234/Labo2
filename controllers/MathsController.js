import Course from '../models/course.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';

export default class CoursesController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, null);
    }

    get(id) {
        
    }

    post(data) {
        this.HttpContext.response.notImplemented();
    }
    put(data) {
        this.HttpContext.response.notImplemented();
    }
    remove(id) {
        this.HttpContext.response.notImplemented();
    }
}