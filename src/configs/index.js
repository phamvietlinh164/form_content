import _envs from "./envs";

export const APP_NAME = "crm";
export const currentEnvName = process.env.REACT_APP_STAGE || "development";
export const envs = _envs;
export const currentEnv = _envs[currentEnvName];
export const HOSPITAL_ID = 2;
