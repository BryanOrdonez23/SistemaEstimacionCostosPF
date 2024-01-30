// DeleteConfirmationModal.js
import React from 'react';

const DeleteConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-lg font-semibold mb-4">¿Estás seguro que quieres eliminar este elemento?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full mr-2 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmationModal;
