import eventlet
import socketio
import pyautogui

pyautogui.PAUSE = 0
pyautogui.FAILSAFE=False

# Create a Socket.IO server
sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

# Event handler for when a client connects to the server
@sio.event
def connect(sid, environ):
    print(f'Client connected: {sid}')

# Event handler for when a client disconnects from the server
@sio.event
def disconnect(sid):
    print(f'Client disconnected: {sid}')

# Event handler for custom 'move' event from the client
@sio.event
def move(sid, data):
    move_mouse(data["dx"],data["dy"])

@sio.event
def leftClick(sid):
    pyautogui.leftClick()

@sio.event
def rightClick(sid):
    pyautogui.rightClick()


# keyboard events
@sio.event
def pressIn(sid,data):
    pyautogui.keyDown(data)

@sio.event
def pressOut(sid,data):
    pyautogui.keyUp(data)



def move_mouse(dx, dy):
    pyautogui.move(dx,dy)

if __name__ == '__main__':
    # Start the server
    eventlet.wsgi.server(eventlet.listen(('', 3000)), app)