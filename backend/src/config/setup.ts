/* eslint-disable import/prefer-default-export */

// SELECT replace(upper(lookup_type_desc), ' ', '_') || ': ' || lookup_type_id || ', ' FROM lookup WHERE lookup_type = 'USER_TYPE'
const USER_TYPE = {
  CUSTOMER_USER: 1,
  SHOP_USER: 2,
  BARBER_USER: 3,
};

export { USER_TYPE };
