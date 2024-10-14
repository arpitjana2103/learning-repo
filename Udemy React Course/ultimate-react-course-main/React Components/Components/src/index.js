import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./Components/StarRating";
import Accordion from "./Components/Accordion";
import Container from "./Container";
import TextExpander from "./Components/TextExpander";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/*///////////////////////////////////////////////////////////////////////////*/}
        {/*///////////////////////////////////////////////////////////////////////////*/}
        {/* STAR_RATING ///////////////////////////////////////////////////////////// */}

        <Container title="Star Rating">
            <StarRating
                maxRating={5}
                defaultRating={2}
                color="#22b8cf"
                size={24}
                messages={["One", "Two", "Three", "Four", "Five"]}
            />
        </Container>

        {/*///////////////////////////////////////////////////////////////////////////*/}
        {/*///////////////////////////////////////////////////////////////////////////*/}
        {/* ACCORDION /////////////////////////////////////////////////////////////// */}

        <Container title="Accordion">
            <Accordion />
        </Container>

        {/*///////////////////////////////////////////////////////////////////////////*/}
        {/*///////////////////////////////////////////////////////////////////////////*/}
        {/* TEXT_EXPANDER /////////////////////////////////////////////////////////// */}

        <Container title="TextExpander">
            <TextExpander
                collapsedNumWords={10}
                expandButtonText="show text"
                collapseButtonText="collapse text"
                buttonColor="#ff6622"
                expanded={true}
            >
                Space travel requires some seriously amazing technology and
                collaboration between countries, private companies, and
                international space organizations. And while it's not always
                easy (or cheap), the results are out of this world. Think about
                the first time humans stepped foot on the moon or when rovers
                were sent to roam around on Mars. Space travel requires some
                seriously amazing technology and collaboration between
                countries, private companies, and international space
                organizations. And while it's not always easy (or cheap), the
                results are out of this world. Think about the first time humans
                stepped foot on the moon or when rovers were sent to roam around
                on Mars.
            </TextExpander>
        </Container>
    </React.StrictMode>
);
