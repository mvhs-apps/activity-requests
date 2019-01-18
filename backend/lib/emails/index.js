const fs = require('fs');
const Mustache = require('mustache');

const newRequestStudent = fs.readFileSync(__dirname + '/new-request-student.html').toString();
const newRequestAdvisor = fs.readFileSync(__dirname + '/new-request-advisor.html').toString();
const requestChanged = fs.readFileSync(__dirname + '/request-changed.html').toString();

module.exports = {
    newRequestStudent: params => Mustache.render(newRequestStudent, params),
    newRequestAdvisor: params => Mustache.render(newRequestAdvisor, params),
    requestChanged: params => Mustache.render(requestChanged, params)
}
