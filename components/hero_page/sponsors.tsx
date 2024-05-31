import Image from "next/image";

export default function Sponsors() {
  return (
    <div className="animate-fade-up flex flex-col items-center justify-start h-32 mt-12 mb-12 w-full">
      <h2 className='text-2xl mb-3 text-[#1A237E]'>Supported By</h2>
      <div className="flex flex-row items-center justify-center w-screen h-[100px]">
        <div className="flex flex-col items-center justify-center w-1/3 h-[100px]">
          <Image src="/EF_white.png" alt="EntrepreneurFirst" height={160} width={350} className="color-black"/>
        </div>
        <div className="flex flex-col items-center justify-center w-1/3 h-[100px]">
          <Image src='/pear_white.png' alt="PearVC" height={20} width={150}/>
        </div>
        <div className="flex flex-col items-center justify-center w-1/3 h-[100px]">
          <Image src='/hcs_ai.png' alt="HCS AI Group" height={100} width={250}/>
        </div>
      </div>
    </div>
  );
}
