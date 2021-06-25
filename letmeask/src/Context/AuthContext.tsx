import { createContext, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth, firebase } from "../Services/fireabase";
import { useHistory } from 'react-router-dom';

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    signOutGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {

            if (user) {

                const { displayName, photoURL, uid } = user;

                if (!displayName || !photoURL) {
                    throw new Error("Missing informations from Google");
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                });
            }
        });

        return () => {
            unsubscribe();
        }

    }, [])

    async function signInWithGoogle() {

        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if (result.user) {

            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error("Missing informations from Google");
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            });
        }
    }


    async function signOutGoogle() {

        await firebase.auth().signOut().catch((error) => {
            toast(`Erro ao fazer logout!\r\n ${JSON.stringify(error)}`, {
                duration: 3000,
                position: 'top-center',
                icon: '',
            });
        });


        setTimeout(() => {
            toast('Logout efetuado com sucesso!', {
                duration: 3000,
                position: 'top-center',
                icon: '',
            });

            setUser(undefined);

            history.push(`/`);
        }, 1000);
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signOutGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}