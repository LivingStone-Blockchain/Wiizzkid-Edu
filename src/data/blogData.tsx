import { spawn } from 'child_process';
import parse from 'html-react-parser';
import { quizNews, boss, author111, blog111, vrNews, crypto, study } from "../assets/blog";



const blogData = [
    /*    {
            id: "111",
            title: "Trivia Virtual Quizzes with friends",
            contentOne: "Wiizkid Education is creating a fun new way to to learn and earn alongside your friends virtually online, anywhere, anytime. For instance: you should not asking for a review on your checkout page. The sole purpose of this page is to guide your customer to complete their purchase, and this means that the page should be as minimalist and pared-down possible. You don't want to have any unnecessary elements or Call To Actions.",
            contentTwo: "There's a time and place for everything… including asking for reviews. For instance: you should not asking for a review on your checkout page. The sole purpose of this page is to guide your customer to complete their purchase, and this means that the page should be as minimalist and pared-down possible. You don't want to have any unnecessary elements or Call To Actions.",
            subTitleOne: "What do you stand to gain",
            subContentOne: "At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            subContentTwo: "At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            blogImg: quizNews,
            author: "Christy Lin",
            authorImg: author01,
            date: "26 Feb 2023",
            quote:  "A spring of truth shall flow from it: like a new star it shall scatter the darkness of ignorance, and cause a light heretofore unknown to shine amongst men.",
            quoteAuthor: 'Andrio Domeco',
            tags: ["Design", "Development", "Info"],
        },
        {
            id: "112",
            title: "What is the Stone token and how do we use it?",
            contentOne: "Wiizzkid Education is a token-based educational empowerment platform set to launch it's native. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.. At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est.",
            contentTwo: "There's a time and place for everything… including asking for reviews. For instance: you should not asking for a review on your checkout page. The sole purpose of this page is to guide your customer to complete their purchase, and this means that the page should be as minimalist and pared-down possible. You don't want to have any unnecessary elements or Call To Actions.",
            subTitleOne: "What is it with your ideas?",
            subContentOne: "At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            subContentTwo: "At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            blogImg: crypto,
            author: " Richard Fam",
            authorImg: author1,
            date: "26 Dec 2021",
            quote: "The sole purpose of this page is to guide your customer to complete their purchase, and this means that the page should be as minimalist.",
            quoteAuthor: "John Kyle",
            tags: ["Token", "Crypto", "Earn"],
        },
        {
            id: "113",
            title: "Virtual Reality in Education: Benefits, Tools, and Resources",
            contentOne: "Virtual reality can improve education by providing students with memorable and immersive experiences that would otherwise not be possible. What's more, it can Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.. At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            contentTwo: "There's a time and place for everything… including asking for reviews. For instance: you should not asking for a review on your checkout page. The sole purpose of this page is to guide your customer to complete their purchase, and this means that the page should be as minimalist and pared-down possible. You don't want to have any unnecessary elements or Call To Actions.",
            subTitleOne: "The opportunities abound?",
            subContentOne: "At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            subContentTwo: "At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            blogImg: vrNews,
            author: "Chucks Abby",
            authorImg: author2,
            date: "26 July 2020",
            quote: "The sole purpose of this page is to guide your customer to complete their purchase, and this means that the page should be as minimalist.",
            quoteAuthor: "Nerd Kin",
            tags: ["VR", "Virtual", "Metaverse"],
        },
        {
            id: "114",
            title: "Elementary school high-flyers making the most of the opportunity",
            contentOne: "Play our classic quizzes, anywhere, anytime & fight your way to the top of the leaderboard. What's more, it can Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.. At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            contentTwo: "There's a time and place for everything… including asking for reviews. For instance: you should not asking for a review on your checkout page. The sole purpose of this page is to guide your customer to complete their purchase, and this means that the page should be as minimalist and pared-down possible. You don't want to have any unnecessary elements or Call To Actions.",
            subTitleOne: "The opportunities abound?",
            subContentOne: "At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            subContentTwo: "At quo cetero fastidii. Usu ex ornatus corpora sententiae, vocibus deleniti ut nec. Ut enim eripuit eligendi est, in iracundia signiferumque quo. Sed virtute suavitate suscipiantur ea, dolor this can eloquentiam ei pro. Suas adversarium interpretaris eu sit, eum viris impedit ne. Erant appareat corrumpit ei vel.",
            blogImg: study,
            author: "Alamin Abuk",
            authorImg: author3,
            date: "26 July 2023",
            quote: "The sole purpose of this page is to guide your customer to complete their purchase, and this means that the page should be as minimalist.",
            quoteAuthor: "Berg Sue",
            tags: ["Quiz", "Maths", "Battle"],
        },*/
    {
        id: "111",
        content: {
            one: {
                type: "header",
                datum: "I spent 10 hours in the metaverse without feeling hungry",
            },
            two: {
                type: "paragraph",
                datum: "I spent 10 hours inside a virtual reality website and didn't feel hungry. 10 hours! That is a long time to spend inside a virtual reality, yet it did not affect my hunger levels one bit. Researchers from the University of Michigan, who led a similar study recently said this is because my brain was too focused on what was going on in front of me to notice my body's needs. This can also happen with real life situations, as a response to any type of stressor. The only difference is that when you're outside of virtual reality, you can eat something and it will alleviate the discomfort.",
            },
            three: {
                type: "paragraph",
                datum: "In October, I spent 10 hours exploring wiizkidd culture and came to a few conclusions. The first was that it is possible to go without feeling hungry, even when you're sitting or standing up. The second was that, without fail, after I unplugged my headset and walked into my kitchen, I would always find myself making a sandwich.",
            },
            four: {
                type: "quote",
                datum: ["A lot of people think that the metaverse is about a place, but one definition of this is it's about a time when basically immersive digital worlds become the primary way that we live our lives and spend our time.", "Mark Zuckerberg"]
            },
            five: {
                type: "subHeader",
                datum: "How can this be?",
            },
            six: {
                type: "paragraph",
                datum: "The truth is that as long as you stay engaged with this platform, you can maintain an appetite suppression response. This is because the metaverse keep your attention completely fixed on their universe - and thereby stimulate your brain in a way that makes it forget to eat.",
            },
            seven: {
                type: "paragraph",
                datum: "The metaverse, a term popularized by Neal Stephenson, is a type of virtual reality where one can inhabit and interact with a computer-generated environment. But why spend so much time there?"
            },
            eight: {
                type: "paragraph",
                datum: "It is a well known fact that many people spend a lot of time online, and yet, there is still a great deal of misunderstanding as to why they do. A new study by experts at Michigan State University has found some pretty compelling reasons to spend more time online. And they can really be broken down into two camps: leisure and productivity."
            },
            nine: {
                type: "paragraph",
                datum: "The metaverse (e.g., social media, video games) offers an environment that is distinct from the physical world and provides escape from or relief from the challenges of daily life, said Sarah Prochaska, one of the lead researchers on the study."
            },
            ten: {
                type: "paragraph",
                datum: "Prochaska also found that spending time in a virtual world can improve self-esteem, social skills and self-efficacy, so it is not just an escape but also a powerful place to explore and build up these key personal attributes."
            },
            eleven: {
                type: "subHeader",
                datum: "But here's the exciting part😄"
            },
            twelve: {
                type: "paragraph",
                datum: "I've heard many warnings about losing time and forgetting to eat, but this time I thought I would try it anyway. Turns out, it wasn't so bad. I spent 10 hours in virtual reality without feeling hungry. I found that if I started my morning with a filling breakfast like a large bowl of oatmeal, then ate a handful of snacks as needed throughout the day, I felt fine. And if I stayed within my calorie limits, I didn't feel any different than if I were living in reality. I might even do this again!"
            },
            thirteen: {
                type: "link",
                datum: ["If you're interested in joining me to break another record register on", "https://wiizzkid-edu.onrender.com/", "Wiizzkid", "let's EXPLORE!"]
            },
            fourteen: {
                type: "",
                datum: "",
            },
            last: {
                type: "tagsShare",
                datum: ["Metaverse", "Virtual", "Avatars"],
                title: "I spent 10 hours in the metaverse without feeling hungry",
            }
        },
        details: {
            blogImg: blog111,
            authorImg: author111,
            author: "Christiana Ottobong",
            date: "3 Dec 2022",
        },
    },
    {
        id: "112",
        content: {
            one: {
                type: "header",
                datum: "Earn Tokens like Hackers",
            },
            two: {
                type: "paragraph",
                datum: "It turns out there is one thing that hackers and crypto fanatics have in common: they want to own tokens.",
            },
            three: {
                type: "quote",
                datum: ["I am very excited about the prospect of using cryptocurrency, not just as a money equivalent, but using it as a way to earn something as a result of doing some type of work.", "William Mougayar"]
            },
            four: {
                type: "subHeader",
                datum: "The rise of Tokens"
            },
            five: {
                type: "paragraph",
                datum: "The tokenization of assets has been an emerging trend over the past decade. Assets can be anything from stocks, bonds, and currencies to art and music rights. With tokenization, assets can be turned into unique digital tokens that can be easily traded and exchanged.",
            },
            six: {
                type: "paragraph",
                datum: "A crypto-token is a digital representation of a real-world asset that you can trade, own, and even put up as collateral. They are blockchain assets that exist outside of the blockchain, according to Peter Van Valkenburgh, Director of Research at Coin Center.",
            },
            seven: {
                type: "paragraph",
                datum: "This means that instead of just logging into a game and trading on a blockchain, you could also log into a metaverse and trade with someone else there.",
            },
            eight: {
                type: "paragraph",
                datum: "In Wiizzkid Culture, you can buy stone tokens and then sell it for profit or just keep it for personal use.",
            },
            nine: {
                type: "paragraph",
                datum: "In Spells of Genesis, players can craft cards, level up their characters and form alliances.",
            },
            ten: {
                type: "subHeader",
                datum: "Are you still wondering what a cryptocurrency token is?"
            },
            eleven: {
                type: "paragraph",
                datum: "Think of it like a gift card, but for digital products. They can be purchased, then used to purchase other digital items. The two major types of tokens are cryptocurrency and utility tokens. Utility tokens provide a way to purchase services or goods from a company, while cryptocurrency tokens serve as currency that can be traded between users.If you have an idea or a project you want to bring to life and need funding, cryptocurrency might be your ticket. The three main types of crypto tokens are Utility tokens, Security tokens, and Equity tokens. Let's break them down:",
            },
            twelve: {
                type: "list",
                datum: ["Utility tokens give users free access to a product or service e.g. Ethereum and Brave Browser", "Security tokens provide investors with equity shares in a company e.g. DAI token", "Equity tokens represent ownership of an asset such as stocks e.g. Chainlink So what type of crypto token is best? It really depends on what you're trying to accomplish!"],
            },
            thirteen: {
                type: "paragraph",
                datum: "The next time you hear about a token offering, please keep these points in mind:",
            },
            fourteen: {
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
            last: {
                type: "tagsShare",
                datum: ["Token", "Play", "Earn"],
                title: "Earn Tokens like Hackers",
            }
        },
        details: {
            blogImg: crypto,
            authorImg: author111,
            author: "Christiana Ottobong",
            date: "11 Nov 2022",
        },
    }

];

export default blogData;