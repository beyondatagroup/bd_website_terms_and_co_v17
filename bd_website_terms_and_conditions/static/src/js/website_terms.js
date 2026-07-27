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






















// /** @odoo-module **/
//
// import publicWidget from "@web/legacy/js/public/public_widget";
//
// publicWidget.registry.PaymentForm.include({
//
//     events: Object.assign({}, publicWidget.registry.PaymentForm.prototype.events, {
//         "change .o_terms_checkbox": "_onTermsCheckboxChange",
//     }),
//
//     /**
//      * Called when the payment form widget starts.
//      */
//     start() {
//         const result = this._super(...arguments);
//
//         // Odoo may update the payment button state during payment form startup,
//         // so apply our Terms & Conditions validation after start.
//         Promise.resolve(result).then(() => {
//             this._updateTermsPaymentButton();
//         });
//
//         return result;
//     },
//
//     /**
//      * Enable Pay Now only when all Terms & Conditions
//      * checkboxes are checked.
//      */
//     _updateTermsPaymentButton() {
//         const button = this.el.querySelector(
//             'button[name="o_payment_submit_button"]'
//         );
//
//         if (!button) {
//             return;
//         }
//
//         const checkboxes = document.querySelectorAll(".o_terms_checkbox");
//
//         if (!checkboxes.length) {
//             return;
//         }
//
//         const allChecked = Array.from(checkboxes).every(
//             (checkbox) => checkbox.checked
//         );
//
//         button.disabled = !allChecked;
//     },
//     // _updateTermsPaymentButton() {
//     //     const button = this.el.querySelector(
//     //         'button[name="o_payment_submit_button"]'
//     //     );
//     //
//     //     if (!button) {
//     //         return;
//     //     }
//     //
//     //     const checkboxes = document.querySelectorAll(".o_terms_checkbox");
//     //
//     //     // No T&C checkbox => do not block payment.
//     //     if (!checkboxes.length) {
//     //         return;
//     //     }
//     //
//     //     const allChecked = Array.from(checkboxes).every(
//     //         (checkbox) => checkbox.checked
//     //     );
//     //
//     //     button.disabled = !allChecked;
//     // },
//
//     /**
//      * Checkbox changed.
//      */
//     _onTermsCheckboxChange() {
//         this._updateTermsPaymentButton();
//     },
//
//     /**
//      * Final validation before payment.
//      *
//      * This prevents payment even if another Odoo method/provider
//      * enabled the button after our checkbox validation.
//      */
//     async _submitForm(ev) {
//         const checkboxes = document.querySelectorAll(".o_terms_checkbox");
//
//         if (checkboxes.length) {
//             const allChecked = Array.from(checkboxes).every(
//                 (checkbox) => checkbox.checked
//             );
//
//             if (!allChecked) {
//                 ev.stopPropagation();
//                 ev.preventDefault();
//
//                 this._updateTermsPaymentButton();
//                 return;
//             }
//         }
//
//         return await this._super(...arguments);
//     },
// });





// /** @odoo-module **/
//
// import PaymentForm from '@payment/js/payment_form';
// import { patch } from "@web/core/utils/patch";
//
// patch(PaymentForm.prototype, {
//     setup() {
//         super.setup(...arguments);
//
//         const toggleButton = () => {
//             const button = document.querySelector(
//                 'button[name="o_payment_submit_button"]'
//             );
//
//             if (!button) {
//                 return;
//             }
//
//             const checkboxes = document.querySelectorAll(".o_terms_checkbox");
//
//             if (!checkboxes.length) {
//                 button.disabled = false;
//                 return;
//             }
//
//             const allChecked = [...checkboxes].every(cb => cb.checked);
//
//             button.disabled = !allChecked;
//         };
//
//         const attachListeners = () => {
//             document.querySelectorAll(".o_terms_checkbox").forEach(cb => {
//                 cb.removeEventListener("change", toggleButton);
//                 cb.addEventListener("change", toggleButton);
//             });
//
//             toggleButton();
//         };
//
//         const observer = new MutationObserver(() => {
//             attachListeners();
//         });
//
//         observer.observe(document.body, {
//             childList: true,
//             subtree: true,
//         });
//
//         this.registerCleanup(() => observer.disconnect());
//     },
// });


// /** @odoo-module **/
//
// import { PaymentForm } from "@payment/interactions/payment_form";
// import { patch } from "@web/core/utils/patch";
//
// patch(PaymentForm.prototype, {
//     setup() {
//         super.setup(...arguments);
//
//         const toggleButton = () => {
//             const button = document.querySelector(
//                 'button[name="o_payment_submit_button"]'
//             );
//
//             if (!button) {
//                 return;
//             }
//
//             const checkboxes = document.querySelectorAll(".o_terms_checkbox");
//
//             if (!checkboxes.length) {
//                 button.disabled = false;
//                 return;
//             }
//
//             const allChecked = [...checkboxes].every(cb => cb.checked);
//
//             console.log("All Checked :", allChecked);
//
//             button.disabled = !allChecked;
//         };
//
//         // Initial state
//         toggleButton();
//
//         // Listen to every checkbox
//         document.querySelectorAll(".o_terms_checkbox").forEach(cb => {
//             cb.addEventListener("change", toggleButton);
//         });
//
//         // If Interaction is destroyed, remove listeners
//         this.registerCleanup(() => {
//             document.querySelectorAll(".o_terms_checkbox").forEach(cb => {
//                 cb.removeEventListener("change", toggleButton);
//             });
//         });
//     },
// });