const fs = require('fs');

const handlesTSV = fs.readFileSync('./handles.tsv', 'utf-8');

const handles = Object.fromEntries(handlesTSV.split('\n').map(line => line.split('\t')));


module.exports.handler = async (event) => {
  try {
const did = handles[event.headers.host];

    if (!did) throw new Error('User not found')

  return {
    statusCode: 200,
    body: did,
    headers: {
      'Content-Type': 'text/plain'
    }
  };
  } catch (e) {
  return {
    statusCode: 404,
    body: 'Not found',
    headers: {
      'Content-Type': 'text/plain'
    }
  };
  }
  
};
