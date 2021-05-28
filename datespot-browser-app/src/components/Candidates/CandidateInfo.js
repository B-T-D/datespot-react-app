const MOCK_CANDIDATE_JSON = {
    "name": "Azura"
}

function CandidateInfo() {
    return (
        <div>
            <h1>
                Candidate Info
            </h1>
            <h2>Name: </h2>
                <p>{MOCK_CANDIDATE_JSON.name}</p>
        </div>
    )
}

export default CandidateInfo;