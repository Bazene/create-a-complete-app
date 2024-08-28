import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Loader } from '../../utils/style/Atoms'
import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'
import colors from '../../utils/style/colors'
import { useFetch } from '../../utils/hooks'

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
const ReplyBox = styled.button`
border: none;
height: 100px;
width: 300px;
display: flex;
align-items: center;
justify-content: center;
background-color: ${colors.backgroundLight};
border-radius: 30px;
cursor: pointer;
box-shadow: ${(props) =>
  props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
&:first-child {
  margin-right: 15px;
}
&:last-of-type {
  margin-left: 15px;
}
`

const ReplyWrapper = styled.div`
display: flex;
flex-direction: row;
`

function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const { answers, saveAnswers } = useContext(SurveyContext)

  function saveReply(answer) {
    saveAnswers({ [questionNumber]:answer })
  }

  // the useState allow us to the returned value of API
  
  const { isLoading, data,error } = useFetch(`http://localhost:8000/survey`)
  const { surveyData } = data

  if (error) {
    return <span>Il y a un problème au niveau du serveur</span>
  }

  return (
    <QuestionsWrapper>
      <h2 style={{}}>Question {questionNumber}</h2>
  
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContainer>{surveyData && surveyData[questionNumber]}</QuestionContainer>
      )}

      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
        >
          Oui
        </ReplyBox>

        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
  
      <LinkContainer>
        <Link style={{paddingRight : "10px"}} to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkContainer>
    </QuestionsWrapper>
  )
  
}

export default Survey