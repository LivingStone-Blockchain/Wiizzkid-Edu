import { richard1, dami, dawood, deji, Suresh } from "../assets/team"

const teamData = [
    {
      name: "Richard Famujuro",
      role: "CEO",
      avatarSrc: richard1,
      desc: "A visionary software engineer armed with a Bachelor's degree in Chemical Engineering, and Post Graduate degree in Mathematics. His early career, teaching mathematics in London's inner-city  schools, laid the foundation for his extraordinary journey. Richard's time in the classroom ignited a profound  idea – the creation of an educational platform that blends technology seamlessly with traditional learning. And thus, Wiizzkid was born"
    },
    {
      name: "Suresh Kumar",
      role: "Co-founder",
      avatarSrc: Suresh,
      desc: "Suresh Kumar Kundan has 2 decades of leadership experience in the information technology industry, specializing in management consulting and key positions in large insurance and banks in North America. He helps Wiizkid with Investment and investor relations"
    },
    {
      name: "Damilola Oderinde",
      role: "Social Media Manager",
      avatarSrc: dami,
      desc: "A social media manager, writer and content creator with a passion for creating engaging content, building communities and educating society on the essential topics needed to be learnt. With five years+ experience in the industry, she knows how to harness the power of social media to help businesses connect with their audiences and achieve their marketing goals. She is also well knowledgeable in writing creative articles and short compelling stories that exposes the mind to more interesting information"
    },
    {
      name: "Mohammad Dawood",
      role: "Social Media Marketing",
      avatarSrc: dawood,
      desc: "Dawood is a seasoned Social Media Manager with a knack for crafting engaging content and implementing effective strategies to boost brand visibility and engagement across various platforms"
    },
    {
      name: "Taiwo Adedeji",
      role: "Web Developer",
      avatarSrc: deji,
      desc: "A passionate front-end engineer with a knack for crafting exceptional user experiences. With a strong foundation in frontend technologies, I specialize in turning design concepts into pixel-perfect, interactive websites and web applications."
    },
  ];

const Team = () => {
  return (
    <section className="bg-white mt-24">
        <div data-aos="fade-up" className="text-center max-w-screen-lg mx-auto mb-8">
            <h1 className="md:text-3xl text-2xl font-bold mb-4 text-navy">Wiizzkid <span className="text-tomato">Team</span></h1>
            <p className="text-gray-500 md:text-base text-sm leading-relaxed">Meet the amazing people working on our amazing product.</p>
        </div>
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teamData.map((member, index) => (
            <div key={index} className="relative group text-center text-gray-400 cursor-pointer">
            <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={member.avatarSrc} alt={`${member.name} Avatar`} />
            <p className="text-navy font-semibold my-3 sm:text-xl text-lg">{member.name}</p>
            <p className='sm:text-base text-sm leading-relaxed'>{member.role}</p>
            <p className="overflow-visible whitespace-normal w-full flex items-center justify-start absolute top-0 z-10 scale-0 transition-all duration-500 rounded-xl bg-[#26a8a1] bg-opacity-80 p-2 font-semibold text-xs text-white group-hover:scale-100">
                <span className='px-2'>{member.desc}</span>
            </p>
            </div>
        ))}
        </div>  
</section>
  )
}

export default Team