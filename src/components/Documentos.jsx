import documentosData from "../data/documents";

function Documentos() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800 flex flex-col items-center py-20">
      {/* Título "Documentos" */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
        <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
          Documentos
        </span>
      </h1>

      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mb-10"></div>

      <p className="text-center text-gray-200 mb-12 px-4 md:px-0 text-base md:text-lg max-w-2xl">
        Aquí encontrarás una colección de documentos importantes. Haz clic en
        los botones para ver o descargar los documentos.
      </p>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {documentosData.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100">
                <img
                  src={doc.imageUrl}
                  alt={doc.title}
                  loading="lazy"
                  className="w-full h-48 object-contain p-4 transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{doc.title}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base flex-grow">
                  {doc.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Ver
                  </a>
                  <a
                    href={doc.pdfUrl}
                    download
                    className="flex-1 inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
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
