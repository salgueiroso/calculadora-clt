import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    reporters: [
        "default",
        ["jest-junit", { outputDirectory: "./reports", outputName: "junit.xml" }]
    ],
    collectCoverage: true,
    coverageDirectory: "./coverage",

    coverageReporters: ["lcov"],
    maxConcurrency: 1

}

export default config;
