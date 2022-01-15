const {ValidationError} = require("../utils/errors");
const {pool} = require("../utils/db");
const {v4:uuid} = require('uuid');

class GradebookRecord {
    //We assume that grade book is only readable for Santa
    constructor(obj) {
        if(!obj.content || obj.content < 1 || obj.content > 200) {
            throw new ValidationError('Content should have more than 1 character and less than 200');
        }
        if(!obj.symbol || (obj.symbol !== "+" && obj.symbol !== "-")){
            throw new ValidationError('Symbol should have value "+" (positive mark) or "-" (negative mark)');
        }
        this.id = obj.id;
        this.content = obj.content;
        this.symbol = obj.symbol;
    }

    static async listAll() {
        const [results] = await pool.execute("SELECT * FROM `gradebook` ORDER BY `symbol`");
        console.log(results);
        return results.map(obj => new GradebookRecord(obj));

    }

    // async insert() {
    //     if(!this.id) {
    //         this.id = uuid();
    //     }
    //
    //     await pool.execute("INSERT INTO `children`(`id`, `name`) VALUES(:id, :name) ", {
    //         id: this.id,
    //         name: this.name,
    //     })
    //
    // }

    static async getOne(id) {
        const [results] = await pool.execute("SELECT * FROM `children` WHERE `id` = :id ", {
            id,
        });
        return results.length === 0 ? null : new GradebookRecord(results[0]);
    }
}

module.exports = {
    GradebookRecord,
}