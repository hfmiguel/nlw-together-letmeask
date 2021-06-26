
import cx from 'classnames';
import { ReactNode } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import './style.scss';


type RoomsProps = Record<string, {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  children?: ReactNode;
  questions: [];
}>

export function Rooms({
  id,
  title,
  authorName,
  questions,
  children,
}: RoomsProps) {

  const { user } = useAuth();

  return (
    <div
      className={cx(
        "rooms",
      )}>
      <div className="rooms-head">
        <p>{title}</p>
        <p>{Object.values(questions ?? {}).length} perguntas </p>
      </div>
      <footer>
        <div className="user-info">
          <img src={user?.avatar} alt={authorName as any} />
          <span>{authorName}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}