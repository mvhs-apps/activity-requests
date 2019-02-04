const fs = require('fs');
const Mustache = require('mustache');
const emails = {};

emails.newRequestStudent = fs.readFileSync(__dirname + '/new-request-student.html');
emails.newRequestAdvisor = fs.readFileSync(__dirname + '/new-request-advisor.html');
emails.requestChanged = fs.readFileSync(__dirname + '/request-changed.html');

const commonCss = fs.readFileSync(__dirname + '/commonCss.html').toString();
const outro = fs.readFileSync(__dirname + '/outro.html').toString();

for (let key in emails) {
    emails[key] = emails[key].toString().replace('{{ css }}', commonCss).replace('{{ outro }}', outro);
}

module.exports = {
    newRequestStudent: params => Mustache.render(emails.newRequestStudent, params),
    newRequestAdvisor: params => Mustache.render(emails.newRequestAdvisor, params),
    requestChanged: params => Mustache.render(emails.requestChanged, params)
}
