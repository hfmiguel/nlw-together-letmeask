import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from "../Components/Button/Index";
import { Question } from '../Components/Question/Index';
import { RoomCode } from '../Components/RoomCode/Index';
import { useAuth } from '../Hooks/useAuth';
import { useRoom } from '../Hooks/useRoom';
import { database } from '../Services/fireabase';
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function Room() {

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { user } = useAuth();
  const { title, questions } = useRoom(roomId);
  const history = useHistory();

  async function handleSendQuestion(event: FormEvent) {

    event.preventDefault();

    if (newQuestion.trim() === '') {
      toast('A pergunta não pode estar em branco', {
        duration: 3000,
        position: 'top-center',
        icon: '',
      });
      return;
    }

    if (!user) {
      toast('Você deve fazer login para enviar uma pergunta', {
        duration: 3000,
        position: 'top-center',
        icon: '',
      });
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`/rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }

  async function handleLikeQuestion(questionId: string, likedId: string | undefined) {
    if (likedId) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}/likes/${likedId}`).remove();
    } else {
      await database.ref(`/rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  async function roomIsEnded(roomCode: string) {
    try {

      if (roomCode.trim() === '') {
        return;
      }

      const roomRef = await database.ref(`rooms/${roomCode}`).get();
      if (!roomRef.exists()) {
        toast('A sala que você esta tentando acessar não existe', {
          duration: 3000,
          position: 'top-center',
          icon: '',
        });
        history.push(`/`);
      }

      if (roomRef.val().endedAt) {
        toast('A sala que você esta tentando acessar foi encerrada', {
          duration: 3000,
          position: 'top-center',
          icon: '',
        });
        history.push(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    roomIsEnded(roomId);
  }, [roomId]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeaks" />
          <RoomCode code={roomId} />
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

        <form>
          <textarea
            placeholder="O que voce quer perguntar ?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">

            {user ? (
              <div className="user-info">
                <img src={user?.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma perguntar, <button
                  onClick={() => { history.push("/") }}>faça seu login</button>.
              </span>
            )}

            <Button type="submit" onClick={handleSendQuestion}>Enviar pergunta</Button>
          </div>
        </form>

        <div className="question-list">

          {questions.map((el) => {
            return (
              <Question
                content={el.content}
                author={el.author}
                key={el.id}
                isAnswered={el.isAnswered}
                isHighlighted={el.isHighlighted}
              >

                <button
                  className={`action-button ${el.likeId ? 'actived' : ''}`}
                  type="button"
                  aria-label="Marcar como gostei"
                  onClick={() => handleLikeQuestion(el.id, el.likeId)}
                  disabled={el.isAnswered ? true : false}
                >
                  {el.likeCount > 0 && (
                    <span>{el.likeCount}</span>
                  )}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={`action-button ${el.isAnswered ? 'actived' : ''}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                </button>
              </Question>
            )
          })
          }
        </div>

      </main >
    </div >
  )
}