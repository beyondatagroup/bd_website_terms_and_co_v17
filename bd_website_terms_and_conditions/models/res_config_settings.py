from odoo import models, fields , api , _

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    show_terms_conditions = fields.Boolean(
        related="website_id.show_terms_conditions",readonly=False,)

    terms_and_conditions_types = fields.Selection(
        related="website_id.terms_and_conditions_types", readonly=False,)

    alert_message = fields.Text(
        related="website_id.alert_message", readonly=False,)

    is_default_check = fields.Boolean(
        related="website_id.is_default_check", readonly=False,
    )

    terms_title = fields.Char(
        related="website_id.terms_title", readonly=False,)

    terms_label = fields.Char(
        related="website_id.terms_label", readonly=False,)

    terms_content = fields.Html(
        related="website_id.terms_content", readonly=False,)

    website_terms_condition_ids = fields.One2many(
        related="website_id.website_terms_condition_ids",
        string="Multi Terms & Conditions",
    )

    def action_open_terms_conditions(self):
        self.ensure_one()
        return {
            "type": "ir.actions.act_window",
            "name": "Terms & Conditions",
            "res_model": "website.terms.condition",
            "view_mode": "list,form",
            "target": "current",
        }


# class Website(models.Model):
#     _inherit = "website"
#
#     show_terms_conditions = fields.Boolean(string="Show Terms & Conditions")
#     terms_and_conditions_types = fields.Selection([
#         ('single', 'Single'),
#         ('multi', 'Multiple')
#     ], string="Terms & Conditions Type")
#     alert_message = fields.Text(string="Alert Message")
#     is_default_check = fields.Boolean(string="Is Default Check")
#     terms_title = fields.Char(string="Title")
#     terms_label = fields.Char(string="Label")
#     terms_content = fields.Html(string="Terms & Conditions",sanitize=False,)
#     website_terms_condition_ids = fields.One2many(
#         "website.terms.condition",
#         "website_id",
#         string="Multi Terms & Conditions",
#     )
#
#     def get_multi_terms(self):
#         self.ensure_one()
#         return self.env["website.terms.condition"].sudo().search([
#             ("website_id", "=", self.id)
#         ])
#
#
#     def write(self, vals):
#         if vals.get('terms_and_conditions_types') == 'multi':
#             vals.update({
#                 'is_default_check': False,
#                 'terms_title': False,
#                 'terms_label': False,
#                 'terms_content': False,
#             })
#         return super().write(vals)
#
#     @api.model_create_multi
#     def create(self, vals_list):
#         for vals in vals_list:
#             if vals.get('terms_and_conditions_types') == 'multi':
#                 vals.update({
#                     'is_default_check': False,
#                     'terms_title': False,
#                     'terms_label': False,
#                     'terms_content': False,
#                 })
#         return super().create(vals_list)