import copyImg from '../../assets/images/copy.svg';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../Hooks/useAuth';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <div>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
    </div >
  )
}