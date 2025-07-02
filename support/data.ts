import { validateHeaderName } from "http"

const env = {
    baseUserURL: "https://automationintesting.online/"
}

const cred = {
    validFirstName: "Bohdan",
    validLastName: "Kupetskiy",
    validEmail: "uhezip78@gmail.com",
    validPhone: "+380687084407",
    invalidFirstName: "Om",
    invalidLastName: "AM",
    invalidEmail: "uhezip78@.com",
    invalidPhone: "1234567"
}

export { env, cred }