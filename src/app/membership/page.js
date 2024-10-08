import { fetchProfileAction, UpdateProfileAction } from "@/actions";
import Membership from "@/components/membership";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function MembershipPage() {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

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
        }, "/membership")
      }
    
    if(!profileInfo) redirect("/onboard")
    return (
        <Membership profileInfo={profileInfo}/>
    );
}

export default MembershipPage;