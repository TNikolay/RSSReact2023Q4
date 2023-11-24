import { Character } from '../Interfaces';
import ErrorMessage from './utils/ErrorMessage';

interface IProps {
  readonly character: Character | null;
  readonly onClose: () => void;
}

const detailClassName = 'w-full text-lg px-2 py-2 text-gray-900';

export default function DetailedCard({ character, onClose }: IProps) {
  const { name, image, gender, status, species, location, origin } = character ?? {};

  return (
    <>
      <div className="fixed top-0 left-0 z-20 w-full h-full bg-gray-50 bg-opacity-80" onClick={onClose}></div>
      <div className="w-[300px] bg-gray-100 flex flex-col items-center p-5 mt-20 z-30" data-testid="DetailedCard">
        <div className="flex w-full">
          <div className="mb-5 w-full text-lg font-medium text-center text-gray-900">Details</div>
          <svg
            onClick={onClose}
            role="button"
            aria-label="Close detailed card"
            className="ml-auto w-6 h-6 text-gray-700 cursor-pointer fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
        {!character && <ErrorMessage error={'Unknow Error:('} />}

        {character && (
          <>
            <h2>{name}</h2>
            <img src={image} className="my-4" alt={name} />
            <p className={detailClassName}>
              Gender: <span className="font-bold">{gender}</span>
            </p>
            <p className={detailClassName}>
              Status: <span className="font-bold">{status}</span>
            </p>
            <p className={detailClassName}>
              Species: <span className="font-bold">{species}</span>
            </p>
            <p className={detailClassName}>
              Location: <span className="font-bold">{location?.name}</span>
            </p>
            <p className={detailClassName}>
              Origin: <span className="font-bold">{origin?.name}</span>
            </p>
          </>
        )}
      </div>
    </>
  );
}
