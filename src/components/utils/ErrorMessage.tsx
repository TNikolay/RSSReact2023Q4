interface IProps {
  readonly error?: string;
}

export default function ErrorMessage({ error }: IProps) {
  return (
    <div className="h-[1rem]">
      <p className="text-red-600">{error && error}</p>
    </div>
  );
}
