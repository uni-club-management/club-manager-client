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
/**
 * 
 * @export
 * @interface NewBudgetRequest
 */
export interface NewBudgetRequest {
    /**
     * 
     * @type {string}
     * @memberof NewBudgetRequest
     */
    budgetType?: NewBudgetRequestBudgetTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof NewBudgetRequest
     */
    budgetInitial?: number;
    /**
     * 
     * @type {number}
     * @memberof NewBudgetRequest
     */
    idClub?: number;
}

/**
    * @export
    * @enum {string}
    */
export enum NewBudgetRequestBudgetTypeEnum {
    _1 = 'TYPE_1',
    _2 = 'TYPE_2'
}

