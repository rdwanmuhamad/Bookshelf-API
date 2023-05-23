const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const finished = () => {
    if (pageCount === readPage) {
      return true;
    } else {
      return false;
    }
  };

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
    updatedAt,
  };

  notes.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });

    response.code(201);

    return response;
  } else {
    const isFalse = notes.filter((book) => book.name === "undefined");
    if (isFalse.length > 0) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      });
      response.code(400);
      return response;
    } else {
      const isFalse = notes.filter((book) => book.readPage > book.pageCount);
      if (isFalse.length > 0) {
        const response = h.response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
      } else {
        const response = h.response({
          status: "error",
          message: "Catatan gagal ditambahkan",
        });
        response.code(400);
        return response;
      }
    }
  }
};

const getAllBooksHandler = () => ({
  status: "success",
  data: {
    books,
  },
});

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan!",
  });
  response.code(404);
  return response;
};

// const editNoteByIdHandler = (request, h) => {
//   const { id } = request.params;

//   const { title, tags, body } = request.payload;
//   const updatedAt = new Date().toISOString();

//   const index = notes.findIndex((note) => note.id === id);

//   if (index !== -1) {
//     notes[index] = {
//       ...notes[index],
//       title,
//       tags,
//       body,
//       updatedAt,
//     };
//     const response = h.response({
//       status: "success",
//       message: "Catatan berhasil diperbarui",
//     });
//     response.code(200);
//     return response;
//   }

//   const response = h.response({
//     status: "fail",
//     message: "Gagal memperbarui catatan. Id tidak ditemukan!",
//   });
//   response.code(404);
//   return response;
// };

// const deleteNoteByIdHandler = (request, h) => {
//   const { id } = request.params;

//   const index = notes.findIndex((note) => note.id === id);

//   if (index !== -1) {
//     notes.splice(index, 1);
//     const response = h.response({
//       status: "success",
//       message: "Catatan berhasil dihapus",
//     });
//     response.code(200);
//     return response;
//   }

//   const response = h.response({
//     status: "fail",
//     message: "Catatan gagal dihapus. Id tidak ditemukan!",
//   });
//   response.code(404);
//   return response;
// };
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  //   editNoteByIdHandler,
  //   deleteNoteByIdHandler,
};
