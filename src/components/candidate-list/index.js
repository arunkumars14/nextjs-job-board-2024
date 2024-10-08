"use client"

import { getCandidateDetailsByIDsAction, updateJobApplicationAction } from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient("https://ukspcqtcfvehqpsmggze.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc3BjcXRjZnZlaHFwc21nZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNTIyODYsImV4cCI6MjA0MzcyODI4Nn0.uah39-bEZmqD7apdENwRnnJckX6uJ8GruNCbnTeJbUU")

function CandidateList({ currentCandidateDetails, setCurrentCandidateDetails, jobApplications, setShowCurrentCandidateDetailModel, showCurrentCandidateDetailModel }) {

    async function handleFetchCandidateDetails(getCurrentCandidateId) {
        const data = await getCandidateDetailsByIDsAction(getCurrentCandidateId)

        if (data) {
            setCurrentCandidateDetails(data)
            setShowCurrentCandidateDetailModel(true)
        }
    }

    function handlePreviewResume(){
        const {data} = supabaseClient.storage.from("Nextjs-job-board-public").getPublicUrl(currentCandidateDetails?.candidateInfo?.resume)
        const a = document.createElement("a");
        a.href = data?.publicUrl
        a.setAttribute("download", "Resume.pdf")
        a.setAttribute("target", "_blank")
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    async function handleUpdateStatus(getCurrentStatus){
        let cpyJobApplicants = [...jobApplications]
        const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(item => item.candidateUserId === currentCandidateDetails?.userId);
        const jobApplicantsToUpdate = {
            ...cpyJobApplicants[indexOfCurrentJobApplicant],
            status: cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus)
        }
        await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs")
    }

    return (
        <>
            <div className="grid grid-cols-1 p-10 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    jobApplications && jobApplications.length > 0 ? jobApplications.map(jobApplicantItem => <div key={jobApplicantItem?._id} className="b-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4 dark:bg-[#121212]">
                        <div className="px-4 my-6 flex justify-between items-center">
                            <h3 className="text-lg font-bold">{jobApplicantItem?.name}</h3>
                            <Button onClick={() => handleFetchCandidateDetails(jobApplicantItem?.candidateUserId)} className="flex h-11 items-center justify-center px-5">View Profile</Button>
                        </div>


                    </div>) : null
                }
            </div>
            <Dialog open={showCurrentCandidateDetailModel} onOpenChange={() => {
                setCurrentCandidateDetails(null)
                setShowCurrentCandidateDetailModel(false)
            }} className="dark:bg-[#121212]">
                <DialogContent className="dark:bg-[#121212]">
                    <DialogTitle className="sr-only">Details</DialogTitle>
                    <div className="">
                        <h1 className="text-2xl font-bold text-black dark:text-white">{currentCandidateDetails?.candidateInfo?.name},{" "}{currentCandidateDetails?.email}</h1>

                        <p className="text-xl font-medium text-black dark:text-white">{currentCandidateDetails?.candidateInfo.currentCompany}</p>

                        <p className="text-sm font-normal text-black dark:text-white">Experience: {currentCandidateDetails?.candidateInfo.totalExperience} years</p>

                        <p>{currentCandidateDetails?.candidateInfo.currentJobLocation}</p>

                        <p>Salary: {currentCandidateDetails?.candidateInfo.currentSalary} LPA</p>
                        
                        <p>Notice Period: {currentCandidateDetails?.candidateInfo.noticePeriod} days</p>

                        <div className="flex items-center gap-4 mt-6">
                            <h1>Previous Companies: </h1>
                            <div className="flex items-center gap-4 mt-6">
                            {
                                currentCandidateDetails?.candidateInfo?.previousCompanies.split(",").map((skillItem, index) => (
                                    <div key={index} className="w-[100px] flex justify-center items-center h-[35px] bg-black dark:bg-white rounded-[4px]">
                                        <h2 className="text-[12px] font-medium text-white dark:text-black dark:font-bold">{skillItem}</h2>
                                    </div>
                                ))
                            }
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-6">
                            {
                                currentCandidateDetails?.candidateInfo?.skills.split(",").map((skillItem, index) => (
                                    <div key={index} className="w-[100px] flex justify-center items-center h-[35px] bg-black dark:bg-white rounded-[4px]">
                                        <h2 className="text-[12px] font-medium text-white dark:text-black dark:font-bold">{skillItem}</h2>
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>

                    <div className="flex gap-3">
                        <Button onClick={handlePreviewResume} className="flex h-11 items-center justify-center px-5">Resume</Button>

                        <Button disabled={(jobApplications.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Selected") || jobApplications.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Rejected") ) ? true : false } className="flex h-11 items-center justify-center px-5" onClick={()=> handleUpdateStatus("Selected")}>
                            {
                                jobApplications.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Selected") ? "Selected" : "Select"
                            }
                        </Button>
                        
                        <Button disabled={(jobApplications.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Selected") || jobApplications.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Rejected") ) ? true : false } className="flex h-11 items-center justify-center px-5" onClick={()=> handleUpdateStatus("Rejected")}>
                        {
                                jobApplications.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Rejected") ? "Rejected" : "Reject"
                            }
                        </Button>
                    </div>
                </DialogContent>


            </Dialog>
        </>
    );
}

export default CandidateList;