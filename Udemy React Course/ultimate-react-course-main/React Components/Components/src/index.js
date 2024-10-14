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
            <TextExpander>
                Space travel is the ultimate adventure! Imagine soaring past the
                stars and exploring new worlds. It's the stuff of dreams and
                science fiction, but believe it or not, space travel is a real
                thing. Humans and robots are constantly venturing out into the
                cosmos to uncover its secrets and push the boundaries of what's
                possible.
            </TextExpander>

            <TextExpander
                collapsedNumWords={20}
                expandButtonText="Show text"
                collapseButtonText="Collapse text"
                buttonColor="#ff6622"
            >
                Space travel requires some seriously amazing technology and
                collaboration between countries, private companies, and
                international space organizations. And while it's not always
                easy (or cheap), the results are out of this world. Think about
                the first time humans stepped foot on the moon or when rovers
                were sent to roam around on Mars.
            </TextExpander>

            <TextExpander expanded={true} className="box">
                Space missions have given us incredible insights into our
                universe and have inspired future generations to keep reaching
                for the stars. Space travel is a pretty cool thing to think
                about. Who knows what we'll discover next!
            </TextExpander>
        </Container>
    </React.StrictMode>
);
