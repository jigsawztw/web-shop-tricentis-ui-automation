import { BasePage } from './base.page'
import { Page } from '@playwright/test'

class MainPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
}