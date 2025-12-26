const styleObj = {
    display: "flex",
    alignItem: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: "3rem 2rem 2rem 2rem",
    margin: "2rem",
    border: "2px solid #868e96",
    position: "relative",
    fontFamily: "sans-serif",
};
const textStyle = {
    color: "#868e96",
    position: "absolute",
    top: "0.5rem",
    left: "0.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    letterSpacing: "1px",
};

export default function Container({ children, title }) {
    return (
        <div style={styleObj}>
            <span style={textStyle}>{title}</span>
            {children}
        </div>
    );
}
