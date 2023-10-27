
// requires the service with categories database code
const categoriesService = require("./categories.service");

/* Chaining then() to categoriesService.list() executes the Knex query.
   Chaining catch(next) onto the promise will call next(), passing in the error.
*/
function list(req, res, next) {
  categoriesService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
};
