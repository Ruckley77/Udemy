/**
 * Student Name
 * @type {string}
 */
const studentName = 'Juan';

/**
 * Array of grades
 * @type {Array<number>}
 */
const grades = [1, 2, 3, 4, 5];

/**
 * object
 * @type {{
 *  id: number|string,
 *  text: string
 * }}
 */
const todo = {
  id: '1',
  text: 'hello',
};

/**
 * Calculate Tax
 * @param {number} amount - Total Amount
 * @param {number} tax - Tax percentage in decimal
 * @returns {string} - Total with a dollar sign
 */
const calculateTax = (amount, tax) => {
  return `$${amount + tax * amount}`;
};

/**
 * A student
 * @typedef {Object} Student
 * @property {number} id - Student ID
 * @property {string} name - Student Name
 * @property {string|number} [age] - Student age (optional, brackets)
 * @property {boolean} isActive - Current Student Status
 */

/**
 * @type {Student}
 *
 */

const student = {
  id: 1,
  name: 'Juan',
  age: 20,
  isActive: true,
};
