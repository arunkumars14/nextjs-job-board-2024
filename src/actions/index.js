"use server"

import connectToDB from "@/database"
import Application from "@/models/application"
import Feed from "@/models/feed"
import Job from "@/models/job"
import Profile from "@/models/profile-model"
import { revalidatePath } from "next/cache"

const stripe = require("stripe")("sk_test_51Q7KgCKxV1RGUsqi6RgiBn3Ho8GUSKFZFPxlYBUwZewuaigByoYy9bxJMNQ7AVhOCpYB0NHgoPGgO9JLaOnveYW800fonzCWCp")

export async function createProfileAction(formData, pathToRevalidate){
    await connectToDB()
    await Profile.create(formData)
    revalidatePath(pathToRevalidate)
}

export async function fetchProfileAction(id) {
    await connectToDB()
    const result = await Profile.findOne({
        userId: id
    })

    return JSON.parse(JSON.stringify(result))
}

//create job 
export async function postNewJobAction(formData, pathToRevalidate) {
    await connectToDB()
    await Job.create(formData)
    revalidatePath(pathToRevalidate)
}

//fetch job for recruiter
export async function fetchJobsForRecruiterAction(id) {
    await connectToDB()
    const result = await Job.find({recruiterId: id})

    return JSON.parse(JSON.stringify(result))
    
}

export async function fetchJobsForCandidateAction(filterParams={}){

    await connectToDB()
    let updatedParams = {}
    Object.keys(filterParams).forEach(filterKey => {
        updatedParams[filterKey] = {$in: filterParams[filterKey].split(',')}
    })
    const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {})

    return JSON.parse(JSON.stringify(result))
}

export async function createJobApplication(data, pathToRevalidate){
    await connectToDB()
    await Application.create(data)
    revalidatePath(pathToRevalidate)

}

export async function fetchJobApplicationsForCandidate(candidateID){
    await connectToDB()
    const result = await Application.find({
        candidateUserId: candidateID
    })

    return JSON.parse(JSON.stringify(result))
}

export async function fetchJobApplicationsForRecruiter(recruiterID) {
    await connectToDB()
    const result = await Application.find({
        recruiterUserId: recruiterID
    })
    return JSON.parse(JSON.stringify(result))
}

export async function updateJobApplicationAction(data, pathToRevalidate){
    await connectToDB()
    const {recruiterUserId, name, email, candidateUserId, status, jobID, jobAppliedDate, _id} = data
    await Application.findOneAndUpdate({
        _id: _id
    }, {
        recruiterUserId, name, email, candidateUserId, status, jobID, jobAppliedDate
    }, {new: true})

    revalidatePath(pathToRevalidate)

    
}

export async function getCandidateDetailsByIDsAction(currentCandidateId) {
    await connectToDB()
     const result = await Profile.findOne({
        userId: currentCandidateId
     })
     return JSON.parse(JSON.stringify(result))
}

export async function createFilterCategoryAction() {
    await connectToDB()
    const result = await Job.find({})

    return JSON.parse(JSON.stringify(result))
}

export async function UpdateProfileAction(data, pathToRevalidate){
    await connectToDB()
    const {userId, role, email, isPremiumUser, memberShipType, memberShipStartDate, memberShipEndDate, recruiterInfo, candidateInfo, _id} = data

    await Profile.findOneAndUpdate({_id: _id}, {
        userId, role, email, isPremiumUser, memberShipType, memberShipStartDate, memberShipEndDate, recruiterInfo, candidateInfo
    }, {new: true})

    revalidatePath(pathToRevalidate)
   
}

export async function createPriceIdAction(data) {
    const session = await stripe.prices.create({
        currency : "inr",
        unit_amount : data?.amount * 100,
        recurring: {
            interval: "year"
        },
        product_data: {
            name: "Premium Plan"
        }
    })

    return {
        success: true,
        id: session?.id
    }
}

export async function createStripePaymentAction(data) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: data?.lineItems,
        mode: "subscription",
        success_url: `${process.env.URL}/membership`+"?status=success",
        cancel_url: `${process.env.URL}/membership`+"?status=cancel"
    })

    return {
        success: true,
        id: session?.id
    }
}

export async function createFeedPostAction(data, pathToRevalidate) {
    await connectToDB()
    await Feed.create(data)
    revalidatePath(pathToRevalidate)
}

export async function fetAllFeedPostsAction() {
    await connectToDB()
    const result = await Feed.find({})

    return JSON.parse(JSON.stringify(result))
}

export async function updateFeedPostAction(data, pathToRevalidate) {
    await connectToDB();
    const { userId, userName, message, image, likes, _id} = data
    await Feed.findOneAndUpdate({
        _id: _id
    }, {
        userId, userName, message, image, likes
    }, {
        new: true
    })

    revalidatePath(pathToRevalidate)
}