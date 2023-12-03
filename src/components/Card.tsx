import { IUserModel } from '../interfaces';

interface IProps {
  data: IUserModel;
}

export default function Card({ data }: IProps) {
  const { name, age, email, gender, photo, password, accept, country } = data;
  return (
    <div className="w-[350px] flex flex-col border rounded-3xl border-green-500 items-center px-4 py-2 mb-2 hover:scale-110 hover:border-4">
      <h2>{name}</h2>
      <img src={photo} alt={name} />
      <p>Was born {age} year(s) ago</p>
      <p>Origine: {country} </p>
      <p>Genuis: {accept ? 'Confirmed' : 'Not confirmed'}</p>
      <p>Gender: {gender}</p>
      <p>
        Contact: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>Password: {password}</p>
    </div>
  );
}
``;
