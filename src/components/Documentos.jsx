import React from "react";
import documentosData from "../data/documents"; // Ajusta la ruta según tu estructura de carpetas

function Documentos() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800 flex flex-col items-center py-20">
      {/* Título "Documentos" */}
      <h1 className="text-4xl font-bold text-white mb-12">
        Documentos
      </h1>

      <p className="text-center text-white mb-10 px-4 md:px-0 text-base md:text-lg">
        Aquí encontrarás una colección de documentos importantes. Haz clic en
        los botones para ver o descargar los documentos.
      </p>

      <div className="container mx-auto px-4">
        {/* Añadir padding horizontal aquí */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {documentosData.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={doc.imageUrl}
                alt={doc.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{doc.title}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  {doc.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-between">
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 mb-2 sm:mb-0"
                  >
                    Ver Documento
                  </a>
                  <a
                    href={doc.pdfUrl}
                    download
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                  >
                    Descargar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Documentos;
