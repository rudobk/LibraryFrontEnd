import {ExploreTopBooks} from "./components/ExploreTopBooks";
import {Carousel} from "./components/Carousel";
import {Heros} from "./components/Heros";
import {LibraryServices} from "./components/LibraryServices";
import {Footer} from "../NavbarAndFooter/Footer";
import {Navbar} from "../NavbarAndFooter/Navbar";
export const HomePage = () => {
    return (
        <div>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </div>
    );
}