function FinishScreen({ points, maxPossiblePoints }) {
    const percentage = (points / maxPossiblePoints) * 100;
    return (
        <p className="result">
            You scored <strong>{points}</strong> out of {maxPossiblePoints} (
            {percentage}%)
        </p>
    );
}

export default FinishScreen;
