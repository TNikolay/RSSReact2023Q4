import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { IUserModel, UserFormSchema } from '../interfaces';
import { useAppDispatch } from '../store/store';
import ErrorMessage from './utils/ErrorMessage';
import { addData } from '../store/FormSlice';

type FormFields = {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  accept: HTMLInputElement;
};

type IFormErrors = Partial<Record<keyof IUserModel, string>>;

export default function UncontrolledForm() {
  const [errors, setErrors] = useState<IFormErrors>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSumbit: React.FormEventHandler<HTMLFormElement & FormFields> = async (event) => {
    event.preventDefault();
    const { name, age, email, password, confirmPassword, gender, accept } = event.currentTarget;

    const data: IUserModel = {
      name: name.value,
      age: +age.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      gender: gender.value,
      accept: accept.checked,
    };

    //console.log('Form : ', JSON.stringify(data));
    try {
      await UserFormSchema.validate(data, { abortEarly: false });
      dispatch(addData(data));
      navigate('/');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorsResult: IFormErrors = {};
        err.inner.forEach((item) => {
          if (item.path) errorsResult[item.path as keyof IUserModel] = item.message;
        });
        // console.log(errorsResult);
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
      <button type="submit" className="px-4 py-2 bg-green-400 border hover:text-white">
        Create
      </button>
    </form>
  );
}
