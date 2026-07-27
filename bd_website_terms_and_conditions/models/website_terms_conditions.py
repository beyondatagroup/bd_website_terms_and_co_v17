# -*- coding: utf-8 -*-

from odoo import fields, models


class WebsiteTermsCondition(models.Model):
    _name = "website.terms.condition"
    _description = "Website Terms & Conditions"
    _order = "name"

    name = fields.Char(string="Terms Title", required=True, translate=True,copy=False)
    terms_label = fields.Char(string="Terms Label", required=True, translate=True,copy=False)
    description = fields.Html(string="Terms & Conditions Description",  required=True, translate=True,
                              sanitize=False,copy=False)
    is_default_check = fields.Boolean(string="Is Default Check", default=False,copy=False)
    website_id = fields.Many2one(
        "website",
        string="Website",
        required=True,
        default=lambda self: self.env["website"].get_current_website(),
    )

