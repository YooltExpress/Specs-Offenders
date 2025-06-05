import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import axios from 'axios';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
});import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import axios from 'axios';

// Define the structure of the body
interface RequestBody {
  address: string;
  time_stamp: string;
}

export const lambdaHandler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
    // Parse the body into an object
    const body: RequestBody = JSON.parse(event.body || '{}');  // Make sure to handle cases where the body might be empty or malformed

    // Data to send to n8n
    const data = {
        address: body.address,  // Accessing address from parsed body
        time_stamp: body.time_stamp  // Accessing time_stamp from parsed body
    };

    // Define the URL for the webhook endpoint (n8n webhook URL)
    const url = 'https://specsoffenders.app.n8n.cloud/webhook-test/trigger-lambda';  // Change to your n8n webhook URL

    try {
        // Send the POST request to n8n webhook using axios
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Log the response from n8n
        console.log('Response from n8n:', response.data);

        // Return the response from n8n as part of the Lambda response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Webhook Triggered',
                n8nResponse: response.data  // Include the response from n8n
            })
        };
    } catch (error) {
        console.error('Error sending data to n8n:', error);

        // Return an error response if the request fails
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to trigger webhook',
                error: error.message
            })
        };
    }
};
