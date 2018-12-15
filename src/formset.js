class FormSet {
    constructor(formset, prefix, template, form_selector = '.formset-form') {
        this.formset = formset;
        this.prefix = prefix;
        this.template = template;
        this.formSelector = form_selector;

        this.totalInput = document.querySelector(`#id_${this.prefix}-TOTAL_FORMS`);
        this.rebuildRegexp = new RegExp(`${this.prefix}-[\\d.]+-`);

        this.append = this.append.bind(this);
    }

    get totalForms() {
        return Number.parseInt(this.totalInput.value)
    }

    set totalForms(value) {
        return this.totalInput.value = value
    }

    static replacePrefix(form, searchValue, replaceValue) {
        for (const field of form.querySelectorAll('input, select')) {
            const name = field.getAttribute('name').replace(searchValue, replaceValue);
            field.setAttribute('name', name);
            field.setAttribute('id', `id_${name}`)
        }

        for (const label of form.querySelectorAll('label')) {
            const forId = label.getAttribute('for').replace(searchValue, replaceValue);
            label.setAttribute('for', forId)
        }

        return form
    }

    append() {
        const form = this.template.cloneNode(true);

        FormSet.replacePrefix(form, '__prefix__', this.totalForms++);
        this.formset.appendChild(form);

        return form
    }

    pop(form) {
        this.totalForms--;
        form.remove();
        this.rebuild()
    }

    rebuild() {
        const forms = this.formset.querySelectorAll(this.formSelector);
        for (let i = 0; i < forms.length; i++) {
            FormSet.replacePrefix(forms[i], this.rebuildRegexp, `${this.prefix}-${i}-`);
        }
    }
};
