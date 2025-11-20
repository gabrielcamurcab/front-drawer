const axios = require('axios');

async function testSessionCreation() {
    try {
        const response = await axios.post('http://127.0.0.1:3000/sessions');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testSessionCreation();
