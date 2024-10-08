"use client"

import CandidateList from "../candidate-list";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

function JobApplicants({showApplicantsDrawer, setShowApplicantsDrawer, showCurrentCandidateDetailModel, setShowCurrentCandidateDetailModel, currentCandidateDetails, setCurrentCandidateDetails, jobItem, jobApplications }) {
    return (
        <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
            <DrawerContent className="max-h-[50vh]">
                <ScrollArea className="h-auto overflow-y-auto">
                    <CandidateList 
                        currentCandidateDetails={currentCandidateDetails}
                        setCurrentCandidateDetails={setCurrentCandidateDetails}
                        jobApplications={jobApplications}
                        showCurrentCandidateDetailModel={showCurrentCandidateDetailModel}
                        setShowCurrentCandidateDetailModel={setShowCurrentCandidateDetailModel}
                    />
                </ScrollArea>
                <DrawerTitle className="sr-only">Applicants</DrawerTitle>
            </DrawerContent>

        </Drawer>
    );
}

export default JobApplicants;