import React, { useContext } from "react";
import {
  WiizzkidContext,
  WiizzkidContextType,
} from "../../../context/wiizzkid.context.tsx";
import { QuizContext, QuizContextType } from "../../../context/quiz.context";
import { UserContext, UserContextType } from "../../../context/user.context";
import { TokenContext, TokenContextType } from "../../../context/token.context";
import {
  CTA,
  TimestableDb,
  QuizDb,
} from "../../../components/dashboard/components/index";
import Button from "../../../components/Button";

const DashboardHome = () => {
  const { dashBoardMode, setDashBoardMode } = useContext(
    WiizzkidContext
  ) as WiizzkidContextType;
  const { loading, withdrawWinnings } = useContext(
    TokenContext
  ) as TokenContextType;
  const { user } = useContext(QuizContext) as QuizContextType;
  const { userDetail } = useContext(UserContext) as UserContextType;

  //data-aos="fade-up" data-aos-delay="200"
  return (
    <div className="flex flex-col items-start justify-start">
      <CTA
        message="Welcome back to your Wiizzkid space"
        name={user!.full_name.split(" ")[0]}
      />
      <div
        className={`flex items-center justify-between my-3 w-full ${
          window.innerWidth < 380 && "flex-col gap-5"
        }`}
      >
        <Button
          type="button"
          onClick={() => withdrawWinnings(userDetail?.stone_token_winnings!)}
          className={`relative rounded-xl flex-initial flex justify-center items-center text-white sm:mx-0 text-sm font-semibold px-5 py-3 bg-teal  ${
            loading
              ? "bg-[#37385e] cursor-not-allowed pointer-events-none"
              : "bg-navy cursor-pointer pointer-events-auto"
          } ${userDetail?.stone_token_winnings! === 0 && "invisible"}  ${
            window.innerWidth < 380 && "w-full"
          }`}
        >
          <span className="flex h-3 w-3 absolute -top-[3px] -right-[3px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal"></span>
          </span>
          {loading && (
            <svg
              role="status"
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          <span
            className={`relative flex items-center justify-center md:text-base text-sm font-semibold ${
              loading ? " text-gray-200" : " text-white"
            }`}
          >
            {loading ? "Processing" : `Withdraw Winning`}
          </span>
        </Button>

        <Button
          children={dashBoardMode ? "Quiz Data" : "Timestable Data"}
          type="button"
          onClick={() => {
            setDashBoardMode(!dashBoardMode);
          }}
          className={`rounded-xl flex-initial  text-white sm:mx-0 text-sm font-semibold px-5 py-3  bg-navy  ${
            window.innerWidth < 380 && "w-full"
          }`}
        />
      </div>
      {dashBoardMode ? <TimestableDb /> : <QuizDb />}
    </div>
  );
};

export default DashboardHome;
