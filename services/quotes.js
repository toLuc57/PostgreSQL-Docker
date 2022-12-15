const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(quote) {
  const result = await db.query(
    'INSERT INTO quote(quote, author) VALUES ($1, $2) RETURNING *',
    [quote.quote, quote.author]
  );
  let message = 'Error in creating quote';

  if (result.length) {
    message = 'Quote created successfully';
  }

  return {message};
}

async function update(id, quote) {
  const result = await db.query(
    'UPDATE quote SET quote=$1, author=$2 WHERE id=$3 RETURNING *',
    [quote.quote, quote.author, id]
  );
  let message = 'Error in updating quote';

  if (result.length) {
    message = 'Quote updated successfully';
  }

  return {message};
}

async function deletebyid(id) {
  const result = await db.query(
    'DELETE FROM quote WHERE id = $1 RETURNING *',
    [id]
  );
  let message = 'Error in deleting quote';

  if (result.length) {
    message = 'Quote deleted successfully';
  }
  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  deletebyid
}