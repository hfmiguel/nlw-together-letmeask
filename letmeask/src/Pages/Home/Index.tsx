import { FormEvent, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import googleIconImg from '../../assets/images/google-icon.svg';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
// import { Button } from '../../Components/Button/Index';
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../Hooks/useAuth';
import { database } from '../../Services/fireabase';
import './style.scss';

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    console.log(`e ai ${user?.name}`);

    async function handleCreateRoom() {

        console.log(user);
        if (!user) {
            await signInWithGoogle();
        }
        history.push("/rooms/new");
    }

    async function handleJoinRoom(event: FormEvent) {
        try {
            event.preventDefault();
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
                return;
            }

            if (roomRef.val().endedAt) {
                toast('A sala que você esta tentando acessar foi encerrada', {
                    duration: 3000,
                    position: 'top-center',
                    icon: '',
                });
                return;
            }

            history.push(`/rooms/${roomCode}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container fluid>
            <div id="page-auth">
                <Row>
                    <Col lg={8} md={6} sm={12}>
                        <aside>
                            <Image src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" fluid  />
                            <strong>Crie salas de Q&amp;A ao-vivo</strong>
                            <p>
                                Tire as dúvidas da sua audiência em tempo-real
                            </p>
                        </aside>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <main>
                            <div className="main-content">
                                <img src={logoImg} alt="Letmeask" />
                                {
                                    !user && (
                                        <>
                                            <button className="create-room" onClick={handleCreateRoom}>
                                                <img src={googleIconImg} alt="Logo do Google" />
                                                Faça login para Continuar
                                            </button>
                                            <div className="separator">ou entre em uma sala</div>
                                        </>
                                    )
                                }

                                <form onSubmit={handleJoinRoom}>
                                    <input
                                        type="text"
                                        placeholder="Digite o código da sala"
                                        onChange={event => setRoomCode(event.target.value)}
                                        value={roomCode}
                                    />
                                    <Button type="submit" variant="outline-dark">
                                        Entrar na sala
                                    </Button>
                                </form>
                            </div>
                        </main>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}