
const {useState} = React;

function NavBar() {
    return (
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid d-flex justify-content-center">
                <span class="navbar-brand mb-0 h1">Age Detection</span>
            </div>
        </nav>
    )
}


function Banner () {
    const sliders = ['slider-1','slider-2']
    const ageClasses = [
        '0-2', '4-6', '8-13', '15-20', '25-32', '38-43', '48-53', '60+'
    ]

    return (
        <div className = "container">
            <div className = "banner d-flex mt-3">
                {sliders.map(slider => (
                <div className = {`slider ${slider} d-flex`} >
                    {ageClasses.map(age => (
                    <div className = "d-flex justify-content-center align-items-center flex-column mx-3">
                        <img src = {`static/img/age ${age}.jpg`} className = "rounded-circle"/>
                        <p>{`${age} years old`}</p>
                    </div>
                    ) )}
                </div>
                ))}
            </div>
        </div>
    )
}

function Uploader({submitHandler, isInvalid, isFetching}) {
	return (
		<form className = "mt-3" onSubmit = {submitHandler}>
			<div>
				<label for="formFile" className="form-label">Please input your image</label>
				<input name = "image-input" required className="form-control" type="file" id="formFile" />
			</div>
			{isInvalid &&
			<div class="alert alert-danger mt-3 text-center" role="alert">
				Invalid file type, please use jpeg/jpg file
			</div>
			}
			<div className = "mt-3">
				<button type = "submit" className = "btn btn-primary w-100" disabled = {isFetching}>
					{isFetching &&
					<>
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					<span class= "mx-2">Predicting, Please Wait...</span>
					</>
					}
					{!isFetching &&
					<span>Classify</span>
					}
				</button>
			</div>
		</form>
	)
}


function Result({probResult,faceImg, faceIsNotExist}) {
	if (faceIsNotExist){
		return (
			<div class="alert alert-danger mt-3 text-center" role="alert">
				Face is not detected, please try different image
			</div>
		)
	}

	if(probResult && faceImg){
		const ageClasses = [
			'0-2', '4-6', '8-13', '15-20', '25-32', '38-43', '48-53', '60+'
		]

		const getPredAge = (classes, probs) => {
			let max = -Infinity
			let idxMax = 0
			for (let i = 0; i < probs.length ; i++){
				if (probs[i] > max){
					max = probs[i]
					idxMax = i
				}
			}

			return classes[idxMax]
		}

		const predictedAge = getPredAge(ageClasses, probResult);

		return (
			<div className = "mt-5">
				<div className = "text-center">
					<h3 className = "head-text">Age Detection Result</h3>
				</div>
				<div class = "roi mt-1 d-flex flex-column align-items-center">
					<img className = "mt-2" src = {faceImg} />
				</div>
				<div className = "result">
					<p className = "text-center mt-3">Probabilities</p>
					{ageClasses.map((age, idx) => (
					<div className = "age-probability mb-3">
						<div className = "age-label">
							<span>{age} Years Old</span> 
						</div>
						<div className="progress">
							<div className="progress-bar" role="progressbar" style = {{width: `${parseFloat(probResult[idx])*100}%`}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{`${parseFloat(probResult[idx]).toFixed(2)}`}</div>
						</div>
					</div>
					))}
					<p className = "fw-bold">Predicted Age : {predictedAge} Years Old</p>
				</div>
			</div>
		)
	}
}


function Main () {
	const [isInvalid, setIsInvalid] = useState(false);
	const [faceIsNotExist, setFaceIsNotExist] = useState(false);
	const [probResult, setProbResult] = useState(null);
	const [faceImg, setFaceimg] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	const submitHandler  = (e) => {
		e.preventDefault();

		const formDOM = e.target;
		const inputFile = formDOM.querySelector('#formFile').files[0];

		console.log(inputFile)

		if (inputFile.type !== "image/jpeg"){
			setIsInvalid(true);
			return;
		}

		setIsInvalid(false);
		setIsFetching(true);
		
		fetch("/submit", {
			method : "POST",
			body : new FormData(formDOM)
		})
		.then(res => {
			return res.json()
		})
		.then(data => {
			if(data.status === 'success'){
				setFaceIsNotExist(false);
				setProbResult(data.probabilities);
				setFaceimg('http://192.168.43.199:5000/download/' + data.face_img)
			}else if (data.status === 'no face') {
				setFaceIsNotExist(true);
			}

			setIsFetching(false);
		})
		.catch(error => {
			console.log(error)
		})
	}


	return (
		<div className = 'container'>
			<Uploader 
				submitHandler={submitHandler} 
				isInvalid={isInvalid} 
				isFetching = {isFetching} 
			/>
			<Result 
				probResult = {probResult} 
				faceImg={faceImg} 
				faceIsNotExist = {faceIsNotExist} 
			/>
		</div>
	)
}

function App () {
    return (
        <>
        <NavBar />
        <Banner />
		<Main />
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))