/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
import type { UserVO } from './UserVO';
export type QuestionVO = {
    acceptednum?: number;
    answer?: string;
    content?: string;
    favournum?: number;
    id?: number;
    judgeCase?: Array<JudgeCase>;
    judgeconfig?: JudgeConfig;
    submitnum?: number;
    tags?: Array<string>;
    thumbnum?: number;
    title?: string;
    userVO?: UserVO;
    userid?: number;
};

