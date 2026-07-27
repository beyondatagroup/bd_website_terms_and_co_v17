# -*- coding: utf-8 -*-
###############################################################################
#
#    BeyonData Solutions Private Limited
#
#    Copyright (C) 2026-Today BeyonData Solutions Private Limited
#    (<https://www.beyondatagroup.com>)
#
###############################################################################

{
    "name": "Website Terms & Conditions",
    "version": "17.0",
    "category": "Website",
    "summary": "Configure and display Terms & Conditions on website signup",

    "description": """
        Website Terms & Conditions
        ==========================
        
        This module enables administrators to configure Terms & Conditions
        for website user registration.
        
        Features
        --------
        * Enable or disable Terms & Conditions for website signup.
        * Configure Title and Checkbox Label.
        * Add rich-text Terms & Conditions content using the HTML editor.
        * Require users to accept Terms & Conditions before creating an account.
        * Configure default checkbox selection.
        * Configure custom validation alert message.
        * Support website-specific configuration.
        * Hide Terms & Conditions when the feature is disabled.
    """,

    "author": "BeyonData Solutions Private Limited",
    "website": "https://www.beyondatagroup.com/",
    "license": "LGPL-3",

    "depends": [
        "base_setup",
        "website",
        # "auth_signup",
        "payment",
        "website_sale",
    ],

    "data": [
        "security/ir.model.access.csv",
        "security/website_terms_security.xml",

        "views/res_config_settings_views.xml",
        "views/website_terms_condition_views.xml",
        "views/templates.xml",
    ],

    'assets': {
        'web.assets_frontend': [
            'bd_website_terms_and_conditions/static/src/js/website_terms.js',
        ],
    },
    "installable": True,
    "application": False,
    "auto_install": False,
}
