import Companies from "@/components/companies";
import { fetchJobsForCandidateAction, fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CompaniesPage() {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    if(!profileInfo) redirect("/onboard")
    const jobsList = await fetchJobsForCandidateAction({})
    return (
        <Companies jobsList={jobsList}/>
    );
}

export default CompaniesPage;