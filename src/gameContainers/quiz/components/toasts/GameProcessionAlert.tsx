import Button from "../button/Button";
import toast from "react-hot-toast";
import { FaExclamationCircle } from "react-icons/fa";


const gameProcessionAlert = () => {

    toast(
        () => (
          <article className="text-sm">
            <p className="mb-4">
              <FaExclamationCircle className="text-3xl text-tealLight" />
            </p>
  
            <p className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed">Begin the game with current players?</p>
  
            <div className="flex items-center mt-6 gap-2">
              <Button 
                children="No"
                onClick={() => {
                  toast.dismiss();
                }}
                className="flex justify-center items-center gap-2 md:text-base text-sm bg-navy font-semibold px-8 py-3 text-white transition text-center"
              />

              <Button 
                children="Yes"
                onClick={() => {
                    toast.dismiss();
                  }}
                className="flex justify-center items-center gap-2 md:text-base text-sm text-navy border-2 border-navy font-semibold px-8 py-3  bg-white transition text-center"
              />
             
            </div>
          </article>
        ),
        { duration: Infinity }
      )
        }

export default gameProcessionAlert;
