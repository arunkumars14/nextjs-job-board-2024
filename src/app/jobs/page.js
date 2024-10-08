import { createFilterCategoryAction, fetchJobApplicationsForCandidate, fetchJobApplicationsForRecruiter, fetchJobsForCandidateAction, fetchJobsForRecruiterAction, fetchProfileAction, UpdateProfileAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

async function JobsPage({searchParams}) {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    const jobList = profileInfo?.role === "candidate" ? await fetchJobsForCandidateAction(searchParams) : await fetchJobsForRecruiterAction(user?.id)

    const getJobApplicationList = profileInfo?.role === "candidate" ? await fetchJobApplicationsForCandidate(user?.id) : await fetchJobApplicationsForRecruiter(user?.id) 


    const fetchFilterCategories = await createFilterCategoryAction()

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
        }, "/jobs")
      }
    

    return (
        <JobListing user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} jobList={jobList} jobApplications={getJobApplicationList} filterCategories={fetchFilterCategories}/>
    );
}

export default JobsPage;