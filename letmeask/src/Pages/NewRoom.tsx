
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
// import { Button } from '../Components/Button/Index';
import Button from 'react-bootstrap/Button'
import { useAuth } from '../Hooks/useAuth';
import { database } from '../Services/fireabase';
import './Home/style.scss';


export function NewRoom() {

    const [newRoom, setNewRoom] = useState('');
    const { user } = useAuth();
    const history = useHistory();

    async function handleCreateRoom(event: FormEvent) {
        try {

            event.preventDefault();

            if (newRoom.trim() === '') {
                return;
            }

            /* lendo os dados do firebase /*
            /* real time database */
            const roomRef = database.ref("rooms");

            const firebaseRoom = await roomRef.push({
                title: newRoom,
                authorId: user?.id,
                authorName: user?.name
            });

            history.push(`/rooms/${firebaseRoom.key}`);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>
                    Tire as dúvidas da sua audiência em tempo-real
                </p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente ? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}