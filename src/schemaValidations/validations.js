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