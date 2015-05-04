/* Read the Docs - Documentation promotions */

var $ = window.$;

module.exports = {
    Promo: Promo
};

function Promo (text, link) {
    this.text = text;
    this.link = link;
    this.promo = null;
}

Promo.prototype.create = function () {
    var self = this,
        nav_side = $('nav.wy-nav-side');

    if (nav_side.length) {
        // Add elements
        promo = $('<div />')
            .attr('class', 'wy-menu rst-pro');

        // Create link with callback
        var promo_link = $('<a />')
            .attr('class', 'rst-pro-link')
            .attr('href', this.link)
            .attr('target', '_blank')
            .on('click', function (ev) {
                if (_gaq) {
                    _gaq.push(
                        ['rtfd._setAccount', 'UA-17997319-1'],
                        ['rtfd._trackEvent', 'Promo', 'Click', self.variant]
                    );
                }
            })
            .html(this.text)
            .appendTo(promo);

        // Promo info
        var promo_about = $('<div />')
            .attr('class', 'rst-pro-about');
        var promo_about_link = $('<a />')
            .attr('href', 'http://docs.readthedocs.org/en/latest/sponsors.html#sponsorship-information')
            .appendTo(promo_about);
        var promo_about_icon = $('<i />')
            .attr('class', 'fa fa-info-circle')
            .appendTo(promo_about_link);
        promo_about.appendTo(promo);

        promo.appendTo(nav_side);

        promo.wrapper = $('<div />')
            .attr('class', 'rst-pro-wrapper')
            .appendTo(nav_side);

        return promo;
    }
}

// Position promo
Promo.prototype.display = function () {
    var promo = this.promo,
        self = this;

    if (! promo) {
        promo = this.promo = this.create();
    }
    promo.show();
}

Promo.prototype.disable = function () {
}

// Variant factory method
Promo.from_variants = function (variants) {
    var chosen = Math.floor(Math.random() * variants.length),
        variant = variants[chosen],
        text = variant.text,
        link = variant.link,
        id = variant.id,
        promo = new Promo(text, link);
    promo.variant = id
    return promo;
};
