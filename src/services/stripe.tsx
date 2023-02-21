import axios from "axios";



type credentialsType = {
    amount: number,
}




//const baseUrl = import.meta.env.VITE_HOST_BASE_URL;
const baseUrl = 'https://drf-stripe.onrender.com/'

const stripe = async (credentials: credentialsType) => {
    const response = await axios.post(`${baseUrl}/create-payment-intent/`, credentials);
    return response.data;
}

const stripeService = { stripe };
export default stripeService;