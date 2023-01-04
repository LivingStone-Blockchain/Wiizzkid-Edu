import { useState, FC } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Preloader from "../../../Preloader";



type PaypalSDKProps = {
    amount: string,
    isLoading: boolean,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

const PaypalSDK: FC<PaypalSDKProps> = ({amount, setSuccess, isLoading}) => {
    const [orderID, setOrderID] = useState<string>('');
    const navigate = useNavigate();



    
    // creates a paypal order
    const createOrder = (data: any, actions: any) => {
        return actions.order
          .create({
            purchase_units: [
              {
                description: "Wiizzkid",
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
            // not needed if a shipping address is actually needed
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          })
          .then((orderID: string) => {
            // update the state with the order ID
            setOrderID(orderID);
            return orderID;
          });
      };
    


      // check Approval
      const onApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          const name = details.payer.name.given_name;
          toast.success(`Transaction with order ID ${orderID} completed by ${name}`, {duration: 5000});
          setSuccess(true)
        });
      };

    

  return (
    <>
    { isLoading ? (
                    <Preloader dashboardLoader={true} />
                ) : (
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div>
                            <p className="mb-2 text-sm font-normal text-gray-600">Stone equivalent: {Number(amount)/0.001}<span className="text-xs">STN</span></p>
                        </div>
                        <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENTID }}>
                            <PayPalButtons  
                            style={{ layout: "vertical", shape: "pill" }}
                            createOrder={createOrder}
                            onApprove={onApprove}          
                            />
                        </PayPalScriptProvider>
                    </div>
                )}
    </>
  )
}

export default PaypalSDK