import React from 'react';
import Button from './../../Button';
import { puzzle, excel } from '../../../assets/dashboard';
import { useNavigate } from 'react-router-dom';
import  {CardBody, Card}  from '../components/Cards';



type QuizDataType = {
    img: string,
    title: string,
    text: string,
    buttonText: string,
    destination: string
}

const quizData: QuizDataType[] = [
    {
        img: puzzle,
        title: "Quiz",
        text: "Learn in a fun and exciting way",
        buttonText: "Start Quiz",
        destination: "/quiz-home"
    },
    {
        img: excel,
        title: "Timestable",
        text: "Build your Maths Skill with Timestable",
        buttonText: "Play Timestable",
        destination: "/timestable-home"
    }
]


const Quizzes = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-8 items-start justify-start">
            <p className='font-medium text-navy'>Quizzes</p>
            <div  data-aos="fade-up" data-aos-delay="200" className="grid gap-6 w-full mb-8 md:grid-cols-2">
                {quizData.map(({ img, title, text, buttonText, destination }) => (
                    <Card key={title}>
                        <CardBody className="flex flex-col gap-4 py-5 items-center border border-gray-300 rounded-xl relative">
                            <img className={`w-full h-auto max-w-[100px]`} src={img} alt={title} />

                            <div className='flex  flex-col justify-center items-center gap-2 w-full'>
                                <p className="text-lg font-medium text-navy">{title}</p>
                                <p className="mb-2 text-sm font-normal text-gray-600">{text}</p>
                                <Button
                                    onClick={() => navigate(`${destination}`)}
                                    children={buttonText}
                                    className='text-sm w-48 bg-navy mt-5 mx-auto font-semibold px-5 py-3  text-white transition text-center'
                                />
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Quizzes