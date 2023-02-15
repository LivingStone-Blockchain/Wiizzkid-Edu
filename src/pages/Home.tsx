import { Brand, Features, Modes, Metaverse, Blog, GameModes, BuyInstruction }  from '../components/index'


const Home = () => {
  

  return (
    <>
     <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
        <Brand />
        <Features />
        <GameModes />
        <BuyInstruction />    
        <Modes />
      </div>
      <Metaverse />
      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 ">
        <Blog />
      </div>
    </>
  )
}

export default Home;