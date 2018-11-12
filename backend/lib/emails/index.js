const fs = require('fs');
const Mustache = require('mustache');

const newRequestStudent = fs.readFileSync(__dirname + '/new-request-student.html').toString();


module.exports = {
    newRequestStudent: params => Mustache.render(newRequestStudent, params),
}
