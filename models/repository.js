import fs from "fs";
import * as utilities from '../utilities.js';

let jsonFilesPath = 'jsonFiles';

export default class Repository {
    constructor(model) {
        this.objectsList = null;
        this.model = model;
        this.objectsName = model.getClassName() + "s";
        this.objectsFile = `./${jsonFilesPath}/${this.objectsName}.json`;
        console.log(this.objectsFile);
    }

    /**
     * @returns the list of objects
     */
    objects() {
        if (this.objectsList == null)
            this.read();
        return this.objectsList;
    }

    /**
     * Reads the file to populate the object list
     * @returns true or false for success or failure
     */
    read() {
        try {
            let rawdata = fs.readFileSync(this.objectsFile);
            this.objectsList = JSON.parse(rawdata);
            return true;
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                this.objectsList = [];
                console.log(`The file ${this.objectsFile} does not exist, it will be created.`)
            } else
                console.log(error);
        }
        return false;
    }

    /**
     * Writes the object list to the file
     * @returns true or false for success or failure
     */
    write() {
        try {
            fs.writeFileSync(this.objectsFile, JSON.stringify(this.objectsList));
            return true;
        }
        catch (error) {
            console.log(error);
        }
        return false;
    }

    /**
     * @returns the next id to insert
     */
    nextId() {
        let maxId = 0;
        for (let object of this.objects()) {
            if (object.Id > maxId) {
                maxId = object.Id;
            }
        }
        return maxId + 1;
    }

    /**
     * Checks if the model instance is in conflict with something in our repository
     * @returns true: in conflict, false: not in conflict
     */
    checkConflict(instance) {
        if (this.model.key) {
            if (this.findByField(this.model.key, instance[this.model.key], instance.Id)) {
                this.model.addError(`Unicity conflict on [${this.model.key}]...`);
                this.model.state.inConflict = true;
                return true
            }
        }
        return false;
    }

    /**
     * Inserts the object, with the next id, while checking for conflicts and validity
     * @returns The resulting object
     */
    add(object) {
        delete object.Id;
        object = { Id: 0, ...object };
        this.model.validate(object);

        if (this.model.state.isValid) {
            this.checkConflict(object);
            if (!this.model.state.inConflict) {
                object.Id = this.nextId();
                this.model.handleAssets(object);
                this.objectsList.push(object);
                this.write()
            }
        }
        return object;
    }
    /**
     * Updates the object with the specified id, while checking for existence, conflicts and validity
     * @returns The resulting object
     */
    update(id, objectToModify) {
        delete objectToModify.Id;
        objectToModify = { Id: id, ...objectToModify };
        this.model.validate(objectToModify);

        if (this.model.state.isValid) {
            let index = this.indexOf(objectToModify.Id);
            if (index >= 0) {
                this.checkConflict(objectToModify);
                if (!this.model.state.inConflict) {
                    this.model.handleAssets(objectToModify, this.objectsList[index]);
                    this.objectsList[index] = objectToModify;
                    this.write();
                }
            } else {
                this.model.addError(`The ressource [${objectToModify.Id}] does not exist.`);
                this.model.state.notFound = true;
            }
        }
        return objectToModify;
    }

    /**
     * Tries to remove the object with the specified id
     */
    remove(id) {
        let index = 0;
        for (let object of this.objects()) {
            if (object.Id === id) {
                this.model.removeAssets(object);
                this.objectsList.splice(index, 1);
                return this.write();
            }
            index++;
        }
        return false;
    }

    /**
     * Get all objects, with bound with extra data, if necessary
     */
    getAll() {
        let objectsList = this.objects();
        let bindedData = [];
        if (objectsList) {
            for (let data of objectsList) {
                bindedData.push(this.model.bindExtraData(data));
            }
        }
        return bindedData;
    }

    /**
     * Get the object with the specified id, with bound with extra data, if necessary
     */
    get(id) {
        for (let object of this.objects()) {
            if (object.Id === id)
                return this.model.bindExtraData(object);
        }
        return null;
    }

    /**
     * Removes the object at the specified indexes
     * @param {int[]} indexes The indexes of the elements we want to delete, in ascending order
     */
    removeByIndex(indexes) {
        if (indexes.length > 0) {
            utilities.deleteByIndex(this.objects(), indexes);
            this.write();
        }
    }

    /**
     * Find the object where fieldName == value, excluding the object with Id == excludedId
     */
    findByField(fieldName, value, exludedId = 0) {
        if (fieldName) {
            let index = 0;
            for (let object of this.objects()) {
                try {
                    if (object[fieldName] === value)
                        if (object.Id != exludedId)
                            return this.objectsList[index];
                    index++;
                } catch (error) { break; }
            }
        }
        return null;
    }

    /**
     * @returns the index of the object with the id. -1 if not found
     */
    indexOf(id) {
        let index = 0;
        for (let object of this.objects()) {
            if (object.Id === id) return index;
            index++;
        }
        return -1;
    }
}