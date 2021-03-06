var fs = require('fs');
var ejs = require('ejs');
var juice = require('juice');

// Package constructor
function Mailgen(options) {
    // Set options as instance members
    this.theme = options.theme;
    this.product = options.product;

    // No theme provided - use default
    if (!this.theme) {
        this.theme = 'default';
    }

    // Build path to theme template
    this.templatePath = __dirname + '/themes/' + this.theme + '.html';

    // Bad theme?
    if (!fs.existsSync(this.templatePath)) {
        throw new Error('You have specified an invalid theme.');
    }

    // No product?
    if (!this.product || typeof this.product !== 'object') {
        throw new Error('Please provide the `product` object.');
    }

    // No product name or link?
    if (!this.product.name || !this.product.link) {
        throw new Error('Please provide the product name and link.');
    }
}

// HTML e-mail generator
Mailgen.prototype.generate = function (params) {
    // Basic params validation
    if (!params || typeof params !== 'object') {
        throw new Error('Please provide parameters for generating transactional e-mails.');
    }

    // Get body params to inject into template
    var body = params.body;

    // Basic body validation
    if (!body || typeof body !== 'object') {
        throw new Error('Please provide the `body` parameter as an object.');
    }

    // Load it (sync)
    var output = fs.readFileSync(this.templatePath, 'utf8');

    // Prepare data to be passed to ejs engine
    var templateData = {
        product: this.product
    };

    // Pass provided body to template
    for (var k in body) {
        templateData[k] = body[k];
    }

    // Render the template with ejs
    output = ejs.render(output, templateData);

    // Inline CSS
    output = juice(output);

    // All done!
    return output;
};

// Expose the Mailgen class
module.exports = Mailgen;
