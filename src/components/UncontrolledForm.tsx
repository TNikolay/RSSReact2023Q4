import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { IUserModel, IUserModelInForm, UserFormSchema } from '../interfaces';
import { convertFileToBase64 } from '../lib/utils';
import { addData } from '../store/FormSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import ErrorMessage from './utils/ErrorMessage';

type FormFields = {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  country: HTMLInputElement;
  gender: HTMLInputElement;
  accept: HTMLInputElement;
  photo: HTMLInputElement;
};

type IFormErrors = Partial<Record<keyof IUserModel, string>>;

export default function UncontrolledForm() {
  const [errors, setErrors] = useState<IFormErrors>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.formReducer);

  const handleSumbit: React.FormEventHandler<HTMLFormElement & FormFields> = async (event) => {
    event.preventDefault();
    const { name, age, email, password, confirmPassword, country, gender, accept, photo } = event.currentTarget;

    const data: IUserModelInForm = {
      name: name.value,
      age: +age.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      country: country.value,
      gender: gender.value,
      accept: accept.checked,
      photo: photo.files as FileList,
    };

    try {
      await UserFormSchema.validate(data, { abortEarly: false });
      const photoBase64 = photo && photo.files ? await convertFileToBase64(photo.files[0]) : '';
      const res: IUserModel = { ...data, photo: photoBase64 };
      dispatch(addData(res));

      navigate('/');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorsResult: IFormErrors = {};
        err.inner.forEach((item) => {
          if (item.path) errorsResult[item.path as keyof IUserModel] = item.message;
        });
        setErrors(errorsResult);
      }
    }
  };

  return (
    <form onSubmit={handleSumbit} noValidate className="w-[390px] mx-auto border p-10 flex flex-col gap-10">
      <div>
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input name="name" id="name" autoComplete="username" className="form-input" defaultValue="Test" />
        <ErrorMessage error={errors.name} />
      </div>
      <div>
        <label htmlFor="age" className="form-label">
          Age:
        </label>
        <input name="age" id="age" type="number" className="form-input" defaultValue="123568" />
        <ErrorMessage error={errors.age} />
      </div>
      <div>
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input name="email" id="email" type="email" autoComplete="email" className="form-input" defaultValue="1@1.com" />
        <ErrorMessage error={errors.email} />
      </div>
      <div>
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input name="password" id="password" className="form-input" defaultValue="12345" />
        <ErrorMessage error={errors.password} />
      </div>{' '}
      {/* // TODO */}
      <div>
        <label htmlFor="confirmPassword" className="form-label">
          Confirm password:
        </label>
        <input name="confirmPassword" id="confirmPassword" className="form-input" defaultValue="12345" />
        <ErrorMessage error={errors.confirmPassword} />
      </div>
      <div>
        <label htmlFor="country" className="form-label">
          Country:
        </label>
        <input name="country" id="country" list="countries-datalist" autoComplete="country" className="form-input" defaultValue="Turkey" />
        <ErrorMessage error={errors.confirmPassword} />
        <datalist id="countries-datalist">
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="gender" className="form-label">
          Gender:
        </label>
        <select name="gender" id="gender" className="form-input" defaultValue="Male">
          <option value="">Specify gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <ErrorMessage error={errors.gender} />
      </div>
      <div>
        <label className="form-label">
          <input name="accept" id="accept" type="checkbox" className="form-input-checkbox" defaultChecked={true} />
          Confirm that this person is genius:
        </label>
        <ErrorMessage error={errors.accept} />
      </div>
      <div>
        <label htmlFor="photo" className="form-label">
          Photo:
        </label>
        <input name="photo" id="photo" type="file" />
        <ErrorMessage error={errors.photo} />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-400 border hover:text-white">
        Create
      </button>
    </form>
  );
}
