import { Page } from "@playwright/test";
import type { User } from "../../types/user";
import { MainPage, RegisterPage, RegisterSuccessPage } from "../pages";


export class AppFacade {
    private mainPage: MainPage;
    private registerPage: RegisterPage;

    constructor(private page: Page) {
        this.mainPage = new MainPage(page);
        this.registerPage = new RegisterPage(page);
    }

    async openRegisterPage() {
        await this.mainPage.open();
        await this.mainPage.goToRegisterPage();
        await this.registerPage.checkRegisterFormFields();
    }

    async fillRegisterForm(user: User, confirmPassword?: string) {
        await this.registerPage.fillRegisterFields(
            user,
            confirmPassword ?? user.password
        );
    }

    async submitRegister(): Promise<RegisterSuccessPage> {
        return await this.registerPage.register();
    }

    async expectFieldError(field: string, error: RegExp) {
        await this.registerPage.expectFieldValidationError(field, error);
    }

    async registerUser(user: User, confirmPassword?: string) {
        await this.fillRegisterForm(user, confirmPassword);
        return await this.submitRegister();
    }

    async registerUserWithError(
        user: User,
        field: string,
        error: RegExp,
        confirmPassword?: string
    ) {
        await this.registerUser(user, confirmPassword);
        await this.expectFieldError(field, error);
    }
}