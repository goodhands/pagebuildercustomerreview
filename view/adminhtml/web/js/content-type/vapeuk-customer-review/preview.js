function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}

define([
    "jquery",
    "knockout",
    "mage/translate",
    "Magento_PageBuilder/js/widget-initializer",
    "Magento_PageBuilder/js/config",
    "Magento_PageBuilder/js/content-type-menu/hide-show-option",
    "Magento_PageBuilder/js/utils/object",
    "Magento_PageBuilder/js/content-type/preview"
], function (_jquery, _knockout, _translate, _widgetInitializer, _config, _hideShowOption, _object, _preview) {
    "use strict";

    var Preview = function (_preview2) {
        _inheritsLoose(Preview, _preview2);

        function Preview(parent, config, observableUpdater) {
            var _this;
            _this = _preview2.call(this, parent, config, observableUpdater) || this;
            _this.displayingWidgetPreview = _knockout.observable(false);
            _this.loading = _knockout.observable(false);
            _this.messages = {
                NOT_SELECTED: (0, _translate)("Please configure the Customer Review Widget"),
                UNKNOWN_ERROR: (0, _translate)("An error occurred loading the Customer Review Widget")
            };
            _this.placeholderText = _knockout.observable(_this.messages.NOT_SELECTED);
            return _this;
        }

        var _proto = Preview.prototype;

        _proto.retrieveOptions = function retrieveOptions() {
            var options = _preview2.prototype.retrieveOptions.call(this);
            options.hideShow = new _hideShowOption({
                preview: this,
                icon: _hideShowOption.showIcon,
                title: _hideShowOption.showText,
                action: this.onOptionVisibilityToggle,
                classes: ["hide-show-content-type"],
                sort: 40
            });
            return options;
        };

        _proto.afterObservablesUpdated = function afterObservablesUpdated() {
            _preview2.prototype.afterObservablesUpdated.call(this);
            var data = this.contentType.dataStore.getState();
            this.processWidgetData(data);
        };

        _proto.processWidgetData = function processWidgetData(data) {
            this.displayPreviewPlaceholder(data);
            if (data.instance_type || data.html) {
                this.processRequest(data);
            }
        };

        _proto.displayPreviewPlaceholder = function displayPreviewPlaceholder(data) {
            if (this.lastRenderedHtml && this.lastWidget === data.instance_type) {
                this.data.main.html(this.lastRenderedHtml);
                this.showBlockPreview(true);
            } else {
                this.placeholderText(this.messages.NOT_SELECTED);
                this.showBlockPreview(false);
            }
        };

        _proto.processRequest = function processRequest(data) {
            var self = this,
                url = _config.getConfig("preview_url"),
                identifier = (0, _object.get)(data, "instance_id"),
                requestConfig = {
                    method: "POST",
                    data: {
                        role: this.config.name,
                        instance_id: data.instance_id,
                        directive: this.data.main.html()
                    }
                };

            if (!identifier) {
                self.showBlockPreview(false);
                self.placeholderText(self.messages.NOT_SELECTED);
                return;
            }

            this.loading(true);
            _jquery.ajax(url, requestConfig)
                .done(function (response) {
                    if (response && response.data && response.data.content) {
                        self.displayLabel(self.config.label);
                        self.showBlockPreview(true);
                        self.data.main.html(response.data.content);
                        self.lastWidget = parseInt(identifier.toString(), 10);
                        self.lastRenderedHtml = response.data.content;
                    } else {
                        self.showBlockPreview(false);
                        self.placeholderText(self.messages.UNKNOWN_ERROR);
                    }
                }).fail(function () {
                    self.showBlockPreview(false);
                    self.placeholderText(self.messages.UNKNOWN_ERROR);
                }).always(function () {
                    self.loading(false);
                });
        };

        _proto.showBlockPreview = function showBlockPreview(isShow) {
            this.displayingWidgetPreview(isShow);
        };

        return Preview;
    }(_preview);
    return Preview;
});
