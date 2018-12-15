'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormSet = function () {
    function FormSet(formset, prefix, template) {
        var form_selector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.formset-form';

        _classCallCheck(this, FormSet);

        this.formset = formset;
        this.prefix = prefix;
        this.template = template;
        this.formSelector = form_selector;

        this.totalInput = document.querySelector('#id_' + this.prefix + '-TOTAL_FORMS');
        this.rebuildRegexp = new RegExp(this.prefix + '-[\\d.]+-');

        this.append = this.append.bind(this);
    }

    _createClass(FormSet, [{
        key: 'append',
        value: function append() {
            var form = this.template.cloneNode(true);

            FormSet.replacePrefix(form, '__prefix__', this.totalForms++);
            this.formset.appendChild(form);

            return form;
        }
    }, {
        key: 'pop',
        value: function pop(form) {
            this.totalForms--;
            form.remove();
            this.rebuild();
        }
    }, {
        key: 'rebuild',
        value: function rebuild() {
            var forms = this.formset.querySelectorAll(this.formSelector);
            for (var i = 0; i < forms.length; i++) {
                FormSet.replacePrefix(forms[i], this.rebuildRegexp, this.prefix + '-' + i + '-');
            }
        }
    }, {
        key: 'totalForms',
        get: function get() {
            return Number.parseInt(this.totalInput.value);
        },
        set: function set(value) {
            return this.totalInput.value = value;
        }
    }], [{
        key: 'replacePrefix',
        value: function replacePrefix(form, searchValue, replaceValue) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = form.querySelectorAll('input, select')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var field = _step.value;

                    var name = field.getAttribute('name').replace(searchValue, replaceValue);
                    field.setAttribute('name', name);
                    field.setAttribute('id', 'id_' + name);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = form.querySelectorAll('label')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var label = _step2.value;

                    var forId = label.getAttribute('for').replace(searchValue, replaceValue);
                    label.setAttribute('for', forId);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return form;
        }
    }]);

    return FormSet;
}();

;