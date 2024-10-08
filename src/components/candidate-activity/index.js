"use client"

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({jobList, jobApplicants}) {
    const uniqueStatusArray = [...new Set(jobApplicants.map(jobApplicantItem => jobApplicantItem.status).flat(1))]

    
    return (
        <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex items-baseline justify-between border-b pb-6 pt-24 dark:border-white ">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white ">Your Activity</h1>
                    <TabsList>
                    {
                        uniqueStatusArray.map(status => <TabsTrigger key={status} value={status}>
                            {status}
                        </TabsTrigger> 
                        )
                    }
                </TabsList>
                </div>
                <div className="pb-24 pt-6">
                    <div className="container mx-auto p-0 space-y-8">
                        <div className="flex flex-col gap-4">
                            {
                                uniqueStatusArray.map(status => <TabsContent value={status} className="flex flex-col gap-4" key={status}>
                                    {
                                        jobList.filter(jobItem => jobApplicants.filter(jobApplication => jobApplication.status.indexOf(status) > -1).findIndex(filteredItemByStatus => jobItem?._id === filteredItemByStatus.jobID) > -1 ).map(finalFilteredItem => <CommonCard icon={<JobIcon />} title={finalFilteredItem?.title} description={finalFilteredItem.companyName} key={finalFilteredItem?._id}/>)
                                    }
                                </TabsContent>)
                            }
                        </div>

                    </div>
                </div>
                

            </Tabs>
        </div>
    );
}

export default CandidateActivity;