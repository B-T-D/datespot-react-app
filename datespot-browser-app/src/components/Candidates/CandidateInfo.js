const MOCK_CANDIDATE_JSON = {
    "name": "Azura"
}

function CandidateInfo(props) {
    return (
        <div>
            <h1>
                Candidate Info
            </h1>
            <h2>Name: </h2>
                <p>{JSON.stringify(props.candidate)}</p>
        </div>
    )
}

export default CandidateInfo;