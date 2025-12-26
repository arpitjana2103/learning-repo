function Options({ question, dispatch, answer }) {
    const hasAns = answer !== null;
    return (
        <div className="options">
            {question.options.map(function (option, index) {
                return (
                    <button
                        className={`btn btn-option ${
                            hasAns && index === answer && "answer"
                        } ${
                            hasAns &&
                            (index === question.correctOption
                                ? "correct"
                                : "wrong")
                        }`}
                        key={option}
                        onClick={() =>
                            dispatch({
                                type: "newAnswer",
                                payload: index,
                            })
                        }
                        disabled={hasAns}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}

export default Options;
