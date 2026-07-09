const crypto = require('crypto');

const generateSignature = (message) => {
  return crypto
    .createHmac('sha256', process.env.ESEWA_SECRET_KEY)
    .update(message)
    .digest('base64');
};

const generatePaymentData = ({ amount, transactionUuid, productCode }) => {
  console.log('Esewa amount received:', amount);

  if (!amount) {
    throw new Error('Order amount is missing');
  }

  const totalAmount = amount.toString();

  const signedFieldNames = 'total_amount,transaction_uuid,product_code';

  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;

  const signature = generateSignature(message);

  console.log('SIGNATURE MESSAGE:', message);
  console.log('SIGNATURE:', signature);

  return {
    amount: totalAmount,
    tax_amount: '0',
    total_amount: totalAmount,
    transaction_uuid: transactionUuid,
    product_code: productCode,
    product_service_charge: '0',
    product_delivery_charge: '0',
    success_url: process.env.ESEWA_SUCCESS_URL,
    failure_url: process.env.ESEWA_FAILURE_URL,
    signed_field_names: signedFieldNames,
    signature,
  };
};

module.exports = {
  generatePaymentData,
};
