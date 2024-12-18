// netlify-functions/submit-registration.js
const xlsx = require('xlsx');

exports.handler = async function (event, context) {
  try {
    const userData = JSON.parse(event.body);

    const workbook = xlsx.readFile('user_data.xlsx'); // Path to your Excel file
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const newRow = [
      userData.name,
      userData.mobile,
      userData.email,
      userData.age,
      userData.idNumber,
      userData.address,
      userData.password,
      userData.confirmPassword,
      userData.fingerprint,
    ];

    xlsx.utils.sheet_add_aoa(sheet, [newRow], { origin: -1 });
    xlsx.writeFile(workbook, 'user_data.xlsx');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Registration Complete!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error during registration', error }),
    };
  }
};
