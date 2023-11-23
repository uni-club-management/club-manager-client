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
 * @interface NewPersonnelRequest
 */
export interface NewPersonnelRequest {
    /**
     * 
     * @type {string}
     * @memberof NewPersonnelRequest
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof NewPersonnelRequest
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof NewPersonnelRequest
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof NewPersonnelRequest
     */
    role?: NewPersonnelRequestRoleEnum;
    /**
     * 
     * @type {string}
     * @memberof NewPersonnelRequest
     */
    password?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum NewPersonnelRequestRoleEnum {
    ADMIN = 'ADMIN',
    PROF = 'PROF',
    PRESIDENT = 'PRESIDENT',
    VICEPRESIDENT = 'VICE_PRESIDENT',
    TREASURER = 'TREASURER',
    SECRETARY = 'SECRETARY',
    STUDENT = 'STUDENT'
}
