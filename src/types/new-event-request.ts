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
 * @interface NewEventRequest
 */
export interface NewEventRequest {
    /**
     * 
     * @type {string}
     * @memberof NewEventRequest
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof NewEventRequest
     */
    description?: string;
    /**
     * 
     * @type {Date}
     * @memberof NewEventRequest
     */
    date?: Date;
    /**
     * 
     * @type {number}
     * @memberof NewEventRequest
     */
    organizer?: number;
}
