export default function Emoji({ txt, color = false }) {
    return <span className={color ? "emoji-color" : "emoji"}>{txt}</span>;
}
