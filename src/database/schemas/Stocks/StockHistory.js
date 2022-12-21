export default {
  name: 'stock_history',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    _partition: 'string',
    product_id: 'string',
    quantity: 'double',
    created_at: 'date',
    status: 'string',
    type: 'string',
    sold: 'bool',
    offline_reservation: {
      type: 'bool',
      optional: true,
      default: false,
    },
    operator_id: {
      type: 'string',
      optional: true,
      default: null,
    },
    pos_serial: {
      type: 'string',
      optional: true,
      default: null,
    },
    sale_id: {
      type: 'string',
      optional: true,
      default: null,
    },
    updated_at: {
      type: 'date',
      optional: true,
      default: null,
    }
  }
};
