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
 * @interface Document
 */
export interface Document {

    /**
     * @type {number}
     * @memberof Document
     */
    idDocument?: number;

    /**
     * @type {string}
     * @memberof Document
     */
    name?: string;

    /**
     * @type {string}
     * @memberof Document
     */
    type?: string;

    /**
     * @type {string}
     * @memberof Document
     */
    path?: string;

    /**
     * @type {number}
     * @memberof Document
     */
    size?: number;

    /**
     * @type {Date}
     * @memberof Document
     */
    dateUpload?: Date;
}
