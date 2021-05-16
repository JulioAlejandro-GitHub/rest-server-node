
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//async function verify() {
const googleVerify = async(idToken = '') => {
  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const {email, name, picture} = payload;
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  return {
      correo:email, 
      nombre:name, 
      img:picture
    };
}
//googleVerify().catch(console.error);


module.exports = {
    googleVerify
}