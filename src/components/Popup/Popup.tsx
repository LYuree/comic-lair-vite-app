import React from 'react';

interface PopupProps {
//   isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, content, onClose }) => {

  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg p-5 w-1/3">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Popup;