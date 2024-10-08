"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";


const supabaseClient = createClient("https://ukspcqtcfvehqpsmggze.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc3BjcXRjZnZlaHFwc21nZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNTIyODYsImV4cCI6MjA0MzcyODI4Nn0.uah39-bEZmqD7apdENwRnnJckX6uJ8GruNCbnTeJbUU")


function OnBoard() {
   const [currentTab, setCurrentTab] = useState("candidate")
   const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData)
   const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData)

   const [file, setFile] = useState(null)

   const currentAuthUser = useUser()
   const {user} = currentAuthUser

   function handleFileChange(event){
    event.preventDefault()
    setFile(event.target.files[0])
   }

   async function handleUploadPdfToSupabase() {
    const {data, error} = await supabaseClient.storage.from("Nextjs-job-board-public").upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false
    })


    if(data){
        setCandidateFormData({
            ...candidateFormData,
            resume: data.path
        })
    }
   }

   useEffect(()=>{
    if(file) handleUploadPdfToSupabase()
   }, [file])

   function handleTabChange(value){
    setCurrentTab(value)
   }

   function handleRecruiterFormValid(){
    return recruiterFormData && recruiterFormData.name.trim() !== "" && recruiterFormData.companyName.trim() !== "" && recruiterFormData.companyRole.trim() !== ""
   }

   function handleCandidateFormValid(){
    return Object.keys(candidateFormData).every(key => candidateFormData[key].trim() !== "")
   }



   async function createProfile() {
    const data = currentTab === "candidate" ? {
        candidateInfo: candidateFormData,
        role: "candidate",
        isPremiumUser: false,
        userId: user?.id,
        email: user?.primaryEmailAddress?.emailAddress

    } : {
        recruiterInfo: recruiterFormData,
        role: "recruiter",
        userId: user?.id,
        isPremiumUser: false,
        email: user?.primaryEmailAddress?.emailAddress
    }

    await createProfileAction(data, "/onboard")
   }

    return (
        <div className="bg-white dark:bg-black">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-center justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome to Onboard</h1>
                        <TabsList>
                            <TabsTrigger value="candidate">
                                Candidate
                            </TabsTrigger>
                            <TabsTrigger value="recruiter">
                                Recruiter
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value="candidate">
                    <CommonForm
                        action={createProfile} 
                        formControls={candidateOnboardFormControls}
                        buttonText={"Onboard as candidate"}
                        formData={candidateFormData}
                        setFormData={setCandidateFormData}
                        handleFileChange={handleFileChange}
                        isBtnDisabled={!handleCandidateFormValid()}
                    />
                </TabsContent>
                <TabsContent value="recruiter">
                    <CommonForm 
                        formControls={recruiterOnboardFormControls}
                        buttonText={"Onboard as Recruiter"}
                        formData={recruiterFormData}
                        setFormData={setRecruiterFormData}
                        isBtnDisabled={!handleRecruiterFormValid()}
                        action={createProfile}
                    />
                </TabsContent>
            </Tabs>
            
        </div>
    );
}

export default OnBoard;