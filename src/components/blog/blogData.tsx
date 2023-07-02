import parse from 'html-react-parser';
import { author111, author112, blog111, blog113a,blog115a, blog114a, blog116, blog117, blog118, metaverse, crypto, quizNews } from "../../assets/blog";


type QuestionnaireDataType = {
    question: string,
    answer: string | any
}


type BlogDataType = {
    id: string,
    content: {
        type?: string,
        datum?: any,
        title?: string,
    }[],
    details: {
        blogImg: string,
        authorImg: string,
        author: string,
        date: string,
    },
}


const blogData: BlogDataType[] = [
    {
        id: "115",
        content: [
             {
                type: "header",
                datum: "Embracing the Future: Augmented Reality is Transforming Education with Wiizzkid",
            },
             {
                type: "paragraph",
                datum: "In today's rapidly evolving world, education needs to adapt to meet the needs of  digital-native learners. At Wiizzkid, we believe in harnessing cutting-edge technologies to revolutionize the learning experience. The essence and vision of the Wiizzkid project is to move the current educational world to the Wiizzkid Metaverse using augmented reality. In the near future, Wiizzkid users will be able to engage and learn in the rea world with AR, blurring the lines between physical and virtual learning experiences. As part of our commitment to innovation, Wiizzkid will partner with leading virtual headset reality companies, leveraging cutting-edge AR technology to build the Wiizzkid metaverse. This partnership will create a seamless and immersive learning environment, where students can learn, earn, and connect globally"
            },
              {
                type: "paragraph",
                datum: "In this blog post, we will take a closer look at the exciting potential of augmented reality (AR) in education while highlighting how Wiizzkid's innovative approach to AR would unlock a whole new world of possibilities for students.",
            },
            {
                type: "image",
                datum: blog115a
            },
              {
                type: "paragraph",
                datum: "Augmented Reality (AR) is increasingly recognized as a powerful tool in education due to its ability to enhance the learning experience and bring abstract concepts to life. AR provides a visual and tangible representation of abstract or complex ideas that are   otherwise challenging to understand. By overlaying digital information onto the real  world, AR enables students to visualize and manipulate objects, explore intricate structures, and observe dynamic processes. This visual element helps students grasp difficult concepts more easily, fostering deeper comprehension and critical thinking. These benefits and many more have opened a great channel to make the world’s educational system better. Let’s explore the possibilities Wiizzkid would be creating by utilizing the numerous potential of augmented reality (AR) in today’s world. ",
            },
            {
                type: "headerAndContent",
                datum: [
                    {
                        header: "Transforming Learning Environments:",
                        content: "Wiizzkid's augmented reality is targeted at offering an immersive and interactive learning experience, going beyond traditional   classroom settings. Through Wiizzkid's AR technology, students can visualize complex  concepts in a three-dimensional space, allowing textbooks to come to life. Historical events can be reenacted, and scientific experiments can be simulated, making learning more engaging, interactive, and memorable. Wiizzkid's AR technology would enable  students to explore subjects in a hands-on manner, making the learning experience truly  transformative."
                    },
                    {
                        header: "Enhancing Student Engagement:",
                        content: "Wiizzkid's AR bridges the gap between the physical and digital worlds, providing students with captivating and interactive experiences. By incorporating gamification elements and interactive simulations, Wiizzkid's AR technology makes learning fun and exciting. Students can actively participate in their education, fostering a deeper understanding of subjects and promoting curiosity, creativity, and critical thinking skills. Wiizzkid's commitment to enhancing student  engagement through AR ensures that learning becomes an immersive and enjoyable experience"
                    },
                    {
                        header: "",
                        content:  parse("<span className='relative'><img src='https://res.cloudinary.com/dhegyaino/image/upload/v1685438715/edu-removebg-preview_kqjlfy.png' alt='Wiizzkid CEO' className='object-cover object-top rounded-full shadow-lg h-52 w-full my-8 border-[5px] border-[#252641] max-w-[300px]'/></span>"),
                    },
                    {
                        header: "Empowering Personalized Learning:",
                        content: "Wiizzkid's AR technology empowers personalized learning experiences tailored to each student's unique needs and learning style. Through  Wiizzkid's AR applications, students can access customized content, receive real-tim  feedback, and progress at their own pace. This individualized approach to learning   promotes self-directed learning, empowering students to take control of their educational  journey. Wiizzkid's AR technology adapts to the diverse learning needs of students,   ensuring that each learner receives the support and resources necessary for their academic growth."
                    },
                ]
            },
            {
                type: "paragraph",
                datum: "Wiizzkid AR is placed into the real world in one of the following ways - on a flat surface  (AR technology will locate and detect a flat surface and then place the AR elements on  top), floating in space, on a reference point, or based on a geolocation. As we embrace  the future of education, it is crucial to leverage the power of augmented reality to  revolutionize traditional teaching methods and meet the evolving needs of digital-native  learners. Wiizzkid recognizes the potential of AR in creating interactive and personalized   learning experiences that engage and inspire students. By integrating augmented reality  into classrooms, Wiizzkid is unlocking a whole new world of possibilities, making   learning more interactive, engaging, and tailored to individual needs. As educators and  individuals, it is our responsibility to embrace this technology and harness its potential to   create a brighter and more inclusive future for education. Together, let us embrace  augmented reality and shape the future of learning with Wiizzkid ",
            },
           
              {
                type: "tagsShare",
                datum: ["AR/VR", "Learning", "Education"],
                title: " How Wiizzkid is Using Blockchain to Transform the Learning Landscape",
            }
        ],
         details: {
            blogImg: blog116,
            authorImg: author112,
            author: "Damilola Oderinde",
            date: "28 June 2023",
        },
    },
    {
        id: "114",
        content: [
             {
                type: "header",
                datum: "The Metaverse: Redefining Education for the Digital Age with Wiizzkid",
            },
             {
                type: "paragraph",
                datum: "In an ever-evolving digital landscape, the concept of the metaverse has ignited the imagination of tech enthusiasts and innovators worldwide. At Wiizzkid, we recognize the immense potential the metaverse holds in reshaping education, and we are committed to leveraging augmented reality (AR) technology and partnering with leading companies in the field to create the groundbreaking Wiizzkid Metaverse. Our vision is to transcend traditional teaching methodologies and structures by introducing a revolutionary platform that combines augmented reality (AR) technology with cutting-edge advancements to unlock a new era of immersive and interactive learning experiences."
            },
              {
                type: "paragraph",
                datum: "Wiizzkid Metaverse will incorporate state-of-the-art AR technology while maintaining a structured educational approach. This unique approach will break free from the constraints of a 2-dimensional classroom and provide users with an interactive and immersive educational environment",
            },
              {
                type: "paragraph",
                datum: "In this blog post, we will delve into the limitless possibilities offered by the metaverse and how Wiizzkid aims to transcend the boundaries of traditional learning with the Metaverse",
            },
            {
                type: "image",
                datum: blog114a
            },
              {
                type: "paragraph",
                datum: "The Metaverse offers a vast array of learning opportunities that transcend the limitation of physical classrooms. It provides a platform where learners can explore diverse subjects, engage in interactive experiences, and access a wealth of knowledge from around the world. By breaking free from traditional boundaries, the Metaverse opens up a realm of limitless learning possibilities. One of the key strengths of the Metaverse is its ability to create immersive and interactive experiences. Through virtual environments, augmented reality, and virtual reality technologies, learners can engage with educational content in a more dynamic and hands-on manner. This immersive nature enhances comprehension, retention, and overall engagement with the subject matter. How is Wiizzkid playing a role in all of these?",
            },
            {
                type: "paragraph",
                datum: "Wiizzkid Metaverse is targeted at offering endless possibilities for learners of all ages. Its engaging learning environments would enable students to embark on virtual adventures, manipulate digital objects, and collaborate with peers from around the world. By fully engaging with these interactive environments, students develop crucial skills such a creativity, critical thinking, and problem-solving—skills that are essential in the rapidly evolving digital landscape. ",
            },
            {
                type: "paragraph",
                datum: "Moreover, Wiizzkid Metaverse would foster global collaboration and cultural exchange. Through virtual classrooms and interactive experiences, students can connect and collaborate with peers from diverse backgrounds and cultures. This not only enriches their educational journey but also prepares them for the interconnected world they will navigate in their future careers. By promoting cultural understanding and empathy, Wiizzkid Metaverse empowers students to become global citizens.",
            },
            {
                type: "paragraph",
                datum:  parse("<span className='relative'><img src='https://res.cloudinary.com/dhegyaino/image/upload/v1688062493/1_yv1kfi.jpg' alt='Wiizzkid CEO' className='object-cover object-top rounded-full shadow-lg h-52 w-full my-8 border-[5px] border-[#252641] max-w-[300px]'/></span>"),
            },
            {
                type: "paragraph",
                datum: "Wiizzkid Metaverse also places a strong emphasis on personalized learning experiences. Leveraging adaptive algorithms and artificial intelligence, the platform tailors educational content and activities to each individual's needs and learning style. By analyzing student data in real-time, Wiizzkid Metaverse provides customized learning paths, ensuring that every student receives the necessary support and resources to excel academically",
            },

              {
                type: "tagsShare",
                datum: ["Education", "Learning", "Blockchain"],
                title: " How Wiizzkid is Using Blockchain to Transform the Learning Landscape",
            }
        ],
         details: {
            blogImg: blog117,
            authorImg: author112,
            author: "Damilola Oderinde",
            date: "28 June 2023",
        },
    },
    {
        id: "113",
        content: [
             {
                type: "header",
                datum: " How Wiizzkid is Using Blockchain to Transform the Learning Landscape",
            },
             {
                type: "paragraph",
                datum: "In the digital age, innovation is transforming every aspect of our lives, including education. One technology that has gained significant attention and is reshaping the educational landscape is blockchain. In this blog post, we will explore how Wiizzkid, a pioneering educational platform, is utilizing blockchain to create a digital learning environment that revolutionizes the way we learn, collaborate, and have access to learning resources.",
            },
            {
                type: "image",
                datum: blog113a
            },
            {
                type: "paragraph",
                datum: "Wiizzkid is about to revolutionize the face of education across the globe using blockchain technology. We believe that the Metaverse/blockchain technology are game changers for the educational world when combined with augmented reality. Imagine a world educational institution where everything is on the blockchain, and everyone has access to data from different countries at their fingertips. Google a picture from 100 years ago of a classroom and it is the same classroom picture for a modern classroom. Not so much has changed in our current educational system. We see teachers doing their best each day to educate students in a system where each one of them is seen as a form of data and not humans with the system cementing their future with wars, poor governmental structures, capitalism or the likes of private/public machineries."
            },
            {
                type: "paragraph",
                datum: "What are some of the ways Wiizzkid is utilizing blockchain technology for a better education system?",
            },
            {
                type: "headerAndContent",
                datum: [
                    {
                        header: "Enhancing Security and Database Storage:",
                        content: "One of the primary benefits of blockchain technology is its ability to provide secure and immutable records. Wiizzkid recognizes the importance of ensuring educational resources and materials are easily accessible. By leveraging blockchain, Wiizzkid has created a decentralized system that would securely store records and materials. This eliminates the risk of data loss and misrepresentation, providing students, and educational institutions with a reliable and tamper-proof database."
                    },
                    {
                        header: "Facilitating Secure Peer-to-Peer Transactions:",
                        content: "Blockchain technology enables secure and efficient peer-to-peer transactions, and Wiizzkid has harnessed this capability to create a seamless payment system within its digital learning environment. Through smart contracts and cryptocurrency integration, Wiizzkid ensures fast and secure transactions on the platform. This eliminates the need for intermediaries, reduces transaction costs, and creates a frictionless financial ecosystem within the platform"
                    },
                    {
                        header: "",
                        content:  parse("<span className='relative'><img src='https://res.cloudinary.com/dhegyaino/image/upload/v1685630535/transfer_yaqkxg.png' alt='Wiizzkid CEO' className='object-cover object-top rounded-full shadow-lg h-52 w-full my-8 border-[5px] border-[#252641] max-w-[300px]'/></span>"),
                    },
                    {
                        header: "Promoting Collaboration and Decentralization:",
                        content: "Wiizzkid's blockchain-powered platform promotes collaboration and decentralization in the learning process. By utilizing blockchain's distributed ledger technology, Wiizzkid enables students and instructors from around the world to connect, share knowledge, and collaborate on projects. This decentralized approach fosters a global learning community, where individuals can learn from diverse perspectives, enhance their critical thinking skills, and build meaningful connections."
                    },
                    {
                        header: "Encouraging Lifelong Learning and Skill Development:",
                        content: "Wiizzkid recognizes the importance of lifelong learning and the need to continuously update skills in today's rapidly evolving world. Through blockchain, Wiizzkid facilitate the creation of lifelong learning records that empower individuals to showcase their continuous skills development and achievements. This promotes a culture of lifelong learning, where learners can easily access their learning records, demonstrate their dedication to personal growth, and unlock new career opportunities"
                    }
                ]
            },
            {
                type: "paragraph",
                datum: "Wiizzkid's innovative utilization of blockchain technology has revolutionized the educational landscape, creating a digital learning environment that is secure, transparent, and collaborative. By leveraging blockchain's capabilities, Wiizzkid ensures the integrity and authenticity of educational credentials, streamlines verification processes, enables secure peer-to-peer transactions, and promotes global collaboration and lifelong learning. As we embrace the potential of blockchain in education, Wiizzkid stands at the forefront, paving the way for a future where education is accessible, verifiable, and tailored to individual needs",
            },
             {
                type: "tagsShare",
                datum: ["Education", "Learning", "Blockchain"],
                title: " How Wiizzkid is Using Blockchain to Transform the Learning Landscape",
            }
        ],
        details: {
            blogImg: quizNews,
            authorImg: author112,
            author: "Damilola Oderinde",
            date: "26 June 2023",
        },
    },
    /*{
        id: "111",
        content: [
             {
                type: "header",
                datum: "I spent 10 hours in the metaverse without feeling hungry",
            },
             {
                type: "paragraph",
                datum: "I spent 10 hours inside a virtual reality website and didn't feel hungry. 10 hours! That is a long time to spend inside a virtual reality, yet it did not affect my hunger levels one bit. Researchers from the University of Michigan, who led a similar study recently said this is because my brain was too focused on what was going on in front of me to notice my body's needs. This can also happen with real life situations, as a response to any type of stressor. The only difference is that when you're outside of virtual reality, you can eat something and it will alleviate the discomfort.",
            },
             {
                type: "paragraph",
                datum: "In October, I spent 10 hours exploring wiizkidd culture and came to a few conclusions. The first was that it is possible to go without feeling hungry, even when you're sitting or standing up. The second was that, without fail, after I unplugged my headset and walked into my kitchen, I would always find myself making a sandwich.",
            },
             {
                type: "quote",
                datum: ["A lot of people think that the metaverse is about a place, but one definition of this is it's about a time when basically immersive digital worlds become the primary way that we live our lives and spend our time.", "Mark Zuckerberg"]
            },
             {
                type: "subHeader",
                datum: "How can this be?",
            },
             {
                type: "paragraph",
                datum: "The truth is that as long as you stay engaged with this platform, you can maintain an appetite suppression response. This is because the metaverse keep your attention completely fixed on their universe - and thereby stimulate your brain in a way that makes it forget to eat.",
            },
             {
                type: "paragraph",
                datum: "The metaverse, a term popularized by Neal Stephenson, is a type of virtual reality where one can inhabit and interact with a computer-generated environment. But why spend so much time there?"
            },
             {
                type: "paragraph",
                datum: "It is a well known fact that many people spend a lot of time online, and yet, there is still a great deal of misunderstanding as to why they do. A new study by experts at Michigan State University has found some pretty compelling reasons to spend more time online. And they can really be broken down into two camps: leisure and productivity."
            },
             {
                type: "paragraph",
                datum: "The metaverse (e.g., social media, video games) offers an environment that is distinct from the physical world and provides escape from or relief from the challenges of daily life, said Sarah Prochaska, one of the lead researchers on the study."
            },
             {
                type: "paragraph",
                datum: "Prochaska also found that spending time in a virtual world can improve self-esteem, social skills and self-efficacy, so it is not just an escape but also a powerful place to explore and build up these key personal attributes."
            },
             {
                type: "subHeader",
                datum: "But here's the exciting part😄"
            },
             {
                type: "paragraph",
                datum: "I've heard many warnings about losing time and forgetting to eat, but this time I thought I would try it anyway. Turns out, it wasn't so bad. I spent 10 hours in virtual reality without feeling hungry. I found that if I started my morning with a filling breakfast like a large bowl of oatmeal, then ate a handful of snacks as needed throughout the day, I felt fine. And if I stayed within my calorie limits, I didn't feel any different than if I were living in reality. I might even do this again!"
            },
             {
                type: "link",
                datum: ["If you're interested in joining me to break another record register on", "https://wiizzkid-edu.onrender.com/", "Wiizzkid", "let's EXPLORE!"]
            },
             {
                type: "tagsShare",
                datum: ["Metaverse", "Virtual", "Avatars"],
                title: "I spent 10 hours in the metaverse without feeling hungry",
            }
        ],
        details: {
            blogImg: blog111,
            authorImg: author111,
            author: "Christiana Ottobong",
            date: "3 Dec 2022",
        },
    },*/
    {
        id: "112",
        content: [
             {
                type: "header",
                datum: "Earn Tokens like Hackers",
            },
             {
                type: "paragraph",
                datum: "It turns out there is one thing that hackers and crypto fanatics have in common: they want to own tokens.",
            },
             {
                type: "quote",
                datum: ["I am very excited about the prospect of using cryptocurrency, not just as a money equivalent, but using it as a way to earn something as a result of doing some type of work.", "William Mougayar"]
            },
             {
                type: "subHeader",
                datum: "The rise of Tokens"
            },
             {
                type: "paragraph",
                datum: "The tokenization of assets has been an emerging trend over the past decade. Assets can be anything from stocks, bonds, and currencies to art and music rights. With tokenization, assets can be turned into unique digital tokens that can be easily traded and exchanged.",
            },
             {
                type: "paragraph",
                datum: "A crypto-token is a digital representation of a real-world asset that you can trade, own, and even put up as collateral. They are blockchain assets that exist outside of the blockchain, according to Peter Van Valkenburgh, Director of Research at Coin Center.",
            },
             {
                type: "paragraph",
                datum: "This means that instead of just logging into a game and trading on a blockchain, you could also log into a metaverse and trade with someone else there.",
            },
             {
                type: "paragraph",
                datum: "In Wiizzkid Culture, you can buy stone tokens and then sell it for profit or just keep it for personal use.",
            },
             {
                type: "paragraph",
                datum: "In Spells of Genesis, players can craft cards, level up their characters and form alliances.",
            },
             {
                type: "subHeader",
                datum: "Are you still wondering what a cryptocurrency token is?"
            },
             {
                type: "paragraph",
                datum: "Think of it like a gift card, but for digital products. They can be purchased, then used to purchase other digital items. The two major types of tokens are cryptocurrency and utility tokens. Utility tokens provide a way to purchase services or goods from a company, while cryptocurrency tokens serve as currency that can be traded between users.If you have an idea or a project you want to bring to life and need funding, cryptocurrency might be your ticket. The three main types of crypto tokens are Utility tokens, Security tokens, and Equity tokens. Let's break them down:",
            },
             {
                type: "list",
                datum: ["Utility tokens give users free access to a product or service e.g. Ethereum and Brave Browser", "Security tokens provide investors with equity shares in a company e.g. DAI token", "Equity tokens represent ownership of an asset such as stocks e.g. Chainlink So what type of crypto token is best? It really depends on what you're trying to accomplish!"],
            },
             {
                type: "paragraph",
                datum: "The next time you hear about a token offering, please keep these points in mind:",
            },
             {
                type: "questionnaire",
                datum: [
                    {
                        question: "Is there an actual use case for this token?",
                        answer: "Here at LivingStone Blockchain Consultancy, We have an actual use case because our users can use the token during the wizkid quiz",
                    },
                    {
                        question: "Is there a need or demand that is not being met by other projects?",
                        answer: "Contrary to other projects we are focusing on building a decentralized system for EDUCATION",
                    },
                    {
                        question: "Does this project bring anything new to the table that hasn't been done before?",
                        answer: "Similar projects only exist in Web 2, and they have limited features or they are controlled by certain people, take for instance 'Who wants to be a millionaire'",
                    },
                    {
                        question: "What is the roadmap and roadmap timeline like?",
                        answer: parse('For more details about our roadmap visit our <a href="https://wiizzkid-edu.onrender.com/roadmap" target="_blank" className="text-[#37b9b2]">website</a></>')
                    },
                    {
                        question: "Who is running this project? What are their qualifications?",
                        answer: parse("This Project is spearheaded by Mr Richard Famojuro. He has been in the educational industry for over a decade and holds a math degree from one of UK's leading institution <span className='relative'><img src='https://res.cloudinary.com/dhegyaino/image/upload/v1670263347/boss_ndvudj.png' alt='Wiizzkid CEO' className='object-cover object-top rounded-full shadow-lg h-52 w-full mt-8 mb-2 border-[5px] border-[#252641] max-w-[300px]'/><span className='relative sm:bottom-[40px] bottom-0 sm:left-72 left-0'>Founder Livingstone.</span></span>"),
                    },
                    {
                        question: "Is this project centralized or decentralized?",
                        answer: "This is a decentralized project",
                    },
                ],
                },
             {
                type: "tagsShare",
                datum: ["Token", "Play", "Earn"],
                title: "Earn Tokens like Hackers",
            }
        ],
        details: {
            blogImg: crypto,
            authorImg: author111,
            author: "Christiana Ottobong",
            date: "11 Nov 2022",
        },
    },
];

export default blogData;