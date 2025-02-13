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
 * @interface EstimateGaslessCostRequest
 */
export interface EstimateGaslessCostRequest {
    /**
     * 
     * @type {boolean}
     * @memberof EstimateGaslessCostRequest
     */
    battery?: boolean;
    /**
     * 
     * @type {string}
     * @memberof EstimateGaslessCostRequest
     */
    payload: string;
}

/**
 * Check if a given object implements the EstimateGaslessCostRequest interface.
 */
export function instanceOfEstimateGaslessCostRequest(value: object): value is EstimateGaslessCostRequest {
    if (!('payload' in value) || value['payload'] === undefined) return false;
    return true;
}

export function EstimateGaslessCostRequestFromJSON(json: any): EstimateGaslessCostRequest {
    return EstimateGaslessCostRequestFromJSONTyped(json, false);
}

export function EstimateGaslessCostRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): EstimateGaslessCostRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'battery': json['battery'] == null ? undefined : json['battery'],
        'payload': json['payload'],
    };
}

  export function EstimateGaslessCostRequestToJSON(json: any): EstimateGaslessCostRequest {
      return EstimateGaslessCostRequestToJSONTyped(json, false);
  }

  export function EstimateGaslessCostRequestToJSONTyped(value?: EstimateGaslessCostRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'battery': value['battery'],
        'payload': value['payload'],
    };
}

