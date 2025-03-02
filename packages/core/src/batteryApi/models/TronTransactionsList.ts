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
import type { TronTransactionsListTransactionsInner } from './TronTransactionsListTransactionsInner';
import {
    TronTransactionsListTransactionsInnerFromJSON,
    TronTransactionsListTransactionsInnerFromJSONTyped,
    TronTransactionsListTransactionsInnerToJSON,
    TronTransactionsListTransactionsInnerToJSONTyped,
} from './TronTransactionsListTransactionsInner';

/**
 * 
 * @export
 * @interface TronTransactionsList
 */
export interface TronTransactionsList {
    /**
     * 
     * @type {Array<TronTransactionsListTransactionsInner>}
     * @memberof TronTransactionsList
     */
    transactions: Array<TronTransactionsListTransactionsInner>;
}

/**
 * Check if a given object implements the TronTransactionsList interface.
 */
export function instanceOfTronTransactionsList(value: object): value is TronTransactionsList {
    if (!('transactions' in value) || value['transactions'] === undefined) return false;
    return true;
}

export function TronTransactionsListFromJSON(json: any): TronTransactionsList {
    return TronTransactionsListFromJSONTyped(json, false);
}

export function TronTransactionsListFromJSONTyped(json: any, ignoreDiscriminator: boolean): TronTransactionsList {
    if (json == null) {
        return json;
    }
    return {
        
        'transactions': ((json['transactions'] as Array<any>).map(TronTransactionsListTransactionsInnerFromJSON)),
    };
}

  export function TronTransactionsListToJSON(json: any): TronTransactionsList {
      return TronTransactionsListToJSONTyped(json, false);
  }

  export function TronTransactionsListToJSONTyped(value?: TronTransactionsList | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'transactions': ((value['transactions'] as Array<any>).map(TronTransactionsListTransactionsInnerToJSON)),
    };
}

