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

import { Account } from './account';
import { Student } from './student';
import {
    Account,Student,
} from ".";

/**
 * 
 *
 * @export
 * @interface Meeting
 */
export interface Meeting {

    /**
     * @type {number}
     * @memberof Meeting
     */
    idM?: number;

    /**
     * @type {Date}
     * @memberof Meeting
     */
    date?: Date;

    /**
     * @type {string}
     * @memberof Meeting
     */
    title?: string;

    /**
     * @type {string}
     * @memberof Meeting
     */
    description?: string;

    /**
     * @type {string}
     * @memberof Meeting
     */
    location?: string;

    /**
     * @type {number}
     * @memberof Meeting
     */
    lengthInMinutes?: number;

    /**
     * @type {Account}
     * @memberof Meeting
     */
    organiser?: Account;

    /**
     * @type {Array<Student>}
     * @memberof Meeting
     */
    participants?: Array<Student>;
}
