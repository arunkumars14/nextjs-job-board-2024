import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

function CommonCard({icon, title, description, footerContent}) {
    return (
        <Card className="flex bg-gray-100 dark:bg-[#121212] flex-col gap-6 rounded-2xl p-8 transition duration-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer dark:hover:shadow-gray-800/50">
            <CardHeader className="p-0">
                {
                    icon ? icon : null
                }
                {
                    title ? (
                        <CardTitle className="text-xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-gray-950 dark:text-white">{title}</CardTitle>
                    ) : null
                }
                {
                    description ? (
                        <CardDescription className="mt-3 text-gray-600 dark:text-white">
                            {description}
                        </CardDescription>
                    ) : null
                }
            </CardHeader>
            <CardFooter className="p-0">
                {footerContent}
            </CardFooter>
        </Card>
    );
}

export default CommonCard;