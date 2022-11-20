function PollOption(props){
    const {text,answerPollDetailsOnClick,option,votes,votesPercent,isAnswered,optionSelected} = props;

    const handleClick = () => {
        answerPollDetailsOnClick(option);
    }

    return (
        <div>
            <div className="text-center">
                <label>{text}</label><br/><br/>
            </div> 
            <div>
                {isAnswered === true ? 
                    <div>
                        <label data-='selectedoption-lbl' className="selectedoption">{optionSelected === true ? "Option was Selected" : ""}</label><br/>
                        <label data-testid='num-votes-lbl' className="voteslabel">Number of People who Voted for this option: {votes}</label><br/>
                        <label data-testid='pct-votes-lbl' className="voteslabel">Percentage of People who Voted for this option: {votesPercent}%</label>
                    </div> : 
                    <div>
                        <button data-testid='clickBtn' className="clickbutton" onClick={(e) =>  handleClick()}>Click</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default PollOption;