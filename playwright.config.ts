import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

const env = process.env.ENV || 'dev';

dotenv.config({
    path: `.env.${env}`
});

export default defineConfig({
    testDir: './tests',

    use: {
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure'
    },

    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
            use: {
                baseURL: process.env.UI_URL
            }
        },
        {
            name: 'ui',
            testMatch: /.*\.ui\.spec\.ts/,
            use: {
                baseURL: process.env.UI_URL,
                storageState: '.auth/user.json'
            },
            dependencies: ['setup']
        },
        {
            name: 'api',
            testMatch: /.*\.api\.spec\.ts/,
            use: {
                baseURL: process.env.API_URL
            }
        }
    ],

    reporter: [
        ['html'],
        ['allure-playwright']
    ]
});