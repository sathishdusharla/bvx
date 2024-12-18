// netlify-functions/start-registration.js
const { generateRegistrationOptions } = require('@simplewebauthn/server');

exports.handler = async function (event, context) {
  try {
    const user = JSON.parse(event.body); // Get user data from the request

    const options = generateRegistrationOptions({
      rpName: 'Voter Registration',
      userID: user.email, // Unique user identifier
      userName: user.name,
      attestation: 'direct',
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ options }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error generating registration options', error }),
    };
  }
};
