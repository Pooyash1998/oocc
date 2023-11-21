import React from "react";
import './Sidebar.scss'
import ExplicitToggle from "./explicitToggle";
import ImplicitToggle from "./implicitToggle";
import SearchModule from "./searchModule";



function Sidebar() {
    return (
        <section className="sidebar">
            <ExplicitToggle/>
            <ImplicitToggle/>
            <SearchModule/>
        </section>
    )
}
export default Sidebar;