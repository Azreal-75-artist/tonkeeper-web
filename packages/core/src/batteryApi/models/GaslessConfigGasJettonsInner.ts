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
 * @interface GaslessConfigGasJettonsInner
 */
export interface GaslessConfigGasJettonsInner {
    /**
     * 
     * @type {string}
     * @memberof GaslessConfigGasJettonsInner
     */
    masterId: string;
}

/**
 * Check if a given object implements the GaslessConfigGasJettonsInner interface.
 */
export function instanceOfGaslessConfigGasJettonsInner(value: object): value is GaslessConfigGasJettonsInner {
    if (!('masterId' in value) || value['masterId'] === undefined) return false;
    return true;
}

export function GaslessConfigGasJettonsInnerFromJSON(json: any): GaslessConfigGasJettonsInner {
    return GaslessConfigGasJettonsInnerFromJSONTyped(json, false);
}

export function GaslessConfigGasJettonsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GaslessConfigGasJettonsInner {
    if (json == null) {
        return json;
    }
    return {
        
        'masterId': json['master_id'],
    };
}

  export function GaslessConfigGasJettonsInnerToJSON(json: any): GaslessConfigGasJettonsInner {
      return GaslessConfigGasJettonsInnerToJSONTyped(json, false);
  }

  export function GaslessConfigGasJettonsInnerToJSONTyped(value?: GaslessConfigGasJettonsInner | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'master_id': value['masterId'],
    };
}

