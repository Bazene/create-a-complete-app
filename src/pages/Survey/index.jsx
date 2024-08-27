import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Loader } from '../../utils/style/Atoms'

function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const [isDataLoading, setDataLoading] = useState(false)

  // the useState allow us to the returned value of API
  const [surveyData, setSurveyData] = useState({})

  // this one allow as to declanch fetch 
  useEffect(() => {
    setDataLoading(true)
    fetch(`http://localhost:8000/survey`)
      .then((response) => response.json()
      .then(({ surveyData }) => {
        setSurveyData(surveyData)
        setDataLoading(false)
      })
      .catch((error) => console.log(error))
    )
  }, [])

  const QuestionsWrapper = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
  `
  const LinkContainer = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : center;
  `

  const QuestionContainer = styled.p`
    margin-bottom : 30px;
  `

  return (
    <QuestionsWrapper>
      <h2 style={{}}>Question {questionNumber}</h2>
  
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContainer>{surveyData[questionNumber]}</QuestionContainer>
      )}
  
      <LinkContainer>
        <Link style={{paddingRight : "10px"}} to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkContainer>
    </QuestionsWrapper>
  )
  
}

export default Survey