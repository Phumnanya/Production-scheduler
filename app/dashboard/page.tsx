import Recharts from "../components/recharts"
import Table from "../components/Table"

export default function Dashboard() {
    return(
        <>
            <header className="md:py-10 py-5 w-full text-left bg-amber-200 px-2">
                DASHBOARD
            </header>
            <Recharts />
            <Table />
        </>
    )
}