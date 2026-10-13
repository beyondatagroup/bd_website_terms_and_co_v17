/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.PaymentForm.include({

    events: Object.assign(
        {},
        publicWidget.registry.PaymentForm.prototype.events,
        {
            "change .o_terms_checkbox": "_onTermsCheckboxChange",
        }
    ),

    start() {
        const result = this._super(...arguments);

        Promise.resolve(result).then(() => {
            this._updateTermsPaymentButton();
        });

        return result;
    },

    _areAllTermsChecked() {
        const checkboxes = document.querySelectorAll(
            ".o_terms_checkbox"
        );

        if (!checkboxes.length) {
            return true;
        }

        return Array.from(checkboxes).every(
            (checkbox) => checkbox.checked
        );
    },

    _updateTermsPaymentButton() {
        const button = this.el.querySelector(
            'button[name="o_payment_submit_button"]'
        );

        if (!button) {
            return;
        }

        const allChecked = this._areAllTermsChecked();

        // Actually disable/enable the button
        button.disabled = !allChecked;

        // Make disabled state visually clear
        if (allChecked) {
            button.style.opacity = "1";
            button.style.cursor = "pointer";
        } else {
            button.style.opacity = "0.5";
            button.style.cursor = "not-allowed";
        }
    },

    _onTermsCheckboxChange() {
        this._updateTermsPaymentButton();
    },

    _enableButton() {
        this._super(...arguments);
        this._updateTermsPaymentButton();
    },

    async _submitForm(ev) {
        if (!this._areAllTermsChecked()) {
            ev.preventDefault();
            ev.stopPropagation();

            this._updateTermsPaymentButton();
            return;
        }

        return await this._super(...arguments);
    },
});
