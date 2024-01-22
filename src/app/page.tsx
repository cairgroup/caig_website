import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-start justify-between p-12 overflow-hidden bg-matte-black-radial">
      <div className="flex flex-col items-start justify-start pt-24">
        <h1 className='text-6xl mb-3'>Cambridge AI Reading Group</h1>
        <h3 className='text-xl italic'>Mondays @ 7 PM</h3>
      </div>

      <div className="flex flex-col items-center justify-start w-full">
        <a target="_blakn" 
          href="mailto:ronnachum@college.harvard.edu?subject=Interest%20in%20Cambridge%20AI%20Reading%20Group&body=Your%20background%20working%20with%20AI%20and%20why%20you're%20interested%20in%20joining..." 
          className="mb-3 w-1/3 inline-block px-6 py-3 text-white bg-gray-900 rounded-lg hover:bg-gray-950 transition ease-in-out 2s text-center"
        >
          <h3>Join the group!</h3>
        </a>
        <h2>More Info Coming Soon...</h2>
      </div>

      <div className="flex flex-col items-center justify-start h-32 pb-36 w-full">
        <h2 className='text-2xl mb-3'>Supported By</h2>
        <div className="flex flex-row items-center justify-center w-screen h-[100px]">
          <div className="flex flex-col items-center justify-center w-1/3 h-[100px]">
            <Image src="/EF_white.png" alt="EntrepreneurFirst" height={100} width={250}/>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 h-[100px]">
            <Image src='/pear_white.png' alt="PearVC" height={20} width={150}/>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 h-[100px]">
            <Image src='/hcs_ai.png' alt="HCS AI Group" height={100} width={250}/>
          </div>  
        </div>
      </div>
      {/* <h2>More info coming soon...</h2> */}
    </main>
  );
}
