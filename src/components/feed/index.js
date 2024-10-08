"use client"

import { Button } from "../ui/button";
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { CirclePlus, Heart } from "lucide-react";
import { Input } from "../ui/input";
import { createClient } from "@supabase/supabase-js";
import { createFeedPostAction, updateFeedPostAction } from "@/actions";

function Feed({ user, profileInfo, allFeedPosts }) {
    const supabaseClient = createClient("https://ukspcqtcfvehqpsmggze.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrc3BjcXRjZnZlaHFwc21nZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNTIyODYsImV4cCI6MjA0MzcyODI4Nn0.uah39-bEZmqD7apdENwRnnJckX6uJ8GruNCbnTeJbUU")

    const [showPostDialog, setShowPostDialog] = useState(false)
    const [imageData, setImageData] = useState(null)
    const [formData, setFormData] = useState({
        message: "",
        imageURL: "",
    })

    function handleFileOnChange(event) {
        event.preventDefault()
        setImageData(event.target.files[0])

    }
    function handleFetchImagePublicUrl(getData) {
        const { data } = supabaseClient.storage.from("Nextjs-job-board-public").getPublicUrl(getData.path)


        if (data) setFormData({
            ...formData,
            imageURL: data?.publicUrl
        })

    }

    async function handleUploadImageToSupabase() {
        const { data, error } = await supabaseClient.storage.from("Nextjs-job-board-public").upload(`/public/${imageData.name}`, imageData, {
            cacheControl: "3600",
            upsert: false
        })

        if (data) handleFetchImagePublicUrl(data)
    }

    async function handleSavedFeedPost() {
        await createFeedPostAction({
            userId: user?.id,
            userName: profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name,
            message: formData.message,
            image: formData.imageURL,
            likes: [],
        }, "/feed")

        setShowPostDialog(false)
        setFormData({
            message: "",
            imageURL: "",
        })
    }

    async function handleUpdateFeedPostLike(getCurrentFeedPostItem) {
        
        let cpyLikesFromCurrentFeedPostItem = [...getCurrentFeedPostItem.likes]
        const index = cpyLikesFromCurrentFeedPostItem.findIndex(likeItem => likeItem.reactorUserId === user?.id)

        if(index === -1) cpyLikesFromCurrentFeedPostItem.push({
            reactorUserId: user?.id,
            reactorUserName: profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name,
        })
        else{
            cpyLikesFromCurrentFeedPostItem.splice(index, 1)
        }

        getCurrentFeedPostItem.likes = cpyLikesFromCurrentFeedPostItem

        await updateFeedPostAction(getCurrentFeedPostItem, "/feed")
        
    }

    useEffect(() => {
        if (imageData) handleUploadImageToSupabase()

    }, [imageData]);

    

    return (
        <>
            <div className="mx-auto max-w-7xl">
                <div className="flex items-baseline justify-between border-b pb-6 pt-24 dark:border-white">
                    <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900">Explore Feed</h1>
                    <div className="flex items-center">
                        <Button className="h-11 flex items-center justify-center px-5" onClick={() => setShowPostDialog(true)}>Add Post</Button>

                    </div>
                </div>
                <div className="py-12">
                    <div className="container m-auto flex flex-col gap-5 text-gray-700">
                        {
                            allFeedPosts && allFeedPosts.length > 0 ? allFeedPosts.map(feedPostItem => <div key={feedPostItem?._id} className="group relative -mx-4 rounded-3xl bg-gray-100 hover:bg-white hover:shadow-2xl cursor-pointer shadow-2xl shadow-transparent gap-8 flex">
                                <div className="sm:w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl">
                                    <img src={feedPostItem?.image} alt="Post" className="h-80 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                                </div>
                                <div className="sm:p-2 sm:pl-0 sm:w-4/6">
                                    <span className="mt-4 mb-2 inline-block font-medium text-gray-500 sm:mt-0">{feedPostItem?.userName}</span>

                                    <h3 className="mb-6 font-bold text-gray-900 text-4xl">{feedPostItem?.message}</h3>

                                    <div className="flex gap-5">
                                        <Heart size={25} fill={feedPostItem?.likes.find(like => like.reactorUserId === user?.id)  ? "#000" : "#fff"} className="cursor-pointer" onClick={()=> handleUpdateFeedPostLike(feedPostItem)}/>
                                        <span className="font-semibold text-xl">{feedPostItem?.likes.length}</span>
                                    </div>
                                </div>

                            </div>) : <h1 className="">No Posts</h1>
                        }
                    </div>
                </div>
            </div>
            <Dialog open={showPostDialog} onOpenChange={() => {
                setShowPostDialog(false)
                setFormData({
                    message: "",
                    imageURL: "",
                })
            }}>
                <DialogContent className="h-[550px]">
                    <Textarea name="message" value={formData?.message} placeholder={"Enter a message"} className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[200px] text-[28px]" onChange={(event) => setFormData({
                        ...formData,
                        message: event.target.value
                    })} />

                    <div className="flex gap-5 items-center justify-between">
                        {
                            formData?.imageURL !== "" ? <p className="font-bold">Image Uploaded</p> : <Label htmlFor="imageURL">
                                <CirclePlus />
                                <Input
                                    className="hidden"
                                    id="imageURL"
                                    type="file"
                                    onChange={handleFileOnChange}
                                />
                            </Label>
                        }

                        <Button disabled={formData?.imageURL === "" && formData.message === ""} className="flex w-40 h-11 items-center justify-center px-5" onClick={handleSavedFeedPost}>
                            Post
                        </Button>
                    </div>

                    <DialogTitle className="sr-only">Feed Details</DialogTitle>
                </DialogContent>

            </Dialog>
        </>
    );
}

export default Feed;