import { fetchProfileAction, UpdateProfileAction } from '@/actions';
import HomePageButtonControls from '@/components/homepage-button-controls';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';


export default async function Home() {
  const user = await currentUser();


  const profileInfo = await fetchProfileAction(user?.id);

  if(user && !profileInfo?._id) redirect("/onboard")
  


  if(profileInfo?.memberShipEndDate && new Date(profileInfo.memberShipEndDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)){
    await UpdateProfileAction({
      userId: user?.id, 
      role: profileInfo?.role,
      email: profileInfo?.email, 
      isPremiumUser: false, 
      memberShipType: "", 
      memberShipStartDate: "", 
      memberShipEndDate: "", 
      recruiterInfo: profileInfo?.recruiterInfo, 
      candidateInfo: profileInfo?.candidateInfo, 
      _id: profileInfo?._id
    }, "/")
  }

  return (
    <>
      <section className="relative w-full h-full min-h-screen pb-10">
        <div className="w-full h-full relative">
          <div className="flex flex-col-reverse lg:flex-row gap-10 mt-16">
            <section className="w-full lg:w-[50%] flex flex-col md:px-2 lg:px-0 p-5 lg:p-10">
              <div className="w-full flex justify-start flex-col h-auto lg:pt-7">
                <span className="flex space-x-2">
                  <span className="block dark:border-white w-14 mb-2 border-b-2 border-gray-700"></span>
                  <span className="font-medium dark:text-white text-grey-600">
                    One Stop Solution to Find Jobs
                  </span>
                </span>
                <h1 className="text-3xl mt-5 lg:text-7xl text-blac font-extrabold">Build your job community from here</h1>
                <div className="w-full mt-6 flex items-center text-white justify-start gap-2">
                  <HomePageButtonControls
                    user={JSON.parse(JSON.stringify(user))}
                    profileInfo={profileInfo}
                  />
                </div>
              </div>
            </section>
            <section className="relatve w-full lg:w-[50%] flex items-center justify-end">
            <img
                src="https://utfs.io/f/4c9f7186-8ad0-4680-aece-a5abea608705-k6t10e.png"
                alt="Hero"
                className="h-full w-full object-contain z-10"
              />
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
