import copyImg from '../../assets/images/copy.svg';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../../Hooks/useAuth';
import Image from 'react-bootstrap/Image'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {

  const { user, signOutGoogle } = useAuth();

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

      {
        user && (
          <Dropdown>
            <Dropdown.Toggle variant="default" id="dropdown-basic">
              <Image src={user.avatar} alt={user.name} className="user-img" roundedCircle fluid />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="# /action-1">Minhas Salas</Dropdown.Item>
              <Dropdown.Item href="#/action-2">???</Dropdown.Item>
              <Dropdown.Item href="#" onClick={signOutGoogle}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
      }
    </div >
  )
}