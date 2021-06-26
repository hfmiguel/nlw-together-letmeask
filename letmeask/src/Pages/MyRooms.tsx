import { useHistory, useParams } from 'react-router-dom';
import { Rooms } from '../Components/Rooms/Index';
import { useRoom } from '../Hooks/useRoom';
import '../styles/myRoom.scss';


export function MyRoom() {

  const { myRooms } = useRoom('');
  const history = useHistory();

  return (
    <div id="my-room">
      <main >
        <div className="room-title">
          {
            myRooms.length > 0 && (
              <span>{myRooms.length} salas</span>
            )
          }
        </div>

        <div className="rooms-list">

          {myRooms.map((el, key) => {

            return (
              <>
                {
                  (el && el.authorId) &&
                  (
                    <Rooms
                      key={el.id as any}
                      title={el.title as any}
                      authorName={el.authorName as any}
                      questions={el.questions as any}
                    >
                      {
                        <button
                          className={`action-button`}
                          type="button"
                          aria-label="Ir para sala"
                          onClick={() => history.push(`/admin/rooms/${el.id as any}/`)}
                        >
                          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="32px" height="32px" viewBox="0 0 96.943 96.943">
                            <g>
                              <g>
                                <path d="M61.168,83.92H11.364V13.025H61.17c1.104,0,2-0.896,2-2V3.66c0-1.104-0.896-2-2-2H2c-1.104,0-2,0.896-2,2v89.623
			c0,1.104,0.896,2,2,2h59.168c1.105,0,2-0.896,2-2V85.92C63.168,84.814,62.274,83.92,61.168,83.92z"/>
                                <path d="M96.355,47.058l-26.922-26.92c-0.75-0.751-2.078-0.75-2.828,0l-6.387,6.388c-0.781,0.781-0.781,2.047,0,2.828
			l12.16,12.162H19.737c-1.104,0-2,0.896-2,2v9.912c0,1.104,0.896,2,2,2h52.644L60.221,67.59c-0.781,0.781-0.781,2.047,0,2.828
			l6.387,6.389c0.375,0.375,0.885,0.586,1.414,0.586c0.531,0,1.039-0.211,1.414-0.586l26.922-26.92
			c0.375-0.375,0.586-0.885,0.586-1.414C96.943,47.941,96.73,47.433,96.355,47.058z"/>
                              </g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                          </svg>
                        </button> as any}
                    </Rooms>
                  )
                }

              </>
            )
          })
          }
        </div>

      </main >
    </div >
  )
}