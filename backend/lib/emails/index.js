const fs = require('fs');
const Mustache = require('mustache');

const commonCss = fs.readFileSync(__dirname + '/commonCss.html').toString();
const newRequestStudent = fs.readFileSync(__dirname + '/new-request-student.html').toString().replace('{{ css }}', commonCss);
const newRequestAdvisor = fs.readFileSync(__dirname + '/new-request-advisor.html').toString().replace('{{ css }}', commonCss);
const requestChanged = fs.readFileSync(__dirname + '/request-changed.html').toString().replace('{{ css }}', commonCss);

module.exports = {
    newRequestStudent: params => Mustache.render(newRequestStudent, params),
    newRequestAdvisor: params => Mustache.render(newRequestAdvisor, params),
    requestChanged: params => Mustache.render(requestChanged, params)
}
