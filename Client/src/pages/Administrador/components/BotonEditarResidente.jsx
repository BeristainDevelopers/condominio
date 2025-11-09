import { MdEdit } from 'react-icons/md';

const BotonEditarResidente = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition cursor-pointer font-semibold flex items-center">
      <MdEdit className="inline-block mr-1" />
      Editar
    </button>
  )
};

export default BotonEditarResidente;