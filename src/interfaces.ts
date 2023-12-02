import * as yup from 'yup';

export const UserFormSchema = yup.object({
  name: yup
    .string()
    .required()
    .matches(/^[A-ZА-Я]/, 'name must start with uppercased letter'),
  age: yup.number().required().integer().positive(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'passwords must match'),
  gender: yup.string().required().oneOf(['Male', 'Female']),
  accept: yup.boolean().required().oneOf([true], 'please, confirm!'),
});

export interface IUserModel extends yup.InferType<typeof UserFormSchema> {}
