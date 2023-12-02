import { IUserModel } from '../interfaces';

interface IProps {
  data: IUserModel;
}

export default function Card({ data }: IProps) {
  const { name, age } = data;
  return (
    <div className="w-[350px] flex flex-col border rounded-3xl border-green-500 items-center px-4 py-2 mb-2 hover:scale-110 hover:border-4">
      <h2>{name}</h2>
      <p>Was born {age} year(s) ago</p>
      <p>Gender: {data.gender}</p>
      <p>
        Contact: <a href={`mailto:${data.email}`}>{data.email}</a>
      </p>
      <p>Password: {data.password}</p>
    </div>
  );
}
``;
