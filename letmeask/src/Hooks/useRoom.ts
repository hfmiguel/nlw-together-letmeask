import { useEffect, useState } from "react";
import { database } from "../Services/fireabase";
import { useAuth } from './useAuth';

export function useRoom(roomId: string) {

  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [myRooms, setMyRooms] = useState<Rooms[]>([]);

  type Questions = {
    id: string;
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
  }

  type FireBaseQuestions = Record<string, {
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
      authorId: string;
    }>
  }>

  type Rooms = Record<string, {
    id: string;
    title: string;
    authorId: string;
    authorName: string;
    questions: Questions;
  }>

  useEffect(() => {
    if (roomId) {
      const roomRef = database.ref(`/rooms/${roomId}`);
      roomRef.on("value", room => {
        const databaseRoom = room.val();

        console.log(databaseRoom, roomId);
        const firebaseQuestions: FireBaseQuestions = databaseRoom.questions;
        const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          }
        });
        setTitle(databaseRoom.title);
        setQuestions(parsedQuestions);
      });
      return () => {
        roomRef.off('value');
      }
    }

    if (user && !roomId) {
      getMyRooms();
    }

  }, [roomId, user?.id]);
  /* Toda vez que o room ID ou user.id  mudar de valor, executara o useEffect() */

  async function getMyRooms() {
    const roomRef = await database.ref(`/rooms`).get();
    const rooms: Rooms = roomRef.val();
    const parsedRooms = Object.entries(rooms ?? {}).map(([key, value]) => {
      if (value && value.authorId === user?.id) {
        value.id = key;

        const firebaseQuestions: FireBaseQuestions = value.questions as any;
        const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          }
        });

        value.questions = parsedQuestions as any;
        return value;
      }
      return {};
    });

    setMyRooms(parsedRooms);
  }

  return { questions, title, myRooms };
}