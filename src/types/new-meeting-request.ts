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
 * @interface NewMeetingRequest
 */
export interface NewMeetingRequest {
    /**
     * 
     * @type {string}
     * @memberof NewMeetingRequest
     */
    title?: string;
    /**
     * 
     * @type {Date}
     * @memberof NewMeetingRequest
     */
    date?: Date;
    /**
     * 
     * @type {string}
     * @memberof NewMeetingRequest
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof NewMeetingRequest
     */
    lengthInMinutes?: number;
    /**
     * 
     * @type {number}
     * @memberof NewMeetingRequest
     */
    organiserId?: number;
    /**
     * 
     * @type {string}
     * @memberof NewMeetingRequest
     */
    location?: string;
    /**
     * 
     * @type {Array<number>}
     * @memberof NewMeetingRequest
     */
    participantsIds?: Array<number>;
}