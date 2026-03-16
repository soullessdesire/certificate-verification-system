import Footer from "@/components/app/navigation/footer/footer";
import NavBar from "@/components/app/navigation/nav-bar";

export default function MainAppLayout({children} : {children: React.ReactNode}) {


    return (
        <>
        <NavBar />
        <div>
            { children }
        </div>
        <Footer/> 
        </>
    )
}