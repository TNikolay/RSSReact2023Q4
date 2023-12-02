import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IUserModel, UserFormSchema } from '../interfaces';
import { useAppDispatch } from '../store/store';
import ErrorMessage from './utils/ErrorMessage';
import { addData } from '../store/FormSlice';

export default function ReactHookForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(UserFormSchema),
  });

  const onSubmit: SubmitHandler<IUserModel> = (data) => {
    //console.log(data);
    dispatch(addData(data));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-[390px] mx-auto border p-10 flex flex-col gap-10">
      <div>
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input {...register('name')} id="name" autoComplete="username" className="form-input" defaultValue="Test RHF" />
        <ErrorMessage error={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="age" className="form-label">
          Age:
        </label>
        <input {...register('age')} id="age" type="number" className="form-input" defaultValue="12" />
        <ErrorMessage error={errors.age?.message} />
      </div>

      <div>
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input {...register('email')} id="email" autoComplete="email" className="form-input" defaultValue="1@1.com" />
        <ErrorMessage error={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input {...register('password')} id="password" className="form-input" defaultValue="12345" />
        <ErrorMessage error={errors.password?.message} />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="form-label">
          Confirm password:
        </label>
        <input {...register('confirmPassword')} id="confirmPassword" className="form-input" defaultValue="12345" />
        <ErrorMessage error={errors.confirmPassword?.message} />
      </div>

      <div>
        <label htmlFor="gender" className="form-label">
          Gender:
        </label>
        <select {...register('gender')} id="gender" className="form-input" defaultValue="Male">
          <option value="">Specify gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <ErrorMessage error={errors.gender?.message} />
      </div>

      <div>
        <label className="form-label">
          <input {...register('accept')} id="accept" type="checkbox" className="form-input-checkbox" defaultChecked={true} />
          Confirm that this person is genius:
        </label>
        <ErrorMessage error={errors.accept?.message} />
      </div>

      <button type="submit" disabled={!isValid} className="px-4 py-2 bg-green-400 border hover:enabled:text-white disabled:bg-gray-300">
        Create
      </button>
    </form>
  );
}
