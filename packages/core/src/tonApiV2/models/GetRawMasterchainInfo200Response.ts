/* tslint:disable */
/* eslint-disable */
/**
 * REST api to TON blockchain explorer
 * Provide access to indexed TON blockchain
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { BlockRaw } from './BlockRaw';
import {
    BlockRawFromJSON,
    BlockRawFromJSONTyped,
    BlockRawToJSON,
    BlockRawToJSONTyped,
} from './BlockRaw';
import type { InitStateRaw } from './InitStateRaw';
import {
    InitStateRawFromJSON,
    InitStateRawFromJSONTyped,
    InitStateRawToJSON,
    InitStateRawToJSONTyped,
} from './InitStateRaw';

/**
 * 
 * @export
 * @interface GetRawMasterchainInfo200Response
 */
export interface GetRawMasterchainInfo200Response {
    /**
     * 
     * @type {BlockRaw}
     * @memberof GetRawMasterchainInfo200Response
     */
    last: BlockRaw;
    /**
     * 
     * @type {string}
     * @memberof GetRawMasterchainInfo200Response
     */
    stateRootHash: string;
    /**
     * 
     * @type {InitStateRaw}
     * @memberof GetRawMasterchainInfo200Response
     */
    init: InitStateRaw;
}

/**
 * Check if a given object implements the GetRawMasterchainInfo200Response interface.
 */
export function instanceOfGetRawMasterchainInfo200Response(value: object): value is GetRawMasterchainInfo200Response {
    if (!('last' in value) || value['last'] === undefined) return false;
    if (!('stateRootHash' in value) || value['stateRootHash'] === undefined) return false;
    if (!('init' in value) || value['init'] === undefined) return false;
    return true;
}

export function GetRawMasterchainInfo200ResponseFromJSON(json: any): GetRawMasterchainInfo200Response {
    return GetRawMasterchainInfo200ResponseFromJSONTyped(json, false);
}

export function GetRawMasterchainInfo200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetRawMasterchainInfo200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'last': BlockRawFromJSON(json['last']),
        'stateRootHash': json['state_root_hash'],
        'init': InitStateRawFromJSON(json['init']),
    };
}

export function GetRawMasterchainInfo200ResponseToJSON(json: any): GetRawMasterchainInfo200Response {
    return GetRawMasterchainInfo200ResponseToJSONTyped(json, false);
}

export function GetRawMasterchainInfo200ResponseToJSONTyped(value?: GetRawMasterchainInfo200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'last': BlockRawToJSON(value['last']),
        'state_root_hash': value['stateRootHash'],
        'init': InitStateRawToJSON(value['init']),
    };
}

