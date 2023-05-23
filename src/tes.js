const nanoid = require("nanoid");

const books = require("./books");

const addNoteHandler = (request, h) => {
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

  const finished = () => {
    if (pageCount === readPage) {
      return true;
    } else {
      return false;
    }
  };

  const insertAt = new Date().toDateString();

  const updatedAt = createdAt;

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    insertAt,
    updatedAt,
  };

  books.push(newBook);

  const benar = notes.filter((book) => book.id === id).length > 0;

  if (benar) {
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
    const salah = notes.filter((book) => book.name === "undefined");

    if (salah.length > 0) {
      const response = h.response({
        status: "fail",

        message: "Gagal menambahkan buku. Mohon isi nama buku",
      });

      response.code(400);

      return response;
    } else {
      const salah = notes.filter((book) => book.readPage > book.pageCount);

      if (salah.length > 0) {
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

module.exports = { addNoteHandler };
