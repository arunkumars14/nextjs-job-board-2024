"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ToastAction } from "../ui/toast";

function PostNewJob({ profileInfo, user, jobList}) {
    const [showJobDialog, setShowJobDialog] = useState(false)
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.recruiterInfo.companyName
    })
    const {toast} = useToast()

    function handlePostNewButtonValid() {
        return Object.keys(jobFormData).every(control => (jobFormData[control].trim() !== ""))
    }
    async function createNewJob() {
        await postNewJobAction({
            ...jobFormData,
            recruiterId: user?.id,
            applicants: []
        }, "/jobs")
        setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo.companyName
        })
        setShowJobDialog(false)

    }

    function handleAddNewJob(){
        if(!profileInfo?.isPremiumUser && jobList.length >= 2){ 
            toast({
                title: "You can post max 2 jobs",
                description: "Please opt for membership to post more jobs",
                variant: "destructive",
                action: <Link href={"/membership"} className="border-2 border-white p-2">Membership</Link>
            })
            return;
        }
        if(profileInfo?.isPremiumUser && profileInfo?.memberShipType==="Basic" && jobList.length >= 3){ 
            toast({
                title: "You can post max 3 jobs",
                description: "Please opt for membership to post more jobs",
                variant: "destructive",
                action: <Link href={"/membership"} className="border-2 border-white p-2">Membership</Link>
            })
            return;
        }
        if(profileInfo?.isPremiumUser && profileInfo?.memberShipType==="Teams" && jobList.length >= 5){ 
            toast({
                title: "You can post max 5 jobs",
                description: "Please opt for membership to post more jobs",
                variant: "destructive",
                action: <Link href={"/membership"}className="border-2 border-white p-2">Membership</Link>
            })
            return;
        }
        setShowJobDialog(true)
    }

    return (
        <div>
            <Button onClick={handleAddNewJob} className="flex h-11 items-center justify-center px-5">Post a Job</Button>
            <Dialog open={showJobDialog} onOpenChange={() => {
                setShowJobDialog(false)
                setJobFormData({
                    ...initialPostNewJobFormData,
                    companyName: profileInfo?.recruiterInfo.companyName
                })
            }}>
                <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Post New Job
                        </DialogTitle>
                        <div className="grid gap-4 py-4">
                            <CommonForm
                                buttonText={"Add"}
                                formData={jobFormData}
                                setFormData={setJobFormData}
                                formControls={postNewJobFormControls}
                                isBtnDisabled={!handlePostNewButtonValid()}
                                action={createNewJob}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default PostNewJob;