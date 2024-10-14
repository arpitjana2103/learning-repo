import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [currOpen, setCurrOpen] = useState(null);

  const handleToggle = function (num) {
    return setCurrOpen(num === currOpen ? null : num);
  };

  return (
    <div className="accordion">
      {data.map(function (el, index) {
        return (
          <AccordionItem
            title={el.title}
            text={el.text}
            num={index + 1}
            key={el.title}
            onToggle={handleToggle}
            currOpen={currOpen}
          />
        );
      })}
    </div>
  );
}

function AccordionItem({ num, title, text, onToggle, currOpen }) {
  const isOpen = currOpen === num;
  return (
    <div className={`item ${isOpen && "open"}`} onClick={() => onToggle(num)}>
      <p className="number">{num < 10 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon"> {isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
