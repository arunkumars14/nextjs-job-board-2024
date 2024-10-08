import qs from "query-string"

export const recruiterOnboardFormControls = [
    {
        label: "Name",
        name: "name",
        placeholder: "Enter your name",
        componentType: "input"
    },
    {
        label: "Company Name",
        name: "companyName",
        placeholder: "Enter your company Name",
        componentType: "input"
    },
    {
        label: "Company Role",
        name: "companyRole",
        placeholder: "Enter your company Role",
        componentType: "input"
    },

]

export const initialRecruiterFormData = {
    name: "",
    companyName: "",
    companyRole: "",
}

export const candidateOnboardFormControls = [
    {
        label: "Resume",
        name: "resume",
        componentType: "file"
    },
    {
        label: "Name",
        name: "name",
        placeholder: "Enter your name",
        componentType: "input"
    },
    {
        label: "Current Company",
        name: "currentCompany",
        placeholder: "Enter your Current Company",
        componentType: "input"
    },
    {
        label: "Previous Companies",
        name: "previousCompanies",
        placeholder: "Enter your Previous Companies",
        componentType: "input"
    },
    {
        label: "Current Job Loaction",
        name: "currentJobLocation",
        placeholder: "Enter your Current Job Loaction",
        componentType: "input"
    },
    {
        label: "Current Salary",
        name: "currentSalary",
        placeholder: "Enter your Current Salary",
        componentType: "input"
    },
    {
        label: "Notice Period",
        name: "noticePeriod",
        placeholder: "Enter your Notice Period",
        componentType: "input"
    },
    {
        label: "Skills",
        name: "skills",
        placeholder: "Enter your Skills",
        componentType: "input"
    },
    {
        label: "Total Experience",
        name: "totalExperience",
        placeholder: "Enter your Total Experience",
        componentType: "input"
    },
    {
        label: "College",
        name: "college",
        placeholder: "Enter your College",
        componentType: "input"
    },
    {
        label: "College Location",
        name: "collegeLocation",
        placeholder: "Enter your College Location",
        componentType: "input"
    },
    {
        label: "Prefered Location",
        name: "preferedJobLocation",
        placeholder: "Enter your Prefered Location",
        componentType: "input"
    },
    {
        label: "Graduated Year",
        name: "graduatedYear",
        placeholder: "Enter your Graduated Year",
        componentType: "input"
    },
    {
        label: "LinkedIn Profile",
        name: "linkedinProfile",
        placeholder: "Enter your LinkedIn Profile",
        componentType: "input"
    },
    {
        label: "Github Profile",
        name: "githubProfile",
        placeholder: "Enter your Github Profile",
        componentType: "input"
    },

]

export const initialCandidateFormData = {
    resume: "",
    name: "",
    currentJobLocation: "",
    preferedJobLocation: "",
    currentSalary: "",
    noticePeriod: "",
    skills: "",
    currentCompany: "",
    previousCompanies: "",
    totalExperience: "",
    college: "",
    collegeLocation: "",
    graduatedYear: "",
    linkedinProfile: "",
    githubProfile: "",
}

export const initialCandidateAccountFormData = {
    name: "",
    currentJobLocation: "",
    preferedJobLocation: "",
    currentSalary: "",
    noticePeriod: "",
    skills: "",
    currentCompany: "",
    previousCompanies: "",
    totalExperience: "",
    college: "",
    collegeLocation: "",
    graduatedYear: "",
    linkedinProfile: "",
    githubProfile: "",
}

export const postNewJobFormControls = [
    {
      label: "Company Name",
      name: "companyName",
      placeholder: "Company Name",
      componentType: "input",
      disabled: true,
    },
    {
      label: "Title",
      name: "title",
      placeholder: "Job Title",
      componentType: "input",
    },
    {
      label: "Type",
      name: "type",
      placeholder: "Job Type",
      componentType: "input",
    },
    {
      label: "Location",
      name: "location",
      placeholder: "Job Location",
      componentType: "input",
    },
    {
      label: "Experience",
      name: "experience",
      placeholder: "Experience",
      componentType: "input",
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Description",
      componentType: "input",
    },
    {
      label: "Skills",
      name: "skills",
      placeholder: "Skills",
      componentType: "input",
    },
  ];
  
  export const initialPostNewJobFormData = {
    companyName: "",
    title: "",
    type: "",
    location: "",
    experience: "",
    description: "",
    skills: "",
  };

export const filterMenuDataArray = [
    {
        id: "companyName",
        label: "Company Name"
    },
    {
        id: "title",
        label: "Title"
    },
    {
        id: "type",
        label: "Type"
    },
    {
         id: "location",
        label: "Location"
    }
]

export function formUrlQuery({params, dataToAdd}) {

    const currentURL = qs.parse(params)


    if(Object.keys(dataToAdd).length > 0){
        Object.keys(dataToAdd).map(key => {
            
            if(dataToAdd[key].length === 0){
                
                 delete currentURL[key]
                 
            }
            else{ 
                
                currentURL[key] = dataToAdd[key].join(",")
                
            }  
        })
        
    }
    
    return qs.stringifyUrl({
        url: window.location.pathname,
        query: currentURL
    }, {
        skipNull: true
    })
}

export const membershipPlans = [
    {
        heading: "Tier 1",
        price: 100,
        type: "Basic"
    },
    {
        heading: "Tier 2",
        price: 250,
        type: "Teams"
    },
    {
        heading: "Tier 3",
        price: 500,
        type: "Enterprise"
    },
]
