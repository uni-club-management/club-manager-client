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
 * @interface NewStudentRequest
 */
export interface NewStudentRequest {
    /**
     * 
     * @type {string}
     * @memberof NewStudentRequest
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof NewStudentRequest
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof NewStudentRequest
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof NewStudentRequest
     */
    password?: string;
    /**
     * 
     * @type {string}
     * @memberof NewStudentRequest
     */
    major?: string;
    /**
     * 
     * @type {number}
     * @memberof NewStudentRequest
     */
    level?: number;
    /**
     * 
     * @type {string}
     * @memberof NewStudentRequest
     */
    role?: NewStudentRequestRoleEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum NewStudentRequestRoleEnum {
    ADMIN = 'ADMIN',
    PROF = 'PROF',
    PRESIDENT = 'PRESIDENT',
    VICEPRESIDENT = 'VICE_PRESIDENT',
    TREASURER = 'TREASURER',
    SECRETARY = 'SECRETARY',
    STUDENT = 'STUDENT'
}
