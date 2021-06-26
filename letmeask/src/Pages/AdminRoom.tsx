import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import deleteImg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../Components/Button/Index';
import { Question } from '../Components/Question/Index';
import { RoomCode } from '../Components/RoomCode/Index';
import { useRoom } from '../Hooks/useRoom';
import { database } from '../Services/fireabase';
import '../styles/room.scss';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom(roomId: string) {
    if (window.confirm("Tem certeza que voce deseja encerrar essa sala ? ")) {
      await database.ref(`/rooms/${roomId}`).update({
        endedAt: new Date(),
      });

      await toast('Sala encerrada com sucesso', {
        duration: 3000,
        position: 'top-center',
        icon: '',
      });

      history.push("/");
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que voce deseja excluir esta pergunta ? ")) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
      toast('Pergunta deletada com sucesso!', {
        duration: 3000,
        position: 'top-center',
        icon: '',
      });
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string, isAnswered: boolean) {

    var message = "";
    if (!isAnswered) {
      message = 'Pergunta marcada como respondida';
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true
      });
    } else {
      message = 'Pergunta desmarcada como respondida';
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: false
      });
    }
    toast(message, {
      duration: 3000,
      position: 'top-center',
      icon: '',
    });
  }

  async function handleHighlightQuestion(questionId: string, isHighlighted: boolean) {

    var returnMessage = "";
    if (!isHighlighted) {
      returnMessage = 'Pergunta marcada como destaque!';
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true
      });
    } else {
      returnMessage = 'Pergunta removida dos destaques!';
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: false
      });
    }

    toast(returnMessage, {
      duration: 3000,
      position: 'top-center',
      icon: '',
    });
  }

  console.log("aqui ", questions);
  return (

    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeaks" />
          <div>
            <RoomCode code={roomId} />
            <Button
              onClick={() => handleEndRoom(roomId)}
              isOutlined
            >Encerrar Sala</Button>
          </div>
        </div>
      </header>


      <main >
        <div className="room-title">
          <h1>Sala {title}</h1>
          {
            questions.length > 0 && (
              <span>{questions.length} perguntas</span>
            )
          }
        </div>

        <div className="question-list">

          {questions.map((el) => {
            return (
              <Question
                content={el.content}
                author={el.author}
                isAnswered={el.isAnswered}
                isHighlighted={el.isHighlighted}
                key={el.id}
              >
                <button
                  type="button"
                  className={`action-button ${el.isAnswered ? 'actived' : ''}`}
                  onClick={() => handleCheckQuestionAsAnswered(el.id, el.isAnswered)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                </button>
                <button
                  type="button"
                  className={`action-button ${el.isHighlighted ? 'actived' : ''}`}
                  onClick={() => handleHighlightQuestion(el.id, el.isHighlighted)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                </button>
                <button
                  type="button"
                  className={`action-button ${el.likeId ? 'actived' : ''}`}
                  onClick={() => handleDeleteQuestion(el.id)}
                >
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
              </Question>
            )
          })
          }
        </div>

      </main>
    </div >
  )
}