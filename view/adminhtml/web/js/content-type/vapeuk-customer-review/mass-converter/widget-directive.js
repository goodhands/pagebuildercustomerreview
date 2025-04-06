function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define([
    "Magento_PageBuilder/js/mass-converter/widget-directive-abstract",
    "Magento_PageBuilder/js/utils/object"
], function (widgetDirectiveAbstract, object) {

    /**
     * Enables the settings of the content type to be stored as a widget directive.
    *
    * @api
    */
    var WidgetDirective = /*#__PURE__*/function (_widgetDirectiveAbstr) {
        "use strict";

        _inheritsLoose(WidgetDirective, _widgetDirectiveAbstr);

        function WidgetDirective() {
          return _widgetDirectiveAbstr.apply(this, arguments) || this;
        }

        var _proto = WidgetDirective.prototype;

        /**
         * Convert value to internal format
         *
         * @param {object} data
         * @param {object} config
         * @returns {object}
         */
        _proto.fromDom = function fromDom(data, config) {
            var attributes = _widgetDirectiveAbstr.prototype.fromDom.call(this, data, config);

            console.log({ fromDomBefore: data, attributes: attributes });

            data.customer_name = attributes.customer_name || '';
            data.rating = attributes.rating || '';
            data.review_title = attributes.review_title || '';
            data.customer_review = attributes.customer_review || '';
            data.customer_country = attributes.customer_country || '';

            console.log({ fromDomAfter: data });
            return data;
        }

        /**
         * Convert value to knockout format
         *
         * @param {object} data
         * @param {object} config
         * @returns {object}
         */
        _proto.toDom = function toDom(data, config) {
            console.log({ toDomBefore: data });

            var attributes = {
                type: "Vapeuk\\PageBuilderCustomerReview\\Block\\Widget\\ReviewContent",
                template: "Vapeuk_PageBuilderCustomerReview::widget/review_content/default.phtml",
                customer_name: data.customer_name || "",
                rating: data.rating || "",
                review_title: data.review_title || "",
                customer_review: data.customer_review || "",
                customer_country: data.customer_country || "",
                type_name: "CMS Customer Review Block"
            };

            if (
                !attributes.customer_name ||
                !attributes.rating ||
                !attributes.review_title ||
                !attributes.customer_review ||
                !attributes.customer_country
            ) {
                // Clear out any existing widget directive so Page Builder won't keep re-parsing it
                object.set(data, config.html_variable, "");
                return data;
            }

            const buildDirective = this.buildDirective(attributes);
            console.log({ buildDirective: buildDirective, configHtmlVariable: config.html_variable });

            (0, object.set)(data, config.html_variable, buildDirective);

            console.log({ toDomAfter: data });

            return data;
        };

        return WidgetDirective;
    }(widgetDirectiveAbstract);

    return WidgetDirective;
});
