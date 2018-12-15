# formset.js 
A simple library to avoid pain when working with Django formsets. Written in ES6, no require JQuery and etc.


Few steps to be more happy

* Include this library to your code
* Add template form, like this: 

```html
<div class="formset-form">
        {{ formset.empty_form }}
        <button class="remove" type="button">KEEEEEEEEEK</button>
</div>
```

* Create instance of formset, for example:
```js
let formSet = new FormSet(document.querySelector('.formset'), 'form', document.querySelectorAll('.formset-form')[1])
```

Where first argument is your formset container where new forms will render, second is formset prefix and third is template of future forms.

By default, formset.js finds forms using the “.formset-form” selector to re-render the formset when the form is deleted. So if you use different form template you must care about this selector. For example:

```html
<form>
    <div class="formset"> <!-- formset container -->
        {{ formset.management_form }}
            {% for form in formset %}
                <div class="kek-form">
                    {{ form }}
                </div>
            {% endfor %}
    </div>
    <button type="button" id="addForm">KEK</button> <!-- button that add new forms -->
</form>
 
<div class="hidden">
    <div class="kek-form"> <!-- template form -->
        {{ formset.empty_form }}
        <button class="popForm" type="button">KEEEEEEEEEK</button> <!-- button that remove form -->
    </div>
</div>

<script>
    const fs = new FormSet(document.querySelector('.formset'), 'form', document.querySelectorAll('div.hidden > .formset-form')[1], '.kek-form');
    document.querySelector('#addForm').addEventListener('click', fs.append);
    document.addEventListener('click', e => {
                e.target && e.target.getAttribute('class') === 'popForm' && fs.pop(e.target.parentElement) // button is inside form
    });
</script>

```