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
 * @interface EstimatedTronTx
 */
export interface EstimatedTronTx {
    /**
     * 
     * @type {number}
     * @memberof EstimatedTronTx
     */
    energyCharges: number;
    /**
     * 
     * @type {number}
     * @memberof EstimatedTronTx
     */
    bandwidthCharges: number;
    /**
     * 
     * @type {number}
     * @memberof EstimatedTronTx
     */
    activationCharges: number;
    /**
     * 
     * @type {number}
     * @memberof EstimatedTronTx
     */
    totalCharges: number;
}

/**
 * Check if a given object implements the EstimatedTronTx interface.
 */
export function instanceOfEstimatedTronTx(value: object): value is EstimatedTronTx {
    if (!('energyCharges' in value) || value['energyCharges'] === undefined) return false;
    if (!('bandwidthCharges' in value) || value['bandwidthCharges'] === undefined) return false;
    if (!('activationCharges' in value) || value['activationCharges'] === undefined) return false;
    if (!('totalCharges' in value) || value['totalCharges'] === undefined) return false;
    return true;
}

export function EstimatedTronTxFromJSON(json: any): EstimatedTronTx {
    return EstimatedTronTxFromJSONTyped(json, false);
}

export function EstimatedTronTxFromJSONTyped(json: any, ignoreDiscriminator: boolean): EstimatedTronTx {
    if (json == null) {
        return json;
    }
    return {
        
        'energyCharges': json['energy_charges'],
        'bandwidthCharges': json['bandwidth_charges'],
        'activationCharges': json['activation_charges'],
        'totalCharges': json['total_charges'],
    };
}

  export function EstimatedTronTxToJSON(json: any): EstimatedTronTx {
      return EstimatedTronTxToJSONTyped(json, false);
  }

  export function EstimatedTronTxToJSONTyped(value?: EstimatedTronTx | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'energy_charges': value['energyCharges'],
        'bandwidth_charges': value['bandwidthCharges'],
        'activation_charges': value['activationCharges'],
        'total_charges': value['totalCharges'],
    };
}

