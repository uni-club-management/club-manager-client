/* tslint:disable */
/* eslint-disable */
/**
 * Club Management API
 * Club Management API
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import {
    
} from ".";

/**
 * 
 *
 * @export
 * @interface NewTransactionRequest
 */
export interface NewTransactionRequest {

    /**
     * @type {Date}
     * @memberof NewTransactionRequest
     */
    date?: Date;

    /**
     * @type {number}
     * @memberof NewTransactionRequest
     */
    valeur?: number;

    /**
     * @type {number}
     * @memberof NewTransactionRequest
     */
    idBudget?: number;

    /**
     * @type {number}
     * @memberof NewTransactionRequest
     */
    idEvent?: number;
}
