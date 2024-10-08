"use client"

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { createJobApplication } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

function CandidateJobCard({ jobItem, profileInfo, jobApplications}) {
    const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false)
    const {toast} = useToast()

    async function handleJobApply() {
        if(!profileInfo?.isPremiumUser && jobApplications.length >= 2) {
            setShowJobDetailsDrawer(false)
            toast({
                title: "You can apply max 2 jobs",
                description: "Please opt for membership to post more jobs",
                variant: "destructive",
                action: <Link href={"/membership"} className="border-2 border-white p-2">Membership</Link>
            })
            return;
        }
        if(profileInfo?.isPremiumUser && profileInfo?.memberShipType==="Basic" && jobApplications.length >= 3) {
            setShowJobDetailsDrawer(false)
            toast({
                title: "You can apply max 3 jobs",
                description: "Please opt for membership to post more jobs",
                variant: "destructive",
                action: <Link href={"/membership"} className="border-2 border-white p-2">Membership</Link>
            })
            return;
        }
        if(profileInfo?.isPremiumUser && profileInfo?.memberShipType==="Basic" && jobApplications.length >= 5) {
            setShowJobDetailsDrawer(false)
            toast({
                title: "You can apply max 5 jobs",
                description: "Please opt for membership to post more jobs",
                variant: "destructive",
                action: <Link href={"/membership"} className="border-2 border-white p-2">Membership</Link>
            })
            return;
        }

        await createJobApplication({
            recruiterUserId: jobItem?.recruiterId,
            name:profileInfo?.candidateInfo?.name ,
            email: profileInfo.email,
            candidateUserId: profileInfo?.userId,
            status: ["Applied"],
            jobID: jobItem?._id,
            jobAppliedDate: new Date().toLocaleDateString()
        }, '/jobs')
        setShowJobDetailsDrawer(false)
    }

    return (
        <>
            <Drawer open={showJobDetailsDrawer} onOpenChange={setShowJobDetailsDrawer}>
                <CommonCard
                    icon={<JobIcon />}
                    title={jobItem?.title}
                    description={jobItem.companyName}
                    footerContent={
                        <Button onClick={() => setShowJobDetailsDrawer(true)} className="flex h-11 items-center justify-center px-5">
                            View Details
                        </Button>

                    }

                />
                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between">
                            <DrawerTitle className="text-4xl font-extrabold text-gray-800 dark:text-white">
                                {jobItem?.title}
                            </DrawerTitle>
                            <div className="flex gap-3">
                                <Button onClick={handleJobApply} disabled={jobApplications.findIndex(item =>item.jobID === jobItem?._id) > -1 ? true : false} className="flex h-11 items-center justify-center px-5">{jobApplications.findIndex(item => item.jobID === jobItem?._id) > -1 ? "Applied" : "Apply"}</Button>

                                <Button onClick={() => setShowJobDetailsDrawer(false)} className="flex h-11 items-center justify-center px-5">Cancel</Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-2xl font-medium text-gray-600 dark:text-white">
                        {jobItem.description}
                        <span className="text-xl font-normal text-gray-500 ml-4 dark:text-white">{jobItem.location}</span>
                    </DrawerDescription>
                    <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-[4px] dark:bg-white">
                        <h2 className="text-xl font-bold text-white dark:text-black">{jobItem?.type}</h2>
                    </div>
                    <h3 className="font-medium text-2xl text-black mt-3 dark:text-white">Experience: {jobItem?.experience} Year</h3>
                    <div className="flex gap-4 mt-6">
                        {
                            jobItem?.skills.split(",").map((skillItem, index) => (
                                <div key={index} className="w-[100px] flex justify-center items-center h-[35px] bg-black dark:bg-white rounded-[4px]">
                                    <h2 className="text-[12px] font-medium text-white dark:text-black dark:font-bold">{skillItem}</h2>
                                </div>
                            ))
                        }
                    </div>
                </DrawerContent>
            </Drawer>

        </>
    );
}

export default CandidateJobCard;