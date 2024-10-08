import { fetAllFeedPostsAction, fetchProfileAction } from "@/actions";
import Feed from "@/components/feed";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";

async function FeedPage() {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    if(!profileInfo) redirect("/onboard")

    const allFeedPosts = await fetAllFeedPostsAction()

    return (
        <Feed user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} allFeedPosts={allFeedPosts}/>
    );
}

export default FeedPage;