/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
export type QuestionUpdateRequest = {
    acceptednum?: number;
    answer?: string;
    content?: string;
    id?: number;
    judgecase?: Array<JudgeCase>;
    judgeconfig?: JudgeConfig;
    submitnum?: number;
    tags?: Array<string>;
    title?: string;
};

