import { MdAdd } from 'react-icons/md';

const BotonCrearResidente = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer font-semibold flex items-center">
      <MdAdd className="inline-block mr-1" />
      Agregar residente
    </button>
  )
};

export default BotonCrearResidente;