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

import { Budget } from './budget';
import { Personnel } from './personnel';
import { Student } from './student';
import {
    Budget,Personnel,Student,
} from ".";

/**
 * 
 *
 * @export
 * @interface Club
 */
export interface Club {

    /**
     * @type {number}
     * @memberof Club
     */
    idC?: number;

    /**
     * @type {string}
     * @memberof Club
     */
    name?: string;

    /**
     * @type {Array<Student>}
     * @memberof Club
     */
    committeeMembers?: Array<Student>;

    /**
     * @type {string}
     * @memberof Club
     */
    description?: string;

    /**
     * @type {string}
     * @memberof Club
     */
    type?: ClubTypeEnum;

    /**
     * @type {string}
     * @memberof Club
     */
    status?: ClubStatusEnum;

    /**
     * @type {boolean}
     * @memberof Club
     */
    featured?: boolean;

    /**
     * @type {Personnel}
     * @memberof Club
     */
    supervisor?: Personnel;

    /**
     * @type {Array<Budget>}
     * @memberof Club
     */
    budgets?: Array<Budget>;
}

/**
 * @export
 * @enum {string}
 */
export enum ClubTypeEnum {
    NORMAL = 'NORMAL',
    ACADEMIC = 'ACADEMIC'
}
/**
 * @export
 * @enum {string}
 */
export enum ClubStatusEnum {
    CREATIONSTEP1 = 'CREATION_STEP_1',
    CREATIONSTEP2 = 'CREATION_STEP_2',
    CREATIONSTEP3 = 'CREATION_STEP_3',
    ACTIVE = 'ACTIVE',
    ABANDONED = 'ABANDONED',
    DECLINED = 'DECLINED'
}

