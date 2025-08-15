import { customType, pgEnum, } from "drizzle-orm/pg-core";

export const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
    dataType() {
        return "bytea";
    },
});

// MAILER SETTINGS ENUM
export const mailerServiceEnum = pgEnum('mailer_service', ['gmail', 'smtp']);

// ROLES
export const roleNameEnum = pgEnum('role_name', ['user', 'admin', 'super_user']);

// SITES
export const siteTypeEnum = pgEnum('site_type', ['nodeapi', 'webeditor']);
export const siteEnvEnum = pgEnum('site_env', ['production', 'stage', 'development', 'demo']);

// SCRIPT TYPES ENUM
export const scriptTypeEnum = pgEnum('script_type', ['admission', 'discharge', 'neolab','drecord']);

// SCREEN TYPES ENUM
export const screenTypeEnum = pgEnum('screen_type', [
    'diagnosis',
    'checklist',
    'form',
    'management',
    'multi_select',
    'single_select',
    'progress',
    'timer',
    'yesno',
    'drugs',
    'fluids',
    'feeds',
    'zw_edliz_summary_table',
    'mwi_edliz_summary_table',
    'edliz_summary_table',
    'dynamic_form'
]);

// DRUG TYPE ENUM
export const drugTypeEnum = pgEnum('drug_type', ['drug', 'fluid', 'feed']);
