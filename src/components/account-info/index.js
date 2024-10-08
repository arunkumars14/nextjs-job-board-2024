"use client"

import { candidateOnboardFormControls, initialCandidateAccountFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import {useState, useEffect} from "react"
import CommonForm from "../common-form";
import { UpdateProfileAction } from "@/actions";

function AccountInfo({profileInfo}) {
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateAccountFormData)

    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData)

    async function handleUpdateAccount() {
        await UpdateProfileAction(profileInfo?.role === "candidate" ? {
            _id: profileInfo?._id,
            userId: profileInfo?.userId, 
            role: profileInfo?.role, 
            email: profileInfo?.email, 
            isPremiumUser: profileInfo?.isPremiumUser, 
            memberShipType: profileInfo?.memberShipType, 
            memberShipStartDate: profileInfo?.memberShipStartDate, 
            memberShipEndDate: profileInfo?.memberShipEndDate, 
            candidateInfo: {
                ...candidateFormData,
                resume: profileInfo?.candidateInfo?.resume
            }
        } : {
            _id: profileInfo?._id,
            userId: profileInfo?.userId, 
            role: profileInfo?.role, 
            email: profileInfo?.email, 
            isPremiumUser: profileInfo?.isPremiumUser, 
            memberShipType: profileInfo?.memberShipType, 
            memberShipStartDate: profileInfo?.memberShipStartDate, 
            memberShipEndDate: profileInfo?.memberShipEndDate, 
            recruiterInfo: {
                ...recruiterFormData
            },

        }, "/account")
    }


    useEffect(()=> {
        if(profileInfo?.role === "recruiter"){
            setRecruiterFormData(profileInfo?.recruiterInfo)
        }
        if(profileInfo?.role === "candidate"){
            setCandidateFormData(profileInfo?.candidateInfo)
        }
    }, [profileInfo])

    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between pb-6 border-b pt-24 dark:border-white ">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white ">
                    Account Details
                </h1>
            </div> 
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <CommonForm 
                        formControls={profileInfo?.role === "candidate" ? candidateOnboardFormControls.filter(formControl => formControl.name !== "resume") : recruiterOnboardFormControls}

                        formData={profileInfo?.role === "candidate" ? candidateFormData : recruiterFormData}

                        setFormData={profileInfo?.role === "candidate" ? setCandidateFormData : setRecruiterFormData }

                        buttonText={"Update Profile"}

                        action={handleUpdateAccount}
                    />
                </div>    
            </div>          
        </div>
    );
}

export default AccountInfo;