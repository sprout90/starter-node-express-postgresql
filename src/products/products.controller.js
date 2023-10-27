const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const productsService = require("./products.service");

function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {

  const data = await productsService.list();
  res.json( {data} );
}

// calls the listOutOfStockCount() query builder method in ProductsService
async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

// calls the listPriceSummary() query builder method in ProductsService
async function listPriceSummary(req, res, next){
  res.json({ data: await productsService.listPriceSummary() });
}

// calls the listTotalWeightByProduct query builder method in ProductsService
async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}

/* If the product exists, it is stored in res.locals.product 
   so that it can be readily accessed in the rest of the middleware pipeline. 
   Otherwise, next() is called with an error.
*/ 
async function productExists(req, res, next) {

  const product = await productsService.read(req.params.productId);
  if (product){
      res.locals.product = product;
      return next();
  }
  
  next({ status: 404, message: `Product cannot be found.` });
  
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightbyProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
