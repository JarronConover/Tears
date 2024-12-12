import { useEffect } from "react";
import PageNavbar from "../components/PageNavbar";
import DynamicPublicRankings from "../components/DynamicPublicRanking";

function PublicPage(props) {
    const { navigateTo } = props;

    return (
        <>
            <PageNavbar title='Public Brackets'
            />
            <DynamicPublicRankings/>


        </>
    )
}

export default PublicPage;