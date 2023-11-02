interface IProps {
  readonly error: string;
}

export default function ErrorMessage({ error }: IProps) {
  return <p className="py-5 font-bold text-center text-red-600">{error}</p>;
}
