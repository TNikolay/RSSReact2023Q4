import { useAppSelector } from '../store/store';
import Card from './Card';

export default function CardList() {
  const { data } = useAppSelector((state) => state.formReducer);
  return (
    <div className="flex flex-wrap gap-6 my-5">
      {data.map((item, index) => (
        <Card key={index} data={item} />
      ))}
    </div>
  );
}
