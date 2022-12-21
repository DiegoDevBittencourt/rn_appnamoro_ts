export default {
  name: 'product_stock',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    _partition: 'string',
    product_id: 'string',
    available_quantity: 'double'
  }
};
