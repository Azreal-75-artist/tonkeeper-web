/* tslint:disable */
/* eslint-disable */
/**
 * Custodial-Battery REST API.
 * REST API for Custodial Battery which provides gas to different networks to help execute transactions.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface MisbehaviourPunishmentConfig
 */
export interface MisbehaviourPunishmentConfig {
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    defaultFlatFine: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    defaultProportionalFine: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    severityFlatMult: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    severityProportionalMult: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    unpunishableInterval: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    longInterval: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    longFlatMult: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    longProportionalMult: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    mediumInterval: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    mediumFlatMult: number;
    /**
     * 
     * @type {number}
     * @memberof MisbehaviourPunishmentConfig
     */
    mediumProportionalMult: number;
}

/**
 * Check if a given object implements the MisbehaviourPunishmentConfig interface.
 */
export function instanceOfMisbehaviourPunishmentConfig(value: object): value is MisbehaviourPunishmentConfig {
    if (!('defaultFlatFine' in value) || value['defaultFlatFine'] === undefined) return false;
    if (!('defaultProportionalFine' in value) || value['defaultProportionalFine'] === undefined) return false;
    if (!('severityFlatMult' in value) || value['severityFlatMult'] === undefined) return false;
    if (!('severityProportionalMult' in value) || value['severityProportionalMult'] === undefined) return false;
    if (!('unpunishableInterval' in value) || value['unpunishableInterval'] === undefined) return false;
    if (!('longInterval' in value) || value['longInterval'] === undefined) return false;
    if (!('longFlatMult' in value) || value['longFlatMult'] === undefined) return false;
    if (!('longProportionalMult' in value) || value['longProportionalMult'] === undefined) return false;
    if (!('mediumInterval' in value) || value['mediumInterval'] === undefined) return false;
    if (!('mediumFlatMult' in value) || value['mediumFlatMult'] === undefined) return false;
    if (!('mediumProportionalMult' in value) || value['mediumProportionalMult'] === undefined) return false;
    return true;
}

export function MisbehaviourPunishmentConfigFromJSON(json: any): MisbehaviourPunishmentConfig {
    return MisbehaviourPunishmentConfigFromJSONTyped(json, false);
}

export function MisbehaviourPunishmentConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): MisbehaviourPunishmentConfig {
    if (json == null) {
        return json;
    }
    return {
        
        'defaultFlatFine': json['default_flat_fine'],
        'defaultProportionalFine': json['default_proportional_fine'],
        'severityFlatMult': json['severity_flat_mult'],
        'severityProportionalMult': json['severity_proportional_mult'],
        'unpunishableInterval': json['unpunishable_interval'],
        'longInterval': json['long_interval'],
        'longFlatMult': json['long_flat_mult'],
        'longProportionalMult': json['long_proportional_mult'],
        'mediumInterval': json['medium_interval'],
        'mediumFlatMult': json['medium_flat_mult'],
        'mediumProportionalMult': json['medium_proportional_mult'],
    };
}

  export function MisbehaviourPunishmentConfigToJSON(json: any): MisbehaviourPunishmentConfig {
      return MisbehaviourPunishmentConfigToJSONTyped(json, false);
  }

  export function MisbehaviourPunishmentConfigToJSONTyped(value?: MisbehaviourPunishmentConfig | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'default_flat_fine': value['defaultFlatFine'],
        'default_proportional_fine': value['defaultProportionalFine'],
        'severity_flat_mult': value['severityFlatMult'],
        'severity_proportional_mult': value['severityProportionalMult'],
        'unpunishable_interval': value['unpunishableInterval'],
        'long_interval': value['longInterval'],
        'long_flat_mult': value['longFlatMult'],
        'long_proportional_mult': value['longProportionalMult'],
        'medium_interval': value['mediumInterval'],
        'medium_flat_mult': value['mediumFlatMult'],
        'medium_proportional_mult': value['mediumProportionalMult'],
    };
}

