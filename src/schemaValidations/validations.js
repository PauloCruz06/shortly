import Joi from "joi";

export async function signupValidation(body) {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.ref('password')
    });

    const value = schema.validate({
        name: body.name,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword
    });

    return value;
}

export async function signinValidation(body) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const value = schema.validate({
        email: body.email,
        password: body.password
    });

    return value;
}

export async function urlValidation(body) {
    const schema = Joi.object({
        url: Joi.string().uri().required()
    });

    const value = schema.validate({
        url: body.url
    });

    return value;
}