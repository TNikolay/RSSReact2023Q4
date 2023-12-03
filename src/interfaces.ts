import * as yup from 'yup';
import { ListOfCountries } from './const';

export const UserFormSchema = yup.object({
  name: yup
    .string()
    .required()
    .matches(/^[A-ZА-Я]/, 'name must start with uppercased letter'),
  age: yup.number().required().integer().positive(),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(/[a-z]/, 'weak password! should contains lowercase letter')
    .matches(/[A-Z]/, 'weak password! should contains UPPERCASE letter')
    .matches(/[0-9]/, 'weak password! should contains number')
    .matches(/[!@#$%^&*()_+{}:?><]/, 'weak password! should contains special character (!@#$%^&*()_+{}:?><)'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'passwords must match'),
  country: yup.string().required().oneOf(ListOfCountries, 'select country from the list'),
  gender: yup.string().required().oneOf(['Male', 'Female']),
  accept: yup.boolean().required().oneOf([true], 'please, confirm!'),
  photo: yup
    .mixed<FileList>()
    .test('file present', 'select a photo!', (value) => value && value[0] != undefined)
    .test('file size', 'file size should be < 1Mb', (value) => value && value[0] && value[0].size <= 1048576)
    .test('file exts', 'only png\\jpeg are allowed', (value) => value && value[0] && ['image/png', 'image/jpeg'].includes(value[0].type)),
});

export interface IUserModelInForm extends yup.InferType<typeof UserFormSchema> {}
export interface IUserModel extends Omit<IUserModelInForm, 'photo'> {
  photo: string;
}
