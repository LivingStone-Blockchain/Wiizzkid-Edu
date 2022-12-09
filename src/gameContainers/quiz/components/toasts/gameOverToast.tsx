import { gameOver } from "../../assets/images";
import toast from "react-hot-toast";




const gameOverToast = () => {

             toast.loading(
                () => (
                  <section className="w-full py-4">
                     <img src={gameOver} className="w-24 mx-auto" alt="win" />
          
                  <article className="text-center mt-4">
                    <p className="mt-4 text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed">
                       Submitting please wait!
                  </p>
                  </article>
                </section>
                ),
                { duration: 5000, id: "completed" }
              )
        }

export default gameOverToast;
