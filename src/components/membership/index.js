"use client"

import { membershipPlans } from "@/utils";
import CommonCard from "../common-card";
import PremiumIcon from "../premium-icon";
import { Button } from "../ui/button";
import { createPriceIdAction, createStripePaymentAction, UpdateProfileAction } from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const stripePromise = loadStripe("pk_test_51Q7KgCKxV1RGUsqiLJ6muT1KxuJZKH5AvQJ4UcVeuEETNKlXDB2icHzC32JqL9PJJOaZbqnQbaVCBGUtD5dzHWc200rF3UKS5a")

function Membership({ profileInfo }) {
    const pathName = useSearchParams()

    async function handlePayment(getCurrentPlan) {
        const stripe = await stripePromise
        const extractPriceId = await createPriceIdAction({
            amount: Number(getCurrentPlan.price)
        })

        if (extractPriceId) {
            sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan))
            const result = await createStripePaymentAction({
                lineItems: [
                    {
                        price: extractPriceId?.id,
                        quantity: 1
                    }
                ]
            })
            await stripe.redirectToCheckout({
                sessionId: result?.id
            })
        }


    }
    async function updateProfile() {
        const fetchCurrentPlanFromSessionStorage = JSON.parse(sessionStorage.getItem("currentPlan"))
        await UpdateProfileAction({
            ...profileInfo,
            isPremiumUser: true,
            memberShipType: fetchCurrentPlanFromSessionStorage?.type,
            memberShipStartDate: new Date().toString(),
            memberShipEndDate: new Date(
                new Date().getFullYear() + 1,
                new Date().getMonth(),
                new Date().getDate()
            ).toString(),
        } ,"/membership")
    }

    useEffect(() => {
        if (pathName.get("status") === "success") updateProfile() 
    }, [pathName])



    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24 dark:border-white ">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white ">
                    {
                        profileInfo?.isPremiumUser ? "You are a Premium User" : "Choose Your Best Plan"
                    }
                </h1>
                <div className="">
                    {
                        profileInfo?.isPremiumUser ? <Button className="flex h-11 items-center justify-center px-5">{membershipPlans.find(planItem => planItem.type === profileInfo?.memberShipType).heading}</Button> : null
                    }
                </div>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                        {
                            membershipPlans.map((plan, index) => <CommonCard key={plan.heading} icon={<div className="flex justify-between">
                                <div className=""><PremiumIcon /></div>
                                <h1 className="font-bold text-2xl">{plan.heading}</h1>
                            </div>} title={`$ ${plan.price} /year`} description={plan.type} footerContent={
                                profileInfo?.memberShipType === "Enterprise" || (profileInfo?.memberShipType === "Basic" && index === 0) || (profileInfo?.memberShipType === "Teams" && index >= 0 && index< 2 ? null : <Button onClick={() => handlePayment(plan)} className="flex h-11 items-center justify-center px-5">{
                                    profileInfo?.memberShipType === "Basic" || profileInfo?.memberShipType === "Teams" ? "Update Plan" : "Get Premium"
                                }m</Button>)
                                
                            } />)
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Membership;
