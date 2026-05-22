import { defineConfig } from '@playwright/test'
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',

    use: {
        baseURL: 'https://conduit.bondaracademy.com',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure'
    },

    reporter: [
        ['html']
    ]
})