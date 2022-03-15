const books = require('../books');

const getAllBooks = (request, h) => {
  const { name: nameQuery, reading: readingQuery, finished: finishedQuery } = request.query;

  let filteredBook = books;

  // Filter berdasarkan nama
  if (nameQuery !== undefined) {
    filteredBook = filteredBook.filter((b) => {
      const nameLower = b.name.toLowerCase();
      const nameQueryLower = nameQuery.toLowerCase();
      return nameLower.includes(nameQueryLower);
    });
  }

  // Filter berdasarkan reading
  if (readingQuery !== undefined) {
    filteredBook = filteredBook.filter((b) => {
      const readingStatus = b.reading;
      const readingQueryStatus = Boolean(parseInt(readingQuery, 10));
      return readingStatus === readingQueryStatus;
    });
  }

  // Filter berdasarkan finished
  if (finishedQuery !== undefined) {
    filteredBook = filteredBook.filter((b) => {
      const finishedstatus = b.finished;
      const finishedQueryStatus = Boolean(parseInt(finishedQuery, 10));
      return finishedstatus === finishedQueryStatus;
    });
  }

  // Mapping buku berdasarkan id, name, publisher
  function mapping({ id, name, publisher }) {
    return { id, name, publisher };
  }
  const mappedBook = filteredBook.map(mapping);

  const response = h.response({
    status: 'success',
    data: {
      books: mappedBook,
    },
  });
  response.code(200);
  return response;
};

module.exports = getAllBooks;
