import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

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
                baseURL: 'https://conduit.bondaracademy.com/'
            }
        },
        {
            name: 'ui',
            testMatch: /.*\.ui\.spec\.ts/,
            use: {
                baseURL: 'https://conduit.bondaracademy.com/',
                storageState: '.auth/user.json'
            },
            dependencies: ['setup']
        },
        {
            name: 'api',
            testMatch: /.*\.api\.spec\.ts/,
            use: {
                baseURL: 'https://conduit-api.bondaracademy.com/api/'
            }
        }
    ],

    reporter: [
        ['html']
    ]
});