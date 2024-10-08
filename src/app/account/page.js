import { fetchProfileAction, UpdateProfileAction } from "@/actions";
import AccountInfo from "@/components/account-info";
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

async function AccountPage() {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    if (!profileInfo) redirect("/onboard")

    if (profileInfo?.memberShipEndDate && new Date(profileInfo.memberShipEndDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
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
        }, "/account")
    }
    return (
        <AccountInfo profileInfo={profileInfo} />
    );
}

export default AccountPage;