import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IUserModel, IUserModelInForm, UserFormSchema } from '../interfaces';
import { convertFileToBase64 } from '../lib/utils';
import { addData } from '../store/FormSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import ErrorMessage from './utils/ErrorMessage';

export default function ReactHookForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.formReducer);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(UserFormSchema),
  });

  const onSubmit: SubmitHandler<IUserModelInForm> = async (data) => {
    const photo = data?.photo && data.photo[0] ? await convertFileToBase64(data.photo[0]) : '';
    const res: IUserModel = { ...data, photo };
    dispatch(addData(res));
    navigate('/', { state: { hightlite: 'true' } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-[390px] mx-auto border p-10 flex flex-col gap-10">
      <div>
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input {...register('name')} id="name" autoComplete="username" className="form-input" />
        <ErrorMessage error={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="age" className="form-label">
          Age:
        </label>
        <input {...register('age')} id="age" type="number" className="form-input" />
        <ErrorMessage error={errors.age?.message} />
      </div>

      <div>
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input {...register('email')} id="email" autoComplete="email" className="form-input" />
        <ErrorMessage error={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input {...register('password')} id="password" className="form-input" />
        <ErrorMessage error={errors.password?.message} />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="form-label">
          Confirm password:
        </label>
        <input {...register('confirmPassword')} id="confirmPassword" className="form-input" />
        <ErrorMessage error={errors.confirmPassword?.message} />
      </div>

      <div>
        <label htmlFor="country" className="form-label">
          Country:
        </label>
        <input {...register('country')} id="country" list="countries-datalist" autoComplete="on" className="form-input" />
        <ErrorMessage error={errors.country?.message} />
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
        <select {...register('gender')} id="gender" className="form-input">
          <option value="">Specify gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <ErrorMessage error={errors.gender?.message} />
      </div>

      <div>
        <label className="form-label">
          <input {...register('accept')} id="accept" type="checkbox" className="form-input-checkbox" />
          Confirm that this person is genius:
        </label>
        <ErrorMessage error={errors.accept?.message} />
      </div>

      <div>
        <label htmlFor="photo" className="form-label">
          Photo:
        </label>
        <input {...register('photo')} id="photo" type="file" />
        <ErrorMessage error={errors.photo?.message} />
      </div>

      <button type="submit" disabled={!isValid} className="px-4 py-2 bg-green-400 border hover:enabled:text-white disabled:bg-gray-300">
        Create
      </button>
    </form>
  );
}
