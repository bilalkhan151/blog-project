import sidebar from "../../components/Admincomponents/sidebar"
export default function Layout({children}){
    return (
        <>
        <div className="flex">
            <sidebar/>

        </div>
        {children}
        </>
    )

}