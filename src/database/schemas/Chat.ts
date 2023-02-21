export default {
  name: 'chat',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    _partition: 'string',
    message: 'string',
    userId_sender: 'string',
    userId_receiver: 'string',
    created_at: 'date'
  }
};
