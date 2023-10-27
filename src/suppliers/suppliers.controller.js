const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const suppliersService = require("./suppliers.service.js");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");

const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

/* If the supplier exists, it is stored in res.locals.supplier 
   so that it can be readily accessed in the rest of the middleware pipeline. 
   Otherwise, next() is called with an error object.
*/

async function supplierExists(req, res, next) {

  const supplier = await suppliersService.read(req.params.supplierId);
  if (supplier) {
    res.locals.supplier = supplier;
    return next();
  }

  next({ status: 404, message: `Supplier cannot be found.` });

}


/* The req.body.data argument references the object containing the supplier information.
  Uses async/await to call suppliersService.create() executes the Knex query. If successful, 
  the server responds with a 201 status code along with the newly created supplier.
*/
async function create(req, res, next) {

  const data = await suppliersService.create(req.body.data);
  res.status(201).json({ data })
}

/* Note that the supplier_id of updatedSupplier is always set to the existing 
   supplier_id (res.locals.supplier.supplier_id) to prevent the update from accidentally 
   (or intentionally) changing the supplier_id during an update. If the promise resolves 
   successfully, then the server responds with the updated supplier.
*/

async function update(req, res, next) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };

  const data = await suppliersService.update(updatedSupplier);
  res.json({ data });
}


async function destroy(req, res, next) {

  const { supplier } = res.locals;
  await suppliersService.delete(supplier.supplier_id);
  res.sendStatus(204)

}

module.exports = {
  create: [
    hasOnlyValidProperties, 
    hasRequiredProperties, 
    asyncErrorBoundary(create)
  ],
  update: [
    asyncErrorBoundary(supplierExists), 
    hasOnlyValidProperties, 
    hasRequiredProperties, 
    asyncErrorBoundary(update)
  ],
  delete: [
    asyncErrorBoundary(supplierExists), 
    asyncErrorBoundary(destroy)
  ],
};
