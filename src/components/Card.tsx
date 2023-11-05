import { Character } from '../Interfaces';

interface IProps {
  readonly data: Character;
  readonly onClick: (id: string) => void;
}

export default function Card({ data, onClick }: IProps) {
  return (
    <div
      className="w-[220px] flex flex-col border rounded-3xl border-green-500 items-center px-4 py-2 mb-2 hover:scale-110 hover:border-4"
      onClick={() => onClick(data.id.toString())}
    >
      <h2>{data.name}</h2>
      <img src={data.image} className="my-4" alt={data.name} />
      <p>
        {data.species}, {data.gender}, {data.status}
      </p>
    </div>
  );
}
