import Link from "next/link"

export default function Frame() {
    return(
        <div className="w-full flex flex-col items-center justify-center">
            <div className="text-center bg-lime-500 text-white p-2 w-full">
                <Link href="/dashboard">
                    <h2>
                        Go to Dashboard <b>&gt;</b>
                    </h2>
                </Link>
            </div>
            
            <div className="w-full md:block hidden h-28">
                <iframe
                src="http://localhost:3000/dashboard"
                title="dashboard page"
                className="w-full md:block hidden h-28"
                />
            </div>
        </div>
    )
}
//kk