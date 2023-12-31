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
 * @interface NewClubRequest
 */
export interface NewClubRequest {

    /**
     * @type {string}
     * @memberof NewClubRequest
     */
    name?: string;

    /**
     * @type {string}
     * @memberof NewClubRequest
     */
    description?: string;

    /**
     * @type {number}
     * @memberof NewClubRequest
     */
    supervisorId?: number;

    /**
     * @type {Array<number>}
     * @memberof NewClubRequest
     */
    committeeIds?: Array<number>;

    /**
     * @type {string}
     * @memberof NewClubRequest
     */
    status?: NewClubRequestStatusEnum;

    /**
     * @type {boolean}
     * @memberof NewClubRequest
     */
    featured?: boolean;
}

/**
 * @export
 * @enum {string}
 */
export enum NewClubRequestStatusEnum {
    CREATIONSTEP1 = 'CREATION_STEP_1',
    CREATIONSTEP2 = 'CREATION_STEP_2',
    CREATIONSTEP3 = 'CREATION_STEP_3',
    ACTIVE = 'ACTIVE',
    ABANDONED = 'ABANDONED',
    DECLINED = 'DECLINED'
}

